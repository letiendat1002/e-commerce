import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'

import styles from './PopoverClient.module.scss'
const cx = classNames.bind(styles);


const PopoverClient = ({children}) => {
  return (
    <div className={cx('search-results')}>{children}</div>
  )
}



PopoverClient.propTypes = {}

export default PopoverClient