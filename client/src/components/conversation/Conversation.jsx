import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Usercontext } from "../../context/context";
import "./conversation.css";

export default function Conversation({
  conversation,
  currentConversation,
  notifcation,
  user,
  avatar,
}) {
  const { currentUser } = Usercontext();
  const [reciver, setreciver] = useState([]);
  const [active, setactive] = useState(false);

  const setuser = () => {
    user.map((c) => {
      if (c === currentUser._id) {
        return;
      } else {
        fetchuserdata(c);
      }
    });
  };

  const fetchuserdata = async (iu) => {
    const url = `${process.env.REACT_APP_API_KEY}/conversiondata/${iu}`;
    console.log(url);
    const { data } = await axios.get(url);
    setreciver(data);
  };

  useEffect(() => {
    if (conversation === currentConversation) {
      setactive(true);
      avatar({ avatar: reciver.avatar, id: reciver.name });
    } else {
      setactive(false);
    }

    //eslint-disable-next-line
  }, [currentConversation]);

  useEffect(() => {
    setuser();
  }, []);

  return (
    <div className={`conversation_box ${active === true ? "active_chat" : ""}`}>
      <div className="conversation_logo">
        <img src={reciver.avatar} alt="" />
      </div>
      <h2>{reciver.name}</h2>
      <div
        className={notifcation === true ? `notification` : "notification_false"}
      ></div>
    </div>
  );
}
