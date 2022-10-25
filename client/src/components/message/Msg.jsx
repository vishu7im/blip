import React from "react";
import "./msg.css";

export default function Msg({ own, msg, sender }) {
  return (
    <>
      <div className={`msg ${own === true ? "msg_own" : " "}`}>
        <div className={`msg_box ${own === true ? "msg_box_own" : ""}`}>
          <div className="msg_avatar">
            <img
              className={own === true ? "msg_avtar_img_own" : "msg_avatar_img"}
              src={sender.avatar}
              alt="Avtar"
            />
          </div>
          <p className={`msg_text ${own === true ? "msg_text_own" : ""}`}>
            {msg}
          </p>
        </div>
        <p className="d">{sender.date}</p>
      </div>
    </>
  );
}
