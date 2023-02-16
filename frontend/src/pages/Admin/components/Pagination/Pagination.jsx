import React from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import { useState, useEffect } from 'react';

const Pagination = ({
  callApiWithPaginate,
  setPageCount,
  pageCount,
  setCurrentPage,
  currentPage,
  userPerPage,
  totalUsers,
  getAllUsers,
  changePage,
}) => {
  const handlePageClick = (event) => {
    changePage(+event.selected + 1);
  };

  // useEffect(() => {
  //   getAllUsers()
  // }, []);
  const pageCount2 = Math.ceil(totalUsers / userPerPage);

  return (
    <>
      <ReactPaginate
        nextLabel='Next>'
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount2}
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
    </>
  );
};

Pagination.propTypes = {};

export default Pagination;
