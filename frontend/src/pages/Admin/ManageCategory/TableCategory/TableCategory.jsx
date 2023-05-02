import React from 'react'
import PropTypes from 'prop-types'
import Table from 'react-bootstrap/Table';
import ReactPaginate from 'react-paginate';


const TableCategory = props => {
    const { categoryList } = props
    
    console.log(categoryList)
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
            <th scope='col'>Sale Price</th>
            <th scope='col'>Description</th>
            <th scope='col'>Action</th>
            {/* <th scope='col'>Sale Price</th> */}
          </tr>
        </thead>
        <tbody>
          {categoryList && categoryList.length === 0 ? (
            <tr>
              <th
                colSpan={'5'}
                className='text-center'>
                Data not found
              </th>
            </tr>
          ) : (
            categoryList &&
            categoryList.length > 0 &&
            categoryList.map((x, idx) => {
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
                  <td>{x.originalPrice}</td>
                  <td>{x.salePrice}</td>
                  <td>{x.shortDescription}</td>
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

      <ReactPaginate
        nextLabel='Next>'
        // onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={2}
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
  )
}

TableCategory.propTypes = {}

export default TableCategory