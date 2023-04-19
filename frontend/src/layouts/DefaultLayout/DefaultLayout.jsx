import React from 'react'
import PropTypes from 'prop-types'
import { Outlet } from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
const DefaultLayout = props => {
  return (
      <div>
          <Header />
          <ToastContainer 
            autoClose = {2000}
            closeOnClick
            pauseOnHover = {true}
          />
          <Outlet/>
          <Footer />
    </div>
  )
}

DefaultLayout.propTypes = {}

export default DefaultLayout