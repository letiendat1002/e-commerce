import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
const ProtectRoutesLogin = (props) => {
  const isAuthenticated = localStorage.getItem('user');

  return (
    <>
      {isAuthenticated && isAuthenticated?.length > 0 ? <Navigate to='/' /> : <>{props.children}</>}
    </>
  );
};

ProtectRoutesLogin.propTypes = {};

export default ProtectRoutesLogin;
