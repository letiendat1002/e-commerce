import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
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
      </div>
    </>
  );
};

DefaultLayoutAdmin.propTypes = {};

export default DefaultLayoutAdmin;
