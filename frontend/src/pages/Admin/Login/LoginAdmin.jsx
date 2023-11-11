import './LoginAdmin.scss';

import { Button, Checkbox, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { login, logout, register } from '../../../Redux/slice/userSlice';

import { LoadingOutlined } from '@ant-design/icons';
import { ReactComponent as LockIcon } from '../../../assets/images/lock.svg';
import { ReactComponent as MailIcon } from '../../../assets/images/mail.svg';
import image from '../../../assets/images/technology-in-the-workplace.png';
import { useDispatch } from 'react-redux';

const LoginAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [form] = Form.useForm();
  //Login
  const onFinish = async (values) => {
    setLoading(true)
    const { email, password } = values;
    const res = await dispatch(login({ email, password }));
    if (res) {
      if (res.payload.status === 200) {
        setLoading(false);
        const checkedAdmin = res?.payload?.data[0].roles.includes('ROLE_ADMIN');
        const checkedShipper = res?.payload?.data[0].roles.includes('ROLE_SHIPPER');

        if (checkedAdmin) {
          localStorage.setItem('access_token', res.payload.token);
          localStorage.setItem('user', `[${JSON.stringify(res.payload.data[0])}]`);
          navigate('/admin');
        } else {
          toast.error('Access Dennid !');
          localStorage.removeItem('access_token');
          localStorage.removeItem('user');
          dispatch(logout());
          form.resetFields();
          navigate('/admin/login');
        }
      } else if (res.payload.status === 401) {
        setLoading(false);
        toast.error('Email hoặc mật khẩu không hợp lệ!');
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
      }
      form.resetFields();
    }
  };

  console.log(loading)
  //Validation
  const validateMessages = {
    types: {
      email: 'Vui lòng nhập đúng định dạng email!',
      required: 'Vui lòng nhập Email của bạn!',
    },
  };

  return (
    <div>
      <div className='login-admin'>
        <ToastContainer
          autoClose={1000}
          closeOnClick
          pauseOnHover={true}
        />
        <div className='login'>
          <div className='left'>
            <div
              className='logo'
              style={{
                margin: '0 auto',
                padding: '1rem 0',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              LINKKING
            </div>
            <div className='title'>Đăng nhập</div>
            <Form
              className='form'
              onFinish={onFinish}
              initialValues={{
                remember: true,
              }}
              validateMessages={validateMessages}>
              <div className='form-group'>
                <Form.Item
                  name='email'
                  rules={[
                    { type: 'email' },
                    {
                      required: true,
                      message: 'Vui lòng nhập Email của bạn!',
                    },
                  ]}>
                  <Input
                    className='input-text'
                    prefix={<MailIcon className='site-form-item-icon' />}
                    placeholder='Email của bạn'
                  />
                </Form.Item>
                <Form.Item
                  name='password'
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập mật khẩu của bạn!',
                    },
                    {
                      min: 5,
                      message: 'Mật khẩu phải tối thiểu 5 ký tự!',
                    },
                  ]}>
                  <Input.Password
                    className='input-text'
                    prefix={
                      <LockIcon
                        className='site-form-item-icon'
                        style={{ marginLeft: '0' }}
                      />
                    }
                    placeholder='Mật khẩu'
                    style={{ marginTop: '0px' }}
                  />
                </Form.Item>
                <Form.Item
                  valuePropName='checked'
                  style={{ marginTop: '-10px' }}>
                  <Checkbox
                    defaultChecked={['true']}
                    style={{ marginLeft: '10%', marginTop: '-10px' }}>
                    <span>Lưu tài khoản</span>
                  </Checkbox>
                </Form.Item>
                <Button
                  htmlType='submit'
                  style={{
                    marginLeft: '10%',
                    width: '80%',
                    height: '40px',
                    borderRadius: '10px',
                    backgroundColor: '#FF5F17',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '15px',
                    marginTop: '-10px',
                    paddingBottom: '10px',
                  }}>
                  {(loading) ? <LoadingCircle /> : <span>Đăng nhập</span>}
                </Button>
              </div>
            </Form>
          </div>
          <div className='right'>
            <div className='image'>
              <img
                src={image}
                alt=''
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LoadingCircle = () => {
  return (
    <LoadingOutlined
      style={{
        fontSize: 30  
      }}
      spin
    />
  );
};

export default LoginAdmin;
