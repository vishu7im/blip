import React, { useEffect } from "react";
import Chat from "../../components/chat/Chat";
import Conversation from "../../components/conversation/Conversation";
import Online from "../../components/onlineUser/online";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import axios from "axios";
import "./Home.css";
import { useState } from "react";
import { Usercontext } from "../../context/context";
import { useNavigate } from "react-router-dom";
import ChatHome from "../../components/chat_home/ChatHome";

export default function Home() {
  const navigate = useNavigate();
  const { currentUser } = Usercontext();
  const [conversation, setconversation] = useState([]);
  const [currentConversation, setcurrentConversation] = useState("");
  const [currentdetail, setcurrentdetail] = useState({
    id: "",
    avatar: "",
  });
  const fetchconversation = async () => {
    if (!currentUser) {
      return;
    }
    const url = `${process.env.REACT_APP_API_KEY}/conversation/${currentUser._id}`;
    const { data } = await axios.get(url);
    setconversation(data);
  };

  useEffect(() => {
    fetchconversation();
  }, [currentUser]);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/home");
    } else {
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);

  const logout = () => {
    localStorage.clear("user");
    navigate("/");
  };

  return (
    <>
      <div className="chat_box">
        <div className="container">
          <div className="side_bar">
            <div className="user_logo">
              <img src={`${currentUser.avatar}`} alt="" />{" "}
            </div>
            <div className="logout" onClick={logout}>
              <PowerSettingsNewIcon />
            </div>
          </div>
          <div className="conversation">
            <div className="conversation_heading">
              {" "}
              <input type="text" placeholder="chats....." />
            </div>
            <div className="conversation_body">
              {conversation.map((data, i) => {
                return (
                  <div
                    onClick={() => {
                      setcurrentConversation(data._id);
                    }}
                  >
                    {" "}
                    <Conversation
                      key={i}
                      user={data.members}
                      conversation={data._id}
                      currentConversation={currentConversation}
                      avatar={setcurrentdetail}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="chat">
            <div className="chat_container">
              {currentConversation ? (
                <Chat
                  currentConversation={currentConversation}
                  avatar={currentdetail}
                />
              ) : (
                <ChatHome />
              )}
            </div>
          </div>
          <div className="online">
            <div className="online_heading">
              <h1>online</h1>
            </div>
            <div className="online_body">
              <Online />
              <Online />
              <Online />
              <Online />
              <Online />
              <Online />
              <Online />
              <Online />
              <Online />
              <Online />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
