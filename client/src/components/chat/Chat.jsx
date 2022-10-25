import "./chat.css";
import React, { useEffect, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import Msg from "../message/Msg";
import Axios from "axios";
import { Usercontext } from "../../context/context";

export default function Chat({ currentConversation, avatar }) {
  const [inputdata, setinput] = useState("");
  const { currentUser } = Usercontext();
  const [chat, setchat] = useState([]);
  const fetchchat = async () => {
    if (!currentConversation) {
      return;
    }
    const url = `${process.env.REACT_APP_API_KEY}/msg/${currentConversation}`;
    const { data } = await Axios.get(url);
    setchat(data);
  };
  useEffect(() => {
    fetchchat();
  }, [currentConversation]);

  useEffect(() => {
    console.log(chat);
  }, [chat]);

  const send = async () => {
    const url = `${process.env.REACT_APP_API_KEY}/msg`;

    if (!inputdata) {
      return;
    }

    try {
      await Axios.post(url, {
        conversation: currentConversation,
        sender: currentUser._id,
        msg: inputdata,
      });
    } catch (error) {
      console.log(error.message);
    }
    setinput("");
  };

  return (
    <div className="chat_container">
      <div className="chat_heading">
        <div className="chat_logo">
          <img src={avatar.avatar} alt="" />
        </div>
        <h1>{avatar.id}</h1>
      </div>
      <div className="chat_body">
        {chat.map(({ msg, sender }, i) => {
          return (
            <Msg
              own={sender._id === currentUser._id ? true : false}
              key={i}
              msg={msg}
              sender={sender}
            />
          );
        })}
      </div>
      <div className="chat_send">
        <div className="chat_input">
          <textarea
            name=""
            placeholder="write your message..."
            value={inputdata}
            onChange={(e) => {
              setinput(e.target.value);
            }}
          />
        </div>
        <div className="send" onClick={send}>
          <SendIcon />
        </div>
      </div>
    </div>
  );
}
