// Sidebar.jsx
import React, { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { CiHome } from "react-icons/ci";
import { GoInbox } from "react-icons/go";
import { IoDocumentTextOutline } from "react-icons/io5";
import { MdOutlineDashboard } from "react-icons/md";
import { MyContext } from "../../App";
import { NavLink, useNavigate } from "react-router-dom";
import homeicon from "../../assets/home-icon.png";
import EmployeeIcon from "../../assets/employee12.png";
import { message, Modal } from "antd";
import axios from "axios";
// -------------
import {
  Form,
  Input,
  Row,
  Col,
  Select,
  DatePicker,
  Space,
  Checkbox,
} from "antd";
// ----------

const Sidebar = () => {
  const context = useContext(MyContext);
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectsName, setProjectsName] = useState("");
  const [projects, setProjects] = useState([]);
  const [projectsData, setProjectsData] = useState([]);

  const [activeProject, setActiveProject] = useState(null);

  const [isProjectsMenuOpen, setIsProjectsMenuOpen] = useState(true);

  // ------
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [transferTo, setTransfer] = useState("");
  const [domainName, setDomain] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("USA");
  const [zipcode, setZip] = useState("");
  const [comments, setComments] = useState("");
  const [buget, setBuget] = useState("");
  const [calldate, setCalldate] = useState("");
  // ------------

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
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
    setIsModalOpen(false);
    setProjectsName("");
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
  
console.log(projectsData)


  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleProjectClick = (projectid, name) => {
    setActiveProject(projectid);
    context.setBreadcrumbs([
      { label: "Projects", path: "/" },
      { label: name, path: `/projects/${projectid}` },
    ]);
    navigate(`/projects/${projectid}`);
  };

  const handleProjectsToggle = () => {
    setIsProjectsMenuOpen(!isProjectsMenuOpen);
  };

  const handleClick = (index, path, label) => {
    context.setActiveButton(index);
    context.setBreadcrumbs([
      { label: index === 0 ? "" : "Dashboard", path: "/" },
      { label, path },
    ]);
    navigate(path);
  };

useEffect(()=>{
  getProjectsData()
},[])


  return (
    <div className="sidebar ">
      <div
        className="hide-ham"
        style={{ height: "30px", display: "flex", justifyContent: "right" }}
      >
        <Button
          className="rounded-circle1"
          onClick={() => {
            context.setToggleSidebar(!context.toggleSidebar);
          }}
        >
          <div
            style={{
              fontSize: "45px",
              paddingLeft: "25px",
              marginBottom: "10px",
            }}
          >
            <svg
              viewBox="0 0 24 24"
              width="25px"
              height="30px"
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
                  d="M11 5V19M6 8H8M6 11H8M6 14H8M6.2 19H17.8C18.9201 19 19.4802 19 19.908 18.782C20.2843 18.5903 20.5903 18.2843 20.782 17.908C21 17.4802 21 16.9201 21 15.8V8.2C21 7.0799 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V15.8C3 16.9201 3 17.4802 3.21799 17.908C3.40973 18.2843 3.71569 18.5903 4.09202 18.782C4.51984 19 5.07989 19 6.2 19Z"
                  stroke="#000000"
                  stroke-width="1.08"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  color="#4e4c4c"
                ></path>{" "}
              </g>
            </svg>
          </div>
        </Button>
      </div>
      <ul>
        <li>
          <Button
            style={{ color: "#555151" }}
            className={`custom-button  ${
              context.activeButton === 0 ? "active" : ""
            }`}
            onClick={() => handleClick(0, "/", "Dashboard")}
          >
            <span className="icon ">
              <svg
                viewBox="0 0 32 32"
                height="15px"
                width="15"
                enable-background="new 0 0 32 32"
                id="Stock_cut"
                version="1.1"
                xml:space="preserve"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                fill="#000000"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <desc></desc>{" "}
                  <g>
                    {" "}
                    <polygon
                      fill="none"
                      points="27,12 16,1 5,12 5,31 27,31 "
                      stroke="#000000"
                      stroke-linejoin="round"
                      stroke-miterlimit="10"
                      stroke-width="2"
                    ></polygon>{" "}
                    <rect
                      fill="none"
                      height="12"
                      stroke="#000000"
                      stroke-linejoin="round"
                      stroke-miterlimit="10"
                      stroke-width="2"
                      width="10"
                      x="11"
                      y="19"
                    ></rect>{" "}
                    <polyline
                      fill="none"
                      points="1,16 16,1 31,16 "
                      stroke="#000000"
                      stroke-linejoin="round"
                      stroke-miterlimit="10"
                      stroke-width="2"
                    ></polyline>{" "}
                  </g>{" "}
                </g>
              </svg>
            </span>
            Home
          </Button>
        </li>
        <li>
          <Button
            style={{ color: "#555151" }}
            className={`custom-button ${
              context.activeButton === 1 ? "active" : ""
            }`}
            onClick={() => handleClick(1, "/activity", "Activity")}
          >
            <span className="icon">
              <svg
                fill="#616161"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path d="M74.8,20.3H25.2a5,5,0,0,0-5,5V59.6a5,5,0,0,0,5,5H74.7a5,5,0,0,0,5-5V25.2A4.91,4.91,0,0,0,74.8,20.3ZM72.3,55.2a2,2,0,0,1-1.9,1.9H29.6a1.9,1.9,0,0,1-1.9-1.9V29.6a2,2,0,0,1,1.9-1.9H70.3a2,2,0,0,1,2,1.9Z"></path>
                  <path d="M41.3,72.3a5,5,0,0,0-5,5v.6a2,2,0,0,0,1.9,1.9H61.7a2,2,0,0,0,1.9-1.9v-.6a5,5,0,0,0-5-5Z"></path>
                  <circle cx="50.1" cy="37.6" r="5.8"></circle>
                  <path d="M50.2,44.4h-.4a8.83,8.83,0,0,0-8.7,7.5c0,.4.1,1.2,1.5,1.2H57.5c1.4,0,1.5-.9,1.5-1.2A9,9,0,0,0,50.2,44.4Z"></path>
                </g>
              </svg>
            </span>
            Employee Activity
          </Button>
        </li>
        <li>
          <Button
            style={{ color: "#555151" }}
            className={`custom-button ${
              context.activeButton === 2 ? "active" : ""
            }`}
            onClick={() => handleClick(2, "/attendance", "Attendance")}
          >
            <span className="icon">
              <svg
                viewBox="0 0 24 24"
                height="20px"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#000000"
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
                    stroke="#000000"
                    stroke-width="1.08"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{" "}
                  <path
                    d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
                    stroke="#000000"
                    stroke-width="1.08"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{" "}
                </g>
              </svg>
            </span>
            Attendance
          </Button>
        </li>

        <li>
          <Button
            style={{ color: "#555151" }}
            className={`custom-button ${
              context.activeButton === 3 ? "active" : ""
            }`}
            onClick={() => handleClick(3, "/projects", "Projects")}
          >
            <span className="icon">
              {isProjectsMenuOpen ? (
                <span onClick={handleProjectsToggle}>
                  <svg
                    fill="#000000"
                    width="20px"
                    height="20px"
                    viewBox="0 0 24.00 24.00"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#000000"
                    stroke-width="0.00024000000000000003"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <g data-name="Layer 2">
                        {" "}
                        <g data-name="arrow-downward">
                          {" "}
                          <rect
                            width="24"
                            height="24"
                            transform="rotate(-90 12 12)"
                            opacity="0"
                          ></rect>{" "}
                          <path d="M12 17a1.72 1.72 0 0 1-1.33-.64l-4.21-5.1a2.1 2.1 0 0 1-.26-2.21A1.76 1.76 0 0 1 7.79 8h8.42a1.76 1.76 0 0 1 1.59 1.05 2.1 2.1 0 0 1-.26 2.21l-4.21 5.1A1.72 1.72 0 0 1 12 17z"></path>{" "}
                        </g>{" "}
                      </g>{" "}
                    </g>
                  </svg>
                </span>
              ) : (
                <span
                  className="collapsed-submenu"
                  onClick={handleProjectsToggle}
                >
                  <svg
                    fill="#000000"
                    width="20px"
                    height="20px"
                    viewBox="0 0 24 24"
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
                      <g data-name="Layer 2">
                        {" "}
                        <g data-name="arrow-right">
                          {" "}
                          <rect
                            width="24"
                            height="24"
                            transform="rotate(180 12 12)"
                            opacity="0"
                          ></rect>{" "}
                          <path d="M10.46 18a2.23 2.23 0 0 1-.91-.2 1.76 1.76 0 0 1-1.05-1.59V7.79A1.76 1.76 0 0 1 9.55 6.2a2.1 2.1 0 0 1 2.21.26l5.1 4.21a1.7 1.7 0 0 1 0 2.66l-5.1 4.21a2.06 2.06 0 0 1-1.3.46z"></path>{" "}
                        </g>{" "}
                      </g>{" "}
                    </g>
                  </svg>
                </span>
              )}
            </span>
            Projects{" "}
            <span
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginLeftLeft: "12rem",
                fontSize: "1.1rem",
                width: "8vw",
              }}
              onClick={showModal}
            >
              {" "}
              +
            </span>
          </Button>
        </li>
        <li>
          <ul>
            {isProjectsMenuOpen &&
              projectsData.map((project, index) => (
                <li
                  key={index}
                  className="p-1 mx-3"
                  style={{ display: "flex", gap: "10px", marginTop: " -2px" }}
                >
                  <NavLink
                    style={{
                      display: "flex",
                      gap: "10px",
                      width: "16vw",
                      padding: "4px",
                      paddingLeft: "15px",
                      fontSize: "0.9rem",
                      color: "#2a2e34",
                    }}
                    to={`/projects/${project._id}`}
                    className={
                      context.activeButton === 2
                        ? activeProject === project
                        : "submenu-active"
                        ? "remove"
                        : ""
                    } //final
                    onClick={() => handleProjectClick(project._id, project.projectName)}
                  >
                    <span>
                      <svg
                        fill="#4e4c4c"
                        height="14px"
                        width="13px"
                        version="1.1"
                        id="Capa_1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 487.30 487.30"
                        xml:space="preserve"
                      >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <g>
                            {" "}
                            <g>
                              {" "}
                              <path d="M487.2,69.7c0,12.9-10.5,23.4-23.4,23.4h-322c-12.9,0-23.4-10.5-23.4-23.4s10.5-23.4,23.4-23.4h322.1 C476.8,46.4,487.2,56.8,487.2,69.7z M463.9,162.3H141.8c-12.9,0-23.4,10.5-23.4,23.4s10.5,23.4,23.4,23.4h322.1 c12.9,0,23.4-10.5,23.4-23.4C487.2,172.8,476.8,162.3,463.9,162.3z M463.9,278.3H141.8c-12.9,0-23.4,10.5-23.4,23.4 s10.5,23.4,23.4,23.4h322.1c12.9,0,23.4-10.5,23.4-23.4C487.2,288.8,476.8,278.3,463.9,278.3z M463.9,394.3H141.8 c-12.9,0-23.4,10.5-23.4,23.4s10.5,23.4,23.4,23.4h322.1c12.9,0,23.4-10.5,23.4-23.4C487.2,404.8,476.8,394.3,463.9,394.3z M38.9,30.8C17.4,30.8,0,48.2,0,69.7s17.4,39,38.9,39s38.9-17.5,38.9-39S60.4,30.8,38.9,30.8z M38.9,146.8 C17.4,146.8,0,164.2,0,185.7s17.4,38.9,38.9,38.9s38.9-17.4,38.9-38.9S60.4,146.8,38.9,146.8z M38.9,262.8 C17.4,262.8,0,280.2,0,301.7s17.4,38.9,38.9,38.9s38.9-17.4,38.9-38.9S60.4,262.8,38.9,262.8z M38.9,378.7 C17.4,378.7,0,396.1,0,417.6s17.4,38.9,38.9,38.9s38.9-17.4,38.9-38.9C77.8,396.2,60.4,378.7,38.9,378.7z"></path>{" "}
                            </g>{" "}
                          </g>{" "}
                        </g>
                      </svg>
                    </span>
                    {project.projectName}
                  </NavLink>
                </li>
              ))}
          </ul>
        </li>

        <Modal
          title="Add Project"
          visible={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form layout="vertical">
            <Form.Item label="Project Name" required>
              <Input
                value={projectsName}
                onChange={(e) => setProjectsName(e.target.value)}
              />
            </Form.Item>
          </Form>
        </Modal>
        <li>
          <Button
            style={{ color: "#555151" }}
            className={`custom-button ${
              context.activeButton === 4 ? "active" : ""
            }`}
            onClick={() => handleClick(4, "/callbacks", "Callbacks")}
          >
            <span className="icon">
              <svg
                width="16px"
                height="16px"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.1972 26.4267C21.1972 26.4267 24.9821 23.9627 25.7391 23.5837C26.4961 23.2046 27.3477 23.0151 27.8208 23.3941C28.5778 23.868 34.9176 28.0378 35.4853 28.4169C36.0531 28.796 36.2423 29.8384 35.58 30.8809C34.823 31.9233 31.5112 36.0932 30.0918 35.9984C28.6724 35.9984 22.1434 36.3775 10.8832 25.1947C-0.376992 13.9172 0.00150186 7.37818 0.00150186 5.95665C0.00150186 4.53511 4.07032 1.12343 5.11118 0.460046C6.15203 -0.298106 7.19289 -0.0137991 7.57139 0.554815C7.94988 1.12343 12.1133 7.47295 12.5864 8.2311C12.8703 8.70495 12.7757 9.55787 12.3972 10.316C12.0187 11.0742 9.55848 14.8649 9.55848 14.8649C9.55848 14.8649 10.2208 17.5185 14.2897 21.6883C18.4531 25.7634 21.1972 26.4267 21.1972 26.4267Z"
                  fill="#4e4c4c"
                />
                <path
                  d="M29.3344 2.83875H19.8721V6.62369H29.3344C30.3753 6.62369 31.2269 7.4753 31.2269 8.51616V17.9785H35.0118V8.51616C35.0118 5.39358 32.457 2.83875 29.3344 2.83875Z"
                  fill="#4e4c4c"
                />
                <path
                  d="M22.7109 9.46236L16.3711 4.73118L22.7109 0V9.46236Z"
                  fill="#4e4c4c"
                />
              </svg>
            </span>
            Callbacks
          </Button>
        </li>

        <li>
          <Button
            style={{ color: "#555151" }}
            className={`custom-button ${
              context.activeButton === 5 ? "active" : ""
            }`}
            onClick={() => handleClick(5, "/transfers", "Transfers")}
          >
            <span className="icon">
              <svg
                height="20px"
                width="20px"
                viewBox="0 0 43 36"
                fill="#4e4c4c"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.1972 26.4267C21.1972 26.4267 24.9821 23.9627 25.7391 23.5837C26.4961 23.2046 27.3477 23.0151 27.8208 23.3941C28.5778 23.868 34.9176 28.0378 35.4853 28.4169C36.0531 28.796 36.2423 29.8384 35.58 30.8809C34.823 31.9233 31.5112 36.0932 30.0918 35.9984C28.6724 35.9984 22.1434 36.3775 10.8832 25.1947C-0.376992 13.9172 0.00150186 7.37818 0.00150186 5.95665C0.00150186 4.53511 4.07032 1.12343 5.11118 0.460046C6.15203 -0.298106 7.19289 -0.0137991 7.57139 0.554815C7.94988 1.12343 12.1133 7.47295 12.5864 8.2311C12.8703 8.70495 12.7757 9.55787 12.3972 10.316C12.0187 11.0742 9.55848 14.8649 9.55848 14.8649C9.55848 14.8649 10.2208 17.5185 14.2897 21.6883C18.4531 25.7634 21.1972 26.4267 21.1972 26.4267Z"
                  fill="#4e4c4c"
                />
                <path
                  d="M29.0484 2.83875H38.5107V6.62369H29.0484C28.0075 6.62369 27.1559 7.4753 27.1559 8.51616V17.9785H23.371V8.51616C23.371 5.39358 25.9258 2.83875 29.0484 2.83875Z"
                  fill="#4e4c4c"
                />
                <path
                  d="M35.6719 9.46236L42.0117 4.73118L35.6719 0V9.46236Z"
                  fill="#4e4c4c"
                />
              </svg>
            </span>
            Transfers
          </Button>
        </li>

        <li>
          <Button
            style={{ color: "#555151" }}
            className={`custom-button ${
              context.activeButton === 6 ? "active" : ""
            }`}
            onClick={() => handleClick(6, "/sales", "Sales")}
          >
            <span className="icon">
              <svg
                width="25px"
                height="25px"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M41 14L24 4L7 14V34L24 44L41 34V14Z"
                  stroke="white"
                  stroke-width="4"
                  stroke-linejoin="round"
                  fill="#4e4c4c"
                />
                <path
                  d="M24 22V30M32 18V30M16 26V30"
                  stroke="white"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  fill="#4e4c4c"
                />
              </svg>
            </span>
            Sales
          </Button>
        </li>
        <li>
          <Button
            style={{ color: "#555151" }}
            className={`custom-button ${
              context.activeButton === 7 ? "active" : ""
            }`}
            onClick={() =>
              handleClick(7, "/employeeconcern", "Employee Concern")
            }
          >
            <span className="icon">
              <svg
                fill="#000000"
                viewBox="0 0 36 36"
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
                  <title>employee_line</title>{" "}
                  <g
                    id="b1a346b4-a871-40fe-88af-10f4227eef9a"
                    data-name="Layer 3"
                  >
                    {" "}
                    <path d="M16.43,16.69a7,7,0,1,1,7-7A7,7,0,0,1,16.43,16.69Zm0-11.92a5,5,0,1,0,5,5A5,5,0,0,0,16.43,4.77Z"></path>{" "}
                    <path d="M22,17.9A25.41,25.41,0,0,0,5.88,19.57a4.06,4.06,0,0,0-2.31,3.68V29.2a1,1,0,1,0,2,0V23.25a2,2,0,0,1,1.16-1.86,22.91,22.91,0,0,1,9.7-2.11,23.58,23.58,0,0,1,5.57.66Z"></path>{" "}
                    <rect x="22.14" y="27.41" width="6.14" height="1.4"></rect>{" "}
                    <path d="M33.17,21.47H28v2h4.17v8.37H18V23.47h6.3v.42a1,1,0,0,0,2,0V20a1,1,0,0,0-2,0v1.47H17a1,1,0,0,0-1,1V32.84a1,1,0,0,0,1,1H33.17a1,1,0,0,0,1-1V22.47A1,1,0,0,0,33.17,21.47Z"></path>{" "}
                  </g>{" "}
                </g>
              </svg>
            </span>
            Emp Concern
          </Button>
        </li>
        {/* <li>
          <Button style={{ color: "#555151" }}
            className={`custom-button ${context.activeButton === 8 ? 'active' : ''}`}
            onClick={() => handleClick(8, '/employeemessage', 'Messages')}
          >
            <span className="icon">


            <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 9H17M10 13H17M7 9H7.01M7 13H7.01M21 20L17.6757 18.3378C17.4237 18.2118 17.2977 18.1488 17.1656 18.1044C17.0484 18.065 16.9277 18.0365 16.8052 18.0193C16.6672 18 16.5263 18 16.2446 18H6.2C5.07989 18 4.51984 18 4.09202 17.782C3.71569 17.5903 3.40973 17.2843 3.21799 16.908C3 16.4802 3 15.9201 3 14.8V7.2C3 6.07989 3 5.51984 3.21799 5.09202C3.40973 4.71569 3.71569 4.40973 4.09202 4.21799C4.51984 4 5.0799 4 6.2 4H17.8C18.9201 4 19.4802 4 19.908 4.21799C20.2843 4.40973 20.5903 4.71569 20.782 5.09202C21 5.51984 21 6.0799 21 7.2V20Z" stroke="#4d4c4c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
            </span>
            Send Messages
          </Button>
        </li> */}
        {/* <li>
          <Button
            style={{ color: "#555151" }}
            className={`custom-button ${
              context.activeButton === 9 ? "active" : ""
            }`}
            onClick={() =>
              handleClick(9, "/mailtemplate", "Mail Template")
            }
          >
            <span className="icon">
            <svg

             viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 19H6.2C5.0799 19 4.51984 19 4.09202 18.782C3.71569 18.5903 3.40973 18.2843 3.21799 17.908C3 17.4802 3 16.9201 3 15.8V8.2C3 7.0799 3 6.51984 3.21799 6.09202C3.40973 5.71569 3.71569 5.40973 4.09202 5.21799C4.51984 5 5.0799 5 6.2 5H17.8C18.9201 5 19.4802 5 19.908 5.21799C20.2843 5.40973 20.5903 5.71569 20.782 6.09202C21 6.51984 21 7.0799 21 8.2V10M20.6067 8.26229L15.5499 11.6335C14.2669 12.4888 13.6254 12.9165 12.932 13.0827C12.3192 13.2295 11.6804 13.2295 11.0677 13.0827C10.3743 12.9165 9.73279 12.4888 8.44975 11.6335L3.14746 8.09863M14 21L16.025 20.595C16.2015 20.5597 16.2898 20.542 16.3721 20.5097C16.4452 20.4811 16.5147 20.4439 16.579 20.399C16.6516 20.3484 16.7152 20.2848 16.8426 20.1574L21 16C21.5523 15.4477 21.5523 14.5523 21 14C20.4477 13.4477 19.5523 13.4477 19 14L14.8426 18.1574C14.7152 18.2848 14.6516 18.3484 14.601 18.421C14.5561 18.4853 14.5189 18.5548 14.4903 18.6279C14.458 18.7102 14.4403 18.7985 14.405 18.975L14 21Z" stroke="rgb(78, 76, 76)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g>
             </svg>
            </span>
           Mail Template
          </Button>
        </li> */}
      </ul>
    </div>
  );
};

export default Sidebar;
