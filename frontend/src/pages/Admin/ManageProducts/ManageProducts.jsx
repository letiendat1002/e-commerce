import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import TableProducts from '../TableProducts/TableProducts';
import apiService from '../../../services/apiServiceProducts';
import { useDispatch, useSelector } from 'react-redux';
import ModalDeleteProduct from '../components/ModalDeleteProduct/ModalDeleteProduct';
import Pagination from '../components/Pagination/Pagination';
import { AiFillPlusCircle } from 'react-icons/ai';
import { MdHomeFilled } from 'react-icons/md';
import classnames from 'classnames/bind';
import styles from './ManageProduct.module.scss';
import { useNavigate } from 'react-router-dom';
import { GrAddCircle, GrHome } from 'react-icons/gr';

let cx = classnames.bind(styles);
const ManageProducts = (props) => {
  const navigate = useNavigate();
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

  const countPage = Math.ceil(pagination.total / pagination.limit);

  const callApiProdcuts = async () => {
    try {
      setLoading(true);
      const { status, message, data } = await apiService.getAllProducts();
      setProductsList(data);
      setLoading(false);
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

  return (
    <>
      <div className={cx('manage-products-container')}>
        <div className='title'>Manage Products</div>

        <div className='products-content'>
          <div className={cx('btn-add-new')}>
            <button
              className='btn btn-primary'
              style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
              onClick={() => {
                navigate('/admin');
              }}>
              <GrHome/>
              Back Home
            </button>

            <button
              className='btn btn-success'
              style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
            >
              <GrAddCircle/>
              Add Products
            </button>

          </div>

          <div className={cx('table-products-container')}>
            <TableProducts
              loading={loading}
              listProducts={productsList}
              countPage={countPage}
              setSetShowDeleteModal={setSetShowDeleteModal}
              setDataDelete={setDataDelete}
              newData={newData}
              currentProduct={currentProduct}
            />
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
