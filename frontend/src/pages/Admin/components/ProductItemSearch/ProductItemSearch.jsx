import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import styles from './ProductItemSearch.module.scss';
import { Link } from 'react-router-dom';
import { ShowContext } from '../SearchBox/SearchBox';
const cx = classNames.bind(styles);

const ProductItemSearch = ({ x, key, setShowResult }) => {
  const { avatar, quantity, name, productID, image } = x;
  // const { setShowResult } = useContext(ShowContext);
  // console.log(contextValue)
  const handleRedirect = (e) => {
    e.preventDefault();
    setShowResult(false);
  };
  return (
    <div
      className={cx('wrapper-items')}
      key={productID}
      onClick={handleRedirect}>
      <Link
        to={`/admin/manage-products/${productID}`}
        className={cx('link-product')}>
        <div className={cx('top-item-search')}>
          <img
            className={cx('avatar')}
            // src={avatar ? avatar : 'https://via.placeholder.com/444'}
            src={
              image
                ? require(`../../../../assets/images/${image}`)
                : 'https://via.placeholder.com/444'
            }
            alt='Avatar'
          />
          <h4 className={cx('name')}>
            <span>{name}</span>
            {/* {tick && (
            <FontAwesomeIcon
              icon={faCheckCircle}
              className={cx('check')}
            />
          )} */}
          </h4>
        </div>
        {/* <div className={cx('info')}>
        <span className={cx('username')}>{quantity}</span>
        </div> */}
      </Link>
    </div>
  );
};

ProductItemSearch.propTypes = {};

export default ProductItemSearch;
