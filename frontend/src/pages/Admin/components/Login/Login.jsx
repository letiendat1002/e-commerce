import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postUserLogin, login } from '../../../../services/apiServiceUser';
import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS } from '../../../../constant/userContants';
import { loginActions } from '../../../../actions/userAction';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValidate = validateEmail(identifier);
    if (!isValidate) {
      // alert("Error")
      toast.error('Invalid Email');
      return;
    }

    if (!password) {
      toast.error('Invalid password');
      return;
    }

    // try {
    //   let data = await login(identifier,password);
    //   console.log(data);
      
    //   if (data && data.user.confirmed===true) {
    //     dispatch({
    //       type: USER_LOGIN_SUCCESS,
    //       payload: data,
    //     });
    //     toast.success(data.user.role.name);
    //     navigate('/admin');
    //   }

    //   if (data && data.statusCode===400) {
    //     toast.error(data.error);
    //   }
    // } catch (err) {
    //   console.log(err);
    // }

    dispatch(loginActions(identifier, password))
    
    navigate('/admin')
  };

  return (
    <div className='login-container'>
      <h2>Login Form Admin</h2>
      <Form>
        <Form.Group
          as={Row}
          className='mb-3 '
          controlId='formPlaintextEmail'>
          <Form.Label
            column
            sm='2'>
            Email
          </Form.Label>
          <Col sm='10'>
            <Form.Control
              type='text'
              placeholder='Email'
              value={identifier}
              // onChange={(e) => setEmail(e.target.value)}
              onChange={(e) => setIdentifier(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group
          as={Row}
          className='mb-3'
          controlId='formPlaintextPassword'>
          <Form.Label
            column
            sm='2'>
            Password
          </Form.Label>
          <Col sm='10'>
            <Form.Control
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Button
          type='submit'
          className='btn-success mx-3'
          onClick={(e) => handleSubmit(e)}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

Login.propTypes = {};

export default Login;
