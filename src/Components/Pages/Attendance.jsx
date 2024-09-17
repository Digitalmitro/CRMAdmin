import React, { useState, useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import * as XLSX from "xlsx";
import moment from "moment";
import { Modal } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { DatePicker, Space, Spin } from "antd";
import axios from "axios";
// import "./Projects/Projects.css";
import downArrow from "../../assets/bxs_down-arrow.png";
import menuDots from "../../assets/lucide_ellipsis.png";
import filter from "../../assets/mdi_filter.png";
import menuList from "../../assets/material-symbols_list.png";
import { FaFilter, FaListUl } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { PiDownloadSimpleBold } from "react-icons/pi";

const Attendance = () => {
  const [date, setDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [attendanceList, setAttendanceList] = useState([]);
  const [absentCount, setAbsentCount] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [completeEndLate, setCompleteEndLate] = useState(0);
  const [completeEndHalfDay, setCompleteEndHalfDay] = useState(0);

  const adminToken = localStorage.getItem("token");

  async function getEmpAttendanceData() {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/admin/todays-attendance`,
        { headers: { token: adminToken } }
      );
      setAttendanceList(res?.data?.data?.reverse());
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getEmpAttendanceData();
  }, [selectedMonth, date]);

  const formatTime = (date) => {
    const dateIst = new Date(date);
    dateIst.setHours(dateIst.getHours());
    dateIst.setMinutes(dateIst.getMinutes());
    return new Intl.DateTimeFormat("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }).format(dateIst);
  };

  const formatTotalWorkingTime = (time) => {
    const totalWorkingTimeMinutes = time;
    const hours = Math.floor(totalWorkingTimeMinutes / 60);
    const minutes = Math.round(totalWorkingTimeMinutes % 60);
    return `${hours < 10 ? "0" + hours : hours}h ${
      minutes < 10 ? "0" + minutes : minutes
    }m`;
  };

  const filteredAttendanceList = attendanceList.filter((entry) => {
    const entryDate = moment(entry.currentDate).format("YYYY-MM-DD");
    const entryMonth = moment(entry.currentDate).month() + 1;

    if (selectedMonth && date) {
      return (
        entryMonth === selectedMonth &&
        entryDate === moment(date).format("YYYY-MM-DD")
      );
    }
    if (selectedMonth) {
      return entryMonth === selectedMonth;
    }
    if (date) {
      return entryDate === moment(date).format("YYYY-MM-DD");
    }
    return true;
  });

  const isWeekday = (date) => {
    const day = moment(date).day();
    return day >= 1 && day <= 5;
  };

  useEffect(() => {
    const calculateAbsences = () => {
      const absentDates = new Set();
      const today = moment().startOf("day");

      const selectedStart = moment()
        .set("month", selectedMonth - 1)
        .startOf("month");
      const selectedEnd = moment.min(
        today,
        selectedStart.clone().endOf("month")
      );

      for (
        let m = selectedStart;
        m.isSameOrBefore(selectedEnd, "day");
        m.add(1, "day")
      ) {
        if (isWeekday(m)) {
          const formattedDate = m.format("YYYY-MM-DD");
          const isAbsent = !attendanceList.some(
            (entry) =>
              moment(entry.currentDate).format("YYYY-MM-DD") === formattedDate
          );

          if (isAbsent) {
            absentDates.add(formattedDate);
          }
        }
      }

      setAbsentCount(absentDates.size);
    };

    calculateAbsences();
  }, [attendanceList, selectedMonth]);

  useEffect(() => {
    const calculateTotals = () => {
      let totalLate = 0;
      let totalHalfDay = 0;

      filteredAttendanceList.forEach((entry) => {
        if (entry.status === "Late") {
          totalLate += 1;
        }
        if (entry.workStatus === "Half Day") {
          totalHalfDay += 1;
        }
      });

      setCompleteEndLate(totalLate);
      setCompleteEndHalfDay(totalHalfDay);
    };

    calculateTotals();
  }, [filteredAttendanceList]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleMonthChange = (event) => {
    const month = parseInt(event.target.value, 10); // Convert selected month to a number
    setSelectedMonth(month);
  };

  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      filteredAttendanceList.map((entry) => ({
        Date: moment(entry.currentDate).format("MMM-Do-YYYY"),
        PunchIn: entry.punches[0]?.punchIn
          ? formatTime(entry.punches[0].punchIn)
          : "N/A",
        PunchOut: entry.punches[entry.punches.length - 1]?.punchOut
          ? formatTime(entry.punches[entry.punches.length - 1].punchOut)
          : "N/A",
        Production: entry.totalWorkingTime
          ? formatTotalWorkingTime(entry.totalWorkingTime)
          : "0",
        Status: entry.status,
        IPAddress: entry.ip,
        WorkStatus: entry.workStatus,
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "AttendanceData");
    XLSX.writeFile(wb, "AttendanceData.xlsx");
  };

  return (
    <>
      <div className="employee-project-container container">
        {/* <div className="emp-select-months-year">
          <div className="emp-select-month">
            <select
              style={{
                width: "124px",
                height: "30px",
                paddingRight: "12px",
                color: "#222",
              }}
              onChange={handleMonthChange}
            >
              <option value="">Select Month</option>
              <option value="1">Jan</option>
              <option value="2">Feb</option>
              <option value="3">Mar</option>
              <option value="4">Apr</option>
              <option value="5">May</option>
              <option value="6">Jun</option>
              <option value="7">Jul</option>
              <option value="8">Aug</option>
              <option value="9">Sep</option>
              <option value="10">Oct</option>
              <option value="11">Nov</option>
              <option value="12">Dec</option>
            </select>
          </div>
          <div
            className="emp-select-month"
            style={{ width: "123px", paddingRight: "0.2rem", height: "34px" }}
          >
            <input
              onChange={(e) => setDate(e.target.value)}
              style={{ width: "118px", height: "30px", color: "#222" }}
              type="date"
            />
          </div>
        </div> */}
        <div className="emp-select-months-year">
          <button
            onClick={downloadExcel}
            style={{
              height: "25px",
              width: "330px",
              borderRadius: "10px",
              background: "#1d8cf8",
              color: "#fff",
              fontSize: "0.8rem",
              border: "1px solid #1d8cf8",
              float: "right",
            }}
          >
            Export to Excel
          </button>
        </div>
        <hr />

        <div className="tab-content" id="pills-tabContent">
          <div
            className="tab-pane fade show active table-responsive"
            id="pills-activeproject-home"
            role="tabpanel"
            aria-labelledby="pills-activeproject-home"
            tabIndex="0"
          >
            <div
              className="project-title my-2"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div className="allproject">
                <h6>All Details</h6>
              </div>
              {/* {!date && (
                <div
                  className="list-of-days"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <div className="emp-holidays-btn">
                    <button
                      style={{
                        height: "25px",
                        width: "300px",
                        borderRadius: "10px",
                        background: "#f3f3fb",
                        color: "#72757a",
                        fontSize: "0.8rem",
                        border: "1px solid #dcd2d2",
                      }}
                    >
                      Late :{completeEndLate}
                    </button>
                    <button
                      style={{
                        height: "25px",
                        width: "300px",
                        borderRadius: "10px",
                        background: "#f3f3fb",
                        color: "#72757a",
                        fontSize: "0.8rem",
                        border: "1px solid #dcd2d2",
                      }}
                    >
                      Absent :{absentCount}
                    </button>
                    <button
                      style={{
                        height: "25px",
                        width: "330px",
                        borderRadius: "10px",
                        background: "#f3f3fb",
                        color: "#72757a",
                        fontSize: "0.8rem",
                        border: "1px solid #dcd2d2",
                      }}
                    >
                      Complete End Late :{completeEndLate}
                    </button>
                    <button
                      style={{
                        height: "25px",
                        width: "330px",
                        borderRadius: "10px",
                        background: "#f3f3fb",
                        color: "#72757a",
                        fontSize: "0.8rem",
                        border: "1px solid #dcd2d2",
                      }}
                    >
                      Complete End Half Day :{completeEndHalfDay}
                    </button>
                    <button
                      onClick={downloadExcel}
                      style={{
                        height: "25px",
                        width: "330px",
                        borderRadius: "10px",
                        background: "#1d8cf8",
                        color: "#fff",
                        fontSize: "0.8rem",
                        border: "1px solid #1d8cf8",
                      }}
                    >
                      Export to Excel
                    </button>
                  </div>
                </div>
              )} */}

              <table className="table table-striped mt-3">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Date</th>
                    <th>PunchIn</th>
                    <th>PunchOut</th>
                    <th>Production</th>
                    <th>Status</th>
                    <th>IPAddress</th>
                    <th>WorkStatus</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAttendanceList.length > 0 ? (
                    filteredAttendanceList.map((attendance, index) => (
                      <tr key={index}>
                        <td>
                          {attendance.userName}
                        </td>
                        <td>
                          {moment(attendance.currentDate).format("MMM-Do-YYYY")}
                        </td>
                        <td>
                          {attendance.punches[0]?.punchIn
                            ? formatTime(attendance.punches[0].punchIn)
                            : "N/A"}
                        </td>
                        <td>
                          {attendance.punches[attendance.punches.length - 1]
                            ?.punchOut
                            ? formatTime(
                                attendance.punches[
                                  attendance.punches.length - 1
                                ].punchOut
                              )
                            : "N/A"}
                        </td>
                        <td>
                          {attendance.totalWorkingTime
                            ? formatTotalWorkingTime(
                                attendance.totalWorkingTime
                              )
                            : "0"}
                        </td>
                        <td>{attendance.status}</td>
                        <td>{attendance.ip}</td>
                        <td>{attendance.workStatus}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center">
                        No data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const getStatusColor = (status) => {
  switch (status) {
    case "LATE":
      return "goldenrod";
    case "Week Off":
      return "blue";
    case "Absent":
      return "red";
    default:
      return "green";
  }
};

export default Attendance;

const styles = {
  spinner: {
    display: "flex",
    alignSelf: "center",
    justifyContent: "center",
    margin: "4rem",
  },
};
