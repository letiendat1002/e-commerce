import React from 'react';
import PropTypes from 'prop-types';

const NotFoundProduct = ({ debouce }) => {
  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',padding:'20px'}}>
      <div style={{padding:'5px',display:'flex',alignItems:'center'}}>Ố ồ! Không có sản phẩm Linkking nào cho từ khóa "{debouce}"</div>
      <img
        src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/a60759ad1dabe909c46a817ecbf71878.png'
        alt='Logo'
        style={{ height: '40px', width: '40px' }}
      />
    </div>
  );
};

NotFoundProduct.propTypes = {};

export default NotFoundProduct;
