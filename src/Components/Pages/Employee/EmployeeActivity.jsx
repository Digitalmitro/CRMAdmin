import * as XLSX from "xlsx";
import { useEffect, useState, useRef } from "react";
import { FaListUl } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { DatePicker, Space } from "antd";
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
import CustomDrawer from "./CreateEmpDrawer";
import { PiDownloadSimpleBold } from "react-icons/pi";

const EmplyeeActivity = () => {

  const token = Cookies.get("token");
  const Profile = localStorage.getItem("admin");
  const NewProfile = JSON.parse(Profile);
  const user_id = NewProfile?._id;
  const user_name = NewProfile?.name;
  const aliceName = NewProfile?.aliceName;

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("Date");
  const [shiftType, setShiftType] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [date, setDate] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);

  useEffect(() => {
    if (token) {
      // Fetch initial data
      Getdata();
    } else {
      navigate("/Login");
    }
  }, [token]);

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

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const handleSubmit = () => {
    onClose();
  };

  // Function to handle the change in the select input
  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  console.log("USER_ID", user_id);

  const [night, setNight] = useState([]);
  const getNight = async () => {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_API}/alluser`);

   
  };


  const [userData, setUserData] = useState({});

  useEffect(() => {
   const timeoutRef =  setTimeout(() => {
    Getdata();
    },500)

    // getNight();
  return ()=> {
    clearTimeout(timeoutRef)
  }
  }, [searchTerm, sortBy, token]);

  const refreshData = () => {
  };

  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);

  // Modal

  const Getdata = async () => {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_API}/alluser`);
    setData(res.data.reverse());
    filterAndSortResults(searchTerm, sortBy, shiftType, res.data);
    const filteredData = res.data.filter((e) => e.type === "Night");
    setNight(filteredData);
  };
  console.log(data);

const handleDel = (id) => {
  Modal.confirm({
    title: "Confirm Deletion",
    content: "Are you sure you want to delete this user?",
    okText: "Yes",
    cancelText: "No",
    onOk: async () => {
      try {
        await axios.delete(`${import.meta.env.VITE_BACKEND_API}/alluser/${id}`);
        Getdata();
      } catch (error) {
        console.log(error);
      }
    },
    onCancel: () => {
      console.log("Deletion cancelled");
    },
  });
};


  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleShiftChange = (event) => {
    setShiftType(event.target.value);
  };

  const filterAndSortResults = (searchTerm, sortBy, shiftType, data) => {
    let filteredResults = data.filter((item) => {
      const matchesSearchTerm = Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesShiftType =
        shiftType === "" || item.type.toLowerCase() === shiftType.toLowerCase();
      return matchesSearchTerm && matchesShiftType;
    });

    if (sortBy === "Date") {
      filteredResults.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortBy === "Name") {
      filteredResults.sort((a, b) => a.name.localeCompare(b.name));
    }

    setSearchResults(filteredResults);
  };


  const downloadExcel = () => {
    if (data.length === 0) {
      console.error("No data to download");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const arrayBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const excelBlob = new Blob([arrayBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    // Create a download link
    const url = URL.createObjectURL(excelBlob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Employee.xlsx");
    document.body.appendChild(link);
    // Trigger the download
    link.click();
    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="employee-project-container container my-4">
      <CustomDrawer open={open} onClose={onClose} onSubmit={handleSubmit} />
        <div  className=" filterPanel d-flex justify-content-between">
        <div className="d-flex align-items-end gap-3 ">
            <div className="inputborder">
              <select
                className="emp-select-month "
                value={shiftType}
                onChange={handleShiftChange}
              >
                <option value="">Shift</option>
                <option value="day">Day</option>
                <option value="night">Night</option>
              </select>
            </div>
            <div className="inputborder">
              <select
                className="emp-select-month "
                name="sortBy"
                id="sortBy"
               
                value={sortBy}
                onChange={handleSortChange}
              >
                <option value="Date">Date</option>
                <option value="Name">Name</option>
              </select>

            </div>
         
          </div>
          <input
              style={{border:"none", borderBottom: "1px solid coral", borderRadius:"10px",  width:"30%"}}
                className=" px-3"
                type="text"
                placeholder="search"
                value={searchTerm}
                onChange={handleChange}
              />
          <div className=" empData d-flex  align-items-end justify-content-end">
           
            <button className="empbuttonDowload px-2" onClick={downloadExcel}>
            <PiDownloadSimpleBold
            style={{marginRight:"5px"}}/>
            Employee Data
            </button>
            <div className="emp-holidays-btn d-flex col justify-content-end">
            <button className=" createEmp emp-select-month mx-2"
             style={{
              width:"180px",
            }}
             onClick={showDrawer}
             >
              Create Employee
            </button>
            </div>
           
          </div>


        </div>
        <hr />
        <div className="project-title my-2">
          <div className="allproject col">
            <h6>Employee Activity</h6>
          </div>
          <div  className="col">
              
            </div>
          <div
            className="list-of-days"
            style={{
              display: "flex",
              width: "50%",
              justifyContent: "flex-end",
            }}
          >
           
          
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
                  <th scope="col">Alice Name</th>
                  <th scope="col">Type</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">CallBack</th>
                  <th scope="col">transfer</th>
                  <th scope="col">Sale</th>
                  <th scope="col">Message</th>
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
              <tbody>
                {searchResults?.map((res, index) => {
                  return (
                    <>
                      <tr key={res._id}>
                        <td>{res?.name}</td>
                        <td>{res?.aliceName}</td>
                        <td>{res?.type}</td>
                        <td>{res?.email}</td>
                        <td>{res?.phone}</td>
                        <td>{res.callback?.length}</td>
                        <td>{res.transfer?.length}</td>
                        <td>{res.sale?.length}</td>
                        <td> {res.message}</td>
                      

                        <td>
                      
                          <button
                            className="buttonFilled"
                            onClick={() => navigate(`/employeeview/${res._id}`)}
                          >
                            View
                          </button>
                          <button
                            className="btn btn-dark ms-2"
                            onClick={() =>
                              navigate(`/updateemployee/${res._id}`)
                            }
                          >
                            <svg
                              viewBox="0 0 24 24"
                              width="16"
                              height="16"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="#ffffff"
                            >
                              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                              <g
                                id="SVGRepo_tracerCarrier"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></g>
                              <g id="SVGRepo_iconCarrier">
                                <title></title>
                                <g id="Complete">
                                  <g id="edit">
                                    <g>
                                      <path
                                        d="M20,16v4a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V6A2,2,0,0,1,4,4H8"
                                        fill="none"
                                        stroke="#ffffff"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                      ></path>
                                      <polygon
                                        fill="none"
                                        points="12.5 15.8 22 6.2 17.8 2 8.3 11.5 8 16 12.5 15.8"
                                        stroke="#ffffff"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                      ></polygon>
                                    </g>
                                  </g>
                                </g>
                              </g>
                            </svg>
                          </button>
                          <button
                            className="btn btn-danger ms-2"
                            onClick={() => handleDel(res._id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-trash"
                              viewBox="0 0 16 16"
                            >
                              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmplyeeActivity;
