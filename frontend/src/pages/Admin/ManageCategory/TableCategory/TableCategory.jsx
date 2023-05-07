import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';

const TableCategory = (props) => {
  const { categoryList } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [categotyPerPage, setCategotyPerPage] = useState(5);

  const lastIdx = currentPage * categotyPerPage;
  const firstIdx = lastIdx - categotyPerPage;
  const newData = categoryList.slice(firstIdx, lastIdx);
  const totalPage = Math.ceil(categoryList.length / categotyPerPage);

  const handlePageClick = (e) => {
    setCurrentPage(+e.selected + 1);
  };

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
              <th scope='col'>Slug</th>
            </tr>
          </thead>
          <tbody>
            {newData && newData.length === 0 ? (
              <tr>
                <th
                  colSpan={'5'}
                  className='text-center'>
                  Data not found
                </th>
              </tr>
            ) : (
              newData &&
              newData.length > 0 &&
              newData.map((x, idx) => {
                return (
                  <tr key={idx}>
                    <th scope='row'>{idx + 1}</th>
                    <td>{x.name}</td>
                    <td>{x.slug}</td>
                    <td>
                      <button
                        className='btn btn-primary'
                        onClick={() => x}>
                        <Link to={`${x.categoryID}`}>View Product</Link>
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

        <ReactPaginate
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
      </div>

      {/* <PaginatedItems  />, */}
    </>
  );
};

TableCategory.propTypes = {};

export default TableCategory;
