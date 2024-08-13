import React, { useEffect, useState } from "react";
import axios from "axios";
import { Input, Button } from "antd";
import io from "socket.io-client";
import Cookies from "cookies-js";
import moment from "moment";
import {jwtDecode} from "jwt-decode";

const ENDPOINT = "http://localhost:3500"; // Update with your server endpoint
let socket, selectedChatCompare;

const EmpMsg = () => {
  const token = Cookies.get("token");
  const decodeToken = token && jwtDecode(token);
  const userId = decodeToken._id;
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const [formData, setFormData] = useState({
    name: decodeToken.name,
    email: decodeToken.email,
    message: "",
    senderId: userId,

    date: moment().format("h:mm:ss a"),
    status: "",
    user_id: userId,  
  });

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", { userId });
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));

    socket.on("chat message", (newMessage) => {
      if (newMessage.senderId !== userId) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      } else {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    });

    return () => {
      socket.off("chat message");
    };
  }, [userId]);

  const handleSendMessage = async () => {
    if (input.trim() !== "") {
      const newMessage = {
        senderId: userId,
        message: input,
        time: moment().format("h:mm:ss a"),
      };
      console.log("newMessage", newMessage)

        if (Array.isArray(messages)) {
          setMessages([...messages, newMessage]);
        } else {
          setMessages([newMessage]);
        }
      socket.emit("chat message", newMessage);
  
      try {
      console.log("messages", messages)

        await axios.post(
          `${import.meta.env.VITE_BACKEND_API}/message`,
          {
            ...formData,
            message: newMessage.message,
            date: newMessage.time,
          }
        );
        getChatData();
        window.scrollTo(0, document.body.scrollHeight);
        setInput("");
      } catch (err) {
        console.log(err);
      }
    }
  };
  

  const getChatData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/message/${userId}`
      );
      const messagesFromServer = res.data.message; // Access the message array
      setMessages(messagesFromServer);
    } catch (err) {
      console.log(err);
    }
  }


  useEffect(() => {
    getChatData();
  }, []);

  const typingHandler = (e) => {
    setInput(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", userId);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", userId);
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <div className="sending-messages text-center" style={{ height: "80vh" }}>
      <div
        className="row all-messages mx-auto"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          width: "100%",
          maxHeight: "70vh",
          overflowY: "scroll",
          padding: "10px",
        }}
      >
       {messages?.length === 0 ? (
  <div>Loading...</div>
) : (
  messages?.map((item, index) => (
    <div
      key={index}
      className={item.senderId === userId ? "right-msg" : "left-msg"}
      style={{
        background: "#d7997e",
        padding: "10px",
        borderRadius: "8px",
        margin: "5px 0",
        maxWidth: "60%",
        alignSelf: item.senderId === userId ? "flex-end" : "flex-start",
      }}
    >
      <p><strong>{formData.name}</strong></p>
      <p>{item.message}</p>
      <p style={{ fontSize: "0.8rem" }}>{item.time}</p>
    </div>
  ))
)}

      </div>
      <div className="fixed-bottom">
        <Input
          className="mx-auto"
          type="text"
          placeholder="Type your message here..."
          value={input}
          onChange={typingHandler}
          onPressEnter={handleSendMessage}
          style={{
            width: "40%",
            height: "6vh",
            outline: "none",
            padding: "1rem",
            border: "none",
            boxShadow: "0 0 8px #616161",
          }}
        />
        {isTyping && <p>Typing...</p>}
        <Button type="primary" onClick={handleSendMessage}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default EmpMsg;
