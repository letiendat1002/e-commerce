import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table';
import { Image } from 'antd';
import ReactPaginate from 'react-paginate';
import classname from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import { GrEdit, GrFormTrash, GrFormView } from 'react-icons/gr';

import styles from './TableProducts.module.scss';
import Loading from '../../../components/Loading/Loading';
let cx = classname.bind(styles);
const TableProducts = (props) => {
  const navigate = useNavigate();
  const {
    listProducts,
    callApiProductsWithPaginate,
    setPageCount,
    countPage,
    currentPage,
    setCurrentPage,
    handlePageChange,
    loading,
    setSetShowDeleteModal,
    setDataDelete,
    newData,
    currentProduct,
  } = props;
  // console.log(listProducts);

  // const {data:listData} =listProducts

  const [image, setImage] = useState('');
  //   console.log(data);

  // const handlePageClick = (event) => {
  //   // callApiWithPaginate(+event.selected + 1);
  //   // setCurrentPage(+event.selected + 1);
  //   handlePageChange(+event.selected + 1);
  //   console.log(`User requested page number ${event.selected}`);
  // };


  const handleDelete = (x) => {
    setSetShowDeleteModal(true);
    setDataDelete(x);
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className='table-responsive-xl table '>
          <Table
            className={cx('table_users')}
            striped
            bordered
            hover>
            <thead>
              <tr>
                <th scope='col'>No</th>
                <th>Image</th>
                <th
                  scope='col'
                  className='text-center'>
                  Name
                </th>
                <th
                  scope='col'
                  className='text-center'>
                  Price
                </th>
                <th
                  scope='col'
                  className='text-center'>
                  Amount
                </th>
                <th
                  scope='col'
                  className='text-center'>
                  Year release
                </th>
                <th
                  scope='col'
                  className='text-center'>
                  Action
                </th>
                {/* <th scope='col'>Sale Price</th> */}
              </tr>
            </thead>
            <tbody>
              {currentProduct && currentProduct.length === 0 ? (
                <tr>
                  <th
                    colSpan={'5'}
                    className='text-center'>
                    No product here
                  </th>
                </tr>
              ) : (
                currentProduct &&
                currentProduct.length > 0 &&
                currentProduct.map((x, idx) => {
                  return (
                    <tr key={idx}>
                      <th scope='row'>{idx + 1}</th>
                      <td className='row_img'>
                        <Image
                          width={100}
                          src={require(`../../../assets/images/${x.image}`)}
                        />
                      </td>
                      <td>{x.name}</td>
                      <td>{x.unitPrice}</td>
                      <td>{x.quantity}</td>
                      <td>{x.yearRelease}</td>
                      <td>
                        <button
                          className='btn btn-info'
                          onClick={() => {
                            navigate(`/admin/manage-products/${x.productID}`);
                          }}>
                          <GrFormView />
                        </button>
                        <button
                          className='btn btn-success mx-3'
                          onClick={() => {
                            navigate(`/admin/manage-products/Update/${x.productID}`);
                          }}>
                          <GrEdit />
                        </button>
                        <button
                          className='btn btn-danger'
                          onClick={() => handleDelete(x)}>
                          <GrFormTrash />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </Table>
        </div>
      )}
    </>
  );
};

TableProducts.propTypes = {};

export default TableProducts;
