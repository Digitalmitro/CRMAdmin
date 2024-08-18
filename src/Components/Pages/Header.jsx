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

// import Sidebar from './Sidebar';
const Header = () => {
  const [isToggle, setIsToggle] = useState(false);
  const [activeButton, setActiveButton] = useState(0);
  const [open, setOpen] = useState(false);

  const handleClick = (index) => {
    setActiveButton(index);
  };

  const handleToggle = () => {
    setIsToggle(!isToggle);
  };
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
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

  return (
    <>
      <div className="container-fluid header w-100">
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
            <Button onClick={toggleDrawer}>
              <img
                src={BellIcon}
                alt="Notifications"
                style={{ width: "22px", height: "24px" }}
              />
            </Button>
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
                O
              </button>
              <span className="mt-1 ">
                <IoIosArrowDown width={20} 
                 onClick={showDrawer}
                // onClick= {handleToggle}
                 />
              </span>
            </div>

            {/* <div
              className={`${isToggle ? "showDetails" : "hideDetails"}`}
              style={{ marginTop: "10rem" }}
            >
              <Button
                className={`custom-button ${
                  activeButton === 0 ? "active" : ""
                }`}
                onClick={() => handleClick(0)}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "30px",
                  marginBottom: "10px ",
                  paddingTop: "18px",
                  width: "7rem",
                }}
              >
                <h6 style={{ fontSize: "0.7rem", color: "#222" }}>Login</h6>
              </Button>
              <Button
                className={`custom-button ${
                  activeButton === 1 ? "active" : ""
                }`}
                onClick={() => handleClick(1)}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "30px",
                  marginBottom: "10px ",
                  paddingTop: "18px",
                  width: "7rem",
                }}
              >
                <h6 style={{ fontSize: "0.7rem", color: "#222" }}>Logout</h6>
              </Button>
            </div> */}
          </div>
        </div>
        <UserProfileDrawer open={open} onClose={onClose} onSubmit={handleSubmit} />
        <NotificationDrawer open={isDrawerOpen} onClose={toggleDrawer} />

      </div>
    </>
  );
};

export default Header;
