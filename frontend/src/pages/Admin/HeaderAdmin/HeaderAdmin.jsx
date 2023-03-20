import React from 'react';
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

  const isAuthenticated = useSelector((state) => state.userLogin.user.confirmed);
  const userName = useSelector((state) => state.userLogin.user);

  const { username, fullName } = userName;
  // console.log(username, fullName, isAuthenticated);
  const handleLogin = () => {
    navigate('/admin/login');
  };
  return (
    <>
      <Language />

      {isAuthenticated ? (
        <NavDropdown
          title={username}
          id='basic-nav-dropdown'>
          <NavDropdown.Item>{fullName}</NavDropdown.Item>
          <NavDropdown.Item>LogOut</NavDropdown.Item>
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
            to='/admin/login'>
            Login
          </NavDropdown.Item>
        </NavDropdown>
      )}
    </>
  );
};

HeaderAdmin.propTypes = {};

export default HeaderAdmin;
