import { useEffect, useState, useRef } from "react";
import { FaListUl } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";

import messageIcon from "../../../assets/messageIcon.png";
import Delete from "../../../assets/Vectorss.png";
// import CallableDrawer from "./CallbackDrawer"
import { NavLink } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import handelSeoMail from "../../Mail/SeoMail";
import handelSMMail from "../../Mail/SmoMail";
import handelDMMail from "../../Mail/DmMail";
import handelBWMail from "../../Mail/BasicWebMail";
import handelEcomMail from "../../Mail/EcomMail";
import { Navigate, useNavigate } from "react-router-dom";

import moment from "moment";

import {
  Modal,
  Select,
  Button,
  DatePicker,
  Spin,
  Input,
  Typography,
} from "antd";
// import "../Projects/Projects.css";

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
  const [callApi, setCallApi] = useState(false);
  const { Title, Text } = Typography;

  const [isConcernModalOpen, setIsConcernModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleView = (row) => {
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  const handleApproveOrDeny = (status) => {
    handleStatus(selectedRow?._id, { target: { name: status } });
    setIsModalOpen(false);
    toast.success(`${status} action performed successfully!`);
  };

  const handleApproved = async (status) => {
    const { ConcernDate, ActualPunchIn, ActualPunchOut, shiftType } =
      selectedRow;
    console.log("currentDate", ConcernDate);
    const formattedConcernDate = moment(ConcernDate, "MMMM D YYYY").format(
      "YYYY-MM-DD"
    );
    const punchInDateTime = moment(
      `${formattedConcernDate} ${ActualPunchIn}`,
      "YYYY-MM-DD h:mm:ss A"
    )
      .utc()
      .toISOString();
    const punchOutDateTime = moment(
      `${formattedConcernDate} ${ActualPunchOut}`,
      "YYYY-MM-DD h:mm:ss A"
    )
      .utc()
      .toISOString();
    console.log("sjkhsadjh", punchInDateTime, punchOutDateTime);
    try {
      const concernDateUTC = moment(ConcernDate, "MMMM D YYYY")
        .utc()
        .toISOString();

      // Construct the payload for the PUT request
      const payload = {
        user_id: selectedRow.user_id,
        concernDate: concernDateUTC,
        punchIn: punchInDateTime,
        punchOut: punchOutDateTime,
        shiftType,
      };

      // Make the PUT request to update the attendance
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_API}/attendance-approval`,
        payload
      );

      // Handle the response as needed
      handleApproveOrDeny("Approved");
      // Close the modal or show a success message
      handleCancel();
    } catch (error) {
      console.error("Error updating attendance:", error);
      // Handle error, show a message to the user, etc.
    }
  };

  const handleConcernCancel = () => {
    setIsConcernModalOpen(false);
  };

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
  };

  useEffect(() => {
    if (Admintoken) {
      // Use the <Navigate /> component to redirect
    } else {
      return navigate("/login");
    }
  }),
    [Admintoken];
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/concern`,
        { headers: { token: Admintoken } }
      );
      setData(res.data);
      setFilteredData(res.data.reverse());
      const uniqueNames = [...new Set(res.data.map((item) => item.name))];
      setEmployeeNames(uniqueNames);
      setloader(false);
    } catch (err) {
      console.log(err);
    }
  };

  const updateConcerns = async () => {
    await axios
      .put(
        `${import.meta.env.VITE_BACKEND_API}/notifications/update-status`,
        {},
        {
          headers: { token: Admintoken },
        }
      )
      .then((res) => {
        console.log("Concerns seen");
      })
      .catch((e) => {
        console.log(e);
      });
  };

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

    // Filter data based on search term and selected date
    const filtered = data.filter((item) => {
      const matchSearchTerm =
        item?.name?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
        item?.email?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
        item?.message?.toLowerCase().includes(searchTerm?.toLowerCase());

      const matchSelectedEmployee =
        !SelectedEmployee.length || SelectedEmployee.includes(item?.name);

      // formating the table Date intothe selected Date using moment
      const itemDateFormatted = moment(
        item?.date,
        "MMMM Do YYYY, h:mm:ss a"
      ).format("YYYY-MM-DD");
      const matchSelectedDate =
        !selectedDate || itemDateFormatted === selectedDate;

      return matchSearchTerm && matchSelectedEmployee && matchSelectedDate;
    });

    setFilteredData(filtered);
  }, [searchTerm, data, selectedDate, SelectedEmployee]);

  async function handleStatus(id, event) {
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_API}/concern/${id}`,
        {
          status: event.target.name,
        },
        {
          headers: {
            token: Admintoken,
          },
        }
      );
      setCallApi(!callApi);
      getData();
      toast.success(data.message, {});
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    updateConcerns();
  }, []);

  useEffect(() => {
    getData();
  }, [callApi]);
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

              {loader ? (
                <Spin tip="loading..." style={styles.spinner} />
              ) : (
                <tbody>
                  {filteredData?.map((res, index) => {
                    return (
                      <>
                        <tr key={res?._id}>
                          <td>{res?.name}</td>
                          <td>{res?.email}</td>
                          <td>
                            {moment(res?.createdAt).format(
                              "DD/MM/YYYY HH:MM a"
                            )}
                          </td>
                          <td
                            style={{
                              color:
                                res.concernType === "Punch Out"
                                  ? "blue"
                                  : res.concernType ===
                                    ("Leave Application" || "Leave")
                                  ? "red"
                                  : "green",
                            }}
                          >
                            {res?.concernType}
                          </td>
                          <td> {res?.message}</td>
                          <td
                            style={{
                              color:
                                res.status === "Approved"
                                  ? "green"
                                  : res.status === "Denied" && "red",
                            }}
                          >
                            {" "}
                            {res?.status}
                          </td>

                          <td class="d-flex gap-1">
                            <button
                              className="btn btn-primary buttonFilled"
                              onClick={() => handleView(res)}
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              )}
            </table>

            {selectedRow && (
              <Modal
                title={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      gap: "20px",
                      alignItems: "center",
                      color: "grey",
                    }}
                  >
                    {" "}
                    <div
                      style={{
                        color:
                          selectedRow.status === "Approved"
                            ? "green"
                            : selectedRow.status === "Denied" && "red",
                      }}
                    >
                      {" "}
                      - - {selectedRow.status} -
                    </div>
                    <div style={{ textAlign: "right" }}>
                      - {selectedRow.currenDate} - -
                    </div>
                  </div>
                }
                open={isModalOpen}
                onCancel={handleCancel}
                footer={[
                  <Button
                    key="deny"
                    onClick={() => handleApproveOrDeny("Denied")}
                    type="danger"
                    style={{
                      backgroundColor:
                        selectedRow.status === "Approved"
                          ? "#d3d3d3"
                          : undefined, // Grey color
                      borderColor:
                        selectedRow.status === "Approved"
                          ? "#d3d3d3"
                          : undefined, // Grey color
                      color:
                        selectedRow.status === "Approved"
                          ? "#a9a9a9"
                          : undefined, // Darker grey for text
                    }}
                  >
                    Deny
                  </Button>,
                  <Button
                    key="approve"
                    onClick={() => {
                      if (selectedRow.concernType.includes("Leave")) {
                        handleApproveOrDeny("Approved")
                      } else {
                        handleApproved();
                      }
                    }}
                    type="primary"
                  >
                    Approve
                  </Button>,
                ]}
                width={600}
              >
                <div style={{ position: "relative", padding: "20px" }}>
                  <div
                    style={{
                      marginTop: "10px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <Text strong>Name: </Text>
                      <Input
                        value={selectedRow.name}
                        disabled
                        style={{
                          width: "200px",
                          marginBottom: "10px",
                          color: "#7a7b7f",
                        }}
                      />
                    </div>
                    <div>
                      <Text strong>Email: </Text>
                      <Input
                        value={selectedRow.email}
                        disabled
                        style={{
                          width: "200px",
                          marginBottom: "10px",
                          color: "#7a7b7f",
                        }}
                      />
                    </div>
                  </div>
                  <div style={{ marginTop: "20px" }}>
                    <Text strong> Date Of Concern: </Text>
                    <Input value={selectedRow.ConcernDate} />
                  </div>
                  {!selectedRow.concernType.includes("Leave") && (
                    <div
                      style={{
                        marginTop: "20px",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <Text strong>Actual In Time: </Text>
                        <Input
                          value={selectedRow.ActualPunchIn}
                          disabled
                          style={{
                            width: "100px",
                            marginBottom: "10px",
                            color: "#7a7b7f",
                          }}
                        />
                      </div>
                      <div>
                        <Text strong>Actual Out Time : </Text>

                        <Input
                          value={selectedRow.ActualPunchOut}
                          disabled
                          style={{
                            width: "100px",
                            marginBottom: "10px",
                            color: "#7a7b7f",
                          }}
                        />
                      </div>
                    </div>
                  )}

                  <div style={{ marginTop: "20px" }}>
                    <Text strong>Message: </Text>
                    <Input.TextArea
                      value={selectedRow.message}
                      disabled
                      rows={4}
                      style={{ width: "100%", color: "#7a7b7f" }}
                    />
                  </div>
                </div>
              </Modal>
            )}
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
    display: "flex",
    alignSelf: "center",
    justifyContent: "center",
    margin: "4rem",
  },
};
