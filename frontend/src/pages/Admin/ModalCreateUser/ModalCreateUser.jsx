import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal } from 'react-bootstrap'
import { AiFillPlusCircle } from 'react-icons/ai';
import './ModalCreateUser.scss';

const ModalCreateUser = props => {

    const { show, setShow } = props;

    const handleClose = () => setShow(false);
    // const handleOpen = () => setShow(true);
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('USER');
    const [img, setImg] = useState('');
    const [previewImage, setPreviewImage] = useState('');
  
    const handleUploadImage = (e) => {
      if (e.target && e.target.files && e.target.files[0]) {
        setPreviewImage(URL.createObjectURL(e.target.files[0]));
        setImg(e.target.files[0]);
      } else {
        setPreviewImage('');
      }
      console.log('Upload', e.target.files[0]);
    };
 
    const handleCreateUser = () => {
   
      let data = {
        email:email,
        password:password,
        username:username,
        role:role,
        userImg:previewImage,
      }
  
      console.log(data);
    }
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
                hmtlFor='inputPassword'>
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
                htmlFor='inputCity'
                className='form-label'>
                Username
              </label>
              <input
                type='text'
                className='form-control'
                id='inputCity'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className='col-md-4'>
              <label
                htmlFor='inputState'
                className='form-label'>
                Role
              </label>
              <select
                id='inputState'
                className='form-select'
                onChange={(e) => setRole(e.target.value)}>
                <option value='User' checked>User</option>
                <option value='Admin'>Admin</option>
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
  )
}

ModalCreateUser.propTypes = {}

export default ModalCreateUser