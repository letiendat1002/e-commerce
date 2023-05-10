import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import apiService from '../../../../services/apiServiceProducts';
const ModalDeleteProduct = (props) => {
  const { setShowDeleteModal, setSetShowDeleteModal, dataDelete,callApiProdcuts } = props;

  const handleClose = () => {
    setSetShowDeleteModal(false);
  };

  const handleSubmitDelete = async () => {
    let data = await apiService.deleteProduct(dataDelete.productID);
    if (data && data.status === 200) {
      callApiProdcuts()
      toast.success(data.message);
      handleClose();
      }

    if (data && data.status !== 200) {
      toast.error(data.message);
    }
  };
  return (
    <>
      <Modal
        show={setShowDeleteModal}
        onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Do you to delete this email ???</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Do you want delete: {dataDelete.name && dataDelete.name ? dataDelete.name : ''}
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

ModalDeleteProduct.propTypes = {};

export default ModalDeleteProduct;
