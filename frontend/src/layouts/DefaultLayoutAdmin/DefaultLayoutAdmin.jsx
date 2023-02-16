import 'react-toastify/dist/ReactToastify.css';
import './DefaultLayoutAdmin.scss'

import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import { FaBars } from 'react-icons/fa';
import FormFilterProducts from '../../pages/Admin/components/FormFilterProducts/FormFilterProducts';
import HeaderAdmin from '../../pages/Admin/HeaderAdmin/HeaderAdmin';
import { Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import SearchBox from '../../pages/Admin/components/SearchBox/SearchBox';
import Sidebar from '../../pages/Admin/Sidebar';
import apiService from '../../services/apiServiceProducts';

const DefaultLayoutAdmin = (props) => {
  const [collapsed, setCollapsed] = useState(true);
  const [display, setdisplay] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    // const callProductsFilter = async () => {
    //   try {
    //     const dataProduct = await apiService.getAllProduct();
    //     // console.log(dataProduct);
    //     dispatch({
    //       type: 'PRODUCT_SUCCESS',
    //       payload: dataProduct,
    //     });
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    // callProductsFilter();
  }, [collapsed, dispatch]);

  const containerTransition = {
    enter: 'slide',
    exit: 'slide',
  };

  return (
    <>
      <div className='admin-container'>
        <div className='admin-sidebar'>
          <Sidebar
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            className={display}
          />
        </div>
        <div className='admin-content'>
          <div className='admin-header'>
            <span onClick={() => setCollapsed(!collapsed)}>
              <FaBars className='leftside' />
            </span>
            <div className='centerside'>
              <SearchBox />
            </div>

            <div className='header__admin--dropdown rightside'>
              <HeaderAdmin />
            </div>
          </div>
          <div className='admin-main'>
            <Outlet />
          </div>
        </div>
        <ToastContainer
          position='top-right'
          autoClose={1500}
          limit={2}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='light'
        />
      </div>
    </>
  );
};

DefaultLayoutAdmin.propTypes = {};

export default DefaultLayoutAdmin;
