import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Popper.module.scss';
const cx = classNames.bind(styles);

const Popper = ({ children, setShowResult }) => {
  return <div className={cx('search-results')}>{children}</div>;
};

Popper.propTypes = {};

export default Popper;
