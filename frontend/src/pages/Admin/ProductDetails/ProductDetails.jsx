import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

import apiService from '../../../services/apiServiceProducts';
import Loading from '../../../components/Loading/Loading';
import styles from './ProductDetails.module.scss';
let cx = classNames.bind(styles);

const ProductDetails = (props) => {
  const navigate = useNavigate();
  let { idProduct } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  const handleProductDeltails = async (id) => {
    try {
      setLoading(true);
      const response = await apiService.getDetailProduct(id);
      setProduct(response?.data[0]);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleProductDeltails(idProduct);
  }, [idProduct]);
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

  //   const handleOnChange = (newValue) => {
  //     setNew((prev) => ({
  //       ...prev,
  //       ...newValue,
  //     }));
  //   };

  return (
    <>
      {loading ? (
        <Loading />
      ) : product ? (
        <>
          {product ? (
            <Container>
              <h4 style={{ fontWeight: 'bold', margin: ' 10px 0' }}>Product Details</h4>
              <Row>
                <Form>
                  <Row className={cx('row')}>
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
                          readOnly
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
                          readOnly
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
                          readOnly
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
                          readOnly
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
                          readOnly
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={3}>
                      <Form.Group
                        className='mb-3'
                        controlId='formCategory'>
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                          type='text'
                          placeholder='Enter number category'
                          value={categoryID || ''}
                          readOnly
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
                      readOnly
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
                          readOnly
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
                          readOnly
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
                          readOnly
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
                          readOnly
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
                        <Form.Control
                          type='text'
                          placeholder='Enter year relase'
                          value={status || ''}
                          readOnly
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
                          readOnly
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
                          readOnly
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
                          readOnly
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
                          readOnly
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
                          readOnly
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
                          readOnly
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
                          readOnly
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
                          readOnly
                          disabled
                        />
                      </Form.Group>
                      <div className={cx('image-preview')}>
                        {imageReview1 ? (
                          <img
                            src={require(`../../../assets/images/${imageReview1}`)}
                            alt='Logo'
                          />
                        ) : (
                          <span>Upload File Image</span>
                        )}
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
                          readOnly
                          disabled
                        />
                      </Form.Group>
                      <div className={cx('image-preview')}>
                        {imageReview2 ? (
                          <img
                            src={require(`../../../assets/images/${imageReview2}`)}
                            alt='Logo'
                          />
                        ) : (
                          <span>Upload File Image</span>
                        )}
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
                          readOnly
                          disabled
                        />
                      </Form.Group>
                      <div className={cx('image-preview')}>
                        {imageReview3 ? (
                          <img
                            src={require(`../../../assets/images/${imageReview3}`)}
                            alt='Logo'
                          />
                        ) : (
                          <span>Upload File Image</span>
                        )}
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
                          type='file'
                          name='ImageMain'
                          readOnly
                          disabled
                        />
                      </Form.Group>
                    </Col>

                    <div className={cx('image-preview')}>
                      {image ? (
                        <img
                          src={require(`../../../assets/images/${image}`)}
                          alt='Logo'
                        />
                      ) : (
                        <span>Upload File Image</span>
                      )}
                    </div>
                  </Row>

                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      variant='primary'
                      type='submit'
                      className='my-3'
                      onClick={() => {
                        navigate('/admin/manage-products');
                      }}>
                      Back
                    </Button>
                  </div>
                </Form>
              </Row>
            </Container>
          ) : (
            <div>Data not found</div>
          )}
        </>
      ) : (
        <div>Data not found</div>
      )}
    </>
  );
};

ProductDetails.propTypes = {};

export default ProductDetails;
