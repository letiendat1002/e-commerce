import { Button, Checkbox, Form, Input, Select } from 'antd';
import React, { useState } from 'react';
import { AiFillCloseCircle, AiFillGoogleCircle, AiFillTwitterCircle } from 'react-icons/ai';
import { BsFacebook } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, register } from '../../Redux/slice/userSlice';
import { resetPassword } from '../../Redux/slice/usersSlice';
import Logo from '../../assets/images/Logo.svg';
import { ReactComponent as RequiredIcon } from '../../assets/images/Required.svg';
import { ReactComponent as LockIcon } from '../../assets/images/lock.svg';
import { ReactComponent as MailIcon } from '../../assets/images/mail.svg';
import { ReactComponent as UserIcon } from '../../assets/images/user.svg';
import './style.scss';
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

    const res = await dispatch(login({ email, password }));
    if (res) {
      if (res.payload.status === 200) {
        localStorage.setItem('access_token', res.payload.token)
        localStorage.setItem('user', `[${JSON.stringify(res.payload.data[0])}]`)
        toast.success(`Wellcom back ${res?.payload?.data[0].email} `);
        const checkedAdmin = res?.payload?.data[0].roles.includes('ROLE_ADMIN');
        if (checkedAdmin) {
          navigate('/admin');
        } else {
          navigate('/');
        }
      }
      else if (res.payload.status === 401){
        toast.error('Email hoặc mật khẩu không hợp lệ!')
        localStorage.removeItem('access_token')
        localStorage.removeItem('user')
      }
      form.resetFields();
    }
  };

  const handleLogin = (item) => {
    if (item === 'login') {
      formItem.classList.add('d-none');
      signinItem.classList.remove('d-none');
    } else if (item === 'signin') {
      formItem.classList.remove('d-none');
      signinItem.classList.add('d-none');
    }
  };

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

    const res = await dispatch(register(data));

    if (res?.payload.status === 200) {
      toast.success(`Đăng ký tài khoản thành công`);
      handleLogin('signin');
    }

    if (res.payload.status === 400) {
      if (res.payload.message == `Phone {${res.meta.arg.phone}} is already taken`){
        toast.error(`Số điện thoại đăng ký đã tồn tại!`);
      }
      else if (res.payload.message == `Email {${res.meta.arg.email}} is already taken`){
        toast.error(`Tài khoản đăng ký đã tồn tại!`);
      }
    }
    // form.resetFields();
    // document.location.href = '/';
  };

  const [emailReset, setEmailReset] = useState('')

  const handleCloseResetForm = () => {
    const overlay = document.querySelector('.overlay')
    const forgetForm = document.querySelector('.forgetpassword')
    if (overlay.classList.contains('d-none') && forgetForm.classList.contains('d-none')){
      overlay.classList.remove('d-none')
      forgetForm.classList.remove('d-none')
      setEmailReset('')
    }
    else{
      overlay.classList.add('d-none')
      forgetForm.classList.add('d-none')
      setEmailReset('')
    }
  }

  const handleResetPassword = (e) => {
      e.preventDefault()
      const email = emailReset
      dispatch(resetPassword(email))
      .then((res) => {
        if (res.payload.status == 200){
          toast.success("Yêu cầu reset mật khẩu thành công!")
          handleCloseResetForm()
        }
        else if (res.payload.status == 404){
          if (res.payload.message == `User not found by email {${email}@gmail.com}`){
            toast.error("Email không tồn tại với tài khoản nào!")
          }
        }
      })
  }

  return (
    <div id='login'>
      <div className='login__container'>
        <div className='login__container--form'>
          <img
            src={Logo}
            alt=''
          />
          <Form
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
              <span>Đăng nhập</span>
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
          <div className='login__left--difference'>
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
          </div>
        </div>
        <div className='register__container--form d-none'>
          <img
            src={Logo}
            alt=''
          />
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
                  message: 'Họ và Tên ít nhất 12 ký tự',
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
                {
                  min: 10,
                  message: 'Mật khẩu phải bao gồm ít nhất 10 số',
                },
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
                  message: 'Mật khẩu phải bao gồm ít nhất 6 ký tự',
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
                    return Promise.reject(
                      new Error('The two passwords that you entered do not match!')
                    );
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
              label='Gender'
              rules={[
                {
                  required: true,
                },
              ]}>
              <Select
                placeholder='Select a gender above'
                style={{
                  width: '100%',
                  margin: '5px 0',
                }}
                options={[
                  {
                    value: 'MALE',
                    label: 'MALE',
                  },
                  {
                    value: 'FEMALE',
                    label: 'FEMALE',
                  },
                  {
                    value: 'OTHER',
                    label: 'OTHER',
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
              onClick={() => handleLogin('signin')}>
              <span>Đăng ký</span>
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
      <div onClick={() => handleCloseResetForm()} className="overlay d-none"></div>
      <div className="forgetpassword d-none">
            <div className="forgetPassword">
              <div style={{display: "flex", justifyContent: "space-between", padding: "0 1rem"}}>
                <h3>Lấy mật khẩu</h3>
                <AiFillCloseCircle style={{fontSize: "20px"}} onClick={() => handleCloseResetForm()}/>
              </div>
              <p>Vui lòng nhập email nếu bạn muốn lấy password mới!</p>
              <form>
                <span>Email</span><br />
                <input onChange={(e) => setEmailReset(e.target.value)} type="text" placeholder='Vui lòng nhập email' /><br />
                <span defaultValue={emailReset} style={{fontSize: "14px", color: "#e02f2f", textAlign: "center"}}
                >Lưu ý địa chỉ Email không nhập @gmail hoặc @...</span>
                <button onClick={(e) => handleResetPassword(e)}>
                  Reset Password
                </button>
              </form>
            </div>
          </div>
    </div>
  );
};

export default Login;