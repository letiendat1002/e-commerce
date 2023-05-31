import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import { CiCircleRemove } from 'react-icons/ci';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import { Select } from 'antd';
import apiService from '../../../../services/apiServiceProducts';
import classNames from 'classnames/bind';
import styles from './ModalAddProduct.module.scss';
import { toast } from 'react-toastify';

let cx = classNames.bind(styles);
const ModalAddProduct = (props) => {
  const navigate = useNavigate();

  const [imageMain, setImageMain] = useState('');
  const [imageRv1, setImageRv1] = useState('');
  const [imageRv2, setImageRv2] = useState('');
  const [imageRv3, setImageRv3] = useState('');
  const [prImageMain, setPrImageMain] = useState('');
  const [prImageRV1, setPrImageRV1] = useState('');
  const [prImageRV2, setPrImageRV2] = useState('');
  const [prImageRV3, setPrImageRV3] = useState('');
  const [product, setProduct] = useState({
    battery: '',
    camera: '',
    cpu: '',
    description: '',
    hardDisk: '',
    manufacturer: '',
    monitor: '',
    name: '',
    quantity: '',
    ram: '',
    slug: '',
    unitPrice: '',
    vga: '',
    yearRelease: '',
    demand: '',
    memory: '',
    discount: '',
    image: '',
    imageReview1: '',
    imageReview2: '',
    imageReview3: '',
    categoryID: 1,
    status: true,
  });

  const {
    battery,
    camera,
    cpu,
    description,
    hardDisk,
    manufacturer,
    monitor,
    name,
    quantity,
    ram,
    slug,
    unitPrice,
    vga,
    yearRelease,
    demand,
    memory,
    discount,
    categoryID,
    image,
    imageReview1,
    imageReview2,
    imageReview3,
    status,
  } = product;

  const fileInputRefMain = useRef(null);
  const fileInputRefRv1 = useRef(null);
  const fileInputRefRv2 = useRef(null);
  const fileInputRefRv3 = useRef(null);
  const handleDeleteImageMain = () => {
    setPrImageMain('');
    setImageMain('');
    fileInputRefMain.current.value = '';
    setProduct((prev) => ({
      ...prev,
      image: '',
    }));
  };
  const handleDeleteImageRv1 = () => {
    setPrImageRV1('');
    setImageRv1('');
    fileInputRefRv1.current.value = '';
    setProduct((prev) => ({
      ...prev,
      imageReview1: '',
    }));
  };
  const handleDeleteImageRv2 = () => {
    setPrImageRV2('');
    setImageRv2('');
    fileInputRefRv2.current.value = '';
    setProduct((prev) => ({
      ...prev,
      imageReview2: '',
    }));
  };
  const handleDeleteImageRv3 = () => {
    setPrImageRV3('');
    setImageRv3('');
    fileInputRefRv3.current.value = '';
    setProduct((prev) => ({
      ...prev,
      imageReview3: '',
    }));
  };

  const handleOnChange = (newValue) => {
    setProduct((prev) => ({
      ...prev,
      ...newValue,
    }));
  };

  const convertSlug = (text) => {
    const newText = text.split(' ');
    const results = newText.join('-');
    setProduct((prev) => ({
      ...prev,
      slug: results,
    }));
    return results;
  };
  const onChangeSlug = (e) => {
    convertSlug(e.target.value);
  };

  const handleOnChangeCategory = (category) => {
    console.log(category);
    setProduct((prev) => ({
      ...prev,
      categoryID: category,
    }));
  };
  const handleOnChangeStatus = (status) => {
    console.log(status);
    setProduct((prev) => ({
      ...prev,
      status: status,
    }));
  };

  function handleBackButtonClick(e) {
    e.preventDefault();
    navigate(-1);
  }

  const handleUploadImage = async (e) => {
    // console.log(e.target.name);
    if (e.target && e.target.files && e.target.files[0]) {
      if (e.target.name === 'ImageMain') {
        setPrImageMain(URL.createObjectURL(e.target.files[0]));
        setImageMain(e.target.files[0].name);
        setProduct((prev) => ({
          ...prev,
          image: e.target.files[0].name,
        }));
      } else if (e.target.name === 'ImageRV3') {
        setPrImageRV3(URL.createObjectURL(e.target.files[0]));
        setImageRv3(e.target.files[0].name);
        setProduct((prev) => ({
          ...prev,
          imageReview3: e.target.files[0].name,
        }));
      } else if (e.target.name === 'ImageRV2') {
        setPrImageRV2(URL.createObjectURL(e.target.files[0]));
        setImageRv2(e.target.files[0].name);
        setProduct((prev) => ({
          ...prev,
          imageReview2: e.target.files[0].name,
        }));
      } else if (e.target.name === 'ImageRV1') {
        setPrImageRV1(URL.createObjectURL(e.target.files[0]));
        setImageRv1(e.target.files[0].name);
        setProduct((prev) => ({
          ...prev,
          imageReview1: e.target.files[0].name,
        }));
      }
    }
    // console.log('Upload', e.target.files[0]);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    let { status, message } = await apiService.postProduct(product);
    if (status === 200) {
      toast.success(message);
      navigate('/admin/manage-products');
    } else {
      toast.error(message);
    }
    // console.log(product);
  };
  console.log(product);
  return (
    <>
      {product ? (
        <Container>
          <h4 style={{ fontWeight: 'bold', margin: '30px 0' }}>Add New Product</h4>
          <Row>
            <Form>
              <Row>
                <Col xs={6}>
                  <Form.Group
                    className='mb-3'
                    controlId='formNameProducts'>
                    <Form.Label>Name Product</Form.Label>
                    <Form.Control
                      as='textarea'
                      type='text'
                      placeholder='Enter name Product'
                      value={name || ''}
                      onChange={(e) => handleOnChange({ name: e.target.value })}
                    />
                  </Form.Group>
                </Col>
                <Col xs={6}>
                  <Form.Group
                    className='mb-3'
                    controlId='formBasicSlug'>
                    <Form.Label>Slug</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Slug'
                      value={slug || ''}
                      onChange={onChangeSlug}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col xs={4}>
                  <Form.Group
                    className='mb-3'
                    controlId='formUnitPrice'>
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter price'
                      value={unitPrice || ''}
                      onChange={(e) => handleOnChange({ unitPrice: +e.target.value })}
                    />
                  </Form.Group>
                </Col>

                <Col xs={3}>
                  <Form.Group
                    className='mb-3'
                    controlId='formQuantity'>
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter quantity'
                      value={quantity || ''}
                      onChange={(e) => handleOnChange({ quantity: +e.target.value })}
                    />
                  </Form.Group>
                </Col>

                <Col xs={2}>
                  <Form.Group
                    className='mb-3'
                    controlId=' formDiscount'>
                    <Form.Label>Discount</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter discount'
                      value={discount || ''}
                      onChange={(e) => handleOnChange({ discount: +e.target.value })}
                    />
                  </Form.Group>
                </Col>
                <Col xs={3}>
                  <Form.Group
                    className='mb-3'
                    controlId='formCategory'>
                    <Form.Label>Category</Form.Label>
                    {/* <Form.Control
                      type='text'
                      placeholder='Enter number category'
                      value={categoryID || ''}
                      onChange={(e) => handleOnChange({ categoryID: +e.target.value })}
                    /> */}

                    <Select
                      // defaultValue="Laptop"
                      value={categoryID}
                      style={{
                        width: '100%',
                      }}
                      onChange={handleOnChangeCategory}
                      options={[
                        {
                          value: 1,
                          label: 'Laptop',
                        },
                        {
                          value: 2,
                          label: 'Phone',
                        },
                        {
                          value: 3,
                          label: 'Tablet',
                        },
                        {
                          value: 4,
                          label: 'PC',
                        },
                      ]}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group
                className='mb-3'
                controlId='formBasicDescription'>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as='textarea'
                  type='text'
                  style={{ height: '100px' }}
                  placeholder='Enter description'
                  value={description || ''}
                  onChange={(e) => handleOnChange({ description: e.target.value })}
                />
                {/* <CKEditor
                    editor={ ClassicEditor }
                    data="<p>Hello from CKEditor 5!</p>"
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        console.log( { event, editor, data } );
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                /> */}
              </Form.Group>

              <Row>
                <Col xs={3}>
                  <Form.Group
                    className='mb-3'
                    controlId='formBasicyearRelease'>
                    <Form.Label>Year Release</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter year relase'
                      value={yearRelease || ''}
                      onChange={(e) => handleOnChange({ yearRelease: +e.target.value })}
                    />
                  </Form.Group>
                </Col>

                <Col xs={3}>
                  <Form.Group
                    className='mb-3'
                    controlId='formBasicManufacturer'>
                    <Form.Label>Manufacturer</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter manufacturer'
                      value={manufacturer || ''}
                      onChange={(e) => handleOnChange({ manufacturer: e.target.value })}
                    />
                  </Form.Group>
                </Col>
                <Col xs={3}>
                  <Form.Group
                    className='mb-3'
                    controlId='formBasicCpu'>
                    <Form.Label>cpu</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter cpu'
                      value={cpu || ''}
                      onChange={(e) => handleOnChange({ cpu: e.target.value })}
                    />
                  </Form.Group>
                </Col>
                <Col xs={3}>
                  <Form.Group
                    className='mb-3'
                    controlId='formBasicRam'>
                    <Form.Label>RAM</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter RAM'
                      value={ram || ''}
                      onChange={(e) => handleOnChange({ ram: e.target.value })}
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* Line 2 */}
              <Row>
                <Col xs={3}>
                  <Form.Group
                    className='mb-3'
                    controlId='formBasicStatus'>
                    <Form.Label>Status</Form.Label>
                    {/* <Form.Control
                      type='text'
                      placeholder='Enter year relase'
                      value={status || ''}
                      onChange={(e) => handleOnChange({ status: e.target.value })}
                    /> */}
                    <Select
                      defaultValue='true'
                      style={{
                        width: '100%',
                      }}
                      onChange={handleOnChangeStatus}
                      options={[
                        {
                          value: true,
                          label: 'true',
                        },
                        {
                          value: false,
                          label: 'false',
                        },
                      ]}
                    />
                  </Form.Group>
                </Col>

                <Col xs={3}>
                  <Form.Group
                    className='mb-3'
                    controlId='formBasicVGA'>
                    <Form.Label>VGA</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter VGA'
                      value={vga || ''}
                      onChange={(e) => handleOnChange({ vga: e.target.value })}
                    />
                  </Form.Group>
                </Col>
                <Col xs={3}>
                  <Form.Group
                    className='mb-3'
                    controlId='formBasicHardDisk'>
                    <Form.Label>HardDisk</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter HardDisk'
                      value={hardDisk || ''}
                      onChange={(e) => handleOnChange({ hardDisk: e.target.value })}
                    />
                  </Form.Group>
                </Col>
                <Col xs={3}>
                  <Form.Group
                    className='mb-3'
                    controlId='formBasicMonitor'>
                    <Form.Label>Monitor</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter monitor'
                      value={monitor || ''}
                      onChange={(e) => handleOnChange({ monitor: e.target.value })}
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* Line3 */}
              <Row>
                <Col xs={3}>
                  <Form.Group
                    className='mb-3'
                    controlId='formBasicDemand'>
                    <Form.Label>Demand</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter Demand'
                      value={demand || ''}
                      onChange={(e) => handleOnChange({ demand: e.target.value })}
                    />
                  </Form.Group>
                </Col>

                <Col xs={3}>
                  <Form.Group
                    className='mb-3'
                    controlId='formBasicCamera'>
                    <Form.Label>Camera</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter name camera'
                      value={camera || ''}
                      onChange={(e) => handleOnChange({ camera: e.target.value })}
                    />
                  </Form.Group>
                </Col>
                <Col xs={3}>
                  <Form.Group
                    className='mb-3'
                    controlId='formBasicBattery'>
                    <Form.Label>Battery</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter Battery'
                      value={battery || ''}
                      onChange={(e) => handleOnChange({ battery: e.target.value })}
                    />
                  </Form.Group>
                </Col>
                <Col xs={3}>
                  <Form.Group
                    className='mb-3'
                    controlId='formBasicMemory'>
                    <Form.Label>Memory</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter Memory'
                      value={memory || ''}
                      onChange={(e) => handleOnChange({ memory: e.target.value })}
                    />
                  </Form.Group>
                </Col>
                <Col xs={4}>
                  <Form.Group
                    controlId='formFile'
                    className='mb-3'>
                    <Form.Label>Image review 1</Form.Label>
                    <Form.Control
                      ref={fileInputRefRv1}
                      type='file'
                      name='ImageRV1'
                      onChange={(e) => handleUploadImage(e)}
                    />
                  </Form.Group>
                  <div className={cx('image-preview')}>
                    {prImageRV1 ? (
                      <img
                        src={prImageRV1}
                        alt='Logo'
                      />
                    ) : (
                      <span>Upload File Image</span>
                    )}
                    <CiCircleRemove
                      className={cx('delete-image')}
                      onClick={handleDeleteImageRv1}
                    />
                  </div>
                </Col>

                <Col xs={4}>
                  <Form.Group
                    controlId='formFile'
                    className='mb-3'>
                    <Form.Label>Image review 2</Form.Label>
                    <Form.Control
                      ref={fileInputRefRv2}
                      type='file'
                      name='ImageRV2'
                      onChange={(e) => handleUploadImage(e)}
                    />
                  </Form.Group>
                  <div className={cx('image-preview')}>
                    {prImageRV2 ? (
                      <img
                        src={prImageRV2}
                        alt='Logo'
                      />
                    ) : (
                      <span>Upload File Image</span>
                    )}
                    <CiCircleRemove
                      className={cx('delete-image')}
                      onClick={handleDeleteImageRv2}
                    />
                  </div>
                </Col>

                <Col xs={4}>
                  <Form.Group
                    controlId='formFile'
                    className='mb-3'>
                    <Form.Label>Image review 3</Form.Label>
                    <Form.Control
                      ref={fileInputRefRv3}
                      type='file'
                      name='ImageRV3'
                      onChange={(e) => handleUploadImage(e)}
                    />
                  </Form.Group>
                  <div className={cx('image-preview')}>
                    {prImageRV3 ? (
                      <img
                        src={prImageRV3}
                        alt='Logo'
                      />
                    ) : (
                      <span>Upload File Image</span>
                    )}
                    <CiCircleRemove
                      className={cx('delete-image')}
                      onClick={handleDeleteImageRv3}
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <Form.Group
                    controlId='formFile'
                    className='mb-3'>
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                      ref={fileInputRefMain}
                      type='file'
                      name='ImageMain'
                      onChange={(e) => handleUploadImage(e)}
                    />
                  </Form.Group>
                </Col>

                <div className={cx('image-preview')}>
                  {prImageMain ? (
                    <img
                      src={prImageMain}
                      alt='Logo'
                    />
                  ) : (
                    <span>Upload File Image</span>
                  )}
                  <CiCircleRemove
                    className={cx('delete-image')}
                    onClick={handleDeleteImageMain}
                  />
                </div>
              </Row>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant='secondary'
                  type='submit'
                  className='m-3'
                  onClick={handleBackButtonClick}>
                  Back
                </Button>
                <Button
                  variant='success'
                  type='submit'
                  onClick={(e) => handleCreate(e)}
                  className='m-3'>
                  Create
                </Button>
              </div>
            </Form>
          </Row>
        </Container>
      ) : (
        <div>Data not found</div>
      )}
    </>
  );
};

ModalAddProduct.propTypes = {};

export default ModalAddProduct;
