import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { AiFillPlusCircle } from 'react-icons/ai';
import ModalCreateUser from '../ModalCreateUser/ModalCreateUser'
import './ManageUser.scss'

const MangeUser = props => {
    const [show, setShow] = useState(false);
  return (
    <div className='manage-user-container'>
      <div className='title'>Manage User</div>

      <div className='user-content'>
        <div className='btn-add-new'>
          {/* <button className='btn btn-primary' onClick={handleOpen}><AiFillPlusCircle/>Manage User</button> */}
          <button className='btn btn-primary' onClick={e =>setShow(true)}><AiFillPlusCircle/>Manage User</button>
        </div>

        <div className='table-users-container'>
          Table User
        </div>
        {/* <ModalCreateUser show={show} handleClose={handleClose} /> */}
        <ModalCreateUser show={show} setShow={setShow} />
      </div>
    </div>
  )
}

MangeUser.propTypes = {}

export default MangeUser