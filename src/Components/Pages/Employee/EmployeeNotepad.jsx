import * as XLSX from "xlsx";
import { useEffect, useState, useRef } from "react";
import { FaListUl } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { Alert, DatePicker, Space } from "antd";
import messageIcon from "../../../assets/messageIcon.png";
import Delete from "../../../assets/Vectorss.png";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { Modal } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import handelSeoMail from "../../Mail/SeoMail";
import handelSMMail from "../../Mail/SmoMail";
import handelDMMail from "../../Mail/DmMail";
import handelBWMail from "../../Mail/BasicWebMail";
import handelEcomMail from "../../Mail/EcomMail";
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import moment from "moment";
import { Select } from "antd";
import CustomDrawer from "./CreateEmpDrawer";

// import "../style/Project.css"
const EmplyeeActivity = () => {

    const [selectedResult, setSelectedResult] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = (result) => {
        setSelectedResult(result);
        setIsModalOpen(true);
      };
      const handleOk = () => {
        setIsModalOpen(false);
      };
      const handleCancel = () => {
        setIsModalOpen(false);
      };

      const [note, setNote] = useState(true);
      const { id } = useParams();
      const [allnotes, setAllNotes] = useState([]);
      const [user, setUser] = useState(null);
    
      useEffect(() => {
        getNotes();
      }, []);
    
      async function getNotes() {
        try {
          const res = await axios.get(
            `${import.meta.env.VITE_BACKEND_API}/notepad/${id}`
          );
          setUser(res?.data?.name);
          setAllNotes(res?.data.notes.notes);
        } catch (error) {
          console.log(error);
        }
      }
      console.log("notes",  allnotes)
    
      const [showToast, setShowToast] = useState(true);
      useEffect(() => {
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
      }, []);
    
      setTimeout(() => {
        setNote(false);
      }, 2000);
    

      const showDrawer = () => {
        setOpen(true);
      };
    
      const onClose = () => {
        setOpen(false);
      };
    
      const handleSubmit = () => {
        // Handle form submit logic here
        onClose();
      };
  

  return (
    <>
      <div className="employee-project-container container my-4">
        <div  className="d-flex justify-content-between">
      
        
        </div>
        
        <div className=" mb-4">
          <div className="allproject">
            <h5 style={{color:"coral"}}>Employee Activity</h5>
          </div>
        
        </div>
        <div className="emp-notes-container">
        <div className="notes-title">
          <h6>{user} Notes</h6>
          <div className="notesBtn">
            {showToast ? (
              <Alert
                style={{ width: "200px" }}
                message="Press CTRL + F to search"
                type="warning"
                closable
              />
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="emp-notepad ">
          <textarea
          disabled
          placeholder={allnotes}
            type="text"
            rows={20}
            style={{
              width: "95%",
              height: "70vh",
              outline: "none",
              // border: "none",
              border: "1px solid #e1dcdc",
              resize: "none",
              overflowY: "auto",
              padding: "10px",
              borderRadius: "5px",
              backgroundColor: "#e3d4a740",
            }}
          />
        </div>
      </div>
      </div>
    </>
  );
};

export default EmplyeeActivity;
