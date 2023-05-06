import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table';
import ReactPaginate from 'react-paginate';
import classname from 'classnames/bind';

import styles from './TableProducts.module.scss';

let cx = classname.bind(styles);
const TableProducts = (props) => {
  const {
    listProducts,
    callApiProductsWithPaginate,
    setPageCount,
    countPage,
    currentPage,
    setCurrentPage,
    handlePageChange,
  } = props;
  console.log(listProducts);

  // const {data:listData} =listProducts

  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState('');
  //   console.log(data);

  // const handlePageClick = (event) => {
  //   // callApiWithPaginate(+event.selected + 1);
  //   // setCurrentPage(+event.selected + 1);
  //   handlePageChange(+event.selected + 1);
  //   console.log(`User requested page number ${event.selected}`);
  // };

  return (
    <>
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
              <th scope='col'>Price</th>
              <th scope='col'>Amount</th>
              <th scope='col'>Year release</th>
              <th scope='col'>Action</th>
              {/* <th scope='col'>Sale Price</th> */}
            </tr>
          </thead>
          <tbody>
            {listProducts && listProducts.length === 0 ? (
              <tr>
                <th
                  colSpan={'5'}
                  className='text-center'>
                  Data not found
                </th>
              </tr>
            ) : (
              listProducts &&
              listProducts.length > 0 &&
              listProducts.map((x, idx) => {
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
                    <td className={cx('th-des')}>
                      {/* <img
                        style={{ width: '50px', height: '50px' }}
                        src={require(`../../../assets/images/${x.productID}/${x.image}`)}
                        alt=''
                      /> */}
                    </td>
                    <td>
                      <button
                        className='btn btn-primary'
                        onClick={() => x}>
                        View
                      </button>
                      <button
                        className='btn btn-success mx-3'
                        onClick={() => x}>
                        Update
                      </button>
                      <button
                        className='btn btn-danger'
                        onClick={() => x}>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            )}

            {/* {data && data.length === 0 && (
              <tr>
                <th
                  colSpan={'5'}
                  className='text-center'>
                  Data not found
                </th>
              </tr>
            )} */}
          </tbody>
        </Table>

        {/* <ReactPaginate
          nextLabel='Next>'
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={countPage}
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
        /> */}
      </div>

      {/* <PaginatedItems  />, */}
    </>
  );
};

TableProducts.propTypes = {};

export default TableProducts;
