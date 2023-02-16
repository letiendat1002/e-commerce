import { Navigate, useNavigate } from 'react-router-dom';

import NotAuthorized from '../NotAuthorized/NotAuthorized';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';

const RolesBase = (props) => {
  const { current } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const checkPath = window.location.pathname.startsWith('/admin');
  const checkPathSHIP = window.location.pathname.startsWith('/shipper');
  const { roles } = current[0];
  const checkAdmin = roles.includes('ROLE_ADMIN');
  const checkShipper = roles.includes('ROLE_SHIPPER');
  if (checkPath && checkAdmin === true) {
    // navigate('/admin')
    return <>{props.children}</>;
  } else if (checkPathSHIP && checkShipper === true) {
    return <>{props.children}</>;
  } else {
    return <NotAuthorized />;
  }
};
const ProtectRoutes = (props) => {
  const isAuthenticated = localStorage.getItem('user');

  return (
    <>
      {isAuthenticated && isAuthenticated.length > 0 ? (
        <RolesBase>
          <>{props.children}</>
        </RolesBase>
      ) : (
        <Navigate to='/login' />
      )}
    </>
  );
};

ProtectRoutes.propTypes = {};

export default ProtectRoutes;
