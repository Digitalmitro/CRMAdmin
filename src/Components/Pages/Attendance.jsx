import React, { useState, useEffect } from "react";

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Cookies from 'js-cookie'
import * as XLSX from "xlsx";
import moment from 'moment'
import { Modal } from 'antd'
import { useNavigate, useParams } from "react-router-dom";
import { DatePicker, Space , Spin} from 'antd';
import axios from "axios"
// import "./Projects/Projects.css";
import downArrow from "../../assets/bxs_down-arrow.png";
import menuDots from "../../assets/lucide_ellipsis.png";
import filter from "../../assets/mdi_filter.png";
import menuList from "../../assets/material-symbols_list.png";
import { FaFilter, FaListUl } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { PiDownloadSimpleBold } from "react-icons/pi";

const Attendance = () => {
  const Admintoken = Cookies.get('Admintoken')
  const Profile = localStorage.getItem('user')
  const NewProfile = JSON.parse(Profile)
  const name = NewProfile?.name
  const email = NewProfile?.email
  const user_id = NewProfile?._id

  const [hidden, setHidden] = useState(false)
  const [data, setData] = useState([])
  const [selectedResult, setSelectedResult] = useState(null);

  const [loader, setloader] = useState(true);


  const getAttData = async () => {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_API}/attendance/${user_id}`)
    setData(res.data.attendance)
  }

  //model
  const [msgDate, setMsgDate] = useState('')
  const [message, setMessage] = useState('')

  const handleChange = (date, dateString) => {
    console.log(date, dateString);
  };

  const [isModalOpen, setIsModalOpen] = useState(false)

  const [isOpen, setIsOpen] = useState(true)
  const toggle = () => setIsOpen(!isOpen)

  // location tracker
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [locationPermission, setLocationPermission] = useState(false)
  const [iframe, setIframe] = useState(false)

  const [percent, setPercent] = useState(29)

  const status = percent === 100 ? 'success' : percent <= 29 ? 'red' : 'active'
  const color = percent === 100 ? '#52c41a' : percent <= 29 ? 'red' : '#ffc107'

  const [hide, setHide] = useState(false)

  const [punchin, setPunchin] = useState('')
  const [punchOut, setPunchOut] = useState('')

  const [timeDifferenceMinutes, setTimeDifferenceMinutes] = useState(0) // State to hold the working time in minutes

  const [checkoutClicked, setCheckoutClicked] = useState(false)

  const [loading, setLoading] = useState(false)
  function handleLoading() {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 750)
  }



  const [userIP, setUserIP] = useState(null)
  const getIp = async () => {
    // Fetch user's IP address
    const response = await fetch('https://api.ipify.org?format=json')
    const data = await response.json()
    setUserIP(data.ip)
  }

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

 

  const calculateTimeDifference = (time1, time2) => {
    const format = 'hh:mm:ss A'
    const time1Date = new Date('2000-01-01 ' + time1)
    const time2Date = new Date('2000-01-01 ' + time2)

    // Get the difference in milliseconds
    let difference = Math.abs(time2Date - time1Date)

    // Convert milliseconds to hours, minutes, seconds
    let hours = Math.floor(difference / 3600000)
    difference -= hours * 3600000
    let minutes = Math.floor(difference / 60000)
    difference -= minutes * 60000
    let seconds = Math.floor(difference / 1000)

    return `${hours}:${minutes}:${seconds}`
  }

  let filteredPunchin = []

  if (data) {
    filteredPunchin = data.filter(
      (entry) =>
        entry.hasOwnProperty('punchin') &&
        !entry.hasOwnProperty('punchOut') &&
        entry.currentDate === currentDate,
    )
  }

  // console.log(
  //   "punchin",
  //   filteredPunchin.length > 0 ? filteredPunchin : "No data available"
  // );
  let filteredPunchOut = []


  const isLate = filteredPunchin.length > 0 && isCheckinLate(filteredPunchin[0].punchin)
  let timeDifference = null

  if (filteredPunchin.length > 0 && filteredPunchOut.length > 0) {
    // Assuming filteredPunchin and filteredPunchOut are arrays containing login and logout times respectively
    timeDifference = calculateTimeDifference(
      filteredPunchin[0].punchin,
      filteredPunchOut[0].punchOut,
    )

    // console.log("Time Difference (minutes):", timeDifference);
    const currentDate = moment().format('MMM Do YY')
    try {
      const response = axios.post(`${import.meta.env.VITE_BACKEND_API}/attendance`, {
        currentDate,
        time: timeDifference,
        user_id,
      })
      // console.log(response.data);
    } catch (error) {
      console.error('Error sending checkout data:', error)
    }
  } else {
    console.log('Cannot calculate time difference: Missing login or logout data')
  }







  const navigate = useNavigate()
  const { id } = useParams()
  const currentDate = moment().format("MMM Do YY");
  const [open, setOpen] = useState(false);

  console.log(currentDate)
   const [date, setDate] = useState("")
   const [data3, setData3] = useState([])


// ant drwer design
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

  const Getdata = async () => {
    const ressss = await axios.get(`${import.meta.env.VITE_BACKEND_API}/attendance`)

    setData3(ressss.data)
    setloader(false)
  }
  const filteredDataAll = data3.filter((e) => e.currentDate === moment().format('MMM Do YY'))
  console.log('test', filteredDataAll)


  const groupedDataByUserId = Object.values(
    filteredDataAll.reduce((acc, curr) => {
      // Group entries by user_id
      const userId = curr.user_id

      if (!acc[userId]) {
        acc[userId] = []
      }

      // Add the current entry to the corresponding group
      acc[userId].push(curr)

      return acc
    }, {}),
  )
  console.log(groupedDataByUserId)
  const mergedDataByUserId = groupedDataByUserId.map((userEntries) => {
    // Merge all entries for each user into a single object
    return userEntries.reduce((mergedObj, entry) => {
      // Merge the fields of each entry into the merged object
      return { ...mergedObj, ...entry }
    }, {})
  })

  console.log(mergedDataByUserId)

  const [selectedMonth, setSelectedMonth] = useState('')

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value)
  }

  useEffect(() => {
    
    Getdata()
  }, [])
  
  const downloadExcel = () => {
    if (mergedDataByUserId.length === 0) {
      console.error('No data to download')
      return
    }

    const worksheet = XLSX.utils.json_to_sheet(mergedDataByUserId)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')

    // Convert workbook to array buffer
    const arrayBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    })

    // Convert array buffer to Blob
    const excelBlob = new Blob([arrayBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })

    // Create a download link
    const url = URL.createObjectURL(excelBlob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'attendance.xlsx')
    document.body.appendChild(link)

    // Trigger the download
    link.click()

    // Cleanup
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }



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
        <hr />
        <div className=" " style={{marginBottom:"-10px"}}>
         <div className=" AttenDance  d-flex justify-content-between">
         <div className="allproject">
            <h6
            style={{fontSize:"19px"}}>Today's Attendance</h6>
          </div>
          <div class="text-end">
        <button className="empbuttonDowload" 
        style={{ width:"160px", fontSize: "0.8rem",}} onClick={downloadExcel}
        
        >
        <PiDownloadSimpleBold style={{ marginRight:"5px",  }}/>
        Attendance Data
        </button>
      
        </div>
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
              {loader ? <>     <Spin tip="loading..." style={styles.spinner} /> </>:
              <tbody>
                {mergedDataByUserId?.map((res, index) => {
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
}
            </table>
          </div>
        
        </div>
      </div>

      
    </div>
  </>;
};

export default Attendance;




const styles = {

  spinner: {
    display:"flex",
    alignSelf: "center",
    justifyContent: "center",
    margin: "4rem",

  },
}