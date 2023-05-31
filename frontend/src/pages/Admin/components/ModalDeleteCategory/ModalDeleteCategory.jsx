import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import apiService from '../../../../services/apiServiceProducts';
const ModalDeleteCategory = (props) => {
  const { setShowModalDelete, showModalDelete, dataDelete, callApiCategory } = props;
  const { categoryID } = dataDelete;

  const handleClose = () => {
    setShowModalDelete(false);
  };

  const handleSubmitDelete = async () => {
    let { status, message } = await apiService.deleteCategories(categoryID);
    if (status === 200) {
      toast.success(message);
      handleClose();
      callApiCategory();
    }

    if (status !== 200) {
      toast.error(message);
    }
    callApiCategory();
  };
  return (
    <>
      <Modal
        show={showModalDelete}
        onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Do you to delete this category ???</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Do you want delete category: {dataDelete.name && dataDelete.name ? dataDelete.name : ''}
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

ModalDeleteCategory.propTypes = {};

export default ModalDeleteCategory;
