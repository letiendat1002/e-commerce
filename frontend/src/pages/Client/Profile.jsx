import React from 'react';
import '../../assets/css/profile.scss';
import { Link } from 'react-router-dom';
import { RiAccountCircleLine } from 'react-icons/ri';
import { MdNotificationsActive } from 'react-icons/md';
import { BiMap } from 'react-icons/bi';
import { AiFillEye, AiOutlineRight } from 'react-icons/ai';
import { BiCommentDetail } from 'react-icons/bi';
import { TfiMenuAlt } from 'react-icons/tfi';
import Avatar from '../../assets/images/img-user.png';
import { MdMonochromePhotos } from 'react-icons/md';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAccount } from '../../Redux/slice/userSlice';
import axiosClient4 from '../../API/axiosCustom';

const Profile = () => {
  const [active, setActive] = useState(false);

  const handleActiveProfile = () => {
    const containerRightItem = document.querySelector(
      '.profile__container--item--tablet .profile__container--item--right'
    );
    const itemLeft = document.querySelector('.item__left--item');
    const itemTop = document.querySelector(
      '.profile__container--item--tablet .profile__container--item--left'
    );
    if (itemLeft.classList.contains('active')) {
      containerRightItem.classList.remove('hidden');
      itemTop.classList.add('hidden');
    }
  };

  const handleShowMenuProfile = () => {
    const containerRightItem = document.querySelector(
      '.profile__container--item--tablet .profile__container--item--right'
    );
    const itemLeft = document.querySelector('.item__left--item');
    const itemTop = document.querySelector(
      '.profile__container--item--tablet .profile__container--item--left'
    );
    if (itemLeft.classList.contains('active')) {
      containerRightItem.classList.add('hidden');
      itemTop.classList.remove('hidden');
      setActive(false);
    }
  };

  const {current:user} = useSelector(state => state.user)
    const fullname = user[0].fullName.split(' ')
    const name = (fullname[fullname.length - 2] + " " + fullname[fullname.length - 1])

    const [phone, setPhone] = useState(user[0].phone)
    const [image, setImage] = useState(user[0].image)
    const [fullName, setfullName] = useState(user[0].fullName)
    const roles = user[0].roles
    const gender = user[0].gender
    const handleUpdateAccount = (e) => {
      e.preventDefault()
      const data = {

      }
      const url = `users/${user[0].id}`
      axiosClient4.put()
    }
  return (
    <div className='profile container-fluid'>
      <div
        className='top'
        style={{ height: '3rem', backgroundColor: '#f1f2f1' }}></div>
      <div className='profile__container container col-lg-12 col-md-12 col-sm-12 col-12'>
        <div className='profile__container--navbar col-lg-12 col-md-12 col-sm-12 col-12 ps-4'>
          <div className='breadcrumb'>
            <Link to={'/'}>Trang Chủ /</Link>
            <span
              className='active'
              onClick={() => handleShowMenuProfile()}>
              Tài khoản
            </span>
          </div>
          <p style={{ fontSize: '18px' }}>
            Xin chào <b style={{ color: '#DB4437' }}>{user[0].fullName}</b>
          </p>
        </div>
        <div className='profile__container--item col-lg-12 col-md-12 col-sm-12 col-12'>
          <div className='profile__container--item--left col-lg-3 col-md-12 col-sm-12 col-12 pe-3'>
            <div className='item__left--avatar'>
              <img
                src={Avatar}
                alt=''
              />
              <div className='item__left--avatar--child'>
                <h5>{name}</h5>
                <p>{user[0].phone}</p>
              </div>
            </div>
            <Link to={'/account/profile'}>
              <div className='item__left--item active'>
                <i>
                  <RiAccountCircleLine />
                </i>
                <span>Tài khoản của tôi</span>
              </div>
            </Link>
            <Link to={'/account/order'}>
              <div className='item__left--item '>
                <i>
                  <TfiMenuAlt />
                </i>
                <span>Đơn hàng của tôi</span>
              </div>
            </Link>
            <Link to={'/account/infor'}>
              <div className='item__left--item'>
                <i>
                  <MdNotificationsActive />
                </i>
                <span>Thông báo của tôi</span>
              </div>
            </Link>
            <Link to={'/account/address'}>
              <div className='item__left--item'>
                <i>
                  <BiMap />
                </i>
                <span>Sổ địa chỉ nhận hàng</span>
              </div>
            </Link>
            <Link to={'/account/comment'}>
              <div className='item__left--item'>
                <i>
                  <BiCommentDetail />
                </i>
                <span>Đánh giá sản phẩm</span>
              </div>
            </Link>
          </div>
          <div className='profile__container--item--right col-lg-9 col-md-12 col-sm-12 col-12 px-3'>
            <h3>Chỉnh Sửa Thông Tin</h3>
            <div className='item--right--container'>
              <img
                src={Avatar}
                alt=''
              />
              <div className='right--container--avatar'>
                <button>
                  <i>
                    <MdMonochromePhotos />
                  </i>
                  <span>Chọn ảnh</span>
                </button>
                <input
                  type='file'
                  name='img'
                  style={{ opacity: 0 }}
                  id=''
                  placeholder='Chọn ảnh'
                />
              </div>
              <form
                className='right--container--profile'>
                <div className='container--profile--item'>
                  <span>Họ và Tên</span>
                  <input
                    type='text'
                    name='fullname'
                    placeholder='Vui lòng nhập họ và tên'
                    defaultValue={fullName}
                    onChange={e => setfullName(e.target.value)}
                  />
                </div>
                <div className='container--profile--item'>
                  <span>Số điện thoại</span>
                  <input
                    type='text'
                    name='phone'
                    placeholder='Vui lòng nhập số điện thoại'
                    defaultValue={phone}
                    onChange={e => setPhone(e.target.value)}
                  />
                </div>
                <div className='container--profile--item'>
                  <span>Email</span>
                  <input
                  disabled
                    type='email'
                    name='email'
                    placeholder='Vui lòng nhập email của bạn'
                    value={user[0].email}
                  />
                </div>
                <div className='container--profile--item'>
                  <span>Mật khẩu</span>
                  <input
                    disabled
                    type='password'
                    name='password'
                    placeholder='Vui lòng nhập mật khẩu của bạn'
                    value='123456789'
                  />
                </div>
                <button onClick={handleUpdateAccount}>Lưu Thay Đổi</button>
              </form>
            </div>
          </div>
        </div>
        <div className='profile__container--item--tablet col-lg-12 col-md-12 col-sm-12 col-12'>
          <div className='profile__container--item--left col-lg-3 col-md-12 col-sm-12 col-12 pe-3'>
            <div className='item__left--avatar'>
              <img
                src={Avatar}
                alt=''
              />
              <div className='item__left--avatar--child'>
                <h5>Nguyễn Bảo</h5>
                <p>0978585758</p>
              </div>
            </div>
            <Link
              to={'/account/profile'}
              onClick={() => handleActiveProfile(setActive(true))}>
              <div className={`${active ? 'active' : ''} item__left--item`}>
                <div>
                  <i>
                    <RiAccountCircleLine />
                  </i>
                  <span>Tài khoản của tôi</span>
                </div>
                <i style={{ backgroundColor: '#ffffff', fontSize: '22px' }}>
                  <AiOutlineRight />
                </i>
              </div>
            </Link>
            <Link to={'/account/order'}>
              <div className='item__left--item'>
                <div>
                  <i>
                    <TfiMenuAlt />
                  </i>
                  <span>Đơn hàng của tôi</span>
                </div>
                <i style={{ backgroundColor: '#ffffff', fontSize: '22px' }}>
                  <AiOutlineRight />
                </i>
              </div>
            </Link>
            <Link to={'/account/infor'}>
              <div className='item__left--item'>
                <div>
                  <i>
                    <MdNotificationsActive />
                  </i>
                  <span>Thông báo của tôi</span>
                </div>
                <i style={{ backgroundColor: '#ffffff', fontSize: '22px' }}>
                  <AiOutlineRight />
                </i>
              </div>
            </Link>
            <Link to={'/account/address'}>
              <div className='item__left--item'>
                <div>
                  <i>
                    <BiMap />
                  </i>
                  <span>Sổ địa chỉ nhận hàng</span>
                </div>
                <i style={{ backgroundColor: '#ffffff', fontSize: '22px' }}>
                  <AiOutlineRight />
                </i>
              </div>
            </Link>
            <Link to={'/account/comment'}>
              <div className='item__left--item'>
                <div>
                  <i>
                    <BiCommentDetail />
                  </i>
                  <span>Đánh giá sản phẩm</span>
                </div>
                <i style={{ backgroundColor: '#ffffff', fontSize: '22px' }}>
                  <AiOutlineRight />
                </i>
              </div>
            </Link>
          </div>
          <div className='profile__container--item--right col-lg-9 col-md-12 col-sm-12 col-12 px-3 hidden'>
            <h3>Chỉnh Sửa Thông Tin</h3>
            <div className='item--right--container'>
              <img
                src={Avatar}
                alt=''
              />
              <div className='right--container--avatar'>
                <button>
                  <i>
                    <MdMonochromePhotos />
                  </i>
                  <span>Chọn ảnh</span>
                </button>
                <input
                  type='file'
                  name='img'
                  style={{ opacity: 0 }}
                  id=''
                  placeholder='Chọn ảnh'
                />
              </div>
              <form
                action=''
                className='right--container--profile'>
                <div className='container--profile--item'>
                  <span>Họ và Tên</span>
                  <input
                    type='text'
                    name='fullname'
                    placeholder='Vui lòng nhập họ và tên'
                    value='Trần Đăng Nguyễn Bảo'
                  />
                </div>
                <div className='container--profile--item'>
                  <span>Số điện thoại</span>
                  <input
                    type='text'
                    name='phone'
                    placeholder='Vui lòng nhập số điện thoại'
                    value='0978567685'
                  />
                </div>
                <div className='container--profile--item'>
                  <span>Email</span>
                  <input
                    type='email'
                    name='email'
                    placeholder='Vui lòng nhập email của bạn'
                    value='trandangnguyenbao2810@gmail.com'
                  />
                </div>
                <div className='container--profile--item'>
                  <span>Mật khẩu</span>
                  <input
                    type='password'
                    name='password'
                    placeholder='Vui lòng nhập mật khẩu của bạn'
                    value='123456789'
                  />
                </div>
                <button type='submit'>Lưu Thay Đổi</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div
        className='bottom'
        style={{ height: '3rem', backgroundColor: '#f1f2f1' }}></div>
    </div>
  );
};

export default Profile;
