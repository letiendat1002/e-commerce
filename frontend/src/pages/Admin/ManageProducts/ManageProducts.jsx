import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import TableProducts from '../TableProducts/TableProducts';
import apiService from '../../../services/apiServiceProducts';
import { useDispatch, useSelector } from 'react-redux';
// import productApi from '../../../services/apiServiceProducts';

const ManageProducts = (props) => {
  const [productsList, setProductsList] = useState([]);
  const [pagination, setPagination] = useState({
    limit: 9,
    total: { data: 10 },
    page: 1,
  });
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({ _page: 1, _limit: 6 });
  // const [currentPage, setCurrentPage] = useState(1);
  const countPage = Math.ceil(pagination.total / pagination.limit);


  const callApiProdcuts = async () => {
    try {
      setLoading(true)
      const {status,message,data} = await apiService.getAllProducts();
      setLoading(false)
      setProductsList(data)
    } catch (err) {
      console.log('Failed to fetch product', err);
    }
  };


  console.log(productsList)

  useEffect(() => {
    callApiProdcuts();
  }, []);


  // const handlePageChange = (page) => {
  //   setFilters((prev) => ({
  //     ...prev,
  //     _page: page,
  //   }));
  // };


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
            <TableProducts
              listProducts={productsList}
              countPage={countPage}
              // setCurrentPage={setCurrentPage}
              // handlePageChange={handlePageChange}
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

ManageProducts.propTypes = {};

export default ManageProducts;
