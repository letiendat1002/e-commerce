import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import { AiFillPlusCircle } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { createNewUser } from '../../../services/apiServiceUser';
import './ModalCreateUser.scss';

const ModalCreateUser = (props) => {
  const { show, setShow, callApi, callApiWithPaginate, setCurrentPage } = props;

  const handleClose = () => {
    setShow(false);
    setEmail('');
    setRole('USER');
    setUsername('');
    setImage('');
    setPassword('');
    setPreviewImage('');
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('USER');
  const [image, setImage] = useState('');
  const [previewImage, setPreviewImage] = useState('');

  const handleUploadImage = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
    } else {
      setPreviewImage('');
    }
    console.log('Upload', e.target.files[0]);

    console.log(image);
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleCreateUser = async () => {
    const isValidate = validateEmail(email);
    if (!isValidate) {
      // alert("Error")
      toast.error('Invalid Email');
      return;
    }

    if (!password) {
      toast.error('Invalid password');
      return;
    }

    let data = await createNewUser(email, password, username, role, image);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      // await callApi();
      setCurrentPage(1);
      await callApiWithPaginate(1);
    }
    console.log(data)

    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };
  return (
    <div>
      <Modal
        show={show}
        // onHide={handleCloseModal}
        onHide={handleClose}
        size={'xl'}
        backdrop='static'
        className='modal-add-user'>
        <Modal.Header closeButton>
          <Modal.Title>Add new user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className='row gx-5'>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

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
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

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
            <div className='col-md-4'>
              <label
                htmlFor='inputRole'
                className='form-label'>
                Role
              </label>
              <select
                id='inputRole'
                className='form-select'
                value={role}
                onChange={(e) => setRole(e.target.value)}>
                <option
                  value='USER'
                  checked>
                  USER
                </option>
                <option value='ADMIN'>ADMIN</option>
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
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

ModalCreateUser.propTypes = {};

export default ModalCreateUser;
