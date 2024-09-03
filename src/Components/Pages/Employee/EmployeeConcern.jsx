import { useEffect, useState, useRef } from "react";
import { FaListUl } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { DatePicker, Space, Spin } from "antd";
import messageIcon from "../../../assets/messageIcon.png";
import Delete from "../../../assets/Vectorss.png";
// import CallableDrawer from "./CallbackDrawer"
import { NavLink } from "react-router-dom";
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

// import "../Projects/Projects.css";
import { Button } from "antd";

import downArrow from "../../../assets/bxs_down-arrow.png";
import menuDots from "../../../assets/lucide_ellipsis.png";
import filter from "../../../assets/mdi_filter.png";
import menuList from "../../../assets/material-symbols_list.png";

const EmplyeeConcern = () => {
  const Admintoken = localStorage.getItem("token");
  const Profile = localStorage.getItem("admin");
  const NewProfile = JSON.parse(Profile);
  const user_id = NewProfile?._id;
  const user_name = NewProfile?.name;
  const aliceName = NewProfile?.aliceName;
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  console.log("Adminten", Admintoken)
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("Date");
  const [shiftType, setShiftType] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [date, setDate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [EmployeeNames, setEmployeeNames] = useState([]);
  const [SelectedEmployee, setSelectedEmployee] = useState([]);
  const [loader, setloader] = useState(true);

    //  console.log("toksen", Admintoken)

  const showDrawers = () => {
    setOpen(true);
  };

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

  const handleEmployeeChange = (event) => {
    setSelectedEmployee(event.target.value);
    console.log(event.target.value);
  };

  useEffect(()=>{
    if (Admintoken) {
      // Use the <Navigate /> component to redirect
    } else {
      return navigate("/login");
    }
  }), [Admintoken]
  useEffect(() => {
      getData();
  }, []);

  const getData = async () => {
    try{
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_API}/concern`,
        { headers: { token: Admintoken } }
      );
      setData(res.data);
      setFilteredData(res.data.reverse());
      const uniqueNames = [...new Set(res.data.map((item) => item.name))];
      setEmployeeNames(uniqueNames);
      setloader(false)
  
    }catch(err){
      console.log(err)
    }
  
  };
  console.log("concern", data);
  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };


  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleShiftChange = (event) => {
    setShiftType(event.target.value);
  };

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
    console.log("Filtering data with: ", {
      searchTerm,
      selectedDate,
      SelectedEmployee,
    });
  
    // Filter data based on search term and selected date
    const filtered = data.filter((item) => {
      const matchSearchTerm =
        item?.name?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
        item?.email?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
        item?.message?.toLowerCase().includes(searchTerm?.toLowerCase());
       
        const matchSelectedEmployee =
        !SelectedEmployee.length || SelectedEmployee.includes(item?.name); 
        
        // formating the table Date intothe selected Date using moment
        const itemDateFormatted = moment(item?.date, "MMMM Do YYYY, h:mm:ss a").format("YYYY-MM-DD");
        const matchSelectedDate = !selectedDate || itemDateFormatted === selectedDate;

      return matchSearchTerm && matchSelectedEmployee && matchSelectedDate;
    });

    setFilteredData(filtered);
  }, [searchTerm, data, selectedDate, SelectedEmployee]);

  async function handleStatus(id, event) {
    try {
      console.log(id, event.target.name);
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_API}/concern/${id}`,
        {
          status: event.target.name,
        },{
          headers:{
            token:Admintoken
          }
        }
      );
      getData();
      toast.success(data.message, {});
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
  <div className="employee-project-container container py-4">
        <div className="filterConcern d-flex gap-3 mx-1">
          <div className=" d-flex gap-3 mx-1">
            <div className="emp-select-month ">
              <select
                style={{
                  width: "124px",
                  height: "30px",
                  paddingRight: "12px",
                  overflow: "hidden",
                  // border:"1px solid black"
                }}
                onChange={handleEmployeeChange}
              >
                <option value="">Select Employee</option>
                {EmployeeNames?.map((res) => {
                  return (
                    <>
                      <option value={res}>{res}</option>
                    </>
                  );
                })}
              </select>
            </div>
            <div className="emp-select-date">
              <input
                onChange={(e) => setSelectedDate(e.target.value)}
                style={{
                  width: "130px",
                  height: "35px",
                  fontSize: "0.9rem",
                  paddingRight: "12px",
                  paddingBottom: "10px",
                  paddingTop: "8px",
                  paddingLeft: "15px",
                  background: "#FF560E",
                  borderRadius: "6px",
                  // color: "#fff",
                }}
                type="date"
              />

              {/* for search */}
              <input
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="search..."
                className="search searchInput shadow"
                style={{
                  marginLeft: "10px",
                  border: "none",
                  borderBottom: "1px solid coral",
                }}
              />
            </div>
          </div>

          <input
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="search..."
            className="search shadow mx-3"
            style={{
              marginLeft: "10px",
              border: "none",
              borderBottom: "1px solid coral",
              borderRadius: "10px",
              padding: "0 20px",
            }}
          />
        </div>

        <hr />
        <div className="">
          <div className="allproject d-flex gap-5 align-items-end ">
            <h6>Employee Concern</h6>
          </div>
        </div>
        <div class="tab-content table-cont " id="pills-tabContent">
          <div
            class="tab-pane fade show active table-responsive"
            id="pills-activeproject-home"
            role="tabpanel"
            aria-labelledby="pills-activeproject-home"
            tabindex="0"
          >
            <table class="table table-bordered mt-2">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Date</th>
                  <th scope="col">Message Type</th>
                  <th scope="col">Message</th>
                  <th scope="col">Current Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              {/* for email */}
              <Modal
                title={`Sent mail to ${selectedResult?.email}`}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                width={800}
                centered
              >
                <div
                  className="d-flex"
                  style={{
                    gap: "15px",
                    justifyContent: "space-between",
                  }}
                >
                  <button
                    className="btn btn-success"
                    onClick={() => {
                      handelSeoMail(
                        selectedResult?.name,
                        aliceName,
                        selectedResult?.email
                      );
                      handleCancel();
                      toast.success("Mail sent successfully!", {});
                    }}
                  >
                    Seo Proposal
                  </button>
                  <button
                    className="btn btn-success"
                    onClick={() => {
                      handelSMMail(
                        selectedResult?.name,
                        aliceName,
                        selectedResult?.email
                      );
                      handleCancel();
                      toast.success("Mail sent successfully!", {});
                    }}
                  >
                    Smo Proposal
                  </button>
                  <button
                    className="btn btn-success"
                    onClick={() => {
                      handelDMMail(
                        selectedResult?.name,
                        aliceName,
                        selectedResult?.email
                      );
                      handleCancel();
                      toast.success("Mail sent successfully!", {});
                    }}
                  >
                    Digital Marketing Proposal
                  </button>
                  <button
                    className="btn btn-success"
                    onClick={() => {
                      handelBWMail(
                        selectedResult?.name,
                        aliceName,
                        selectedResult?.email
                      );
                      handleCancel();
                      toast.success("Mail sent successfully!", {});
                    }}
                  >
                    Basic Website Proposal
                  </button>
                  <button
                    className="btn btn-success"
                    onClick={() => {
                      handelEcomMail(
                        selectedResult?.name,
                        aliceName,
                        selectedResult?.email
                      );
                      handleCancel();
                      toast.success("Mail sent successfully!", {});
                    }}
                  >
                    E-commerce Proposal
                  </button>
                </div>
              </Modal>
              {loader ?     <Spin tip="loading..." style={styles.spinner} /> :
              <tbody>
                {filteredData?.map((res, index) => {
                  return (
                    <>
                      <tr key={res?._id}>
                        <td>{res?.name}</td>
                        <td>{res?.email}</td>
                        <td>{res?.date}</td>
                        <td style={{color: res.punchType === "Punch Out" ? "blue": (res.punchType === ("Leave Application" || "Leave") ? "red" : "green") }}>{res?.punchType}</td>
                        <td> {res?.message}</td>
                        <td style={{color: res.status === "Approved" ? "green": (res.status === "Denied" &&"red")}}> {res?.status}</td>

                        <td class="d-flex gap-1">
                          <button
                            className="buttonFilled"
                            onClick={(e) => handleStatus(res?._id, e)}
                            name="Approved"
                          >
                            Approved
                          </button>
                          <button
                            className="buttondeny"
                            onClick={(e) => handleStatus(res?._id, e)}
                            name="Denied"
                          >
                            Deny
                          </button>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
}
            </table>
          </div>
          {/* <CallableDrawer open={open} onClose={handleSubmit} refreshData={refreshData} /> */}
        </div>
      </div>
    </>
  );
};

export default EmplyeeConcern;



const styles = {

  spinner: {
    display:"flex",
    alignSelf: "center",
    justifyContent: "center",
    margin: "4rem",
  },
}