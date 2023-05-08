import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import classnames from 'classnames/bind';
import styles from './ManageCategory.module.scss';
import TableCategory from './TableCategory/TableCategory';
import categoryApi from '../../../services/apiGetCategory';
import apiService from '../../../services/apiServiceProducts';
let cx = classnames.bind(styles);

const ManageCategory = (props) => {
  const [loading, setLoading] = useState(true);
  const [categoryList, setCategoryList] = useState('');
  const [product, setProduct] = useState([]);

  const callAllProducts = async () => {
    try {
      const { status, message, data } = await apiService.getAllProducts();
      setProduct(data);
    } catch (err) {
      console.log(err);
    }
  };

  const callApiCategory = async () => {
    try {
      const { data } = await categoryApi.getAllCategory();
      setCategoryList(data);
    } catch (err) {
      console.log('Failed to fetch product', err);
    }
  };

  useEffect(() => {
    callApiCategory();
    callAllProducts();
  }, []);

  return (
    <>
      <div className='manage-products-container'>
        <div className='title'>Manage Products</div>

        <div className='products-content'>
          <div className='btn-add-new'>
            {/* <button className='btn btn-primary' onClick={handleOpen}><AiFillPlusCircle/>Manage User</button> */}
            <button
              className='btn btn-primary'
              //   onClick={(e) => setShow(true)}
            >
              {/* <AiFillPlusCircle /> */}
              Add New Products
            </button>
          </div>

          <div className='table-products-container'>
            <TableCategory
              categoryList={categoryList}
              //   countPage={countPage}
              // setCurrentPage={setCurrentPage}
              //   handlePageChange={handlePageChange}
            />
            {/* <TableUser
            data={data}
            setShowModal={handleClickBtnUpdate}
            handleClickBtnDelete={handleClickBtnDelete}
            handleClickBtnView={handleClickBtnView}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
          <Pagination
            callApiWithPaginate={callApiWithPaginate}
            pageCount={pageCount}
            setPageCount={setPageCount}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          /> */}
          </div>
        </div>
      </div>
    </>
  );
};

ManageCategory.propTypes = {};

export default ManageCategory;
