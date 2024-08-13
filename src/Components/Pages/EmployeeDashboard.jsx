import React, { useContext, useState } from 'react';

import { GoArrowUp } from "react-icons/go";
import moment from "moment";
import { MyContext } from '../../App';
import attendanceimg from "../../assets/finger-print-12.png";
import callbackImg from "../../assets/callback-12.png";
import transferImg from "../../assets/transfer-img.png";
import salesImg from "../../assets/sales-img.png";
import projectImg from "../../assets/project-12.png";
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {

  const context = useContext(MyContext);
  const navigate = useNavigate()
  const handleClick = (index, path, label) => {
    context.setActiveButton(index);
    context.setBreadcrumbs([{ label: index === 0 ? "" : "Dashboard", path: '/' },
    { label, path }]);
    navigate(path);
  };


  return (
    <>
      <div className=" dashboard container d-flex flex-wrap  align-items-center justify-content-start my-3 gap-2">
        <div
          className="Emp-Dash grid8 d-flex align-items-center "
          style={{
            boxShadow: " 0 0 5px rgb(179, 170, 170)",
            justifyContent: "center",
            width: "200px",
            borderRadius: "20px",
          }}
        >
          <a
            href=""
            style={{
              color: "#222",
            }}
          >
            <div  style={{ color: "#555151" }}
            className={`custom-button ${context.activeButton === 1 ? 'active' : ''}`}
            onClick={() => handleClick(1, '/attendance', 'Attendance')}>
              <div
                style={{ textAlign: "center", padding: "20px", height: "96px" }}
              >
                <img
                  src={attendanceimg}
                  alt=""
                  style={{ width: "70px", height: "70px", textAlign: "center" }}
                />
              </div>
              <div
                className="gridtext d-flex align-items-center justify-content-center"
                style={{ color: "#222" }}
              >
                <h5 style={{ fontSize: "0.9rem" }}>
                  Attendace List: {moment().format("MMMM")}
                </h5>
              </div>
            </div>
          </a>
        </div>

        <div
          className=" grid4 d-flex align-items-center "
          style={{
            boxShadow: " 0 0 5px rgb(179, 170, 170)",
            justifyContent: "center",
            width: "200px",
            borderRadius: "20px",
          }}
        >
          <a
            href=""
            style={{
              color: "#222",
            }}
          >
            <div  style={{ color: "#555151" }}
            className={`custom-button ${context.activeButton === 2 ? 'active' : ''}`}
            onClick={() => handleClick(2, '/callbacks', 'Callbacks')}>
              <div style={{ textAlign: "center", padding: "20px" }}>
                <img
                  src={callbackImg}
                  alt=""
                  style={{ width: "50px", height: "50px", textAlign: "center" }}
                />
              </div>
              <div className="gridtext d-flex align-items-center justify-content-center">
                <h6 style={{ fontSize: "0.9rem" }}>All Callback: 914</h6>
                <span>
                  (+84.7% <GoArrowUp /> )
                </span>
              </div>
            </div>
          </a>
        </div>

        <div
          className=" grid5 d-flex  align-items-center "
          style={{
            boxShadow: " 0 0 5px rgb(179, 170, 170)",
            justifyContent: "center",
            width: "200px",
            borderRadius: "20px",
          }}
        >
          <a
            href="/sales"
            style={{
              color: "#222",
            }}
          >
            <div>
              <div style={{ textAlign: "center", padding: "20px" }}>
                <img
                  src={salesImg}
                  alt=""
                  style={{ width: "60px", height: "60px", textAlign: "center" }}
                />
              </div>
              <div className="gridtext d-flex  align-items-center justify-content-center">
                <h6 style={{ fontSize: "0.9rem" }}>All Sales: 43</h6>
                <span>
                  (+84.7% <GoArrowUp /> )
                </span>
              </div>
            </div>
          </a>
        </div>

        <div
          className=" grid6 d-flex   align-items-center "
          style={{
            boxShadow: " 0 0 5px rgb(179, 170, 170)",
            justifyContent: "center",
            width: "200px",
            borderRadius: "20px",
          }}
        >
          <a
            href="/transfers"
            style={{
              color: "#222",
            }}
          >
          <div>
            <div style={{ textAlign: "center", padding: "20px" }}>
              <img
                src={transferImg}
                alt=""
                style={{ width: "60px", height: "60px", textAlign: "center" }}
              />
            </div>
            <div className="gridtext d-flex  align-items-center justify-content-center">
              <h6 style={{ fontSize: "0.9rem" }}>All Transfer: 43</h6>
              <span>
                (+84.7% <GoArrowUp /> )
              </span>
            </div>
          </div>
          </a>
        </div>

        <div
          className=" grid8 d-flex align-items-center "
          style={{
            boxShadow: " 0 0 5px rgb(179, 170, 170)",
            justifyContent: "center",
            width: "200px",
            borderRadius: "20px",
          }}
        >
          <a
            href=""
            style={{
              color: "#222",
            }}
          > 
          <div  style={{ color: "#555151" }}
            className={`custom-button ${context.activeButton === 3 ? 'active' : ''}`}
            onClick={() => handleClick(3, '/projects', 'Projects')}>
            <div style={{ textAlign: "center", padding: "20px" }}>
              <img
                src={projectImg}
                alt=""
                style={{ width: "50px", height: "50px", textAlign: "center" }}
              />
            </div>
            <div className="gridtext d-flex align-items-center justify-content-center">
              <h6 style={{ fontSize: "1rem" }}>Projects</h6>
            </div>
          </div>
          </a>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
