import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Language from '../components/Lang/Language';
import './HeaderAdmin.scss';
import { logout } from '../../../Redux/slice/userSlice';

const HeaderAdmin = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { current } = useSelector((state) => state.user);
  const { username, email } = current[0];

  // const dataLocal = JSON.parse(localStorage.getItem('userLogin')) || [];
  // console.log(dataLocal);

  // const { user } = dataLocal;

  // console.log(username, fullName, isAuthenticated);
  const handleLogin = () => {
    navigate('/admin/login');
  };

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

      {email  ? (
        <NavDropdown
          title={email}
          id='basic-nav-dropdown'>
          <NavDropdown.Item>Profile</NavDropdown.Item>
          <NavDropdown.Item onClick={handleLogOut}>LogOut</NavDropdown.Item>
        </NavDropdown>
      ) : (
        <NavDropdown
          title='Account'
          id='basic-nav-dropdown'>
          <NavDropdown.Item>Profile</NavDropdown.Item>
          <NavDropdown.Item onClick={handleLogOut}>LogOut</NavDropdown.Item>
        </NavDropdown>
      )}
    </>
  );
};

HeaderAdmin.propTypes = {};

export default HeaderAdmin;
