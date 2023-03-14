import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../../pages/Admin/Sidebar';
import './DefaultLayoutAdmin.scss';
const DefaultLayoutAdmin = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <>
      <div className='admin-container'>
        <div className='admin-sidebar'>
          <Sidebar collapsed={collapsed} />
        </div>
        <div className='admin-content'>
          <div className='admin-header'>
            <FaBars onClick={() => setCollapsed(!collapsed)} />
          </div>
          <div className='admin-main'>
            <Outlet />
          </div>
        </div>
        <ToastContainer
          position='top-right'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='dark'
        />
      </div>
    </>
  );
};

DefaultLayoutAdmin.propTypes = {};

export default DefaultLayoutAdmin;
