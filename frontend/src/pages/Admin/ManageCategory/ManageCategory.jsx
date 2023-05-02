import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import styles from './ManageCategory.module.scss';
import TableCategory from './TableCategory/TableCategory';
import categoryApi from '../../../services/apiGetCategory';
import axios from 'axios';

let cx = classnames.bind(styles);

const ManageCategory = (props) => {
  const [loading, setLoading] = useState(true);
  const [categoryList, setCategoryList] = useState('');

  useEffect(() => {
    const callApiCategory = async () => {
      try {
        const res = await categoryApi.getAllCategory();
        // const res2 = await axios.get('http://localhost:8080/api/v1/categories')
        console.log(res);
        // setCategoryList(data)
      } catch (err) {
        console.log('Failed to fetch product', err);
      }
    };
    callApiCategory();
  }, []);

  console.log(categoryList);
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
