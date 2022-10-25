import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Usercontext } from "../../context/context";
import Alertmsg from "../Alert/alert";
export default function Login({ toggal }) {
  const [open, setOpen] = useState(false);
  const [Alert, setalert] = useState({
    status: "",
    msg: "",
  });
  const navigate = useNavigate();
  const { setlodder } = Usercontext();
  const [inputdata, setInputdata] = useState({
    email: "",
    pwd: "",
  });
  const handle = (e) => {
    const { name, value } = e.target;

    setInputdata({ ...inputdata, [name]: value });
  };

  const login = async () => {
    const url = "http://localhost:5000/login";
    const { email, pwd } = inputdata;
    if (!email || !pwd) {
      return alert("all feilds mendatory");
    }
    try {
      setlodder(true);
      const data = await axios.post(url, { email, pwd });
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
          <div className="box">
            <div className="heading">
              <h1>LOGIN</h1>
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
                type="password"
                name="pwd"
                onChange={handle}
                value={inputdata.pwd}
                placeholder="Password"
              />

              <div className="lbtn">
                <button onClick={login}>login</button>
              </div>
              <div className="toggal">
                <span>
                  Dont have an account?{" "}
                  <b
                    onClick={() => {
                      toggal(false);
                    }}
                  >
                    SignUp
                  </b>{" "}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
