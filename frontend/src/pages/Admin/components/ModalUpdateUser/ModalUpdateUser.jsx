import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import { AiFillPlusCircle } from 'react-icons/ai';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { putUpdateUser } from '../../../../services/apiServiceUser';
import './ModalUpdateUser.scss';
import { GrCheckmark } from 'react-icons/gr';

const ModalUpdateUser = (props) => {
  const {
    setShowModal,
    showUpdate,
    data1,
    resetUpdateData,
    getAllUsers,
  } = props;

  const handleClose = () => {
    setShowModal(false);
    setEmail('');
    setRole('');
    setUsername('');
    setImage('');
    setPassword('');
    setPreviewImage('');
    resetUpdateData();
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [image, setImage] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');

  useEffect(() => {
    if (!_.isEmpty(data1)) {

      if (data1.roles.includes('ROLE_ADMIN')) {
        setRole("ADMIN");        
      }
      if (data1.roles.includes('ROLE_EMPLOYEE')) {
        setRole("EMPLOYEE");        
      }
      if (data1.roles.includes('ROLE_SHIPPER')) {
        setRole("SHIPPER");        
      }
      if (data1.roles.includes('ROLE_CUSTOMER')) {
        setRole("CUSTOMER");        
      }
      setEmail(data1.email);
      setUsername(data1.fullName);
      setPhone(data1.phone);
      setGender(data1.gender);
      setImage('');
      if (data1.image) {
        setPreviewImage(data1.image);
      }
    }
  }, [data1]);

  console.log(data1);

  const handleUploadImage = async (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
      const rss = await toBase64(e.target.files[0]);
      setImage(rss);
    } else {
      setPreviewImage('');
    }
    console.log('Upload', e.target.files[0]);
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validatePhone = (phone) => {
    const phoneNumberRegex = /^(0|\+84)(\d{12})$/;
    return phoneNumberRegex.test("084"+phone)
  };

  const { userID } = data1;

  const handleCreateUser = async () => {
    const isValidate = validateEmail(email);
    if (!isValidate) {
      // alert("Error")
      toast.error('Invalid Email');
      return;
    }

    const isValidatePhone = validatePhone(phone);
    console.log(isValidatePhone)
    if (!isValidatePhone) {
      toast.error('Invalid PhoneNumber');
      return;
    }

    // if (!password) {
    //   toast.error('Invalid password');
    // }

    let data = await putUpdateUser(userID, username, gender, phone, image,role);
    console.log(data);
    if (data && data.status === 200) {
      toast.success(data.message);
      getAllUsers();
      handleClose();
    }

    if (data && data.status !== 200) {
      toast.error(data.message);
    }
  };


  return (
    <div>
      <Modal
        show={showUpdate}
        onHide={handleClose}
        size={'xl'}
        backdrop='static'
        className='modal-add-user'>
        <Modal.Header closeButton>
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className='row'>
            <div className='col-md-6'>
              <label
                htmlFor='inputEmail4'
                className='form-label'>
                Email
              </label>
              <input
                type='email'
                className='form-control'
                id='inputEmail4'
                disabled
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {/* 
            <div className='col-md-6'>
              <label
                className='form-label'
                htmlFor='inputPassword'>
                Password
              </label>
              <input
                type='password'
                className='form-control'
                id='inputPassword'
                value={password}
                disabled
                onChange={(e) => setPassword(e.target.value)}
              />
            </div> */}

            <div className='col-md-6'>
              <label
                htmlFor='inputUsername'
                className='form-label'>
                Username
              </label>
              <input
                type='text'
                className='form-control'
                id='inputUsername'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className='col-md-6'>
              <label
                htmlFor='inputUsername'
                className='form-label'>
                Phone number
              </label>
              <input
                type='text'
                className='form-control'
                id='inputUsername'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className='col-md-6'>
              <label
                htmlFor='inputRole'
                className='form-label'>
                Role
              </label>
              <select
                id='inputRole'
                className='form-select'
                // disabled
                value={role}
                onChange={(e) => setRole(e.target.value)}>
                <option value='CUSTOMER'>CUSTOMER</option>
                <option value='EMPLOYEE'>EMPLOYEE</option>
                <option value='SHIPPER'>SHIPPER</option>
              </select>
            </div>

            <div className='col-md-6'>
              <label
                htmlFor='inputGender'
                className='form-label'>
                Gender
              </label>
              <select
                id='inputRole'
                className='form-select'
                value={gender}
                onChange={(e) => setGender(e.target.value)}>
                <option value='MALE'>MALE</option>
                <option value='FEMALE'>FEMALE</option>
              </select>
            </div>

            <div className='col-12'>
              <label
                htmlFor='img'
                className='form-label label-upload'>
                <AiFillPlusCircle style={{ color: 'green' }} />
                Upload File Image
              </label>
              <input
                type='file'
                id='img'
                hidden
                onChange={(e) => handleUploadImage(e)}
              />
            </div>

            <div className='col-12 img-preview'>
              {previewImage ? (
                <img
                  src={previewImage}
                  alt='Logo'
                />
              ) : (
                <span>Upload File Image</span>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='secondary'
            // onClick={handleCloseModal}
            onClick={handleClose}>
            Close
          </Button>
          <Button
            variant='primary'
            // onClick={handleCloseModal}
            onClick={handleCreateUser}
            // onClick={handleClose}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '5px',
            }}>
            Update <GrCheckmark />
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

ModalUpdateUser.propTypes = {};

export default ModalUpdateUser;
