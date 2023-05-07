import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteUpdateUser } from '../../../../services/apiServiceUser';
import { toast } from 'react-toastify';

const ModalDeleteUser = (props) => {
  const {
    showDelete,
    setShowModalDeleteUser,
    dataDelete,
    callApi,
    callApiWithPaginate,
    setCurrentPage,
    getAllUsers,
  } = props;
  const { userID } = dataDelete;
  // console.log(id);

  const handleClose = () => {
    setShowModalDeleteUser(false);
  };

  const handleSubmitDelete = async () => {
    let data = await deleteUpdateUser(userID);
    if (data && data.status === 200) {
      toast.success(data.message);
      getAllUsers();
      handleClose();

      // setCurrentPage(1);
      // await callApiWithPaginate(1);
    }

    if (data && data.status !== 200) {
      toast.error(data.message);
    }
  };
  return (
    <>
      <Modal
        show={showDelete}
        onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Do you to delete this email ???</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Do you want delete: {dataDelete.email && dataDelete.email ? dataDelete.email : ''}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='secondary'
            onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant='primary'
            onClick={handleSubmitDelete}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

ModalDeleteUser.propTypes = {};

export default ModalDeleteUser;
