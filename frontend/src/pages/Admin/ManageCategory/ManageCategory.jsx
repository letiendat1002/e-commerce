import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import classnames from 'classnames/bind';
import { GrAddCircle, GrHome } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';
import TableCategory from './TableCategory/TableCategory';
import categoryApi from '../../../services/apiGetCategory';
import apiService from '../../../services/apiServiceProducts';
import styles from './ManageCategory.module.scss';
import ModalUpdateCategory from '../components/ModalUpdateCategory/ModalUpdateCategory';
import ModalAddCategory from '../components/ModalAddCategory/ModalAddCategory';
import ModalDeleteCategory from '../components/ModalDeleteCategory/ModalDeleteCategory';

let cx = classnames.bind(styles);
const ManageCategory = (props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [categoryList, setCategoryList] = useState('');
  const [product, setProduct] = useState([]);
  const [showModalUpdateCategory, setShowModalUpdateCategory] = useState(false);
  const [showModalAddCategory, setShowModalAddCategory] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [dataCategory, setDataCategory] = useState({});
  const [dataDelete, setDataDelete] = useState({});

  const callAllProducts = async () => {
    try {
      const { status, message, data } = await apiService.getAllProducts();
      setProduct(data);
    } catch (err) {
      console.log(err);
    }
  };

  const callApiCategory = async () => {
    try {
      const { data } = await categoryApi.getAllCategory();
      setCategoryList(data);
    } catch (err) {
      console.log('Failed to fetch product', err);
    }
  };

  const handleAddCategory = () => {
    setShowModalAddCategory(true)
  }

  useEffect(() => {
    callApiCategory();
    callAllProducts();
  }, []);

  return (
    <>
      <div className={cx('manage-category-container')}>
        <div className='title' style={{
          fontSize: "30px",
          fontWeight:"600",
         
        }}>Manage Category</div>

        <div className='products-content'>
          <div className={cx('btn-add-new')}>
            <button
              className='btn btn-primary'
              style={{ display: 'flex', alignItems: 'center', gap: '5px',padding: "8px 20px", backgroundColor: "#0a3b97", color: "#ffffff", fontSize: "18px",
        borderRadius: "5px" }}
              onClick={() => {
                navigate('/admin');
              }}>
              <GrHome />
              Back Home
            </button>
            <button className='btn btn-primary' onClick={handleAddCategory} style ={{padding: "8px 20px", backgroundColor: "#0a3b97", color: "#ffffff", fontSize: "18px",
        borderRadius: "5px"}}>
              <GrAddCircle /> Add New Category
            </button>
          </div>

          <div className='table-products-container'>
            <TableCategory
              categoryList={categoryList}
              setShowModalUpdateCategory={setShowModalUpdateCategory}
              setDataCategory={setDataCategory}
              setDataDelete={setDataDelete}
              setShowModalDelete={setShowModalDelete}
            />
          </div>
        </div>
      </div>
      <ModalUpdateCategory
        showModalUpdateCategory={showModalUpdateCategory}
        setShowModalUpdateCategory={setShowModalUpdateCategory}
        dataCategory={dataCategory}
        callApiCategory={callApiCategory}
        setDataCategory={setDataCategory}
      />
      <ModalAddCategory
        showModalAddCategory={showModalAddCategory}
        setShowModalAddCategory={setShowModalAddCategory}
        callApiCategory={callApiCategory}
      />
      <ModalDeleteCategory
        showModalDelete={showModalDelete}
        setShowModalDelete={setShowModalDelete}
        dataDelete={dataDelete}
        callApiCategory={callApiCategory}
      />
    </>
  );
};

ManageCategory.propTypes = {};

export default ManageCategory;
