import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import { AiFillPlusCircle } from 'react-icons/ai';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { putUpdateUser } from '../../../../services/apiServiceUser';

const ModalViewUser = (props) => {
  const { showModalViewUser, setShowModalViewUser, data1 } = props;

  const handleClose = () => {
    setShowModalViewUser(false);
    // setEmail('');
    // setRole('');
    // setUsername('');
    // setImage('');
    // setPassword('');
    // setPreviewImage('');
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [image, setImage] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');

  let checkAdmin;
  if (data1.roles) {
    checkAdmin = data1?.roles.includes('ROLE_ADMIN');
  }

  // console.log(checkAdmin);
  // if (checkAdmin === true) {
  //   console.log(data1?.roles[14]);
  //   setRole(data1?.roles[14]);
  // }
  useEffect(() => {
    if (!_.isEmpty(data1)) {
      if (!_.isEmpty(data1)) {
        if (data1.roles.includes('ROLE_ADMIN')) {
          setRole('ADMIN');
        }
        if (data1.roles.includes('ROLE_EMPLOYEE')) {
          setRole('EMPLOYEE');
        }
        if (data1.roles.includes('ROLE_SHIPPER')) {
          setRole('SHIPPER');
        }
        if (data1.roles.includes('ROLE_CUSTOMER')) {
          setRole('CUSTOMER');
        }
      }

      setEmail(data1.email);
      setUsername(data1.fullName);
      setPhone(data1?.phone);
      setGender(data1?.gender);
      setImage('');
      if (data1.image) {
        setPreviewImage(data1.image);
      }
    }
  }, [data1]);

  return (
    <div>
      <Modal
        show={showModalViewUser}
        // onHide={handleCloseModal}
        onHide={handleClose}
        size={'xl'}
        backdrop='static'
        className='modal-add-user'>
        <Modal.Header closeButton>
          <Modal.Title>Infomation User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className='row '>
            <div className='col-md-6'>
              <label
                htmlFor='inputEmail4'
                className='form-label my-2'>
                Email
              </label>
              <input
                type='email'
                className='form-control'
                id='inputEmail4'
                disabled
                value={email}
              />
            </div>

            <div className='col-md-6'>
              <label
                htmlFor='inputUsername'
                className='form-label my-2'>
                Username
              </label>
              <input
                type='text'
                className='form-control'
                id='inputUsername'
                style={{ color: username.length === 0 ? 'red' : 'black' }}
                value={username.length === 0 ? 'No data' : username}
                disabled
              />
            </div>
            <div className='col-md-6'>
              <label
                htmlFor='inputRole'
                className='form-label my-2'>
                Role
              </label>
              <select
                id='inputRole'
                className='form-select'
                value={role}
                disabled>
                <option >
                  {role}
                </option>
                {/* <option value='ADMIN'>ROLE_ADMIN</option> */}
              </select>
            </div>

            <div className='col-md-6'>
              <label
                htmlFor='inputUsername'
                className='form-label my-2'>
                Gender
              </label>
              <input
                type='text'
                className='form-control'
                id='inputUsername'
                value={gender}
                disabled
              />
            </div>

            <div className='col-md-6'>
              <label
                htmlFor='inputUsername'
                className='form-label my-2'>
                Phone Number
              </label>
              <input
                type='text'
                className='form-control'
                id='inputUsername'
                style={{ color: phone.length === 0 ? 'red' : 'black' }}
                value={phone.length === 0 ? 'No data' : phone}
                disabled
              />
            </div>

            {/* <div className='col-12'>
              <label
                htmlFor='img'
                className='form-label my-2 label-upload'>
                <AiFillPlusCircle style={{ color: 'green' }} />
                Upload File Image
              </label>
            </div> */}

            <div className='col-12 img-preview text-center my-3'>
              {previewImage ? (
                <img
                  src={previewImage}
                  alt='Logo'
                />
              ) : (
                <span>No Image</span>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='secondary'
            onClick={handleClose}>
            Close
          </Button>
          {/* <Button
            variant='primary'
            onClick={handleClose}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

ModalViewUser.propTypes = {};

export default ModalViewUser;
