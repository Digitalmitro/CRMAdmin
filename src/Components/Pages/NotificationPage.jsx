import React, { useState, useEffect } from "react";
import { Input, Button, Checkbox, List, Spin } from "antd";
import axios from "axios";

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    height: "100vh",
    padding: "20px",
  },
  sidebar: {
    width: "30%",
    padding: "10px",
    borderRight: "1px solid #ccc",
  },
  content: {
    width: "70%",
    padding: "10px",
  },
  searchBar: {
    marginBottom: "10px",
  },
  userList: {
    maxHeight: "70vh",
    overflowY: "auto",
  },
  inputField: {
    marginBottom: "10px",
  },
  button: {
    marginTop: "10px",
  },
};

const NotificationPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_API}/employees`
        );
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchEmployees();
  }, []);

  // Handle select all checkbox
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedUsers(["ALL"]);
    } else {
      setSelectedUsers([]);
    }
  };

  // Handle individual user selection
  const handleUserSelect = (userId) => {
    if (selectedUsers.includes("ALL")) {
      setSelectedUsers(['']);
    } else if (selectedUsers.includes(userId)) {
    //   setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    setSelectedUsers([userId])
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  // Handle notification submission
  const handleSendNotification = async () => {
    if (!title || !message) {
      alert("Please fill out both title and message.");
      return;
    }

    try {
      const payload = {
        userIds: selectedUsers,
        title,
        description: message,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/api/send-notification`,
        payload
      );
      if (response.status === 200) {
        alert("Notification sent successfully.");
        setTitle("");
        setMessage("");
        setSelectedUsers([]);
      }
    } catch (error) {
      console.error("Error sending notification:", error);
      alert("Failed to send notification.");
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <Input
          placeholder="Search user..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.searchBar}
        />

        {loading ? (
          <Spin tip="Loading users..." />
        ) : (
          <>
            <Checkbox
              onChange={handleSelectAll}
              checked={selectedUsers.includes("ALL")}
            >
              Select All
            </Checkbox>
            <List
              style={styles.userList}
              dataSource={filteredUsers}
              renderItem={(user) => (
                <List.Item>
                  <Checkbox
                    checked={
                      selectedUsers.includes("ALL") ||
                      selectedUsers.includes(user._id)
                    }
                    onChange={() => handleUserSelect(user._id)}
                  >
                    {user.name}
                  </Checkbox>
                </List.Item>
              )}
            />
          </>
        )}
      </div>

      <div style={styles.content}>
        <h2>Send Notification</h2>
        <Input
          placeholder="Notification Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.inputField}
        />
        <Input.TextArea
          placeholder="Notification Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={styles.inputField}
        />
        <Button
          type="primary"
          onClick={handleSendNotification}
          style={styles.button}
          disabled={selectedUsers.length === 0 || !title || !message}
        >
          Send Notification
        </Button>
      </div>
    </div>
  );
};

export default NotificationPage;