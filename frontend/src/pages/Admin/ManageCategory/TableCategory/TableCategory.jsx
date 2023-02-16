import './TableCategory.scss'

import { GrEdit, GrFormTrash, GrFormView } from 'react-icons/gr';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import Table from 'react-bootstrap/Table';

const TableCategory = (props) => {
  const {
    categoryList,
    setShowModalUpdateCategory,
    setDataCategory,
    setShowModalDelete,
    setDataDelete,
  } = props;
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [categotyPerPage, setCategotyPerPage] = useState(5);

  const lastIdx = currentPage * categotyPerPage;
  const firstIdx = lastIdx - categotyPerPage;
  const newData = categoryList?.slice(firstIdx, lastIdx);
  const totalPage = Math?.ceil(categoryList?.length / categotyPerPage);

  const handlePageClick = (e) => {
    setCurrentPage(+e.selected + 1);
  };

  const handleShowCategory = (x) => {
    setDataCategory(x);
    setShowModalUpdateCategory(true);
  };

  const handleShowModalDelete = (x) => {
    setDataDelete(x);
    setShowModalDelete(true);
  };

  return (
    <>
      <div className='table-responsive my-3 '>
        <Table
          striped
          bordered
          hover
          className='table_users'>
          <thead>
            <tr>
              <th
                scope='col'
                className='text-center'>
                No
              </th>
              <th
                scope='col'
                className='text-center'>
                Name
              </th>
              <th
                scope='col'
                className='text-center'>
                Slug
              </th>
              <th
                scope='col'
                className='text-center'>
                Action
              </th>
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
                    <th
                      scope='row'
                      className='text-center'>
                      {idx + 1}
                    </th>
                    <td>{x.name.charAt(0).toUpperCase() + x.name.slice(1)}</td>
                    <td>{x.slug}</td>
                    <td>
                      <button
                        className='btn btn-info'
                        onClick={() => {
                          navigate(`/admin/manage-categories/${x.categoryID}`);
                        }}>
                        <GrFormView /> Products
                        {/* <Link to={`${x.categoryID}`}>View Product</Link> */}
                      </button>
                      <button
                        className='btn btn-success mx-3'
                        onClick={() => handleShowCategory(x)}>
                        <GrEdit />
                      </button>
                      <button
                        className='btn btn-danger'
                        onClick={() => handleShowModalDelete(x)}>
                        <GrFormTrash />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </Table>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
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
      </div>

      {/* <PaginatedItems  />, */}
    </>
  );
};

TableCategory.propTypes = {};

export default TableCategory;
