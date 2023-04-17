import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ClipLoader from 'react-spinners/ClipLoader';

const Loading = (props) => {
  let [color, setColor] = useState('#36d7b7');
  let [loading, setLoading] = useState(true);
  return (
    <>
      <ClipLoader
        color={color}
        size={100}
        loading={loading}
      />
    </>
  );
};

Loading.propTypes = {};

export default Loading;
