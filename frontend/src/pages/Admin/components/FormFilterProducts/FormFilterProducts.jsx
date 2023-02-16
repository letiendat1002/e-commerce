import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import './FormFilterProducts.scss';

const FormFilterProducts = (props) => {
  const { placeholder, data } = props;
  const [searchTemp, setSearchTemp] = useState([]);

  const dataApi = useSelector((state) => state.dataProduct.productList);
  console.log(dataApi);
  let searchWord;
  const handleChangeInput = (e) => {
    searchWord = e.target.value;
    let newFilter = dataApi?.filter((value) =>
      value.name.toLowerCase().includes(searchWord.toLowerCase())
    );
    if (searchWord === '') {
      newFilter = [];
      setSearchTemp(newFilter);
    } else {
      setSearchTemp(newFilter);
    }
  };
  console.log(searchTemp);

  // useEffect(() => {}, [searchWord]);

  return (
    <div>
      <Form>
        <Form.Group
          className='inputSearch'
          controlId='formBasicFilter'>
          <Form.Control
            type='email'
            placeholder='Enter name products'
            onChange={handleChangeInput}
          />
          {searchTemp && searchTemp.length !== 0 && (
            <div className='dataResult'>
              {searchTemp.map((x, idx) => (
                <p
                  key={x.id}
                  className='dataItem'>
                  {x.name}
                </p>
              ))}
            </div>
          )}
        </Form.Group>
      </Form>
    </div>
  );
};

FormFilterProducts.propTypes = {};

export default FormFilterProducts;
