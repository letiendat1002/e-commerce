import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import NotAuthorized from '../NotAuthorized/NotAuthorized';


const RolesBase = (props) => {
    const { current } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const checkPath = window.location.pathname.startsWith('/admin');
    const { roles } = current[0]
    const checkAdmin = roles.includes('ROLE_ADMIN')
  if (checkPath && checkAdmin === true) {
    // navigate('/admin')
      return <>{props.children}</>;
    } else {
      return <NotAuthorized />;
    }
  };
const ProtectRoutes = props => {
    const isAuthenticated = localStorage.getItem("user")

  return (
      <>
           {isAuthenticated&& isAuthenticated.length >0 ? (
        <RolesBase>
          <>{props.children}</>
        </RolesBase>
      ) : (
        <Navigate
          to='/login'
        
        />
      )}
    </>
  )
}

ProtectRoutes.propTypes = {}

export default ProtectRoutes