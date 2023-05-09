import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import apiService from '../../services/apiServiceProducts';
import Sidebar from '../../pages/Admin/Sidebar';
import HeaderAdmin from '../../pages/Admin/HeaderAdmin/HeaderAdmin';
import FormFilterProducts from '../../pages/Admin/components/FormFilterProducts/FormFilterProducts';
import './DefaultLayoutAdmin.scss';
import SearchBox from '../../pages/Admin/components/SearchBox/SearchBox';

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
  }, [collapsed,dispatch]);

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

            {/* <FormFilterProducts /> */}
            <SearchBox/>

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
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='dark'
        />
      </div>
    </>
  );
};

DefaultLayoutAdmin.propTypes = {};

export default DefaultLayoutAdmin;
