import React, { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "antd";
import io from "socket.io-client";
import Cookies from "cookies-js";
import moment from "moment";
import { jwtDecode } from "jwt-decode";

const socket = io("http://localhost:3500");
// dummy data 
const EmpMsg = () => {
  const token = Cookies.get("token");
  const decodeToken = token && jwtDecode(token);
  const userId = decodeToken._id;
  const [sendmessage, setSendMessage] = useState([]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [messageData, setMessageData] = useState();

  const [formData, setFormData] = useState({
    name: decodeToken.name,
    email: decodeToken.email,
    message: "",
    // time: moment().format("MMMM Do YYYY"),
    date: moment().format("h:mm:ss a"),
    status: "",
    user_id: userId,
  });

  useEffect(() => {
    // Listen for incoming messages from the server
    socket.on("chat message", (msg) => {
      if (msg.user_id !== userId) {
        // Only add messages from other users
        setMessages((prevMessages) => [...prevMessages, msg]);
      }
    });

    // Clean up when component unmounts
    return () => {
      socket.off("chat message");
    };
  }, [userId]);

  const handleSendMessage = async () => {

    
   if(input.trim() !== ""){
    const updatedFormData = {
      ...formData,
      message: input,
    };

    setFormData(updatedFormData);

    // Add the message to the local list
    setSendMessage((prev) => [...prev, input]);

    // Emit the message to the server
    socket.emit("chat message", updatedFormData);

    console.log("formData", updatedFormData);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/message`,
        updatedFormData
      );
      console.log("res", res);
      getchatData()
    window.scrollTo(0, document.body.scrollHeight);

      setInput("");
    } catch (err) {
      console.log(err);
    }
   }
  };

  const getchatData = async () => {
    try {
      const resget = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/message`
      );
      console.log("resget", resget);
      setMessageData(resget.data);
    } catch (err) {}
  };
  useEffect(() => {
    getchatData();
  }, []);

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);

  }, []);

  return (
    <div className="sending-messages text-center" style={{height:"80vh"}}>
      <div
        className="row all-messages mx-auto "
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "end",
          width: "100%",
          maxHeight: "70vh" ,
          overflowY:"scroll"
        }}
      >
        {messageData?.map((item) => {
          return (
            <>
              {(item.message.trim() !== "") && (
                (item.user_id === userId && item.message !== "" )?(
                  <div
                  className="left-msg col-md-5"
                  style={{
                    border: "1px solid gray",
                    display: "flex",
                    alignItems: "center",
                    borderRadius: "8px",
                    margin:"2px",
                    justifyContent:"space-around",
                    background: "#d7997e",
                    border: "none",
                    fontSize: "0.8rem",
                    padding: "10px ",
                  }}
                >
                  <p>{item.name}</p>
                 <p>{item.message}</p>
                 <p>{item.date}</p>
                  {/* <ul>
                    {sendmessage.map((msg, index) => (
                      <li key={index}>{msg}</li>
                    ))}
                  </ul> */}
                </div>
                
                ) : ( 
                  <div
                  className="right-msg col-md-5"
                  style={{
                    border: "1px solid gray",
                    marginTop: "6rem",
                    display: "flex",
                    justifyContent:"space-around",
                    alignItems: "center",
                    borderRadius: "8px",
                    margin:"2px",
                    background: "#d7997e",
                    border: "none",
                    fontSize: "0.8rem",
                    padding: "10px",
                  }}
                >
                 <p>{item.name}</p>
                 <p>{item.message}</p>
                 <p>{item.date}</p>
                 {/* <p>{item.message}</p>
                 <p>{item.message}</p> */}
                  {/* <ul>
                     {messages.map((msg, index) => (
                      <li key={index}>{msg.message}</li>
                    ))}
                  </ul> */}
                </div>
                )
              )}
            </>
          );
        })}
      </div>
      <div className="fixed-bottom">
        <input
          className="mx-auto"
          type="text"
          placeholder="Type your message here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            width: "40%",
            height: "6vh",
            outline: "none",
            padding: "1rem",
            border: "none",
            boxShadow: "0 0 8px #616161",
          }}
        />
        <span style={{ paddingLeft: "10px" }} onClick={handleSendMessage}>
          <svg
            height="30px"
            width="30px"
            viewBox="0 0 28 28"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            fill="#000000"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <title>ic_fluent_send_28_filled</title>
              <desc>Created with Sketch.</desc>
              <g
                id="🔍-Product-Icons"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
              >
                <g
                  id="ic_fluent_send_28_filled"
                  fill="#f24e1e"
                  fillRule="nonzero"
                >
                  <path
                    d="M3.78963301,2.77233335 L24.8609339,12.8499121 C25.4837277,13.1477699 25.7471402,13.8941055 25.4492823,14.5168992 C25.326107,14.7744476 25.1184823,14.9820723 24.8609339,15.1052476 L3.78963301,25.1828263 C3.16683929,25.4806842 2.42050372,25.2172716 2.12264586,24.5944779 C1.99321184,24.3238431 1.96542524,24.015685 2.04435886,23.7262618 L4.15190935,15.9983421 C4.204709,15.8047375 4.36814355,15.6614577 4.56699265,15.634447 L14.7775879,14.2474874 C14.8655834,14.2349166 14.938494,14.177091 14.9721837,14.0981464 L14.9897199,14.0353553 C15.0064567,13.9181981 14.9390703,13.8084248 14.8334007,13.7671556 L14.7775879,13.7525126 L4.57894108,12.3655968 C4.38011873,12.3385589 4.21671819,12.1952832 4.16392965,12.0016992 L2.04435886,4.22889788 C1.8627142,3.56286745 2.25538645,2.87569101 2.92141688,2.69404635 C3.21084015,2.61511273 3.51899823,2.64289932 3.78963301,2.77233335 Z"
                    id="🎨-Color"
                  ></path>
                </g>
              </g>
            </g>
          </svg>
        </span>
      </div>
    </div>
  );
};

export default EmpMsg;








const Sidebar = () => {
  const context = useContext(MyContext);
  const navigate = useNavigate();

  const [isSidebarModalOpen, setIsSidebarModalOpen] = useState(false);
  const [projectsName, setProjectsName] = useState('');
  const [projects, setProjects] = useState([]);

  const [activeProject, setActiveProject] = useState(null);
  const [projectsData, setProjectsData] = useState([]);

  const [isProjectsMenuOpen, setIsProjectsMenuOpen] = useState(true);

  // ------
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [transferTo, setTransfer] = useState('')
  const [domainName, setDomain] = useState('')
  const [address, setAddress] = useState('')
  const [country, setCountry] = useState('USA')
  const [zipcode, setZip] = useState('')
  const [comments, setComments] = useState('')
  const [buget, setBuget] = useState('')
  const [calldate, setCalldate] = useState('')
  // ------------

  console.log('hello',projectsData)

  const showSidebarModal = () => {
    setIsSidebarModalOpen(true);
  };
  console.log('toggleworking',context.toggleSidebar)

 const handleSidebarOk = async () => {
    let payload = {
      projectName : projectsName
    }
    try {
  
      // Post the project name to the backend API
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_API}/projects`, payload);
      // Update the local state with the new project data from the backend
     message.success("Project created")
    } catch (error) {
      console.error('Error adding project:', error);
    }

   
    setProjects([...projects, projectsName]);
  
    // Close the modal and reset the project name input
    setIsSidebarModalOpen(false);
    setProjectsName("");
  };

  const handleSidebarCancel = () => {
    setIsSidebarModalOpen(false);
  };

  
  const getProjectsData = async() => {
    try{
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_API}/projects`);
       console.log("respo", response)
       setProjectsData(response.data)
    }catch(err){
        console.log(err)
    }
  }

  const handleProjectClick = (projectid,name) => {
    setActiveProject(projectid);
    context.setBreadcrumbs([{ label: "Projects", path: '/' }, { label: name, path: `/projects/${projectid}` }]);
    navigate(`/projects/${projectid}`);
  };

  const handleProjectsToggle = () => {
    setIsProjectsMenuOpen(!isProjectsMenuOpen);
  };

  const handleClick = (index, path, label) => {
    context.setActiveButton(index);
    context.setBreadcrumbs([{ label: index === 0 ? "" : "Dashboard", path: '/' },
    { label, path }]);
    navigate(path);
  };

  useEffect(()=>{
    getProjectsData()
  },[])

  return (
    <div className="sidebar ">
      <div className="hide-ham" style={{ height: '30px', display: 'flex', justifyContent: 'right' }}>
        <Button
        
          className="rounded-circle1"
          onClick={() => {
            context.setToggleSidebar(!context.toggleSidebar);
          }}
        >
          {/* */}
          <div style={{ fontSize: '45px', paddingLeft: '25px', marginBottom: "10px" }}> 
             <svg viewBox="0 0 24 24" width="25px" height="30px" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11 5V19M6 8H8M6 11H8M6 14H8M6.2 19H17.8C18.9201 19 19.4802 19 19.908 18.782C20.2843 18.5903 20.5903 18.2843 20.782 17.908C21 17.4802 21 16.9201 21 15.8V8.2C21 7.0799 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V15.8C3 16.9201 3 17.4802 3.21799 17.908C3.40973 18.2843 3.71569 18.5903 4.09202 18.782C4.51984 19 5.07989 19 6.2 19Z" stroke="#000000" stroke-width="1.08" stroke-linecap="round" stroke-linejoin="round" color="#4e4c4c" ></path> </g></svg></div>
        </Button>
      </div>
      <ul>
        <li  >
          <Button style={{ color: "#555151" }}
            className={`custom-button  ${context.activeButton === 0 ? 'active' : ''}`}
            onClick={() => handleClick(0, '/', 'Dashboard')}
          >
        
            Home
          </Button>
        </li>
        <li>
          <Button
            style={{ color: "#555151" }}
            className={`custom-button ${context.activeButton === 1 ? 'active' : ''}`}
            onClick={() => handleClick(1, '/attendance', 'Attendance')}
          >
          
            Attendance
          </Button>
        </li>

        <li>
          <Button style={{ color: "#555151" }}
            className={`custom-button ${context.activeButton === 2 ? 'active' : ''}`}
            onClick={() => handleClick(2, '/project-lists', 'Projects')}
          >
           
            
            Projects <span style={{ display: "flex", justifyContent: "center", alignItems: "center", marginLeftLeft: "12rem", fontSize: "1.1rem", width: "8vw" }} onClick={showSidebarModal}>     </span>
          </Button>
         
        </li>
          <li  >
          {isProjectsMenuOpen && (
          
              projectsData.map((project, index) => (
                <li key={index} style={{display:"flex",gap:"10px",marginTop:" 3px"}}>
                  <NavLink style={{display:"flex",gap:"10px",width:"16vw",padding:"4px",paddingLeft:"15px",fontSize:"0.9rem",color:"#2a2e34"}}
                    to={`/projects/${project._id}`}
                    className={context.activeButton === 2?activeProject === project : 'submenu-active' ? 'remove':""} //final
                    onClick={() => handleProjectClick(project._id, project.projectName)}
                  >
                 {project.projectName}
                  </NavLink>
                </li>
              ))
          )}
        


          
          </li>

        <Modal title="Add Project" visible={isSidebarModalOpen} onOk={handleSidebarOk} onCancel={handleSidebarCancel}>
          <Form layout="vertical">
            <Form.Item label="Project Name" required>
              <Input value={projectsName} onChange={(e) => setProjectsName(e.target.value)} />
            </Form.Item>
          </Form>
        </Modal>
        <li>
          <Button style={{ color: "#555151" }}
            className={`custom-button ${context.activeButton === 3 ? 'active' : ''}`}
            onClick={() => handleClick(3, '/callbacks', 'Callbacks')}
          >
           
            Callbacks
          </Button>
        </li>

        <li>
          <Button style={{ color: "#555151" }}
            className={`custom-button ${context.activeButton === 4 ? 'active' : ''}`}
            onClick={() => handleClick(4, '/transfers', 'Transfers')}
          >
           
            Transfers
          </Button>
        </li>

        <li>
          <Button style={{ color: "#555151" }}
            className={`custom-button ${context.activeButton === 5 ? 'active' : ''}`}
            onClick={() => handleClick(5, '/employee-sales', 'Sales')}
          >
            
            Sales
          </Button>
        </li>

        <li>
          <Button style={{ color: "#555151" }}
            className={`custom-button ${context.activeButton === 6 ? 'active' : ''}`}
            onClick={() => handleClick(6, '/employee-notes', 'Notes')}
          >
          
            Notes
          </Button>
        </li>
        <li>
          <Button style={{ color: "#555151" }}
            className={`custom-button ${context.activeButton === 7 ? 'active' : ''}`}
            onClick={() => handleClick(7, '/employee-msg', 'Messages')}
          >
          
            Send Messages
          </Button>
        </li>
        {/* Add other buttons similarly */}
      </ul>
    </div>
  );
};


const UserProfileDrawer = ({ open, onClose }) => {
  const { styles } = useStyle();
  const [form] = Form.useForm();
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate()
  
  const [name, setName] = useState("");
  const [aliceName, setAliceName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("Day");
  const [isToggle, setIsToggle] = useState(false);
  const [activeButton, setActiveButton] = useState(0);

  const [EmployeeData, setEmployeeData] = useState([]);
  const [EmployeeTasks, setEmployeeTasks] = useState([]);

  console.log("user", user);
  console.log("employeData", EmployeeData);
  const handleSubmit = async () => {
    console.log("Backend API URL:", import.meta.env.VITE_BACKEND_API);
    try {
      console.log("hello22");

      await form.validateFields();
      console.log("hello");
      const payload = {
        name,
        aliceName,
        email,
        phone,
        password,
        type,
      };
      console.log("payload", payload);
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/registeruser`,
        payload
      );

      console.log("res", res);
      toast.success(res.data, {});
      setName("");
      setAliceName("");
      setEmail("");
      setPhone("");
      setPassword("");
      onClose();
    } catch (error) {
      if (error.response) {
        toast.warning(error.response.data, {});
      } else {
        console.log("Validation failed:", error);
      }
    }
  };

  const handleLogout = async() => {
    localStorage.removeItem("user");
    Cookies.remove("token");
    onClose()
    // await new Promise((resolve) => setTimeout(resolve, 100));
    navigate("/Login");
    window.location.reload()
  };

  // antd Styling
  const classNames = {
    body: styles["my-drawer-body"],
    mask: styles["my-drawer-mask"],
    header: styles["my-drawer-header"],
    footer: styles["my-drawer-footer"],
    content: styles["my-drawer-content"],
  };
  const drawerStyles = {};

  const emailValidator = (_, value) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value || emailPattern.test(value)) {
      return Promise.resolve();
    }
    toast.error("Please enter a valid email address.");
    return Promise.reject(new Error("Please enter a valid email address."));
  };

  const minLengthValidator = (minLength) => (_, value) => {
    if (!value || value.length >= minLength) {
      return Promise.resolve();
    }
    toast.error(`Minimum length should be ${minLength} characters.`);
    return Promise.reject(
      new Error(`Minimum length should be ${minLength} characters.`)
    );
  };

  const data = {
    name: "Kajal Gupta",
    image: image1,
  };

  const getEmployeeTaskData = async () => {
    console.log("user._id");
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/tasks/${user._id}`
      );
      setEmployeeData(response.data);
      const assignedTasks = response.data.reduce((tasks, project) => {
        const userTasks = project.tasks.filter(
          (task) => task.assigneeId === user._id
        );
        return tasks.concat(userTasks);
      }, []);
      console.log("assignedTasks", assignedTasks);
      setEmployeeTasks(assignedTasks);
    } catch (err) {
      console.log("catch error ", err);
    }
  };

  console.log("employeData", EmployeeData);
  const handleToggle = () => {
    setIsToggle(!isToggle);
  };

  useEffect(() => {
    getEmployeeTaskData();
  }, []);

  return (
    <div className="drawerPage">
      <Drawer
        title={
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ display: "flex" }}>
              <div
                className="profileBtn d-flex"
                style={{
                  background: "#efe9e9",
                  padding: "7px",
                  width: "42px",
                  height: "42px",
                  borderRadius: "20px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <button
                  className="rounded-circle1"
                  style={{
                    width: "35px !important",
                    padding: "10px",
                    height: "30px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#bba399",
                    color: "#fff",
                    border: "none",
                  }}
                  onClick={handleToggle}
                >
                  {user?.name && user.name.charAt(0).toUpperCase()}
                </button>
              </div>
              <div
                className="d-flex align-items-center gap-1"
                style={{ height: "50px" }}
              >
                <h6
                  style={{
                    fontSize: "1rem",
                    opacity: "0.99",
                    paddingLeft: "5px",
                  }}
                  className="mt-2 mx-auto"
                >
                  {user?.name && user.name.toUpperCase()}
                </h6>
              </div>
            </div>
            <div
              className="logout-btn "
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
               
              className="custom-btn btn-5"
              
              onClick={() =>  handleLogout()}
              >Logout</Button>
            </div>
          </div>
        }
        width={650}
        onClose={onClose}
        open={open}
        classNames={classNames}
        styles={drawerStyles}
        bodyStyle={{
          paddingBottom: 80,
        }}
      >
        <div className="projectDrawer">
          <Form form={form} layout="vertical">
            <ul
              class="nav nav-pills nav-underline"
              id="pills-tab1"
              role="tablist"
            >
              <li class="nav-item " role="presentation">
                <button
                  class="nav-link active nav-underline px-3"
                  id="pills-activity"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-activity-home"
                  type="button"
                  role="tab"
                  aria-controls="pills-home"
                  aria-selected="true"
                >
                  Activity
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link px-3"
                  id="pills-mywork"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-mywork-home"
                  type="button"
                  role="tab"
                  aria-controls="pills-contact"
                  aria-selected="false"
                >
                  My Work
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link px-3"
                  id="pills-assignedwork"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-assignedwork-home"
                  type="button"
                  role="tab"
                  aria-controls="pills-contact"
                  aria-selected="false"
                >
                  {" "}
                  Newly Assigned Task
                </button>
              </li>
            </ul>
            <div
              style={{ borderBottom: "1px solid #ddd9d9", paddingTop: "3px " }}
            ></div>

            <div className="tab-content all-projects" id="pills-tabContent">
              <div
                className="tab-pane fade show active table-responsive"
                id="pills-activity-home"
                role="tabpanel"
                aria-labelledby="pills-activity-home"
                tabindex="0"
              >
                <div>
                  <div
                    className="d-flex justify-content-start gap-4 mx-5 mt-4"
                    style={{ flexDirection: "column" }}
                  >
                    {EmployeeData?.map((itemData, i) => {
                      return (
                        <>
                          <div>
                            <p
                              style={{
                                fontSize: "0.9rem",
                                letterSpacing: "0.6px",
                                color: "#2b2828",
                              }}
                            >
                              Project Name : {itemData.projectName}
                            </p>
                          </div>
                          {EmployeeTasks.map((itemTask) => {
                            return (
                              <div
                                className="all-project-list"
                                style={{
                                  border: "1px solid #ccc",
                                  padding: "10px",
                                  lineHeight: "20px",
                                  color: "gray",
                                  fontSize: "0.8rem",
                                  height: "auto",
                                  borderRadius: "6px",
                                  boxShadow: "0 0 7px #b4b2b2",
                                }}
                              >
                                <p>
                                  {" "}
                                  <span style={{ paddingRight: "5px" }}>
                                    <svg
                                      width="12px"
                                      height="12px"
                                      viewBox="0 0 16 16"
                                      version="1.1"
                                      xmlns="http://www.w3.org/2000/svg"
                                      xmlns:xlink="http://www.w3.org/1999/xlink"
                                      fill="#000000"
                                    >
                                      <g
                                        id="SVGRepo_bgCarrier"
                                        stroke-width="0"
                                      ></g>
                                      <g
                                        id="SVGRepo_tracerCarrier"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      ></g>
                                      <g id="SVGRepo_iconCarrier">
                                        {" "}
                                        <path
                                          fill="#87909E"
                                          d="M8 4c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z"
                                        ></path>{" "}
                                        <path
                                          fill="#87909E"
                                          d="M8 1c3.9 0 7 3.1 7 7s-3.1 7-7 7-7-3.1-7-7 3.1-7 7-7zM8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8v0z"
                                        ></path>{" "}
                                      </g>
                                    </svg>{" "}
                                  </span>{" "}
                                  {itemTask.taskname || "Task Name"}
                                </p>

                                <p>
                                  {" "}
                                 
                                  {itemTask.assigneeName || "Assignee"}
                                </p>
                                <p>
                                  {" "}
                                
                                  Deadline: {itemTask.deadline}
                                </p>

                                <p>
                                  {" "}
                                
                                  Priority: {itemTask.priority}
                                </p>

                                <p>
                                  {" "}
                                 
                                  Status: {itemTask.status}
                                </p>
                              </div>
                            );
                          })}
                        </>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="pills-mywork-home"
                role="tabpanel"
                aria-labelledby="pills-mywork-tab"
              >
                <div className="my-5">
                  <div className="d-flex justify-content-start gap-4 mx-5 mt-4">
                    <ul
                      class="nav nav-pills mb-3"
                      id="pills-tab"
                      role="tablist"
                    >
                      <li class="nav-item" role="presentation">
                        <button
                          class="nav-link active"
                          id="pills-home-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-home"
                          type="button"
                          role="tab"
                          aria-controls="pills-home"
                          aria-selected="true"
                        >
                          Todays Work
                        </button>
                      </li>
                      <li class="nav-item" role="presentation">
                        <button
                          class="nav-link"
                          id="pills-profile-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-profile"
                          type="button"
                          role="tab"
                          aria-controls="pills-profile"
                          aria-selected="false"
                        >
                          Due Work
                        </button>
                      </li>
                      <li class="nav-item" role="presentation">
                        <button
                          class="nav-link"
                          id="pills-contact-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-contact"
                          type="button"
                          role="tab"
                          aria-controls="pills-contact"
                          aria-selected="false"
                        >
                          Next
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="pills-assignedwork-home"
                role="tabpanel"
                aria-labelledby="pills-assignedwork-tab"
              >
                <div className="my-5">
                  <div className="d-flex justify-content-start gap-4 mx-3 mt-4">
                    <ul
                      class="nav nav-pills mb-3"
                      id="pills-tab"
                      role="tablist"
                    >
                      <li class="nav-item" role="presentation">
                        <button
                          class="nav-link active"
                          id="pills-home-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-home"
                          type="button"
                          role="tab"
                          aria-controls="pills-home"
                          aria-selected="true"
                        >
                          All New Projects
                        </button>
                      </li>
               
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="fixed-bottom d-flex justify-content-end mx-5">
              <Space className="text-center d-flex  my-4 gap-4">
                <Button
                  onClick={handleSubmit}
                  className="buttonFilled"
                  type="primary"
                >
                  Submit
                </Button>
                <Button className="buttonLine" type="button" onClick={onClose}>
                  Cancel
                </Button>
              </Space>
            </div>
          </Form>
        </div>
      </Drawer>
    </div>
  );
};












































// Prjects submenu code 

import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Modal, Button, Input, Form, Row, Col, Select, message } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";

const initialData = {
  lists: [
    { id: "list1", title: "Pending", items: [] },
    { id: "list2", title: "In Progress", items: [] },
    { id: "list3", title: "Completed", items: [] },
  ],
};

const ProjectList = () => {
  const { id } = useParams();
  const [data, setData] = useState(initialData);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [currentStatus, setCurrentStatus] = useState("pending");
  const [modalOpened, setModalOpened] = useState(false);

  const [newSubList, setNewSubList] = useState({
    TaskName: "",
    AsigneeName: "",
    AsigneeId: "",
    DeadLine: "",
    comments: "",
    priority: "",
    docsName:"",
    Status: "Pending",
  });

  const [currentListId, setCurrentListId] = useState(null);

  const [docss, setdocss] = useState([]);

  const [docsDatas, setDocsDatas] = useState("");
  const [uploadedDocs, setUploadedDocs] = useState();



  const handleSubmit = async () => {
    const formData = new FormData();
    docsDatas.trim() !== "" && formData.append("docsName", docsDatas);
    if (docss) {
      formData.append("docs", docss);
    }
    console.log("docs", docsDatas, docss);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/docs`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("response", response); // Log the response from the server
      message.success("docs uploaded successfully");
    } catch (err) {
      console.log(err);
    }
  };

  const getDocsData = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_API}/docs`);
      console.log("res", res.data);
      setUploadedDocs(res.data)
    } catch (err) {
      console.log(err);
    }
  };

  const onDragEnd = async (result) => {
    const { destination, source } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const startList = data.lists.find((list) => list.id === source.droppableId);
    const finishList = data.lists.find(
      (list) => list.id === destination.droppableId
    );

    const draggedItem = startList.items[source.index];
    const newStatus = finishList.title; // Status based on destination list's title
    console.log("draggedItem", draggedItem);
    if (startList === finishList) {
      const newItems = Array.from(startList.items);
      newItems.splice(source.index, 1);
      newItems.splice(destination.index, 0, {
        ...draggedItem,
        Status: draggedItem.Status,
      });

      const newList = { ...startList, items: newItems };
      const newData = {
        ...data,
        lists: data.lists.map((list) =>
          list.id === newList.id ? newList : list
        ),
      };

      setData(newData);
      return;
    }

    // Remove item from startList
    const startItems = Array.from(startList.items);
    startItems.splice(source.index, 1);

    // Add item to finishList with updated status
    const finishItems = Array.from(finishList.items);
    finishItems.splice(destination.index, 0, {
      ...draggedItem,
      Status: newStatus,
    });

    const newStartList = { ...startList, items: startItems };
    const newFinishList = { ...finishList, items: finishItems };

    const newData = {
      ...data,
      lists: data.lists.map((list) => {
        if (list.id === newStartList.id) return newStartList;
        if (list.id === newFinishList.id) return newFinishList;
        return list;
      }),
    };

    console.log("newData", newData);

    setData(newData);

    // Update newSubList with the new status
    setNewSubList((prev) => {
      const updatedSubList = { ...prev, Status: newStatus };

      // Call API to update status on server
      if (draggedItem.id) {
        updateTaskOnServer(draggedItem.id, newStatus);
      }

      return updatedSubList;
    });
  };

  const updateTaskOnServer = async (taskId, newStatus) => {
    let payload = {};
    console.log(newStatus, taskId);
    newSubList.TaskName && (payload.taskname = newSubList.TaskName);
    newSubList.AsigneeName && (payload.assigneeName = newSubList.AsigneeName);
    newSubList.AsigneeName && (payload.assigneeId = newSubList.AsigneeId);
    newSubList.DeadLine && (payload.deadline = newSubList.DeadLine);
    newSubList.comments && (payload.comments = newSubList.comments);
    newSubList.priority && (payload.priority = newSubList.priority);
    newStatus && (payload.status = newStatus);

    try {
      console.log("paylaod", payload);
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_API}/tasks/${taskId}`,
        payload
      );

      console.log("Task status updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const handleStatusChanges = () => {
    setCurrentStatus();
  };
  const handleAddSubList = (listId) => {
    setCurrentListId(listId);
    setModalIsOpen(true);
  };

  const showModals = () => {
    setModalOpened(true);
  };
  const handleOk = () => {
    setModalOpened(false);
  };
  const handleCancel = () => {
    setModalOpened(false);
  };

  const handleSaveSubList = async () => {
    console.log("newSubList", newSubList);
    try {
      const newTaskData = {
        taskname: newSubList.TaskName,
        assigneeName: newSubList.AsigneeName,
        assigneeId: newSubList.AsigneeId,
        deadline: newSubList.DeadLine,
        comments: newSubList.comments,
        priority: newSubList.priority,
        status: newSubList.Status,
        docsName: newSubList.docsName,
      };
      console.log("newTaskData", newTaskData);
      await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/projects/${id}`,
        newTaskData
      );
      // Call getProjectsData to refresh the data
      await getProjectsData();
      // Reset modal and newSubList state
      setModalIsOpen(false);
      setNewSubList({
        TaskName: "",
        AsigneeName: "",
        DeadLine: "",
        comments: "",
        priority: "",
        docsName:"",
        Status: "",
      });
    } catch (error) {
      console.error("Error saving task data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSubList({ ...newSubList, [name]: value });
  };

  const handleSelectChange = (selectedUser) => {
    console.log("Selected user:", selectedUser);
    setNewSubList((prev) => ({
      ...prev,
      AsigneeName: selectedUser.name,
      AsigneeId: selectedUser.id,
    }));
  };
  console.log("");
  const handleSelectPriority = (value) => {
    console.log("hello");
    setNewSubList((prev) => ({ ...prev, priority: value }));
    console.log("newSubList", newSubList);
  };

  // set data for project
  const [userdata, setUserData] = useState([]);
  const getUsersData = async () => {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_API}/alluser`);

    setUserData(res.data);
  };

  const getProjectsData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/projects/${id}`
      );
      const tasks = response.data.tasks;

      // Define a function to categorize tasks into lists
      const categorizeTask = (task) => {
        if (task.status === "Completed") return "list3";
        if (task.status === "In Progress") return "list2";
        return "list1";
      };

      // Create a copy of initialData to avoid mutating the original state
      const newData = { ...initialData };
      // Iterate over tasks and add them to the appropriate list based on their status
      tasks.forEach((task) => {
        const listId = categorizeTask(task);

        const subList = {
          id: task._id,
          content: (
            <div
              key={task._id}
              style={{
                fontSize: "0.8rem",
                fontWeight: "300",
                lineHeight: "10px",
                letterSpacing: "0.7px",
              }}
            >
              <h6 style={{ fontWeight: "300", fontSize: "0.9rem" }}>
              
                {task.taskname || "task "}
              </h6>
              <p style={{ paddingTop: "10px" }}>
              
                {task.assigneeName || "kjl gpt"}
              </p>

              <p>
              
                {task.DeadLine || "01-01-24"}
              </p>
              <p
                style={{ color: task.priority === "pending" ? "red" : "green" }}
              >
                <svg
                  height="12px"
                  width="12px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M5 1C4.44772 1 4 1.44772 4 2V22C4 22.5523 4.44772 23 5 23C5.55228 23 6 22.5523 6 22V14H19C19.3603 14 19.6927 13.8062 19.8702 13.4927C20.0477 13.1792 20.0429 12.7944 19.8575 12.4855L17.1662 8L19.8575 3.5145C20.0429 3.20556 20.0477 2.82081 19.8702 2.5073C19.6927 2.19379 19.3603 2 19 2H6V2C6 1.44772 5.55228 1 5 1ZM14.198 6L16.0277 9H6V6H14.198ZM16.0277 11L14.198 14H6V11H16.0277Z"
                      fill="#000000"
                    ></path>
                  </g>
                </svg>
                {task.priority || "priority"}
              </p>
              <p className="d-flex align-items-start gap-1">
                <span style={{ paddingRight: "5px" }}>
                  <svg
                    fill="#000000"
                    height="12px"
                    width="12px"
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 456.368 456.368"
                    xmlSpace="preserve"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <g>
                        <g>
                          <g>
                            <path d="M324.194,220.526c-6.172,7.772-13.106,14.947-21.07,21.423c45.459,26.076,76.149,75.1,76.149,131.158 c0,30.29-66.367,54.018-151.09,54.018s-151.09-23.728-151.09-54.018c0-56.058,30.69-105.082,76.149-131.158 c-7.963-6.476-14.897-13.65-21.07-21.423c-50.624,31.969-84.322,88.41-84.322,152.581c0,19.439,10.644,46.53,61.355,65.201 c31.632,11.647,73.886,18.06,118.979,18.06c45.093,0,87.347-6.413,118.979-18.06c50.71-18.671,61.355-45.762,61.355-65.201 C408.516,308.936,374.818,252.495,324.194,220.526z"></path>
                            <path d="M228.182,239.795c56.833,0,100.597-54.936,100.597-119.897C328.779,54.907,284.993,0,228.182,0 c-56.833,0-100.597,54.936-100.597,119.897C127.585,184.888,171.372,239.795,228.182,239.795z M228.182,29.243 c39.344,0,71.354,40.667,71.354,90.654s-32.01,90.654-71.354,90.654s-71.354-40.667-71.354-90.654S188.838,29.243,228.182,29.243 z"></path>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                </span>
                <textarea
                  rows="4"
                  className="p-1"
                  style={{ border: "none", backgroundColor: "#dcdde387" }}
                  cols="25"
                  placeholder={task.comments || "Comments"}
                ></textarea>
              </p>
            </div>
          ),
        };
        newData.lists = newData.lists.map((list) =>
          list.id === listId
            ? { ...list, items: [...list.items, subList] }
            : list
        );
      });
      setData(newData);

      // Update state with the new task data
      setTaskList(tasks);
    } catch (error) {
      console.error("Error fetching project data:", error);
    }
  };
  console.log("prjectsdata", data);

  useEffect(() => {
    getUsersData();
    getProjectsData();
    getDocsData();
  }, []);

  useEffect(() => {
    getProjectsData();
  }, [id]);

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="projects-list-heading ">
          <ul>
            <li>
              <button>
                {" "}
                <span style={{ paddingRight: "5px" }}>
                  <svg
                    width="15px"
                    height="20px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M3 7C3 6.44772 3.44772 6 4 6H20C20.5523 6 21 6.44772 21 7C21 7.55228 20.5523 8 20 8H4C3.44772 8 3 7.55228 3 7ZM6 12C6 11.4477 6.44772 11 7 11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H7C6.44772 13 6 12.5523 6 12ZM9 17C9 16.4477 9.44772 16 10 16H14C14.5523 16 15 16.4477 15 17C15 17.5523 14.5523 18 14 18H10C9.44772 18 9 17.5523 9 17Z"
                        fill="#616161"
                      ></path>{" "}
                    </g>
                  </svg>
                </span>{" "}
                Filter
              </button>
            </li>
            <li>
              <button>
                <span style={{ paddingRight: "5px" }}>
                  <svg
                    viewBox="0 0 24 24"
                    width="15px"
                    height="20px"
                    fill="#616161"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#616161"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M13 12H21M13 8H21M13 16H21M6 7V17M6 17L3 14M6 17L9 14"
                        stroke="#616161"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>{" "}
                    </g>
                  </svg>
                </span>{" "}
                Sort
              </button>
            </li>
            <li>
              <button>
                {" "}
                <span style={{ paddingRight: "5px" }}>
                  <svg
                    width="15px"
                    height="20px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#616161"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                        stroke="#616161"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>{" "}
                      <path
                        d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
                        stroke="#616161"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>{" "}
                    </g>
                  </svg>
                </span>{" "}
                Me mode
              </button>
            </li>
            <li>
              <button>
                {" "}
                <span style={{ paddingRight: "5px" }}>
                  <svg
                    width="12px"
                    height="19px"
                    fill="#616161"
                    viewBox="0 0 32 32"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <title>user-profiles</title>{" "}
                      <path d="M0 26.016q0 2.496 1.76 4.224t4.256 1.76h12q2.464 0 4.224-1.76t1.76-4.224q-0.448-2.688-2.112-4.928t-4.096-3.552q2.208-2.368 2.208-5.536v-4q0-3.296-2.336-5.632t-5.664-2.368-5.664 2.368-2.336 5.632v4q0 3.168 2.208 5.536-2.4 1.344-4.064 3.552t-2.144 4.928zM4 26.016q0.672-2.592 2.944-4.288t5.056-1.696 5.056 1.696 2.944 4.288q0 0.832-0.576 1.44t-1.408 0.576h-12q-0.832 0-1.44-0.576t-0.576-1.44zM8 12.032v-4q0-1.664 1.184-2.848t2.816-1.152 2.816 1.152 1.184 2.848v4q0 1.664-1.184 2.816t-2.816 1.184-2.816-1.184-1.184-2.816zM18.208 0.224q0.896-0.224 1.792-0.224 3.328 0 5.664 2.368t2.336 5.632v4.032q0 3.168-2.208 5.504 2.4 1.344 4.096 3.584t2.112 4.896q0 2.496-1.76 4.256t-4.224 1.76h-2.784q1.888-1.632 2.496-4h0.288q0.8 0 1.408-0.576t0.576-1.44q-0.384-1.472-1.312-2.688t-2.336-2.048q-1.44-2.528-3.712-4.256 0.352-0.608 0.608-1.216 1.216-0.416 1.984-1.44t0.768-2.368v-4q0-1.312-0.768-2.336t-1.984-1.44q-0.96-2.336-3.040-4z"></path>{" "}
                    </g>
                  </svg>
                </span>{" "}
                Assignees
              </button>
            </li>
          </ul>
          <div className="add-task">
            <button onClick={showModals}>Add Task</button>
          </div>
        </div>

        <div className="project-list-container my-4">
          {data.lists.map((list, index) => (
            <Droppable droppableId={list.id} key={list.id} direction="vertical">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`list-${index + 1}`}
                >
                  <div
                    className="list-head"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <button
                      className={
                        list.id === "list1"
                          ? "btnGray"
                          : list.id === "list2"
                          ? "btnBlue"
                          : "btnGreen"
                      }
                    >
                      <span>
                        <svg width="15px" height="15px" viewBox="0 0 16 16">
                          <g>
                            <path
                              fill={list.id === "list1" ? "#87909E" : "#fff"}
                              d="M8 4c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z"
                            ></path>
                            <path
                              fill={list.id === "list1" ? "#87909E" : "#fff"}
                              d="M8 1c3.9 0 7 3.1 7 7s-3.1 7-7 7-7-3.1-7-7 3.1-7 7-7zM8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8v0z"
                            ></path>
                          </g>
                        </svg>
                      </span>
                      {list.title}
                    </button>
                    <button
                      className="addList"
                      onClick={() => handleAddSubList(list.id)}
                    >
                      +
                    </button>
                  </div>
                  {list.items.map((item, idx) => (
                    <Draggable key={item.id} draggableId={item.id} index={idx}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="list-1-sublist mx-auto"
                        >
                          {item.content}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
      <Modal
        title="Assign tasks"
        visible={modalIsOpen}
        onOk={handleSaveSubList}
        onCancel={() => setModalIsOpen(false)}
        style={{ height: "200px" }}
      >
        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={22}>
              <Form.Item>
                <Input
                  name="TaskName"
                  value={newSubList.TaskName}
                  onChange={handleChange}
                  placeholder="Enter Task Name"
                />
              </Form.Item>
            </Col>
            <Col span={22}>
              <Form.Item>
                <Select
                  placeholder="Enter Assignee Name"
                  onChange={(value) => {
                    const selectedUser = userdata.find(
                      (user) => user._id === value
                    );
                    handleSelectChange({
                      name: selectedUser.name,
                      id: selectedUser._id,
                    });
                  }}
                  virtual={false}
                  dropdownStyle={{
                    overflowY: "auto",
                    scrollBehavior: "smooth",
                  }}
                >
                  {userdata.map((item) => (
                    <Option key={item._id} value={item._id}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={22}>
              <Form.Item>
                <Input
                  name="DeadLine"
                  type="date"
                  value={newSubList.DeadLine}
                  onChange={handleChange}
                  placeholder="DeadLine"
                />
              </Form.Item>
            </Col>
            <Col span={22}>
              <Form.Item>
                <Input.TextArea
                  name="comments"
                  type="date"
                  value={newSubList.comments}
                  onChange={handleChange}
                  placeholder="Comments"
                />
              </Form.Item>
            </Col>
            <Col span={22}>
              <Form.Item>
                <Select
                  placeholder="priority"
                  //   value={newSubList.AsigneeName}
                  onChange={handleSelectPriority}
                  virtual={false}
                  dropdownStyle={{
                    overflowY: "auto",
                    scrollBehavior: "smooth",
                  }}
                >
                  <Option value="Urgent" style={{ color: "red" }}>
                    Urgent
                  </Option>
                  <Option value="High" style={{ color: "blue" }}>
                    High
                  </Option>
                  <Option value="normal" style={{ color: "#FFD700" }}>
                    normal
                  </Option>
                  <Option value="low" style={{ color: "green" }}>
                    low
                  </Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>


      <Modal
        title=""
        open={modalOpened}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="added-task">
          <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li class="nav-item" role="presentation">
              <button
                class="nav-link active"
                id="pills-home-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-home"
                type="button"
                role="tab"
                aria-controls="pills-home"
                aria-selected="true"
              >
                Task
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="pills-profile-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-profile"
                type="button"
                role="tab"
                aria-controls="pills-profile"
                aria-selected="false"
              >
                Doc
              </button>
            </li>
          </ul>

          <div className="tab-content " id="pills-tabContent">
            <div
              className="tab-pane fade show active task-name"
              id="pills-home"
              role="tabpanel"
              aria-labelledby="pills-home-tab"
              tabindex="0"
            >
              <div className="d-flex gap-3">
                <select
                  className="form-select tasks"
                  style={{ width: "170px", fontSize: "0.9rem" }}
                  aria-label="Default select example"
                >
                  <option selected> Mitro-Hsp</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
                <select
                  className="form-select tasks"
                  style={{ width: "140px", fontSize: "0.9rem" }}
                  aria-label="Default select example"
                >
                  <option selected> Task</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
              <input
                type="text"
                placeholder="Task name ot type  '/' for commands"
              />

              <p
                style={{
                  fontSize: "0.9rem",
                  marginTop: "1.5rem",
                  color: "#222",
                  letterSpacing: "0.6px",
                }}
              >
                {" "}
                <span>
                  <svg
                    height="16px"
                    width="16px"
                    fill="#000000"
                    viewBox="0 0 32 32"
                    data-name="Layer 1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <rect height="1" width="7" x="13" y="2"></rect>
                      <rect height="1" width="10" x="10" y="27"></rect>
                      <rect
                        height="1"
                        transform="translate(-10 23) rotate(-90)"
                        width="15"
                        x="-1"
                        y="16"
                      ></rect>
                      <rect
                        height="1"
                        transform="translate(8.5 38.5) rotate(-90)"
                        width="18"
                        x="14.5"
                        y="14.5"
                      ></rect>
                      <rect height="1" width="7" x="6" y="8"></rect>
                      <rect
                        height="1"
                        transform="translate(-1.05 8.18) rotate(-45)"
                        width="8.49"
                        x="5.11"
                        y="4.85"
                      ></rect>
                      <rect
                        height="1"
                        transform="translate(7 18) rotate(-90)"
                        width="7"
                        x="9"
                        y="5"
                      ></rect>
                      <rect height="1" width="10" x="12" y="29"></rect>
                      <rect
                        height="1"
                        transform="translate(8.5 42.5) rotate(-90)"
                        width="18"
                        x="16.5"
                        y="16.5"
                      ></rect>
                      <path d="M22,30V29h2a1,1,0,0,0,1-1V26h1v2a2,2,0,0,1-2,2Z"></path>
                      <path d="M20,28V27h2a1,1,0,0,0,1-1V24h1v2a2,2,0,0,1-2,2Z"></path>
                      <path d="M10,28V27H8a1,1,0,0,1-1-1V24H6v2a2,2,0,0,0,2,2Z"></path>
                      <path d="M20,2V3h2a1,1,0,0,1,1,1V6h1V4a2,2,0,0,0-2-2Z"></path>
                      <path d="M23,4V5h1a1,1,0,0,1,1,1V8h1V6a2,2,0,0,0-2-2Z"></path>
                      <path d="M12,30V29H10a1,1,0,0,1-1-1V27H8v1a2,2,0,0,0,2,2Z"></path>
                    </g>
                  </svg>
                </span>{" "}
                Add Description
              </p>

              <input
                type="text"
                placeholder="...."
                style={{ marginTop: "3px" }}
              />
              <Form layout="vertical">
                <Row gutter={16}>
                  <Col span={11}>
                    <Form.Item>
                      <Input
                        name="DeadLine"
                        type="date"
                        value={newSubList.DeadLine}
                        onChange={handleChange}
                        placeholder="DeadLine"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={11}>
                    <Form.Item>
                      <Select
                        style={{ marginTop: "14px" }}
                        placeholder="priority"
                        //   value={newSubList.AsigneeName}
                        onChange={handleSelectPriority}
                        virtual={false}
                        dropdownStyle={{
                          overflowY: "auto",
                          scrollBehavior: "smooth",
                        }}
                      >
                        <Option value="Urgent" style={{ color: "red" }}>
                          Urgent
                        </Option>
                        <Option value="High" style={{ color: "blue" }}>
                          High
                        </Option>
                        <Option value="normal" style={{ color: "#FFD700" }}>
                          normal
                        </Option>
                        <Option value="low" style={{ color: "green" }}>
                          low
                        </Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </div>
            <div
              className="tab-pane fade task-name"
              id="pills-profile"
              role="tabpanel"
              aria-labelledby="pills-profile-tab"
              tabindex="0"
            >
              <input
                type="text"
                value={docsDatas}
                onChange={(e) => setDocsDatas(e.target.value)}
                placeholder="Name this Doc..."
              />
              <input
                type="file"
                onChange={(e) => setdocss(e.target.files[0])}
                placeholder=""
              />
              <button
                style={{
                  backgroundColor: "coral",
                  color: "white",
                  padding: "3px 8px",
                  border: "none",
                  borderRadius: "3px",
                  marginRight: "10px",
                  // right:"1",
                }}
                onClick={() => handleSubmit()}
              >
                Submit Docs
              </button>
            </div>

            <div>
              <br />
              <h6>All Uploaded Docs </h6>
              {uploadedDocs?.map((item) => (
                <div key={item._id}>
                  {console.log("item.docs", item.docs)}
                  <a
                    href={`${import.meta.env.VITE_BACKEND_API}/${item.docs}`}  >  {item.docsName}
                    </a>

                    {/* <iframe src={`${import.meta.env.VITE_BACKEND_API}/${item.docs}`} width="100%" height="auto">
                    <p>Your browser does not support iframes.</p>
                     </iframe> */}
                </div>
              ))}

            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ProjectList;
