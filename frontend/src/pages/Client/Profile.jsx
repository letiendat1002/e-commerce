import React, { useEffect, useState } from 'react';
import { AiOutlineRight } from 'react-icons/ai';
import { BiCommentDetail, BiMap } from 'react-icons/bi';
import { MdMonochromePhotos, MdNotificationsActive } from 'react-icons/md';
import { RiAccountCircleLine } from 'react-icons/ri';
import { TfiMenuAlt } from 'react-icons/tfi';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserForID, updateUser } from '../../Redux/slice/usersSlice';
import '../../assets/css/profile.scss';
import Avatar from '../../assets/images/img-user.png';
import {getUserID} from '../../Redux/slice/userSlice'
import { toast } from 'react-toastify';

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

  const userID = JSON.parse(localStorage.getItem('user'))[0].userID
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUserForID(userID))
    dispatch(getUserID(userID))
  }, [])

  const user = useSelector(state => state.user.current)

  const accountInfo = useSelector(state => state.userAPI.data)
  const fullname = accountInfo[0]?.fullName 
  const phones = accountInfo[0]?.phone
  // const name = fullname
  const userPhone = accountInfo[0]?.phone
    const [phone, setPhone] = useState('')
    const [image, setImage] = useState((user[0]?.image == "") ?  ("string") : user[0]?.image)
    const [fullName, setfullName] = useState('')
    const gender = accountInfo[0]?.gender
    const roles = ["CUSTOMER"]
    const handleChangeName = (e) => {
      setfullName(e.target.value)
    }

    const handleChangePhone = (e) => {
      setPhone(e.target.value)
    }

    const handleUpdateAccount = (e) => {
      e.preventDefault()
      const updatedFullName = (fullName !== fullname && fullName !== "") ? fullName : fullname;
      const updatedPhone = (phone !== phones && phone !== "") ? phone : phones;
      const data = {
        roles, 
        fullName: updatedFullName, 
        gender, 
        phone: updatedPhone,
        image
      }
      dispatch(updateUser({userID, data}))
      .then((res) => {
        const message = res.payload.message
        console.log(message)
        if (res.payload.status === 200){
          dispatch(getUserID(userID))
          toast.success('Cập nhật tài khoản thành công!')
        }
        else if (res.payload.status === 400){
          if (message === "No data changes detected"){
            toast.error("Thông tin tài khoản không có thay đổi!")
          }
          else {
            toast.error(`Số điện thoại bạn cung cấp đã tồn tại!`)
          }
          dispatch(getUserForID(userID))
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          toast.error("Vui lòng nhập địa chỉ")
      }
      }
      )
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
            Xin chào <b style={{ color: '#DB4437' }}>{fullname}</b>
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
                <h5>{fullname}</h5>
                <p>{userPhone}</p>
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
                    defaultValue={fullname}
                    onChange={e => handleChangeName(e)}
                  />
                </div>
                <div className='container--profile--item'>
                  <span>Số điện thoại</span>
                  <input
                    type='text'
                    name='phone'
                    placeholder='Vui lòng nhập số điện thoại'
                    defaultValue={phones}
                    onChange={e => handleChangePhone(e)}
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
              <h5>{fullname}</h5>
                <p>{userPhone}</p>
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
                className='right--container--profile'>
                <div className='container--profile--item'>
                  <span>Họ và Tên</span>
                  <input
                    type='text'
                    name='fullname'
                    placeholder='Vui lòng nhập họ và tên'
                    defaultValue={fullname}
                    onChange={e => handleChangeName(e)}
                  />
                </div>
                <div className='container--profile--item'>
                  <span>Số điện thoại</span>
                  <input
                    type='text'
                    name='phone'
                    placeholder='Vui lòng nhập số điện thoại'
                    defaultValue={phones}
                    onChange={e => handleChangePhone(e)}
                  />
                </div>
                <div className='container--profile--item'>
                  <span>Email</span>
                  <input
                    type='email'
                    name='email'
                    placeholder='Vui lòng nhập email của bạn'
                    value={user[0].email}
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
                <button onClick={handleUpdateAccount}>Lưu Thay Đổi</button>
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
