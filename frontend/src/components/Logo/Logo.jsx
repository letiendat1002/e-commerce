import React from 'react'
import { Link } from 'react-router-dom'
import './Logo.scss'
const Logo = () => {
  return (
    <Link to='/'>
    <div class="logo">
        <span>LINKKING</span>
    </div>
    </Link>
  )
}

export default Logo