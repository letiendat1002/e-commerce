import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';

import apiService from '../../../../services/apiServiceProducts';
const ModalAddCategory = (props) => {
  const { setShowModalAddCategory, showModalAddCategory,callApiCategory } = props;
  const [data, setData] = useState({
    name: '',
    slug: '',
  });

  const { name, slug } = data;

  const handleClose = () => {
    setShowModalAddCategory(false);
  };

  const handleOnChange = (newData) => {
    setData((prev) => ({
      ...prev,
      ...newData,
    }));
  };

  const createCategory = async () => {
    console.log(data);
    const { status, message } = await apiService.addCategories(data);

    if (status === 200) {
      toast.success(message);
      setData({
        name: '',
        slug: '',
      });
      callApiCategory()
      handleClose();
    } else {
      toast.error(message);
    }
  };
  return (
    <>
      <Modal
        show={showModalAddCategory}
        onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Category</Modal.Title>
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
            onClick={createCategory}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

ModalAddCategory.propTypes = {};

export default ModalAddCategory;
