import * as XLSX from "xlsx";
import { useEffect, useState, useRef } from "react";
import { FaListUl } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { DatePicker, Space } from "antd";
import messageIcon from "../../../assets/messageIcon.png";
import Delete from "../../../assets/Vectorss.png";
// import CallableDrawer from "./CallbackDrawer"
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
import { PiDownloadSimpleBold } from "react-icons/pi";

// import "../style/Project.css"
const EmployeeTransfer = () => {

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



      const { id } = useParams();
      console.log(id);
    
      const navigate = useNavigate();
      const [open, setOpen] = useState(false);
    
      const [data, setData] = useState([]);
      const [data1, setData1] = useState([]);
      const [searchTerm, setSearchTerm] = useState("");
      const [sortBy, setSortBy] = useState("Date");
      const [selectedMonth, setSelectedMonth] = useState("");
      const [date, setDate] = useState("");
      const [searchResults, setSearchResults] = useState([]);
      const [data2, setData2] = useState([]);
      const [data3, setData3] = useState([]);
      //
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
    
      const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
      };
      const handleSearch = (e) => {
        setSearchTerm(e.target.value);
      };
      const Getdata = async () => {
        
        const ress = await axios.get(
          `${import.meta.env.VITE_BACKEND_API}/transfer-user/${id}`
        );
       
        setData1(ress.data.transfer);
        filterAndSortResults(searchTerm, sortBy, ress.data.transfer);
     
      };
    
      console.log(data3);
      const handleDel = async (id) => {
        try {
          await axios.delete(`/advisor/${id}`);
          Getdata();
        } catch (error) {
          console.log(error);
        }
      };
    
      useEffect(() => {
        Getdata();
      }, [searchTerm, sortBy]);
      const handleChange = (event) => {
        setSearchTerm(event.target.value);
      };
    
      const handleSortChange = (event) => {
        setSortBy(event.target.value);
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
      console.log("searchResults", searchResults)
      const downloadExcel = () => {
        console.log("hello");
        if (data1.length === 0) {
          console.error("No data to download");
          return;
        }
        const worksheet = XLSX.utils.json_to_sheet(data1);
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
        link.setAttribute("download", "Transfer.xlsx");
        document.body.appendChild(link);
        // Trigger the download
        link.click();
        // Cleanup
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      };
      const filteredData = searchResults?.reverse().filter((entry) => {
        const dateMatches =
          date !== ""
            ? entry.createdDate === moment(date).format("MMM Do YY")
            : true;
        const monthMatches =
          selectedMonth !== "" ? entry.createdDate.includes(selectedMonth) : true;
    
        const searchMatches =
          searchTerm !== ""
            ? Object.values(entry).some((value) =>
                value.toString().toLowerCase().includes(searchTerm.toLowerCase())
              )
            : true;
        return dateMatches && monthMatches && searchMatches;
      });
    

  return (
    <>
      <div className="employee-project-container container my-4">
      <CustomDrawer open={open} onClose={onClose} onSubmit={handleSubmit} />
        <div  className="d-flex justify-content-between">
        <div className="d-flex align-items-end gap-3 mt-5">
        <div className="d-flex  align-items-end justify-content-end">
           
           <button className="empbuttonDowload px-2" onClick={downloadExcel}
            style={{fontSize:"13px"}} 
            >
           <PiDownloadSimpleBold style={{ marginRight: "5px" }} /> Employee Transfer Data
           </button>
         </div>
        <div className="emp-select-month col">
              <select className=""
                style={{
                  width: "124px",
                  height: "30px",
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
            <div  className="">
              <input
              style={{border:"none", borderBottom: "1px solid coral", borderRadius:"10px"}}
                className=" px-3"
                type="text"
                placeholder="search"
                value={searchTerm}
                onChange={handleChange}
              />
            </div>
          </div>
      
        </div>
        <hr />
        <div className="px-3 my-2">
          <div className="allproject">
            <h6>Employee Transfer Activity</h6>
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
                    <th scope="col">Transfer To</th>

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
                        <td>{res.transferTo}</td>
                        <td>{res.comments}</td>
                        <td>{res.buget}</td>
                        <td>{res.createdDate}</td>
                        <td>
                          <button
                            className="buttonFilled"
                            onClick={() => navigate(`/transferview/${res._id}`)}
                          >
                            View
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

export default EmployeeTransfer;
