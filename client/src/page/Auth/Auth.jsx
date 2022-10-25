import React, { useEffect } from "react";
import Signup from "../../components/auth/Signup";
import "./auth.css";
import { useNavigate } from "react-router-dom";
import Login from "../../components/auth/Login";
import { useState } from "react";

export default function Auth() {
  const navigate = useNavigate();
  const [toggal, setToggal] = useState(true);
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/home");
    } else {
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {toggal === true ? (
        <Login toggal={setToggal} />
      ) : (
        <Signup toggal={setToggal} />
      )}
    </div>
  );
}
