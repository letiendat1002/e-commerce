import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import NotAuthorized from '../NotAuthorized/NotAuthorized';


const RolesBase = (props) => {
    const { current } = useSelector((state) => state.user);
    const checkPath = window.location.pathname.startsWith('/admin');
    const { roles } = current[0]
    const checkAdmin = roles.includes('ROLE_ADMIN')
    if (checkPath && checkAdmin === true) {
      return <>{props.children}</>;
    } else {
      return <NotAuthorized />;
    }
  };
const ProtectRoutes = props => {
    const isAuthenticated = localStorage.getItem("user")
    console.log(isAuthenticated)
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