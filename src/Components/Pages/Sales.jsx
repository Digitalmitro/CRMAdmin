import * as XLSX from "xlsx";
import { useEffect, useState, useRef } from "react";
import { FaListUl } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { DatePicker, Space } from "antd";
import messageIcon from "../../assets/messageIcon.png";
import Delete from "../../assets/Vectorss.png";
// import CallableDrawer from "./CallbackDrawer"
import { NavLink } from "react-router-dom";
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
import { PiDownloadSimpleBold } from "react-icons/pi";

// import "../style/Project.css"
const Sales = () => {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("Date");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [date, setDate] = useState("");
  const [selectedResult, setSelectedResult] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(()=>{
    const timeoutRef = setTimeout(() => {
      Getdata();

    }, 500)
    return () => {
      clearTimeout(timeoutRef)
    }
  },[searchTerm, sortBy])
  // ant desgin Drawer
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

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
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
  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };
  const [night, setNight] = useState([]);

  const getNight = async () => {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_API}/alluser`);
    // const res = await axios.get(`${import.meta.env.VITE_BACKEND_API}/attendance`)
    // const filteredData = res.data.map((e) =>e.name);
    setNight(res.data);
  };
  const Getdata = async () => {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_API}/allsale`);
    // const ress = await axios.get(`${import.meta.env.VITE_BACKEND_API}/transfer-user/${id}`);
    // const resss = await axios.get(`${import.meta.env.VITE_BACKEND_API}/sale-user/${id}`);
    // const ressss = await axios.get(`${import.meta.env.VITE_BACKEND_API}/attendance/${id}`);
    
    console.log("data", res.data);
    setData(res.data.reverse());
    filterAndSortResults(searchTerm, sortBy, res.data);
    
    
    // setData1(ress.data.transfer);
    // setData2(resss.data.sale);
    // setData3(ressss.data.attendance);
  };

useEffect(()=> {
  getNight()
},[])
console.log("night", night)
  // const filterAndSortResults = (searchTerm, sortBy, data) => {
  
  //   if (sortBy === "Date") {
  //     filteredResults.sort((a, b) => new Date(a.date) - new Date(b.date));
  //   } else if (sortBy === "Name") {
  //     filteredResults.sort((a, b) => a.name.localeCompare(b.name));
  //   }

  //   setSearchResults(filteredResults);
  // };

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
    link.setAttribute("download", "Sales.xlsx");
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


  const filterAndSortData = () => {
    // Filter by search term
    let filteredResults = data?.filter((item) => {
      // Match search term
      const searchMatches =
        !searchTerm ||
        Object.values(item)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
  
      // Match employee
      const employeeMatches =
        !selectedEmployee || item.user_id === selectedEmployee;
  
      // Match date
      const dateMatches =
        !date || moment(item.createdDate).format("YYYY-MM-DD") === moment(date).format("YYYY-MM-DD");
  
      // Match month
      const monthMatches =
        !selectedMonth ||
        moment(item.createdDate, "MMMM Do YYYY, h:mm:ss a").format("MMM") === selectedMonth;
  
      return searchMatches && employeeMatches && dateMatches && monthMatches;
    });
  
    // Sort results
    if (sortBy === "Date") {
      filteredResults.sort(
        (a, b) => new Date(a.createdDate) - new Date(b.createdDate)
      );
    } else if (sortBy === "Name") {
      filteredResults.sort((a, b) => a.name.localeCompare(b.name));
    }
  
    setSearchResults(filteredResults);
  };
  
  useEffect(() => {
    filterAndSortData();
  }, [searchTerm, sortBy, selectedEmployee, selectedMonth, date, data]);
  

  console.log(filteredData);

  return (
    <>
      <div className="employee-project-container container my-4">
        <div className=" filterPanel d-flex justify-content-between align-items-end">
          <div className="emp-select-months-year align-items-end">
          
            <select
              className=" emp-select-month "
              style={{
                width: "180px",
              fontSize: "0.8rem",

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
            <select
              className="emp-select-month"
              name="sortBy"
              id="sortBy"
              value={sortBy}
              style={{ fontSize: "0.8rem",}}
              onChange={handleSortChange}
            >
              <option value="">SortBy</option>
              <option value="Date">Date</option>
              <option value="Name">Name</option>
            </select>
           
          </div>
         
          <div className="d-flex  align-items-end justify-content-end mx-2 gap-3">
          <input
              style={{
                border: "none",
                borderBottom: "1px solid coral",
                borderRadius: "10px",
              }}
              className=" px-3"
              type="text"
              placeholder="search"
              value={searchTerm}
              onChange={handleChange}
            />
            <button className="empbuttonDowload px-3" onClick={downloadExcel}    style={{ fontSize: "0.8rem",}}>
              <PiDownloadSimpleBold style={{ marginRight: "5px",
              

               }} /> Sales Data
            </button>
          </div>
        </div>
        <hr />
        <div className="project-title row my-2 ">
          <div className="allproject col">
            <h6>Sales Activity</h6>
          </div>

          <div className=" cool d-flex col justify-content-end  ">
          
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
                {searchResults?.map((res, index) => {
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
                        <td>
                          {" "}
                          <button
                            className="buttonFilled"
                            style={{ fontSize: "0.8rem" }}
                            onClick={() => navigate(`/salesview/${res._id}`)}
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
          {/* <CallableDrawer open={open} onClose={handleSubmit} refreshData={refreshData} /> */}
        </div>
      </div>
    </>
  );
};

export default Sales;
