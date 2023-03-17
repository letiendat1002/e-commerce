import React from 'react';
import PropTypes from 'prop-types';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './HeaderAdmin.scss'
import Language from '../components/Lang/Language';

const HeaderAdmin = (props) => {
  return (
    <>
      <Language/>
      <NavDropdown
        title='Account'
        id='basic-nav-dropdown'>
        <NavDropdown.Item href='#action/3.1'>Profile</NavDropdown.Item>
        <NavDropdown.Item href='#action/3.2'>LogOut</NavDropdown.Item>
      </NavDropdown>
    </>
  );
};

HeaderAdmin.propTypes = {};

export default HeaderAdmin;
