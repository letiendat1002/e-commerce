<<<<<<< HEAD
import React from 'react';
=======
import React, { useContext } from 'react';
>>>>>>> dev
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import styles from './ProductItemSearch.module.scss';
<<<<<<< HEAD
const cx = classNames.bind(styles);

const ProductItemSearch = ({ x }) => {
  const { avatar, fullname, tick, nickname, full_name } = x;
  return (
    <div className={cx('wrapper-items')}>
      <img
        className={cx('avatar')}
        src={avatar ? avatar : 'https://via.placeholder.com/444'}
        alt='Avatar'
      />
      <div className={cx('info')}>
        <h4 className={cx('name')}>
          <span>{nickname}</span>
          {tick && (
=======
import { Link } from 'react-router-dom';
import { ShowContext } from '../SearchBox/SearchBox';
const cx = classNames.bind(styles);

const ProductItemSearch = ({ x, key,setShowResult }) => {
  const { avatar, quantity, name, productID } = x;
  // const { setShowResult } = useContext(ShowContext);
  // console.log(contextValue)
  const handleRedirect = (e) => {
      // e.preventDefault()
      // setShowResult(false)
  };
  return (
    <div
      className={cx('wrapper-items')}
      key={productID}>
      <Link
        to={`/admin/manage-products/${productID}`}
        className={cx('link-product')}>
        <div className={cx('top-item-search')}
        onClick={handleRedirect}>
          <img
            className={cx('avatar')}
            src={avatar ? avatar : 'https://via.placeholder.com/444'}
            alt='Avatar'
          />
          <h4 className={cx('name')}>
            <span>{name}</span>
            {/* {tick && (
>>>>>>> dev
            <FontAwesomeIcon
              icon={faCheckCircle}
              className={cx('check')}
            />
<<<<<<< HEAD
          )}
        </h4>
        <span className={cx('username')}>{full_name}</span>
      </div>
=======
          )} */}
          </h4>
        </div>
        {/* <div className={cx('info')}>
        <span className={cx('username')}>{quantity}</span>
        </div> */}
      </Link>
>>>>>>> dev
    </div>
  );
};

ProductItemSearch.propTypes = {};

export default ProductItemSearch;
