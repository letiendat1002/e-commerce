import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import TableProducts from '../TableProducts/TableProducts';
import apiService from '../../../services/apiServiceProducts';
import { useDispatch, useSelector } from 'react-redux';
import ModalDeleteProduct from '../components/ModalDeleteProduct/ModalDeleteProduct';
import Pagination from '../components/Pagination/Pagination';
// import productApi from '../../../services/apiServiceProducts';

const ManageProducts = (props) => {
  const [productsList, setProductsList] = useState([]);
  const [pagination, setPagination] = useState({
    limit: 9,
    total: { data: 10 },
    page: 1,
  });
  const [loading, setLoading] = useState(true);
  const [setShowDeleteModal, setSetShowDeleteModal] = useState(false);
  const [dataDelete, setDataDelete] = useState('');
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({ _page: 1, _limit: 6 });
  // const [currentPage, setCurrentPage] = useState(1);
  const [idLastProduct, setIdLastProduct] = useState(1);
  const [productPerPage, setProductPerPage] = useState(5);

  const idxLastProduct = idLastProduct * productPerPage;
  const idxFirstProduct = idxLastProduct - productPerPage;
  const currentProduct = productsList.slice(idxFirstProduct, idxLastProduct);

  console.log(currentProduct);
  const countPage = Math.ceil(pagination.total / pagination.limit);

  const callApiProdcuts = async () => {
    try {
      setLoading(true);
      const { status, message, data } = await apiService.getAllProducts();
      setLoading(false);
      setProductsList(data);
      console.log(data);
    } catch (err) {
      console.log('Failed to fetch product', err);
    }
  };

  const lengtProduct = productsList.length;

  const newData = productsList.filter((product) => product.status === true);
  console.log(newData);

  const changePage = (number) => {
    setIdLastProduct(number);
  };

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
              setSetShowDeleteModal={setSetShowDeleteModal}
              setDataDelete={setDataDelete}
              newData={newData}
              currentProduct={currentProduct}
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

            <Pagination
              totalUsers={lengtProduct}
              userPerPage={productPerPage}
              changePage={changePage}
            />
          </div>
        </div>
      </div>
      <ModalDeleteProduct
        setShowDeleteModal={setShowDeleteModal}
        setSetShowDeleteModal={setSetShowDeleteModal}
        dataDelete={dataDelete}
        callApiProdcuts={callApiProdcuts}
      />
    </>
  );
};

ManageProducts.propTypes = {};

export default ManageProducts;
