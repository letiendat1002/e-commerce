import React from 'react';
import PropTypes from 'prop-types';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
const NotAuthorized = (props) => {
  const navigate = useNavigate();
  return (
    <div>
      <Result
        status='403'
        title='403'
        subTitle='Sorry, you are not authorized to access this page.'
        extra={
          <Button
            type='primary'
            onClick={() => {
              navigate('/');
            }}>
            Back Home
          </Button>
        }
      />

      {/* <Button
        type='primary'
        onClick={() => {
          document.location.href = '/';
        }}>
        Back Home
      </Button> */}
    </div>
  );
};

NotAuthorized.propTypes = {};

export default NotAuthorized;
