import './HeaderAdmin.scss';

import { GrLogout, GrUser } from 'react-icons/gr';
import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Language from '../components/Lang/Language';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';
import PropTypes from 'prop-types';
import { logout } from '../../../Redux/slice/userSlice';

const HeaderAdmin = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { current } = useSelector((state) => state.user);
  const { username, email } = current[0];

  // const dataLocal = JSON.parse(localStorage.getItem('userLogin')) || [];
  // console.log(dataLocal);

  // const { user } = dataLocal;

  // console.log(username, fullName, isAuthenticated)

  const handleLogOut = () => {
    // dispatch(logoutAction());
    console.log('Logout');
    dispatch(logout());
    navigate('/login');
    // document.location.href="/admin/login"
  };

  return (
    <>
      <Language />

      <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
        <GrUser />
        <NavDropdown
          title={email}
          id='basic-nav-dropdown'>
          <NavDropdown.Item onClick={() => {
            navigate('/account/profile')
          }}>Profile</NavDropdown.Item>
          <NavDropdown.Item onClick={handleLogOut} style={{display:'flex',alignItems:'center',gap:'5px'}}>Logout <GrLogout/></NavDropdown.Item>
        </NavDropdown>
      </div>
    </>
  );
};

HeaderAdmin.propTypes = {};

export default HeaderAdmin;
