import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import { ToastContainer } from 'react-toastify';
import classname from 'classnames/bind';
import 'react-toastify/dist/ReactToastify.css';
import styles from './DefaultLayout.module.scss';
import { AiOutlineVerticalAlignTop } from 'react-icons/ai';
let cx = classname.bind(styles);
const DefaultLayout = (props) => {
  const [gotop, setGotop] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setGotop(true);
      } else {
        setGotop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGoTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };
  return (
    <div style={{ position: 'relative' }}>
      <Header />
      <ToastContainer
        autoClose={2000}
        closeOnClick
        pauseOnHover={true}
      />
      <Outlet />

      {gotop && (
        <>
          <button
            className={cx('go-to-top')}
            onClick={handleGoTop}>
            <AiOutlineVerticalAlignTop />
          </button>
        </>
      )}
      <Footer />
    </div>
  );
};

DefaultLayout.propTypes = {};

export default DefaultLayout;
