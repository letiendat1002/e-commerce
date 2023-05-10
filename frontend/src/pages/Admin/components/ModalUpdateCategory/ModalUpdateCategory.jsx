import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import apiService from '../../../../services/apiServiceProducts';
const ModalUpdateCategory = ({
  showModalUpdateCategory,
  setShowModalUpdateCategory,
  dataCategory,
  setDataCategory,
  callApiCategory,
}) => {
  // setCategory(dataCategory)
  const { name, slug } = dataCategory;

  const handleOnChange = (newData) => {
    setDataCategory((prev) => ({
      ...prev,
      ...newData,
    }));
  };
  const handleClose = () => {
    setShowModalUpdateCategory(false);
  };

  const updateCategory = async () => {
    const { status, message, data } = await apiService.putCategories(dataCategory);
    if (status === 200) {
      callApiCategory();
      handleClose();
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  return (
    <>
      <Modal
        show={showModalUpdateCategory}
        onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className='mb-3'
              controlId='exampleForm.ControlInput1'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                autoFocus
                value={name}
                onChange={(e) => handleOnChange({ name: e.target.value })}
              />
            </Form.Group>
            <Form.Group
              className='mb-3'
              controlId='exampleForm.ControlInput2'>
              <Form.Label>Slug</Form.Label>
              <Form.Control
                type='text'
                placeholder='slug'
                value={slug}
                onChange={(e) => handleOnChange({ slug: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='secondary'
            onClick={handleClose}>
            Close
          </Button>
          <Button
            variant='primary'
            onClick={updateCategory}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

ModalUpdateCategory.propTypes = {};

export default ModalUpdateCategory;
