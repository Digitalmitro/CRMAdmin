import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Input, Button, Spin, List, Avatar, Badge } from "antd";
import io from "socket.io-client";
import Cookies from "cookies-js";
import moment from "moment";
import { jwtDecode } from "jwt-decode";

const ENDPOINT = import.meta.env.VITE_BACKEND_API;
let socket;

const EmpMsg = () => {
  const Admintoken = localStorage.getItem("token");
  const decodeToken = Admintoken && jwtDecode(Admintoken);
  const userId = decodeToken._id;

  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const admin = JSON.parse(localStorage.getItem("admin"));
  const [messageLength, setMessageLength] = useState([]);
  const [loader, setloader] = useState(true);
  const [chatSeen, setChatSeen] = useState([]);
  const [length, setLength] = useState(0);

  const [formData, setFormData] = useState({
    name: admin?.name,
    email: admin?.email,
    message: "",
    senderId: userId,
    date: moment().format("h:mm:ss a"),
    status: "",
    user_id: userId,
  });

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Establish socket connection only when an employee is selected
  useEffect(() => {
    if (selectedEmployee) {
      socket = io(ENDPOINT);
      socket.emit("register", admin._id);
      socket.on("connected", () => setSocketConnected(true));
      socket.on("typing", () => setIsTyping(true));
      socket.on("stop typing", () => setIsTyping(false));

      socket.on("chat message", (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });
// fetchEmployees()
      return () => {
        socket.disconnect();
        setSocketConnected(false);
      };
    }
  }, [selectedEmployee]);

  const curTime = new Date();

  const handleSendMessage = async () => {
    if (input.trim() !== "") {
      const newMessage = {
        name: formData.name,
        email: formData.email,
        senderId: userId,
        receiverId: selectedEmployee._id,
        message: input,
        role: "admin",
        time: curTime,
        userId: selectedEmployee._id,
      };

      setMessages([...messages, newMessage]);
      socket.emit("sendMsg", newMessage);
      try {
        console.log("hereeeee", newMessage);
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_API}/notifymessage`,
          {
            senderName: formData.name,
            Date: moment().format("MMMM Do YYYY, h:mm:ss a"),
            status: false,
            message: input,
            senderId: userId,
            receiverId: selectedEmployee._id,
          }
        );
        console.log("res", res);
      } catch (err) {
        console.log(err);
      }
      setInput("");
    }
  };

  const getChatData = async (employeeId) => {
    setLoading(true);
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_API}/message-user/${
          employeeId || userId
        }`
      )
      .then((res) => {
        const chatData = res.data.chatData;

        if (chatData.length > 0) {
          console.log("chatData", res.data?.chatData[0]?.messages);

          const filterStatus = res.data?.chatData[0]?.messages.filter(
            (msg) =>
              msg.receiverId == userId && msg.status && msg.status === "false"
          );
          console.log("filterStatus", filterStatus);

          setMessageLength(filterStatus);
          setMessages(res.data.chatData[0].messages);
        } else {
          setMessages([]);
        }
      })
      .finally(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (selectedEmployee) {
      getChatData(selectedEmployee._id);
    }
  }, [selectedEmployee]);
  const fetchEmployees = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/employees`
      );
      setEmployees(res?.data);

      setloader(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);
  
  console.log("employees", employees);
  const typingHandler = (e) => {
    setInput(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", userId);
    }
    let lastTypingTime = new Date().getTime();
    const timerLength = 3000;
    setTimeout(() => {
      const timeNow = new Date().getTime();
      const timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", userId);
        setTyping(false);
      }
    }, timerLength);
  };

  const filteredEmployees =
    employees?.length > 0 && searchQuery
      ? employees.filter((employee) =>
          employee.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : employees;

  useEffect(() => {
    const getChatNotification = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_API}/notifymessage`
        );
        setChatSeen(res.data.data);
        setLength(hasReceivedMsg[0]?.message?.length);
      } catch (err) {
        console.log(err);
      }
    };
    getChatNotification();
  }, []);

  const handleMsgSeen = async (senderId) => {
    console.log("chatcSen", chatSeen);
    const isUnseen = chatSeen.filter((chat) => chat.senderId === senderId);
    console.log("isUnseen", isUnseen);
    if (isUnseen.length > 0) {
      try {
        const res = await axios.delete(
          `${import.meta.env.VITE_BACKEND_API}/notifymessage`,
          {
            params: {
              id: senderId,
              type: "sender",
            },
          }
        );
        // setLength(0);
        setChatSeen((prevChatSeen) =>
          prevChatSeen.filter((chat) => chat.senderId !== senderId)
        );
      } catch (err) {
        console.log(err);
      }
      // fetchEmployees()
    } else {
      console.log("nothing");
    }
  };

  return (
    <div className="chat-app" style={styles.chatApp}>
      <div className="chatSidebar" style={styles.chatSidebar}>
        <Input
          placeholder="Search employee..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.searchBar}
        />
        {loader ? (
          <>
            {" "}
            <Spin tip="loading..." style={styles.spinner} />{" "}
          </>
        ) : (
          <List
            itemLayout="horizontal"
            dataSource={filteredEmployees}
            renderItem={(employee) => {
              const matchingChat = chatSeen?.find(
                (chat) => chat.senderId === employee._id
              );
              const messageCount = matchingChat
                ? matchingChat?.message.length
                : 0;

              return (
                <List.Item
                  key={employee._id}
                  onClick={() => {
                    setSelectedEmployee(employee);
                    handleMsgSeen(employee._id);
                  }}
                  style={{
                    ...styles.employeeItem,
                    backgroundColor:
                      selectedEmployee?._id === employee._id
                        ? "#e0e0e0"
                        : "#ffffff",
                  }}
                >
                  <List.Item.Meta
                    avatar={
                      <Badge count={messageCount}>
                        {" "}
                        <Avatar>{employee.name[0]}</Avatar>
                      </Badge>
                    }
                    title={employee.name}
                    description={employee.lastMessage ?? employee.email}
                  />
                </List.Item>
              );
            }}
          />
        )}
      </div>
      <div className="chat-container" style={styles.chatContainer}>
        {selectedEmployee ? (
          <>
            <div
              className="messages-container"
              style={styles.messagesContainer}
            >
              {loading ? (
                <Spin tip="Loading..." style={styles.spinner} />
              ) : (
                messages?.map((item, index) => {
                  return (
                    <>
                      <div
                        key={index}
                        className={
                          item.role === "admin" ? "right-msg" : "left-msg"
                        }
                        style={{
                          ...styles.messageBubble,
                          alignSelf:
                            item.role === "admin" ? "flex-end" : "flex-start",
                          backgroundColor:
                            item.role === "admin" ? "#b3e5fc" : "#c8e6c9",
                        }}
                      >
                        <p style={styles.senderName}>
                          <strong>{item.name}</strong>
                        </p>
                        <p style={styles.messageText}>
                          {item.message}
                          <span style={styles.messageTime}>{moment(item.time).format("DD/MM/YYYY HH:mm")}</span>
                        </p>
                      </div>
                      <div ref={messagesEndRef} />
                    </>
                  );
                })
              )}
            </div>
            <div className="input-container" style={styles.inputContainer}>
              <Input
                placeholder="Type your message here..."
                value={input}
                onChange={typingHandler}
                onPressEnter={handleSendMessage}
                style={styles.inputField}
              />
              {isTyping && <p style={styles.typingIndicator}>Typing...</p>}
              <Button
                type="primary"
                onClick={handleSendMessage}
                style={styles.sendButton}
              >
                Send
              </Button>
            </div>
          </>
        ) : (
          <div style={styles.selectEmployeePlaceholder}>
            <p>Select an employee to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  chatApp: {
    display: "flex",
    height: "80vh",
    // overflow:"hidden",
    backgroundColor: "#f5f5f5",
  },
  chatSidebar: {
    width: "30%",
    padding: "20px",
    backgroundColor: "#ffffff",
    borderRight: "1px solid #e0e0e0",
    display: "flex",
    flexDirection: "column",
    height: "80vh ",
    overflowY: "auto !important",
    scrollbarWidth: "thin",
  },
  searchBar: {
    marginBottom: "20px",
    borderRadius: "8px",
  },
  employeeItem: {
    padding: "10px",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  chatContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    flexGrow: 1,

    padding: "20px",
    backgroundColor: "#f5f5f5",
    // height:"80vh",
  },
  messagesContainer: {
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
    overflowX: "hidden",
    padding: "10px",
    scrollbarWidth: "thin",
    marginBottom: "20px",
    // maxHeight:  "calc(100vh - 150px)",
    maxHeight: "80vh",
  },
  spinner: {
    alignSelf: "center",
  },
  messageBubble: {
    padding: "10px",
    borderRadius: "8px",
    margin: "5px 0",
    maxWidth: "60%",
  },
  senderName: {
    margin: 0,
    fontSize: "0.8rem",
    color: "#424242",
  },
  messageText: {
    margin: "2px 0",
    fontSize: ".9rem",
    color: "#424242",
  },
  messageTime: {
    fontSize: "0.7rem",
    color: "#757575",
    textAlign: "right",
    margin: 0,
    // marginTop: ".5rem",
    marginLeft: "2rem",
  },
  inputContainer: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    padding: "5px 10px",
    position: "sticky",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    bottom: 0,
  },
  inputField: {
    flexGrow: 1,
    border: "none",
    outline: "none",
    padding: ".4rem",
    fontSize: "1rem",
    borderRadius: "8px",
  },
  sendButton: {
    marginLeft: "10px",
  },
  typingIndicator: {
    fontSize: "0.8rem",
    color: "#757575",
    marginLeft: "10px",
  },
  selectEmployeePlaceholder: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    fontSize: "1.2rem",
    color: "#757575",
  },
};

export default EmpMsg;
