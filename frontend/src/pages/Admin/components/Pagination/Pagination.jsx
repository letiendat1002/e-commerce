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
}) => {
  // Invoke when user click to request another page.

  const handlePageClick = (event) => {
    callApiWithPaginate(+event.selected + 1);
    setCurrentPage(+event.selected + 1);
    console.log(`User requested page number ${event.selected}`);
  };

  return (
    <>
      <ReactPaginate
        nextLabel='Next>'
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
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
        forcePage={currentPage - 1}
      />
    </>
  );
};

Pagination.propTypes = {};

export default Pagination;
