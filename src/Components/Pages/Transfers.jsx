import { useEffect, useState, useRef } from "react";
import { FaListUl } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { DatePicker, Space } from "antd";
// import messageIcon from "../../../assets/messageIcon.png";
// import Delete from "../../../assets/Vectorss.png";
// import CallableDrawer from "./CallbackDrawer"
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { Modal } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import handelSeoMail from "../Mail/SeoMail";
import handelSMMail from "../Mail/SmoMail";
import handelDMMail from "../Mail/DmMail";
import handelBWMail from "../Mail/BasicWebMail";
import handelEcomMail from "../Mail/EcomMail";
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import moment from "moment";
import { Select } from "antd";

// import "../Projects/Projects.css";
import { Button } from "antd";

import downArrow from "../../assets/bxs_down-arrow.png";
import menuDots from "../../assets/lucide_ellipsis.png";
import filter from "../../assets/mdi_filter.png";
import menuList from "../../assets/material-symbols_list.png";
import { PiDownloadSimpleBold } from "react-icons/pi";

const Transfers = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  console.log(id);

  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState("Date");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedResult, setSelectedResult] = useState(null);
  const [night, setNight] = useState([]);

  const [date, setDate] = useState("");

  // Ant Design Drawer
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
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };
  const handleEmployeeChange = (event) => {
    setSelectedEmployee(event.target.value);
    console.log(event.target.value);
  };
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };


  const Getdata = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_API}/alltransfer`
    );
    const filteredData = res.data.filter((e) => e.type === "Night");
    setNight(filteredData);
    console.log("transfer data data", res.data);
    setData(res.data);
    filterAndSortResults(searchTerm, sortBy, res.data);
  };



  const filterAndSortResults = (searchTerm, sortBy, data) => {
    let filteredResults = data.filter((item) =>
      Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

    if (sortBy === "Date") {
      filteredResults.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortBy === "Name") {
      filteredResults.sort((a, b) => a.name.localeCompare(b.name));
    }

    setSearchResults(filteredResults);
  };
  const downloadExcel = () => {
    if (filteredData?.length === 0) {
      console.error("No data to download");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Convert workbook to array buffer
    const arrayBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    // Convert array buffer to Blob
    const excelBlob = new Blob([arrayBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    // Create a download link
    const url = URL.createObjectURL(excelBlob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "callBack.xlsx");
    document.body.appendChild(link);

    // Trigger the download
    link.click();

    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Filter the data based on the selected month and date
  const filteredData = data?.filter((entry) => {
    const dateMatches =
      date !== ""
        ? entry.createdDate === moment(date).format("MMM Do YY")
        : true;
    const monthMatches =
      selectedMonth !== "" ? entry.createdDate.includes(selectedMonth) : true;
    const employeeMatches =
      selectedEmployee !== "" ? entry.user_id === selectedEmployee : true;
    const searchMatches =
      searchTerm !== ""
        ? Object.values(entry).some((value) =>
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
          )
        : true;
    return dateMatches && monthMatches && employeeMatches && searchMatches;
  });
  console.log(filteredData);

  useEffect(() => {
    const timeoutRef = setTimeout(() => {
      Getdata();

    }, 500)
    return () => {
      clearTimeout(timeoutRef)
    }
  }, [searchTerm, sortBy]);

  return (
    <>
      <div className="employee-project-container container py-4">
      <div  className=" filterPanel d-flex justify-content-between align-items-end">
          <div className="emp-select-months-year">
          <select
              className=" emp-select-month "
              style={{
                width:"180px",
                fontSize:"0.8rem",
                height:"35px",
              }}
              onChange={handleEmployeeChange}
            >
              <option value="">Select Employee</option>
              {night.map((res) => {
                return (
                  <>
                    <option value={res._id}>{res.name}</option>
                  </>
                );
              })}
          </select>
            <div className="emp-select-month">
              <select
                style={{
                  width: "124px",
                  height: "30px",
              
                  paddingRight: "12px",
                  overflow: "hidden",
                }}
                onChange={handleMonthChange}
              >
                <option value="">Select Month</option>
                <option value="Jan">Jan</option>
                <option value="Feb">Feb</option>
                <option value="Mar">Mar</option>
                <option value="Apr">Apr</option>
                <option value="May">May</option>
                <option value="Jun">Jun</option>
                <option value="Jul">July</option>
                <option value="Aug">Aug</option>
                <option value="Sep">Sep</option>
                <option value="Oct">Oct</option>
                <option value="Nov">Nov</option>
                <option value="Dec">Dec</option>
              </select>
            </div>
            <div className="emp-select-date">
              <input
                onChange={(e) => setDate(e.target.value)}
                style={{
                  width: "130px",
                  height: "35px",
                  fontSize: "0.8rem",
                  paddingRight: "12px",
                  paddingBottom: "10px",
                  paddingTop: "8px",
                  paddingLeft: "15px",
                  borderRadius: "6px",
                }}
                type="date"
              />

              {/* for search */}
             
            </div>
            
          </div>
          <input
                value={searchTerm}
                onChange={handleSearch}
                placeholder="search..."
                className="search shadow  px-2"
                style={{
                  // marginLeft: "10px",
                  
                  border: "none",
                  borderBottom: "1px solid coral",
                  borderRadius: "10px",
                }}
              />
          <div className="d-flex align-items-end justify-content-end">
          {/* <div className=""> */}
          <button className="empbuttonDowload mx-2" onClick={downloadExcel}
          style={{fontSize:"0.8rem",}}>
            <PiDownloadSimpleBold
            style={{marginRight:"5px", }}/> Transfer Data
            </button>
          {/* </div> */}
            
          </div>

        </div>
        <hr />
        <div className="project-title my-2">
          <div className="allproject col">
            <h6>Transfers</h6>
          </div>
       
       <div className=" col d-flex justify-content-end ">
      
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
                <th scope="col">Created By </th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Call Date</th>
                    <th scope="col">Domain Name</th>
                    <th scope="col">Country</th>
                    <th scope="col">Address</th>

                    <th scope="col">Comments</th>
                    <th scope="col">Budget</th>
                    <th scope="col">Created Date</th>

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
                {filteredData?.map((res, index) => {
                  return (
                    <>
                      <tr key={res._id}>
                      <td>{res.employeeName}</td>
                        <td>{res.name}</td>
                        <td>{res.email}</td>
                        <td>{res.phone}</td>
                        <td>{res.calldate}</td>
                        <td>{res.domainName}</td>
                        <td>{res.country}</td>
                        <td>{res.address}</td>
                        <td>{res.comments}</td>
                        <td>{res.buget}</td>
                        <td>{res.createdDate}</td>
                        
                        <td> <button
                            className="buttonFilled"
                            style={{ fontSize: "0.8rem" }}
                            onClick={() =>
                              navigate(`/transferview/${res._id}`)
                            }
                          >
                            View
                          </button></td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
          {/* <CallableDrawer open={open} onClose={handleSubmit} refreshData={refreshData} /> */}
        </div>
      </div>
    </>
  );
};

export default Transfers;
