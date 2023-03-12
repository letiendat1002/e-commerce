import React from 'react'
import PropTypes from 'prop-types'
import { Outlet } from 'react-router-dom'
import Header from '../Header'

const DefaultLayout = props => {
  return (
      <div>
          <Header />
          <Outlet/>
    </div>
  )
}

DefaultLayout.propTypes = {}

export default DefaultLayout