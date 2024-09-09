import React, { useContext, useEffect, useState } from 'react';

import { GoArrowUp } from "react-icons/go";
import moment from "moment";
import { MyContext } from '../../../App';
import attendanceimg from "../../../assets/finger-print-12.png";
import callbackImg from "../../../assets/callback-12.png";
import transferImg from "../../../assets/transfer-img.png";
import salesImg from "../../../assets/sales-img.png";
import projectImg from "../../../assets/project-12.png";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EmployeeViewDashboard = () => {
  const adminToken = localStorage.getItem('token')

    const navigate = useNavigate();
    const { id } = useParams();
    const context = useContext(MyContext);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    const [data2, setData2] = useState([]);
    const [data3, setData3] = useState([]);
    const [note, setNote] = useState([]);
    const [user, setUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataLength, setDataLength] = useState({})



  useEffect(()=>{
  
    async function getDashboardDataLength() {
      try{
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_API}/employeesdashboard/${id}`
        );
        setDataLength(res.data);
      }catch(err){
        console.log(err)
      }
      }
  
      getDashboardDataLength()
  },[])
  console.log("dataLength", dataLength)
    const fetchData = async () => {
      try {
        setLoading(true);
        const us = await axios.get(
          `${import.meta.env.VITE_BACKEND_API}/alluser/${id}`,{
            headers: { token: adminToken },
          }
        );
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_API}/callback-user/${id}`
        );
        const ress = await axios.get(
          `${import.meta.env.VITE_BACKEND_API}/transfer-user/${id}`
        );
        const resss = await axios.get(
          `${import.meta.env.VITE_BACKEND_API}/sale-user/${id}`
        );
        const ressss = await axios.get(
          `${import.meta.env.VITE_BACKEND_API}/attendance/${id}`
        );
        const nots = await axios.get(
          `${import.meta.env.VITE_BACKEND_API}/notepad/${id}`
        );
  
        setUser(us.data[0]);
        setData(res.data.callback);
        setData1(ress.data.transfer);
        setData2(resss.data.sale);
        setData3(ressss.data.attendance);
        setNote(nots?.data?.notes?.notes);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []);



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
            onClick={() => handleClick(1, `/employeeview/attendance/${id}`, 'Attendance')}>
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
                 Employee Attendace   {dataLength?.attendance} 
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
            onClick={() => handleClick(2, `/employeeview/callback/${id}`, 'Callbacks')}>
              <div style={{ textAlign: "center", padding: "20px" }}>
                <img
                  src={callbackImg}
                  alt=""
                  style={{ width: "50px", height: "50px", textAlign: "center" }}
                />
              </div>
              <div className="gridtext d-flex align-items-center justify-content-center">
                <h6 style={{ fontSize: "0.9rem" }}>Employee Callback : {dataLength?.callback}</h6>
                <span>
                
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
            href=""
            style={{
              color: "#222",
            }}
          >
            <div  className={`custom-button ${context.activeButton === 3 ? 'active' : ''}`}
            onClick={() => handleClick(3, `/employeeview/sales/${id}`, 'Sales')}>
              <div style={{ textAlign: "center", padding: "20px" }}>
                <img
                  src={salesImg}
                  alt=""
                  style={{ width: "60px", height: "60px", textAlign: "center" }}
                />
              </div>
              <div className="gridtext d-flex  align-items-center justify-content-center">
                <h6 style={{ fontSize: "0.9rem" }}>Employee Sales{dataLength?.sale}</h6>
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
            href=""
            style={{
              color: "#222",
            }}
          >
          <div
           class="card"
           className={`custom-button ${context.activeButton === 4 ? 'active' : ''}`}
            onClick={() => handleClick(4, `/employeeview/transfer/${id}`, 'Transfer')}
            >
            <div style={{ textAlign: "center", padding: "20px" }}>
              <img
                src={transferImg}
                alt=""
                style={{ width: "60px", height: "60px", textAlign: "center" }}
              />
            </div>
            <div className="gridtext d-flex  align-items-center justify-content-center">
              <h6 style={{ fontSize: "0.9rem" }}>Employee Transfer : {dataLength?.transfer}</h6>
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
            className={`custom-button ${context.activeButton === 5 ? 'active' : ''}`}
            onClick={() => handleClick(5, '/projects', 'Projects')}>
            <div style={{ textAlign: "center", padding: "20px" }}>
              <img
                src={projectImg}
                alt=""
                style={{ width: "50px", height: "50px", textAlign: "center" }}
              />
            </div>
            <div className="gridtext d-flex align-items-center justify-content-center">
              <h6 style={{ fontSize: "1rem" }}>Projects : {dataLength?.project}</h6>
              {/* <span>(+84.7%  <GoArrowUp /> )</span> */}
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
            className={`custom-button ${context.activeButton === 6 ? 'active' : ''}`}
            onClick={() => handleClick(6, `/employeeview/viewnotepad/${id}`, 'View Notepad')}>
            <div style={{ textAlign: "center", padding: "20px" }}>
              <img
                src={projectImg}
                alt=""
                style={{ width: "50px", height: "50px", textAlign: "center" }}
              />
            </div>
            <div className="gridtext d-flex align-items-center justify-content-center">
              <h6 style={{ fontSize: "1rem" }}>View Employee Notepad</h6>
              {/* <span>(+84.7%  <GoArrowUp /> )</span> */}
            </div>
          </div>
          </a>
        </div>
      </div>
    </>
  );
};

export default EmployeeViewDashboard;
