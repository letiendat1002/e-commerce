import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../../pages/Admin/Sidebar';
import './DefaultLayoutAdmin.scss';
import HeaderAdmin from '../../pages/Admin/HeaderAdmin/HeaderAdmin';
const DefaultLayoutAdmin = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const [display, setdisplay] = useState("");

  useEffect(() => {
    // console.log('done')
    // console.log(collapsed);
    if (collapsed === false) {
      // document.querySelector('.admin-content').style.marginLeft= "0px";
      // document.querySelector('.admin-content').style.width= "100%";
      // document.querySelector('.admin-header').style.width= "100%";
      // document.querySelector('.admin-content').style.marginLeft= "0";
    }
  }, [collapsed]);

  return (
    <>
      <div className='admin-container'>
        <div className='admin-sidebar'>
          <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} className={display} />
        </div>
        <div className='admin-content'>
          <div className='admin-header'>
            <span onClick={() => setCollapsed(!collapsed)}>
              <FaBars className='leftside' />
            </span>

            <div className='header__admin--dropdown rightside'>
              <HeaderAdmin />
            </div>
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
