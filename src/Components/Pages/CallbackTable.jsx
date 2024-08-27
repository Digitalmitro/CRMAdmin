import * as XLSX from "xlsx";
import { useEffect, useState, useRef } from "react";
import { FaListUl } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { DatePicker, Space , Spin} from "antd";
import messageIcon from "../../assets/messageIcon.png";
import Delete from "../../assets/Vectorss.png";
import CallableDrawer from "./CallbackDrawer";
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
const CallbackTable = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleChange = (date, dateString) => {
    console.log(date, dateString);
  };
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

  const Admintoken = Cookies.get("Admintoken");
  const Profile = localStorage.getItem("admin");
  const NewProfile = JSON.parse(Profile);
  const user_id = NewProfile?._id;
  const user_name = NewProfile?.name;
  const aliceName = NewProfile?.aliceName;
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("Date");
  const [data, setData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [date, setDate] = useState("");
  const [night, setNight] = useState([]);
  const [loader, setloader] = useState(true);

  useEffect(() => {
    if (Admintoken) {
      // Use the <Navigate /> component to redirect
    } else {
      return navigate("/Login");
    }
  }, [Admintoken]);

  // Function to handle the change in the select input
  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };
  console.log("USER_ID", user_id);

  const Getdata = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_API}/allcallback`
    );
    setData(res?.data.reverse());
    const filteredData = res?.data.filter((e) => e.type === "Night");
    setNight(filteredData);
    setloader(false)
    // filterAndSortResults(searchTerm, sortBy, res?.data.callback)
    console.log(res?.data);
  };
  console.log(data);

  const getNight = async () => {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_API}/alluser`);
    // const res = await axios.get(`${import.meta.env.VITE_BACKEND_API}/attendance`)
  };
  const handleDel = async (id) => {
    console.log("IsDeleted");
    // try {
    //   await axios.delete(
    //     `${import.meta.env.VITE_BACKEND_API}/callback-1/${id}`
    //   );
    //   Getdata();
    // } catch (error) {
    //   console.log(error);
    // }
  };
  const [userData, setUserData] = useState({});
  const handleTransfer = async (userData) => {
    console.log("userData", userData);

    // Perform the POST request here with Axios
    axios
      .post(`${import.meta.env.VITE_BACKEND_API}/transfer`, userData)
      .then((response) => {
        // Handle the response if needed
        console.log("Transfer successful:", response?.data);
        // After successful transfer, perform the delete request
        axios
          .delete(
            `${import.meta.env.VITE_BACKEND_API}/callback-1/${userData?._id}`
          )
          .then(() => {
            console.log("Deletion successful");
            Getdata(); // Refresh the data after deletion
          })
          .catch((error) => {
            console.error("Error deleting data:", error);
          });
      })
      .catch((error) => {
        console.error("Error transferring:", error);
      });

    const noti = {
      message: `${NewProfile?.name} created a transfer: ${userData?.name}`,
      currentDate: moment().format("MMMM Do YYYY, h:mm:ss a"),
    };
    await axios.post(`${import.meta.env.VITE_BACKEND_API}/notification`, noti);
  };
  useEffect(() => {
    const timeoutRef = setTimeout(() => {
      Getdata();
    }, 500);
    return () => {
      clearTimeout(timeoutRef);
    };
  }, [searchTerm, sortBy]);

  // Function to handle search term change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const downloadExcel = () => {
    if (data.length === 0) {
      console.error("No data to download");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(data);
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

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);
  // Function to handle opening modal and setting selected result
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
  const filteredData = data?.filter((entry) => {
    // Check if the entry's name includes the search term
    const nameIncludesSearchTerm =
      entry?.name?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      entry?.employeeName?.toLowerCase().includes(searchTerm?.toLowerCase());

    // Check if the entry's currentDate includes the selected month
    const currentDateIncludesMonth =
      !selectedMonth || entry.createdDate.includes(selectedMonth);

    // Check if the entry's currentDate matches the selected date
    const formattedDate = moment(date).format("MMM Do YY");
    const currentDateMatchesDate =
      !date || entry?.createdDate === formattedDate;

    // Return true if all conditions are met
    return (
      nameIncludesSearchTerm &&
      currentDateIncludesMonth &&
      currentDateMatchesDate
    );
  });

  return (
    <>
      <div className="employee-project-container container py-4">
        <div className=" filterPanel d-flex justify-content-between align-items-end">
          <div className="emp-select-months-year">
            <select
              className="emp-select-month "
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
                    <option value={res?._id}>{res?.name}</option>
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
                  // border:"1px solid black"
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

          <div className="d-flex  gap-2 ">
            <input
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="search..."
              className="search shadow px-4"
              style={{
                border: "none",
                borderBottom: "1px solid coral",
                borderRadius: "10px",
              }}
            />
            <button
              className="empbuttonDowload px-4"
              onClick={downloadExcel}
              style={{ fontSize: "0.8rem" }}
            >
              <PiDownloadSimpleBold style={{ marginRight: "5px" }} />
              Callback Data
            </button>
          </div>
        </div>
        <hr />

        <div className="project-title my-2">
          <div className="allproject col">
            <h6>All Callbacks</h6>
          </div>

          <div className="col d-flex justify-content-end"></div>
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
                  <th scope="col">Created Date</th>
                  <th scope="col">Created By </th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Call Date</th>
                  <th scope="col">Domain Name</th>
                  <th scope="col">Address</th>

                  <th scope="col">Comments</th>
                  <th scope="col">Budget</th>

                  <th scope="col">Sent To</th>
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
                        <td>{res?.createdDate}</td>
                        <td>{res?.employeeName}</td>
                        <td>{res?.name}</td>
                        <td>{res?.email}</td>
                        <td>{res?.phone}</td>
                        <td>{res?.calldate}</td>
                        <td>{res?.domainName}</td>
                        <td>{res?.address}</td>
                        <td>{res?.comments}</td>
                        <td>{res?.buget}</td>

                        <td class="d-flex gap-1">
                          <button
                            className="buttonFilled"
                            style={{ fontSize: "0.8rem" }}
                            onClick={() => {
                              setUserData(res); // Set the user data to be transferred
                              handleTransfer(res); // Call function to handle transfer
                            }}
                          >
                            Transfer
                          </button>
                        </td>

                        <td>
                          {/* <img
                            src={messageIcon}
                            alt="..."
                            className="messageIcon"
                            style={{}}
                            onClick={() => showModal(res)}
                          /> */}

                          <button
                            className="buttonFilled"
                            style={{ fontSize: "0.8rem" }}
                            onClick={() =>
                              navigate(`/callbackview/${res?._id}`)
                            }
                          >
                            View
                          </button>

                          <button
                            onClick={() => handleDel(res?._id)}
                            style={{ outline: "none", border: "none" }}
                          >
                            <img
                              src={Delete}
                              alt="..."
                              className="DeleteIcon"
                            />
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
        </div>
      </div>
    </>
  );
};

export default CallbackTable;



const styles = {

  spinner: {
    display:"flex",
    alignSelf: "center",
    justifyContent: "center",
    margin: "4rem",
  },
}