import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Language from '../components/Lang/Language';
import './HeaderAdmin.scss';

const HeaderAdmin = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { current } = useSelector((state) => state.user);
  console.log(current);
  const { username, email, confirmed } = current;

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
    navigate('/admin/login');
    // document.location.href="/admin/login"
  };

  return (
    <>
      <Language />

      {username && confirmed ? (
        <NavDropdown
          title={email}
          id='basic-nav-dropdown'>
          <NavDropdown.Item>{username}</NavDropdown.Item>
          <NavDropdown.Item onClick={handleLogOut}>LogOut</NavDropdown.Item>
          <NavDropdown.Item
            onClick={handleLogin}
            tag={Link}
            to='/admin/login'>
            Login
          </NavDropdown.Item>
        </NavDropdown>
      ) : (
        <NavDropdown
          title='Account'
          id='basic-nav-dropdown'>
          <NavDropdown.Item>Profile</NavDropdown.Item>
          <NavDropdown.Item>LogOut</NavDropdown.Item>
          <NavDropdown.Item
            onClick={handleLogin}
            tag={Link}
            to='/login'>
            Login
          </NavDropdown.Item>
        </NavDropdown>
      )}
    </>
  );
};

HeaderAdmin.propTypes = {};

export default HeaderAdmin;
