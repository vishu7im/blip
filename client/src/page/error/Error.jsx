import React from "react";
import { useNavigate } from "react-router-dom";

export default function Error() {
  const navigate = useNavigate();
  const home = () => {
    navigate("/");
  };
  return (
    <div>
      page not found <h1 onClick={home}> home</h1>{" "}
    </div>
  );
}
