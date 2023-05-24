import { Navigate, useNavigate } from 'react-router-dom';

import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';

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
