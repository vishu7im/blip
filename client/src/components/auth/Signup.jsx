import React, { useState } from "react";
import axios from "axios";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Usercontext } from "../../context/context";
import Alertmsg from "../Alert/alert";

export default function Signup({ toggal }) {
  const [open, setOpen] = useState(false);
  const [Alert, setalert] = useState({
    status: "",
    msg: "",
  });
  const [match, setMatch] = useState(true);
  const navigate = useNavigate();
  const { setlodder } = Usercontext();
  const [inputdata, setInputdata] = useState({
    email: "",
    name: "",
    pwd: "",
    rpwd: "",
  });
  const handle = (e) => {
    const { name, value } = e.target;
    setInputdata({ ...inputdata, [name]: value });
  };

  const checkpwd = () => {
    const { pwd, rpwd } = inputdata;

    if (!pwd || !rpwd) {
      return setMatch(true);
    }

    if (pwd === rpwd) {
      setMatch(true);
      console.log("pwd match ");
    } else {
      console.log("not match");
      setMatch(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      checkpwd();
    }, 100);
    // eslint-disable-next-line
  }, [inputdata]);

  const Signup = async () => {
    const url = "http://localhost:5000/signup";
    const { email, name, pwd, rpwd } = inputdata;
    if (!email || !name || !pwd || !rpwd) {
      return alert("all feilds mendatory");
    }
    try {
      setlodder(true);
      const data = await axios.post(url, { email, name, pwd });
      localStorage.setItem("user", data.data);
      navigate("/home");
    } catch (error) {
      setalert({ status: "error", msg: error.response.data });
      setOpen(true);
    }
    setlodder(false);
  };

  return (
    <>
      <Alertmsg
        open={open}
        status={Alert.status}
        msg={Alert.msg}
        setOpen={setOpen}
      />

      <div className="logincontainer ">
        <div className="loginbox change">
          <div class="box">
            <div className={"heading"}>
              <h1>sign-up</h1>
            </div>
            <div className="inputfeild">
              <input
                type="text"
                name="email"
                onChange={handle}
                value={inputdata.email}
                placeholder="Email"
              />
              <input
                type="text"
                name="name"
                onChange={handle}
                value={inputdata.name}
                placeholder="name"
              />
              <input
                type="password"
                name="pwd"
                onChange={handle}
                value={inputdata.pwd}
                placeholder="Password"
              />
              <input
                type="password"
                name="rpwd"
                onChange={handle}
                value={inputdata.rpwd}
                placeholder="Repeat Password"
              />

              {match === true ? "" : <span>Pwd Not Match </span>}
              <div className="lbtn">
                <button disabled={!match} onClick={Signup}>
                  signup{" "}
                </button>
                <div className="toggal">
                  <span>
                    Already have an account?{" "}
                    <b
                      onClick={() => {
                        toggal(true);
                      }}
                    >
                      Login
                    </b>{" "}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
