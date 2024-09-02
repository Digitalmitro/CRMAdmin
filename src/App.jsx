import React from 'react';

import { createContext, useEffect, useState } from 'react'
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './Components/Pages/EmployeeDashboard'
import Header from './Components/Pages/Header'
import Sidebar from './Components/Pages/Sidebar'
import Inbox from './Components/Pages/Inbox'
import BreadcrumbsComponent from './Components/Pages/BreadcrumbsComponents'
import Attendance from './Components/Pages/Attendance'
import EmployeeAttendance from './Components/Pages/Employee/EmployeeAttendance'
import EmployeCallback from './Components/Pages/Employee/EmployeCallback'
import CallbackView from './Components/Pages/CallbackView'
import EmployeeSales from './Components/Pages/Employee/EmployeeSales'
import EmployeeTransfer from './Components/Pages/Employee/EmployeeTransfer'
import EmployeeNotepad from './Components/Pages/Employee/EmployeeNotepad'

import EmployeeActivity from './Components/Pages/Employee/EmployeeActivity'
import EmployeeUpdate from './Components/Pages/Employee/UpdateEmployee'
import EmployeeConcern from "./Components/Pages/Employee/EmployeeConcern";

import MailTemplate from "./Components/Mail/MailTemplate";
import DmMail from "./Components/Mail/TemplateView/DmMailTemp";
import EcomMail from "./Components/Mail/TemplateView/EcomMailTemp";
import SeoMail from "./Components/Mail/TemplateView/SeoMailTemp";
import SmoMail from "./Components/Mail/TemplateView/SmoMailTemp";
import BasicWebMail from "./Components/Mail/TemplateView/basicwebsite";

import Cookies from "js-cookie";
import Login from './Components/Pages/Login';
import Sales from './Components/Pages/Sales'
import EmployeeProjects from './Components/Pages/Projectsection'
import CallbackTable from './Components/Pages/CallbackTable'
import SalesView from './Components/Pages/Employee/TableView/Salesview'
import TransferView from './Components/Pages/Employee/TableView/Transferview'
import Transfers from "./Components/Pages/Transfers";
import ProjectSubMenu from './Components/Pages/ProjectSubMenu'
import EmployeeViewDashboard from "./Components/Pages/Employee/EmployeeViewDashboard";
import Doccs from './Components/Pages/docs'
import Docs from './Components/Pages/docs'
import EmpMsg from './Components/Pages/EmployeeMessage';

const MyContext = createContext()
function App() {
  const [breadcrumbs, setBreadcrumbs] = useState([{ label: 'Dashboard', path: '/' }]);
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [activeButton,setActiveButton]=useState(0)

  const Admintoken = localStorage.getItem('token');


  const value = {
    
    activeButton,
    setActiveButton,
    toggleSidebar,
    setToggleSidebar,
    breadcrumbs,
    setBreadcrumbs,
  };
  
  return (
   <>
    <MyContext.Provider value={value}>
    {Admintoken ? (
       <>
        <Header />
        <div className="main d-flex">
          <div className={`sidebar-wrapper ${toggleSidebar === true ? "toggle" : ""} `}>
            <Sidebar />
          </div>
          <div className={`main-content ${toggleSidebar === true ? "toggle" : ""}`} style={{marginTop:"4rem",marginLeft:"-2rem"}}>
            <BreadcrumbsComponent breadcrumbs={breadcrumbs}  />
            <Routes>
              <Route path={"/"} element={Admintoken ? <Dashboard /> : <Login/>} />
              {/* <Route path={"/"} element={Admintoken ? <Dashboard /> : <Navigate to="/Login"/>} /> */}
              <Route path={"/inbox"} element={<Inbox />} />
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/employeeview/attendance/:id" element={<EmployeeAttendance />} />
              <Route path="/employeeview/callback/:id" element={<EmployeCallback />} />
              <Route path="/employeeview/sales/:id" element={<EmployeeSales />} />
              <Route path="/employeeview/transfer/:id" element={<EmployeeTransfer/>} />
              <Route path="/employeeview/viewnotepad/:id" element={<EmployeeNotepad/>} />

              <Route path="/activity" element={<EmployeeActivity />} />
              <Route path="/updateemployee/:id" element={<EmployeeUpdate />} />

              <Route path="/employeeconcern" element={<EmployeeConcern />} />
              <Route path="/MailTemplate" element={<MailTemplate />} />
              <Route path="/dmMail" element={<DmMail />} />
              <Route path="/ecomMail" element={<EcomMail />} />
              <Route path="/seoMail" element={<SeoMail />} />
              <Route path="/smoMail" element={<SmoMail />} />
              <Route path="/basicwebMail" element={<BasicWebMail />} />
              <Route path="/doccuments/:id" element={<Doccs />} />
              <Route path="/doccuments" element={<Docs />} />
            



              <Route path="/employeeview/:id" element={<EmployeeViewDashboard />} />

              <Route path="/projects" element={<EmployeeProjects />} />
              <Route path="/callbacks" element={<CallbackTable />} />
              <Route path="/sales" element={<Sales />} />

              <Route path="/callbackview/:id" element={<CallbackView />} />
              <Route path="/employeemessage" element={<EmpMsg />} />

              <Route path="/salesview/:id" element={<SalesView />} />
              <Route path="/transferview/:id" element={<TransferView />} />
              <Route path="/transfers" element={<Transfers />} />
              <Route path="/projects/:id" element={<ProjectSubMenu />} />
              <Route path="*" element={<Navigate to="/login" replace />} />

            </Routes>
          </div>
        </div> 
       </>
    ):(
      <Routes>
         <Route path="*" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
      </Routes>
  )}

    </MyContext.Provider>
   </>
  )
}
export default App
export { MyContext }