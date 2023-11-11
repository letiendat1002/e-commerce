import './style.scss';

import { Button, Checkbox, Form, Input, Select } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { login, register } from '../../Redux/slice/userSlice';

import { AiFillCloseCircle } from 'react-icons/ai';
import { LoadingOutlined } from '@ant-design/icons';
import { ReactComponent as LockIcon } from '../../assets/images/lock.svg';
import Logo from '../../components/Logo/Logo';
import { ReactComponent as MailIcon } from '../../assets/images/mail.svg';
import { ReactComponent as RequiredIcon } from '../../assets/images/Required.svg';
import { ReactComponent as UserIcon } from '../../assets/images/user.svg';
import { resetPassword } from '../../Redux/slice/usersSlice';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

// import { isValidNumber } from "libphonenumber-js";

// import Logo from '../../assets/images/Logo.svg';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loadingSignIn, setLoadingSignIn] = useState(false);
  const [remember, setRemember] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const formItem = document.querySelector('.login__container--form');
  const signinItem = document.querySelector('.register__container--form');
  const ItemStyle = {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '16px',
    color: '#303036',
  };
  const inputText = {
    padding: '12px 16px',
    border: '1px solid #D4D4D9',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '400',
    fontStyle: 'normal',
  };

  const validateMessages = {
    types: {
      email: '${label} của bạn không hợp lệ.',
      password: '${label} không hợp lệ.',
    },
  };

  const validatePassword = (_, value) => {
    // const { password } = form.getFieldValue();
    // if (value !== password) {
    //   return Promise.reject(new Error('Mật khẩu nhập lại không chính xác!'));
    // }
    // return Promise.resolve();
  };

  const [form] = Form.useForm();
  const onFinish = async (values) => {
    // const username = email;
    // dispatch(authenticate({username, password}))

    //login
    const { email, password } = values;
    setLoading(true)

    const res = await dispatch(login({ email, password }));
    if (res) {
      if (res.payload.status === 200) {
        localStorage.setItem('access_token', res.payload.token);
        localStorage.setItem('user', `[${JSON.stringify(res.payload.data[0])}]`);
        toast.success(`Welcom back ${res?.payload?.data[0].email} `);
        const checkedAdmin = res?.payload?.data[0].roles.includes('ROLE_ADMIN');
        const checkedShipper = res?.payload?.data[0].roles.includes('ROLE_SHIPPER');
        setLoading(false);
        if (checkedShipper) {
          navigate('/shipper');
        } else {
          navigate('/');
        }
      } else if (res.payload.status === 401) {
        toast.error('Email hoặc mật khẩu không hợp lệ!');
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        setLoading(false)
      }
      form.resetFields();
    }
  };

  const handleLogin = (item) => {
    const formItem = document.querySelector('.login__container--form');
    const signinItem = document.querySelector('.register__container--form');
    if (item == 'login') {
      formItem.classList.add('d-none');
      signinItem.classList.remove('d-none');
    } else if (item == 'signin' && loadingSignIn === false) {
      formItem.classList.remove('d-none');
      signinItem.classList.add('d-none');
    }
  };

  console.log(loadingSignIn)

  const handleRegister = async (values) => {
    const { fullName, gender, password, email } = values;
    const data = {
      image: '',
      phone,
      fullName,
      gender,
      password,
      email,
    };

    setLoadingSignIn(true);
    const res = await dispatch(register(data));
    console.log(res)

    if (res?.payload.status === 200) {
      setLoadingSignIn(false);
      toast.success(`Đăng ký tài khoản thành công`);
      handleLogin('signin');
    }

    if (res.payload.status === 400) {
      setLoadingSignIn(false);
      if (res.payload.message == `Phone {${res.meta.arg.phone}} is already taken`) {
        toast.error(`Số điện thoại đăng ký đã tồn tại!`);
      } else if (res.payload.message == `Email {${res.meta.arg.email}} is already taken`) {
        toast.error(`Tài khoản đăng ký đã tồn tại!`);
      }
    }
    // form.resetFields();
    // document.location.href = '/';
  };

  const [emailReset, setEmailReset] = useState('');
  const [errorEmailReset, setErrorEmailReset] = useState('');
  const handleEmailReset = (e) => {
    const inputEmail = e.target.value;
    setEmailReset(inputEmail);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(inputEmail)) {
      setErrorEmailReset();
    } else if (inputEmail === '') {
      setErrorEmailReset('Bạn chưa nhập email');
    } else {
      setErrorEmailReset('Email không hợp lệ!');
    }
  };

  const handleCloseResetForm = () => {
    const overlay = document.querySelector('.overlay');
    const forgetForm = document.querySelector('.forgetpassword');
    if (overlay.classList.contains('d-none') && forgetForm.classList.contains('d-none')) {
      overlay.classList.remove('d-none');
      forgetForm.classList.remove('d-none');
      setEmailReset('');
    } else {
      overlay.classList.add('d-none');
      forgetForm.classList.add('d-none');
      setEmailReset('');
    }
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    const email = emailReset;
    dispatch(resetPassword(email)).then((res) => {
      if (res.payload.status == 200) {
        toast.success('Yêu cầu reset mật khẩu thành công!');
        handleCloseResetForm();
      } else if (res.payload.status == 404) {
        toast.error('Email không tồn tại với tài khoản nào!');
      }
    });
  };

  //Validation

  const validatePhoneNumber = (_, value) => {
    const phoneNumberRegex = /^(0|\+84)(\d{9})$/;

    if (!value || phoneNumberRegex.test(value)) {
      return Promise.resolve();
    }

    return Promise.reject('Số điện thoại không hợp lệ!');
  };

  return (
    <div id='login'>
      <div className='login__container'>
        <div
          className='login__container--form'
          style={{ padding: '1rem 2rem' }}>
          <div
            style={{
              margin: '0 auto',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Logo
              style={{
                margin: '0 auto',
                padding: '1rem 0',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />
          </div>
          <Form
            style={{ padding: '1rem 0' }}
            layout='vertical'
            form={form}
            validateMessages={validateMessages}
            method='POST'
            autoComplete={remember ? 'on' : 'off'}
            onFinish={onFinish}>
            <h3>Đăng Nhập</h3>
            <Form.Item
              hasFeedback
              name='email'
              label={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={ItemStyle}>Email</span>
                  <RequiredIcon style={{ marginLeft: '5px' }} />
                </div>
              }
              rules={[
                { type: 'email' },
                {
                  required: true,
                  message: 'Vui lòng nhập Email của bạn!',
                },
              ]}>
              <Input
                prefix={<MailIcon className='site-form-item-icon' />}
                placeholder='Email của bạn'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputText}
              />
            </Form.Item>
            <Form.Item
              hasFeedback
              name='password'
              label={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={ItemStyle}>Mật khẩu</span>
                  <RequiredIcon style={{ marginLeft: '5px' }} />
                </div>
              }
              rules={[
                { type: 'Password' },
                {
                  required: true,
                  message: 'Vui lòng nhập mật khẩu của bạn.',
                },
                {
                  min: 5,
                  message: 'Mật khẩu phải bao gồm ít nhất 5 ký tự',
                },
              ]}>
              <Input.Password
                prefix={<LockIcon className='site-form-item-icon' />}
                placeholder='Mật khẩu của bạn'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={inputText}
              />
            </Form.Item>
            <div className='login__left--contains'>
              <Form.Item
                // name='remember'
                valuePropName='checked'>
                <Checkbox
                  defaultChecked={['true']}
                  checked={remember}
                  onChange={() => setRemember(!remember)}>
                  <span
                    style={{
                      fontSize: '16px',
                      fontWeight: '400',
                      fontStyle: 'normal',
                      color: '#303036',
                      paddingTop: '5px',
                    }}>
                    Lưu tài khoản
                  </span>
                </Checkbox>
              </Form.Item>
              <div className='login__left--contains--child'>
                <Link onClick={() => handleCloseResetForm()}>
                  <span>Quên mật khẩu?</span>
                </Link>
              </div>
            </div>
            <Button htmlType='submit'>
              {(loading) ? <LoadingCircle /> : <span>Đăng Nhập</span>}
            </Button>
            <div className='login__left--account'>
              <span>Bạn chưa có tài khoản?</span>
              <Link
                onClick={() => handleLogin('login')}
                className='logins'>
                <span>Đăng ký</span>
              </Link>
            </div>
          </Form>
          {/* <div className='login__left--difference'>
            <h5>Đăng nhập bằng cách khác</h5>
            <div className='left__difference--icon'>
              <i className='facebook'>
                <BsFacebook />
              </i>
              <i className='twitter'>
                <AiFillTwitterCircle />
              </i>
              <i className='google'>
                <AiFillGoogleCircle />
              </i>
            </div>
          </div> */}
        </div>
        <div
          className='register__container--form d-none'
          style={{ padding: '1rem 2rem' }}>
          {/* <img
            src={Logo}
            alt=''
          /> */}
          <div
            style={{
              margin: '0 auto',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Logo
              style={{
                margin: '0 auto!important',
                padding: '1rem 0',
                display: 'flex',
                justifyContent: 'center!important',
                alignItems: 'center!important',
              }}
            />
          </div>
          <Form
            layout='vertical'
            validateMessages={validateMessages}
            method='POST'
            autoComplete={remember ? 'on' : 'off'}
            onFinish={handleRegister}>
            <h3>Đăng Ký</h3>
            <Form.Item
              name='email'
              label={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={ItemStyle}>Email</span>
                  <RequiredIcon style={{ marginLeft: '5px' }} />
                </div>
              }
              rules={[
                { type: 'email' },
                {
                  required: true,
                  message: 'Vui lòng nhập Email của bạn!',
                },
              ]}>
              <Input
                prefix={<MailIcon className='site-form-item-icon' />}
                placeholder='Email của bạn'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputText}
              />
            </Form.Item>
            <Form.Item
              name='fullName'
              label={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={ItemStyle}>Họ và Tên</span>
                  <RequiredIcon style={{ marginLeft: '5px' }} />
                </div>
              }
              rules={[
                { type: 'fullname' },
                {
                  required: true,
                  message: 'Vui lòng nhập tên đầy đủ của bạn!',
                },
                {
                  min: 6,
                  message: 'Họ và Tên ít nhất 6 ký tự',
                },
              ]}>
              <Input
                prefix={<UserIcon className='site-form-item-icon' />}
                placeholder='Họ và tên của bạn'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputText}
              />
            </Form.Item>

            <Form.Item
              name='text'
              label={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={ItemStyle}>Số điện thoại</span>
                  <RequiredIcon style={{ marginLeft: '5px' }} />
                </div>
              }
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập số điện thoại của bạn.',
                },
                { validator: validatePhoneNumber },
              ]}>
              <Input
                prefix={<LockIcon className='site-form-item-icon' />}
                placeholder='Số điện thoại của bạn'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={inputText}
              />
            </Form.Item>

            <Form.Item
              name='password'
              label={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={ItemStyle}>Mật khẩu</span>
                  <RequiredIcon style={{ marginLeft: '5px' }} />
                </div>
              }
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập mật khẩu của bạn.',
                },
                {
                  min: 5,
                  message: 'Mật khẩu phải bao gồm ít nhất 5 ký tự',
                },
              ]}>
              <Input.Password
                prefix={<LockIcon className='site-form-item-icon' />}
                placeholder='Mật khẩu của bạn'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={inputText}
              />
            </Form.Item>
            <Form.Item
              name='repassword'
              label={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={ItemStyle}>Nhập Lại Mật khẩu</span>
                  <RequiredIcon style={{ marginLeft: '5px' }} />
                </div>
              }
              dependencies={['password']}
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập mật khẩu của bạn.',
                },
                // {
                //   validator: validatePassword,
                // },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Mật khẩu nhập lại không chính xác'));
                  },
                }),
              ]}>
              <Input.Password
                prefix={<LockIcon className='site-form-item-icon' />}
                placeholder='Nhập lại mật khẩu của bạn'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={inputText}
              />
            </Form.Item>
            <Form.Item
              name='gender'
              label='Giới tính'
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn giới tính của bạn.',
                },
              ]}>
              <Select
                placeholder='Vui lòng chọn giới tính'
                style={{
                  width: '100%',
                  margin: '5px 0',
                }}
                options={[
                  {
                    value: 'MALE',
                    label: 'NAM',
                  },
                  {
                    value: 'FEMALE',
                    label: 'NỮ',
                  },
                  {
                    value: 'OTHER',
                    label: 'KHÁC',
                  },
                ]}
              />
            </Form.Item>
            <div className='login__left--contains'>
              <div className='login__left--contains--child'>
                <input
                  type='checkbox'
                  //   name='remember'
                  id=''
                />
                <span style={{ color: '#504f4f', fontWeight: '450' }}>
                  Tôi chấp nhận{' '}
                  <i style={{ color: '#1DA1F2', textDecoration: 'underline' }}>
                    tất cả các điều khoản và yêu cầu sử dụng.
                  </i>
                </span>
              </div>
            </div>
            <Button
              htmlType='submit'
              // onClick={() => handleLogin('signin')}
              >
              {(loadingSignIn) ? <LoadingCircle /> : <span>Đăng ký</span>}
            </Button>
          </Form>
          <div
            className='login__left--account'
            style={{ padding: '20px 0' }}>
            <span>Bạn đã có tài khoản?</span>
            <Link
              onClick={() => handleLogin('signin')}
              className='signin'>
              <span>Đăng Nhập</span>
            </Link>
          </div>
        </div>
      </div>
      <div
        onClick={() => handleCloseResetForm()}
        className='overlay d-none'></div>
      <div className='forgetpassword d-none'>
        <div className='forgetPassword'>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '0 1rem',
            }}>
            <h3>Lấy mật khẩu</h3>
            <AiFillCloseCircle
              style={{ fontSize: '20px' }}
              onClick={() => handleCloseResetForm()}
            />
          </div>
          <p>Vui lòng nhập email nếu bạn muốn lấy password mới!</p>
          <form>
            <span>Email</span>
            <br />
            <input
              onChange={(e) => handleEmailReset(e)}
              type='text'
              placeholder='Vui lòng nhập email'
            />
            <br />
            <span
              defaultValue={emailReset}
              style={{
                fontSize: '14px',
                color: '#e02f2f',
                textAlign: 'center',
              }}>
              {errorEmailReset}
            </span>
            <button onClick={(e) => handleResetPassword(e)}>Reset Password</button>
          </form>
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

export default Login;
