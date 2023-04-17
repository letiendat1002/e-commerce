import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import styles from './ProductItemSearch.module.scss';
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
            <FontAwesomeIcon
              icon={faCheckCircle}
              className={cx('check')}
            />
          )}
        </h4>
        <span className={cx('username')}>{full_name}</span>
      </div>
    </div>
  );
};

ProductItemSearch.propTypes = {};

export default ProductItemSearch;
