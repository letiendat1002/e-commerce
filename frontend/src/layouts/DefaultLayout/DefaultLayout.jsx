import React from 'react'
import PropTypes from 'prop-types'
import { Outlet } from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'

const DefaultLayout = props => {
  return (
      <div>
          <Header />
          <Outlet/>
          {/* <Footer /> */}
    </div>
  )
}

DefaultLayout.propTypes = {}

export default DefaultLayout