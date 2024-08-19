import React, { useEffect, useState } from "react";
import axios from "axios";
import { Input, Button, Spin, List, Avatar } from "antd";
import io from "socket.io-client";
import Cookies from "cookies-js";
import moment from "moment";
import { jwtDecode } from "jwt-decode";

const ENDPOINT = import.meta.env.VITE_BACKEND_API; // Update with your server endpoint
let socket;

const EmpMsg = () => {
  const token = Cookies.get("token");
  const decodeToken = token && jwtDecode(token);
  const userId = decodeToken._id;
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const admin = JSON.parse(localStorage.getItem('admin'))

  const [formData, setFormData] = useState({
    name: decodeToken.name,
    email: decodeToken.email,
    message: "",
    senderId: userId,
    date: moment().format("h:mm:ss a"),
    status: "",
    user_id: userId,
  });

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

      return () => {
        socket.disconnect();
        setSocketConnected(false);
      };
    }
  }, [selectedEmployee]);

  const handleSendMessage = async () => {
    if (input.trim() !== "") {
      const newMessage = {
        name: formData.name,
        email: formData.email,
        senderId: userId,
        receiverId: selectedEmployee._id,
        message: input,
        role: "admin",
        time: moment().format("h:mm:ss a"),
        userId: selectedEmployee._id,
      };

      setMessages([...messages, newMessage]);
      socket.emit("sendMsg", newMessage);
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

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_API}/employees`
        );
        setEmployees(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchEmployees();
  }, []);

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

  return (
    <div className="chat-app" style={styles.chatApp}>
      <div className="sidebar" style={styles.sidebar}>
        <Input
          placeholder="Search employee..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.searchBar}
        />
        <List
          itemLayout="horizontal"
          dataSource={filteredEmployees}
          renderItem={(employee) => (
            <List.Item
              key={employee._id}
              onClick={() => setSelectedEmployee(employee)}
              style={{
                ...styles.employeeItem,
                backgroundColor:
                  selectedEmployee?._id === employee._id
                    ? "#e0e0e0"
                    : "#ffffff",
              }}
            >
              <List.Item.Meta
                avatar={<Avatar>{employee.name[0]}</Avatar>}
                title={employee.name}
                description={employee.lastMessage?? employee.email}
              />
            </List.Item>
          )}
        />
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
                  console.log(item);
                  return (
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
                      <p style={styles.messageText}>{item.message}</p>
                      <p style={styles.messageTime}>{item.time}</p>
                    </div>
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
    height: "100vh",
    backgroundColor: "#f5f5f5",
  },
  sidebar: {
    width: "300px",
    padding: "20px",
    backgroundColor: "#ffffff",
    borderRight: "1px solid #e0e0e0",
    display: "flex",
    flexDirection: "column",
    height: "100vh", // Fixed height for the sidebar
    overflowY: "auto", // Enable scrolling
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
  },
  messagesContainer: {
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
    padding: "10px",
    marginBottom: "20px",
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
    fontSize: "0.9rem",
    color: "#424242",
  },
  messageText: {
    margin: "5px 0",
    fontSize: "1rem",
    color: "#424242",
  },
  messageTime: {
    fontSize: "0.8rem",
    color: "#757575",
    textAlign: "right",
    margin: 0,
  },
  inputContainer: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    padding: "10px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  },
  inputField: {
    flexGrow: 1,
    border: "none",
    outline: "none",
    padding: "10px",
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
