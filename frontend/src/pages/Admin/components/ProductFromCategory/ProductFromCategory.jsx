import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import categoryApi from '../../../../services/apiGetCategory';
import apiService from '../../../../services/apiServiceProducts';
import { Link, useNavigate, useParams } from 'react-router-dom';
import classname from 'classnames/bind';
import Table from 'react-bootstrap/Table';
import styles from './ProductFromCategory.module.scss';
import ReactPaginate from 'react-paginate';

let cx = classname.bind(styles);
const ProductFromCategory = (props) => {
  const { idCategory } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [categotyPerPage, setCategotyPerPage] = useState(5);

  const newDataFilter = product.filter((product) => +product.categoryID === +idCategory);
  const lastIdx = currentPage * categotyPerPage;
  const firstIdx = lastIdx - categotyPerPage;
  const newData = newDataFilter.slice(firstIdx, lastIdx);
  const totalPage = Math.ceil(newDataFilter.length / categotyPerPage);

  const callAllProducts = async () => {
    try {
      setLoading(true);
      const { status, message, data } = await apiService.getAllProducts();
      setProduct(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  //   const callApiCategory = async () => {
  //     try {
  //       setLoading(true);
  //       const { data } = await categoryApi.getAllCategory();
  //       setCategoryList(data);
  //       setLoading(false);
  //     } catch (err) {
  //       console.log('Failed to fetch product', err);
  //     }
  //   };

  console.log(newData);

  const handlePageClick = (e) => {
    setCurrentPage(+e.selected + 1);
  };

  useEffect(() => {
    // callApiCategory();
    callAllProducts();
  }, []);
  console.log(loading);
  return (
    <>
      {loading === true ? (
        <div>Loading....</div>
      ) : (
        <div className='table-responsive my-3 '>
          <Table
            striped
            bordered
            hover
            className='table_users '>
            <thead>
              <tr>
                <th scope='col'>No</th>
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
              {newData && newData.length === 0 ? (
                <tr>
                  <th
                    colSpan={'5'}
                    className='text-center'>
                    No product here
                  </th>
                </tr>
              ) : (
                newData &&
                newData.length > 0 &&
                newData.map((x, idx) => {
                  return (
                    <tr key={idx}>
                      <th scope='row'>{idx + 1}</th>
                      {/* <td className='row_img'>
                        <img
                          style={{ width: '40px', height: '40px' }}
                          src={`data:image/jpeg;base64,${x.image}`}
                          alt=''
                        />
                      </td> */}
                      <td>{x.name}</td>
                      <td>{x.unitPrice}</td>
                      <td>{x.quantity}</td>
                      <td>{x.yearRelease}</td>

                      <td>
                        <button
                          className='btn btn-primary'
                          onClick={() => {
                            navigate(`/admin/manage-products/${x.productID}`);
                          }}>
                          View
                        </button>
                        <button
                          className='btn btn-success mx-3'
                          onClick={() => x}>
                          Update
                        </button>
                        <button
                          className='btn btn-danger'
                          //   onClick={() => handleDelete(x)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </Table>

          <ReactPaginate
            styles={{ margin: '0 auto' }}
            nextLabel='Next>'
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={totalPage}
            previousLabel='<Pre'
            pageClassName='page-item'
            pageLinkClassName='page-link'
            previousClassName='page-item'
            previousLinkClassName='page-link'
            nextClassName='page-item'
            nextLinkClassName='page-link'
            breakLabel='...'
            breakClassName='page-item'
            breakLinkClassName='page-link'
            containerClassName='pagination'
            activeClassName='active'
            renderOnZeroPageCount={null}
            // forcePage={currentPage - 1}
          />
          <button
            className='btn btn-primary'
            onClick={() => {
              navigate(-1);
            }}>
            Back
          </button>
        </div>
      )}
    </>
  );
};

ProductFromCategory.propTypes = {};

export default ProductFromCategory;
