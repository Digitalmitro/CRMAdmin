
import React, { useState, useEffect } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import img2 from "../../../assets/Vector.png";
import im3 from "../../../assets/Vector3.png"
import userIcon from "../../../assets/usericon.png";
import img4 from "../../../assets/Vector4.png";
import img5 from "../../../assets/Vector5.png";
import img6 from "../../../assets/Vector6.png";
import img7 from "../../../assets/helpicon.png";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Cookies from 'js-cookie'
import moment from 'moment'
import { Modal } from 'antd'
import { useNavigate, useParams } from "react-router-dom";
import { DatePicker, Space } from 'antd';
import axios from "axios"
import { BsThreeDots } from "react-icons/bs";
import { FaFilter, FaListUl } from "react-icons/fa";

const EmployeeAttendance = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [date, setDate] = useState("");
  const [data3, setData3] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);


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



  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const Getdata = async () => {
    const ressss = await axios.get(
      `${import.meta.env.VITE_BACKEND_API}/attendance/${id}`
    );
    setData3(ressss.data.attendance.reverse());
  };
  console.log("data3", data3)


  const groupedData = Object.values(
    data3.reduce((acc, curr) => {
      // Group entries by currentDate
      const currentDate = curr.currentDate;
      // console.log("Current:", curr);
      if (!acc[currentDate]) {
        acc[currentDate] = {
          currentDate,
          userName: "",
          userEmail: "",
          punchin: "",
          punchOut: "",
          time: "",
          status: "",
          ip: "",
        };
      }

      // Merge punchin, punchOut, status, and ip
      if (curr.userName) {
        acc[currentDate].userName = curr.userName;
      }
      if (curr.userEmail) {
        acc[currentDate].userEmail = curr.userEmail;
      }
      if (curr.punchin) {
        acc[currentDate].punchin = curr.punchin;
      }
      if (curr.punchOut) {
        acc[currentDate].punchOut = curr.punchOut;
      }
      if (curr.time) {
        acc[currentDate].time = curr.time;
      }
      if (curr.status) {
        acc[currentDate].status = curr.status;
      }
      if (curr.ip) {
        acc[currentDate].ip = curr.ip;
      }

      return acc;
    }, {})
  );
  
  console.log(groupedData);
  // Add missing weekend days between the data
  const weekendEntries = [];
  const weekdayEntries = [];

  // Iterate over groupedData to add missing entries
  groupedData.forEach((entry, index) => {
    if (index > 0) {
      const currentDate = moment(entry.currentDate, "MMM Do YY");
      const prevDate = moment(groupedData[index - 1].currentDate, "MMM Do YY");
      const diffDays = currentDate.diff(prevDate, "days");
      for (let i = 1; i < diffDays; i++) {
        const missingDate = prevDate.clone().add(i, "days");
        if (missingDate.day() === 6 || missingDate.day() === 0) {
          // If the missing date is Saturday or Sunday, add an entry with "Week Off" status
          weekendEntries.push({
            userName: entry.userName,
            userEmail: entry.userEmail,
            currentDate: missingDate.format("MMM Do YY"),
            punchin: "",
            punchOut: "",
            time: "",
            status: "Week Off",
            ip: "",
          });
        } else {
          // If the missing date is a weekday, add an entry with "Absent" status
          weekdayEntries.push({
            userName: "",
            userEmail: "",
            currentDate: missingDate.format("MMM Do YY"),
            punchin: "",
            punchOut: "",
            time: "",
            status: "Absent",
            ip: "",
          });
        }
      }
    }
  });

  // Merge the original data with the added weekend and weekday entries
  const finalData = [...groupedData, ...weekendEntries, ...weekdayEntries];

  // Sort the data by currentDate
  finalData.sort(
    (a, b) =>
      moment(a.currentDate, "MMM Do YY").valueOf() -
      moment(b.currentDate, "MMM Do YY").valueOf()
  );

  console.log(finalData);
  // State to store the selected month
  const [selectedMonth, setSelectedMonth] = useState("");

  // Function to handle the change in the select input
  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  // Filter the data based on the selected month and date
  const filteredData = finalData.reverse().filter((entry) => {
    // Check if the entry's currentDate includes the selected month
    if (!entry.currentDate.includes(selectedMonth)) {
      return false;
    }

    // Check if the entry's currentDate matches the selected date
    const formattedDate = moment(date).format("MMM Do YY");
    // console.log(formattedDate);
    if (date && entry.currentDate === formattedDate) {
      return true;
    }

    return !date;
  });

  console.log("filter", filteredData);

  useEffect(() => {
    Getdata();
  }, []);
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
    link.setAttribute("download", "attendance.xlsx");
    document.body.appendChild(link);

    // Trigger the download
    link.click();

    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const totalLate = filteredData?.filter((e) => e.status === "LATE").length;
  const totalAbs = filteredData?.filter((e) => e.status === "Absent").length;

  // Calculate half day count
  const halfDayCount = filteredData?.filter((entry) => {
    if (entry.status === "Week Off" || entry.status === "Absent") {
      return false;
    }

    const punchInTime = moment(entry.punchin, "h:mm:ss A");
    const punchOutTime = moment(entry.punchOut, "h:mm:ss A");

    const duration = moment.duration(punchOutTime.diff(punchInTime)).asHours();
    return duration < 7 && duration > 0;
  }).length;


  return <>
    {/* modal */}
    <Modal
      title="Drop a message"
      centered
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <div className="container">
        <div className="row">
          <div className="col">
            <h6>Select Date</h6>
            <Space direction="vertical" style={{  outline: "none", border: "1px solid #f24e1e" }}>
              <DatePicker onChange={(e) => setMessage(e.target.value)} />

            </Space>
          </div>
          <div className="col">
            <h6>write concern</h6>

            <textarea onChange={(e) => setMessage(e.target.value)} />
          </div>
        </div>
      </div>
    </Modal>


    <div className="attendance-container">
    
    <div className="employee-project-container container py-4">
       <div className="d-flex justify-content-between">
       <div className="emp-select-months-year">
          <div className="emp-select-month">
            <select
              style={{
                width: "124px",
                height: "30px",
                background: "#FF560E",
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
                fontSize: "0.9rem",
                paddingRight: "12px",
                paddingBottom: "10px",
                paddingTop: "8px",
                paddingLeft: "15px",
                background: "#FF560E",
                borderRadius: "6px",
              }}
              type="date"
            />

            {/* for search */}
            <input
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="search..."
              className="search shadow"
              style={{
                marginLeft: "10px",
                border: "none",
                borderBottom: "1px solid coral",
              }}
            />
          </div>
         
        </div>
        <div>
        <div className="d-flex" style={{ gap: "5px" }}>
        <button className="buttonFilled" onClick={downloadExcel}>
            <i class="fa-solid fa-download"></i> Attendance Data
          </button>
            <button
              className=" buttonFilled text-white fw-bolder"
              // style={{ height: "45px" }}
            >
              No. of Late: {totalLate}
            </button>

            <button
              className=" buttondeny text-white fw-bolder"
              // style={{ height: "45px" }}
            >
              Absent: {totalAbs}
            </button>
            <button
              className=" buttonView text-white fw-bolder half day"
              // style={{ height: "45px" }}
            >
              Half Day: {halfDayCount}
            </button>

          </div>
        <div className="d-flex justify-content-end">
          
        </div>
        </div>
       </div>

        <hr />
        <div className="project-title my-2">
          <div className="allproject">
            <h6>Employee Attendance</h6>
          </div>
          <div
            className="list-of-days"
            style={{
              display: "flex",
              width: "50%",
              justifyContent: "flex-end",
            }}
          >
            <div>
              <span style={{ marginRight: "10px", color: "#FF560E" }}>
                <FaListUl style={{ marginRight: "10px", color: "#FF560E" }} />
                List{" "}
              </span>
            </div>
          
            <div className="sort mt-2">
              <span>
                <FaFilter style={{ color: "FF560E", fontSize: "0.8rem" }} />{" "}
              </span>
              <span>
                <BsThreeDots style={{ color: "FF560E", fontSize: "0.8rem" }} />{" "}
              </span>
            </div>
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
                    <th scope="col">Punch in</th>
                    <th scope="col">Punch Out</th>

                    <th scope="col">Production</th>
                    <th scope="col">Status</th>
                    <th scope="col">IP Address </th>
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
                      <td>{res.userName}</td>
                        <td>{res.userEmail}</td>
                        <td>{res.currentDate}</td>
                        <td>{res.punchin}</td>
                        <td>{res.punchOut}</td>
                        <td>{res.time}</td>
                        <td
                          style={{
                            color:
                              res.status === "LATE"
                                ? "goldenrod"
                                : res.status === "Week Off"
                                ? "blue"
                                : res.status === "Absent"
                                ? "red"
                                : "green",
                          }}
                        >
                          {res.status}
                        </td>
                        <td>{res.ip}</td>
                        
                       
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        
        </div>
      </div>

      
    </div>
  </>;
};

export default EmployeeAttendance;




















