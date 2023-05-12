import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Select, Space } from 'antd';
import apiService from '../../../services/apiServiceProducts';
import classNames from 'classnames/bind';

import styles from './UpdateProduct.module.scss';
import './UpdateProduct.scss';
import { Image } from 'antd';
import { CiCircleRemove } from 'react-icons/ci';
let cx = classNames.bind(styles);
const UpdateProduct = (props) => {
  let { idProduct } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({});
  const [imageMain, setImageMain] = useState('');
  const [imageRv1, setImageRv1] = useState('');
  const [imageRv2, setImageRv2] = useState('');
  const [imageRv3, setImageRv3] = useState('');
  const [prImageMain, setPrImageMain] = useState('');
  const [prImageRV1, setPrImageRV1] = useState('');
  const [prImageRV2, setPrImageRV2] = useState('');
  const [prImageRV3, setPrImageRV3] = useState('');
  const [prevSlug, setPrevSlug] = useState('');

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

  // fileInputRefMain.current=image

  console.log(fileInputRefMain)
  const handleDeleteImageMain = () => {
    setPrImageMain('');
    setImageMain('');
    // fileInputRefMain.current.value = '';
    setProduct((prev) => ({
      ...prev,
      image: '',
    }));
  };
  const handleDeleteImageRv1 = () => {
    setPrImageRV1('');
    setImageRv1('');
    // fileInputRefRv1.current.value = '';
    setProduct((prev) => ({
      ...prev,
      imageReview1: '',
    }));
  };
  const handleDeleteImageRv2 = () => {
    setPrImageRV2('');
    setImageRv2('');
    // fileInputRefRv2.current.value = '';
    setProduct((prev) => ({
      ...prev,
      imageReview2: '',
    }));
  };
  const handleDeleteImageRv3 = () => {
    setPrImageRV3('');
    setImageRv3('');
    // fileInputRefRv3.current.value = '';
    setProduct((prev) => ({
      ...prev,
      imageReview3: '',
    }));
  };

  const handleOnChange = (newValue) => {
    convertSlug(slug);
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

  const handleProductDeltails = async (id) => {
    const response = await apiService.getDetailProduct(id);
    setProduct(response?.data[0]);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const response = await apiService.putProduct(idProduct, product);
    if (response.status === 200) {
      toast.success(response.message);
      navigate('/admin/manage-products');
    } else {
      toast.error(response.message);
    }

    // console.log(product);
  };

  console.log(product);

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
    console.log('Upload', e.target.files[0]);
  };

  useEffect(() => {
    handleProductDeltails(idProduct);
  }, [idProduct]);

  return (
    <>
      {product ? (
        <Container>
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
                      // defaultValue="Latop"
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
                      type='file'
                      name='ImageRV1'
                      onChange={(e) => handleUploadImage(e)}
                    />
                  </Form.Group>
                  <div className={cx('image-preview')}>
                    {imageReview1 ? (
                      <Image
                        className={cx('image-preview1')}
                        src={require(`../../../assets/images/${imageReview1}`)}
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
                      type='file'
                      name='ImageRV2'
                      onChange={(e) => handleUploadImage(e)}
                    />
                  </Form.Group>
                  <div className={cx('image-preview')}>
                    {imageReview2 ? (
                      <Image
                        className={cx('image-preview1')}
                        src={require(`../../../assets/images/${imageReview2}`)}
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
                      type='file'
                      name='ImageRV3'
                      onChange={(e) => handleUploadImage(e)}
                    />
                  </Form.Group>
                  <div className={cx('image-preview')}>
                    {imageReview3 ? (
                      <Image
                        className={cx('image-preview1')}
                        src={require(`../../../assets/images/${imageReview3}`)}
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
                      // value={image}
                      type='file'
                      name='ImageMain'
                      onChange={(e) => handleUploadImage(e)}
                    />
                  </Form.Group>
                </Col>

                <div
                  style={{ display: 'flex', justifyContent: 'center' }}
                  className={cx('image-preview')}>
                  {image ? (
                    <Image
                      className={cx('image-preview1')}
                      src={require(`../../../assets/images/${image}`)}
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
                  className='m-3 px-4'
                  onClick={handleBackButtonClick}>
                  Back
                </Button>
                <Button
                  variant='success'
                  type='submit'
                  onClick={(e) => handleUpdate(e)}
                  className='m-3'>
                  Update
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

UpdateProduct.propTypes = {};

export default UpdateProduct;
