import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './ItemProduct.module.scss';

const cx = classNames.bind(styles);
const ItemProduct = ({ x, key, setShowResult }) => {
  const { avatar, quantity, name, productID, image, slug } = x;

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
        to={`/${slug}`}
        className={cx('link-product')}>
        <div className={cx('top-item-search')}>
          <img
            className={cx('avatar')}
            src={
              image ? require(`../../assets/images/${image}`) : 'https://via.placeholder.com/444'
            }
            // src={
            //   image
            //     ? require(`../../../../assets/images/${image}`)
            //     : 'https://via.placeholder.com/444'
            // }
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

ItemProduct.propTypes = {};

export default ItemProduct;
