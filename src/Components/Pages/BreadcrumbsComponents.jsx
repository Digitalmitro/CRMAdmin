// BreadcrumbsComponent.jsx
import React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { NavLink } from 'react-router-dom';

const BreadcrumbsComponent = ({ breadcrumbs }) => {
  return (
    <>
    <Breadcrumbs className='bread-crumb' aria-label="breadcrumb" sx={{display:"flex",justifyContent:"flex-start",alignItems:"center",height:"5px",paddingLeft:"10px",fontWeight:"500",fontSize:"0.8rem",textDecoration:"none"}}>
      {breadcrumbs.map((breadcrumb, index) => (
        <Link
          key={index}
          color="inherit"
          component={NavLink}
          to={breadcrumb.path}
        >
          {breadcrumb.label}
        </Link>
      ))}
    </Breadcrumbs>
    <hr classname="hr-breadcum"  />
    </>
  );
};

export default BreadcrumbsComponent;
