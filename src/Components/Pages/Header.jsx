import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import Button from "@mui/material/Button";
import { MdOutlineMenuOpen } from "react-icons/md";
import usericon from "../../assets/usericon.png";
import img1 from "../../assets/Vector3.png";
import { useContext } from "react";
import { MyContext } from "../../App";
import arrow from "../../assets/down.png";
import { IoIosArrowDown } from "react-icons/io";
import BellIcon from "../../assets/bellIcon.jpg";
import NotificationDrawer from "./NavDrawer";
import UserProfileDrawer from "./UserProfileDrawer";
import io from "socket.io-client";
import { useEffect } from "react";
import axios from 'axios'
import { Avatar, Badge, Space } from 'antd';

const socket = io(import.meta.env.VITE_BACKEND_API);

// import Sidebar from './Sidebar';
const Header = () => {
  const adminToken = localStorage.getItem('token')
  const Profile = localStorage.getItem('admin')
  const NewProfile = JSON.parse(Profile)
  const name = NewProfile?.name
  // const email = NewProfile?.email
  // const user_id = NewProfile?._id


  const [isToggle, setIsToggle] = useState(false);
  const [activeButton, setProfileActiveButton] = useState(0);
  const [open, setOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [data, setData] = useState([]);


  const handleClick = (index) => {
    setProfileActiveButton(index);
  };

  const handleToggle = () => {
    setIsToggle(!isToggle);
  };
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
    handleSeenNotification()
    Getdata()
  };

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const handleSubmit = () => {
    onClose();
  };

  const Getdata = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_API}/notification`, {headers: {token: {token: adminToken}}}
    );
    setData(res.data.reverse());

    const filteredData = res.data.filter((notification) => notification.Status === false);
     console.log("filteredData", filteredData)
    // Store the length of the filtered array
    setUnreadCount(filteredData.length);

    console.log("response", res);

  };

  const handleSeenNotification = async() => {
    console.log("status click ")

    try{
    const res = await axios.put(`${import.meta.env.VITE_BACKEND_API}/notifications-seen`)
    console.log("status update successfull")
    }catch(err){
      console.log("err", err)
    }
  //   const filteredData = res.data.filter((notification) => notification.Status === false);
  //   console.log("filteredData", filteredData)
  //  // Store the length of the filtered array
  //  setUnreadCount(filteredData.length);
  }

  useEffect(() => {
    Getdata();
  }, []);
  useEffect(() => {
    socket.on("connect", () => {
        console.log("Connected to socket server");
    });

    // Listen for notifications
    socket.on("new_notification", (notification) => {
        // Add the new notification to the list
        setData(prevData => [notification, ...prevData]);

        // Trigger a desktop notification
        if (Notification.permission === "granted") {
            new Notification(notification.message, {
                body: notification.currentDate,
            });
        }
    });

    return () => {
        socket.off("new_notification");
        socket.disconnect();
    };
}, []);

useEffect(() => {
  socket.on("new_notification", (notification) => {
      setUnreadCount(prevCount => prevCount + 1);
      // Add the notification to the list
      setData(prevData => [notification, ...prevData]);

      // Trigger a desktop notification
      if (Notification.permission === "granted") {
          new Notification(notification.message, {
              body: notification.currentDate,
          });
      }
  });
}, []);
  return (
    <>
      <div className="container-fluid header w-100 my-1">
        <div className="row1" style={{ padding: "0px 2rem" }}>
          <div className="col-md-6">
            <Link to={"/"}>
              <img
                src={logo}
                alt=""
                width={40}
                style={{ background: "#fff" }}
              />
            </Link>
          </div>

          <div
            className="col-md-6 part3"
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            {/* <Button >
              <Badge count={5} >

             
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M10 9H17M10 13H17M7 9H7.01M7 13H7.01M21 20L17.6757 18.3378C17.4237 18.2118 17.2977 18.1488 17.1656 18.1044C17.0484 18.065 16.9277 18.0365 16.8052 18.0193C16.6672 18 16.5263 18 16.2446 18H6.2C5.07989 18 4.51984 18 4.09202 17.782C3.71569 17.5903 3.40973 17.2843 3.21799 16.908C3 16.4802 3 15.9201 3 14.8V7.2C3 6.07989 3 5.51984 3.21799 5.09202C3.40973 4.71569 3.71569 4.40973 4.09202 4.21799C4.51984 4 5.0799 4 6.2 4H17.8C18.9201 4 19.4802 4 19.908 4.21799C20.2843 4.40973 20.5903 4.71569 20.782 5.09202C21 5.51984 21 6.0799 21 7.2V20Z"
                    stroke="#4d4c4c"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{" "}
                </g>
              </svg> </Badge>
            </Button> */}
            <Button onClick={toggleDrawer}>
            <Badge count={unreadCount}>
              <img
                src={BellIcon}
                alt="Notifications"
                style={{ width: "22px", height: "24px" }}
              /></Badge>
            </Button>
            
            {/* <p>{unreadCount}</p> */}
            <Button className="rounded-circle1">
              <img src={img1} width={20} alt="" />
            </Button>

            <div
              className="profileBtn d-flex mx-2"
              style={{
                background: "#efe9e9",
                padding: "5px",
                width: "55px",
                borderRadius: "5px",
              }}
            >
              <button
                className="rounded-circle1"
                style={{
                  width: "35px !important",
                  padding: "10px",
                  height: "30px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#bba399",
                  color: "#fff",
                  border: "none",
                }}
                onClick={showDrawer}
                // onClick={handleToggle}
              >
                { name?.charAt(0).toUpperCase()}
              </button>
              <span className="mt-1 ">
                <IoIosArrowDown width={20} 
                 onClick={showDrawer}
                // onClick= {handleToggle}
                 />
              </span>
            </div>

          </div>
        </div>
        <UserProfileDrawer open={open} onClose={onClose} onSubmit={handleSubmit} />
        <NotificationDrawer open={isDrawerOpen} onClose={toggleDrawer} />

      </div>
    </>
  );
};

export default Header;
