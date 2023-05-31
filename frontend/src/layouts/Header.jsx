import React, { useState } from 'react';
// import Logo from '../assets/images/Logo.svg';
import Logo from '../components/Logo/Logo';
import '../assets/css/Header.scss';
import '../assets/css/config.scss';
import { Form, InputGroup, NavItem } from 'react-bootstrap';
import { GiSmartphone } from 'react-icons/gi';
import {
  AiOutlineLaptop,
  AiOutlineShoppingCart,
  AiOutlineSearch,
  AiOutlineQuestionCircle,
  AiOutlineApple,
  AiOutlineHome,
  AiOutlineLogout,
} from 'react-icons/ai';
import { IoIosTabletLandscape } from 'react-icons/io';
import { FaRegUserCircle } from 'react-icons/fa';
import { RiAccountCircleLine, RiComputerLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { BiHeadphone } from 'react-icons/bi';
import { BsSim } from 'react-icons/bs';
import { MdOutlineRefresh } from 'react-icons/md';
import { TfiMenuAlt } from 'react-icons/tfi';
import { AiOutlineMenu } from 'react-icons/ai';
import { BsCartFill } from 'react-icons/bs';
import { AiFillCloseCircle } from 'react-icons/ai';
import '../../src/assets/images/Logo.svg';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Redux/slice/userSlice';
import SearchBoxClient from '../components/SearchBoxClient/SearchBoxClient';
const Header = () => {
  const [active, setActive] = useState(false);

  const dispatch = useDispatch();

  const { current: user } = useSelector((state) => state.user);
  const cart = useSelector((state) => state.allCart);
  const cartItems = cart.cart;

  const totalItem = cartItems.reduce((a, i) => a + i.cartQuantity, 0);
  const handleShowMenu = () => {
    const menuTabletItem = document.querySelector('.menu__tablet--item');
    const menuOverlay = document.querySelector('.menu__tablet--overlay');

    if (menuOverlay.classList.contains('d-none') && menuTabletItem.classList.contains('d--none')) {
      menuTabletItem.classList.remove('d--none');
      menuOverlay.classList.remove('d-none');
      menuTabletItem.style.transform = 'translateX(0)';
      menuTabletItem.style.transitionDuration = '0.5s';
    } else {
      menuTabletItem.classList.add('d--none');
      menuOverlay.classList.add('d-none');
      menuTabletItem.style.transform = 'translateX(-100%)';
      menuTabletItem.style.transitionDuration = '0.5s';
    }
  };

  const handleCloseMenu = () => {
    const menuTabletItem = document.querySelector('.menu__tablet--item');
    const menuOverlay = document.querySelector('.menu__tablet--overlay');

    if (menuOverlay.classList.contains('d-none') && menuTabletItem.classList.contains('d--none')) {
      menuTabletItem.classList.remove('d--none');
      menuOverlay.classList.remove('d-none');
      menuTabletItem.style.transform = 'translateX(0)';
      menuTabletItem.style.transitionDuration = '0.5s';
    } else {
      menuTabletItem.classList.add('d--none');
      menuOverlay.classList.add('d-none');
      menuTabletItem.style.transform = 'translateX(-100%)';
      menuTabletItem.style.transitionDuration = '0.5s';
    }
  };

  const handleLogut = () => {
    dispatch(logout());
  };

  return (
    <div
      className='container-fluid p-0 m-0 col-lg-12 col-sm-12 col-md-12'
      style={{ paddingBottom: '2rem' }}>
      <div className='headerTop col-lg-12 col-md-12 col-sm-12 ' />
      <div className='navbar col-lg-12 col-md-12 col-sm-12 flex'>
        <div className='nav__tablet'>
          <i>
            <AiOutlineMenu onClick={() => handleShowMenu()} />
          </i>
        </div>
        <div className='menu__tablet'>
          <div className='menu__tablet--item d--none'>
            <Link
              to='/'
              className='menu__tablet--item--child'
              onClick={() => handleCloseMenu()}>
              <div className='tablet--item--child'>
                {/* <img src={Logo}></img> */}
                <Link to='/'>
                  <Logo />
                </Link>
              </div>
              <i
                className='closeIcon'
                onClick={() => handleCloseMenu()}>
                <AiFillCloseCircle onClick={() => handleCloseMenu()} />
              </i>
            </Link>
            <div className='menu__tablet--item--child'>
              <Link
                to='/'
                onClick={() => handleCloseMenu()}>
                <i>
                  <AiOutlineHome />
                </i>
                <p>Trang chủ</p>
              </Link>
            </div>
            <Link
              to='/category/dienthoai'
              className='menu__tablet--item--child'
              onClick={() => handleCloseMenu()}>
              <div className='tablet--item--child'>
                <span>
                  <GiSmartphone />
                </span>
                <p>ĐIỆN THOẠI</p>
              </div>
            </Link>
            <Link
              to='/category/laptop'
              className='menu__tablet--item--child'
              onClick={() => handleCloseMenu()}>
              <div className='tablet--item--child'>
                <span>
                  <AiOutlineLaptop />
                </span>
                <p>LAPTOP</p>
              </div>
            </Link>
            <Link
              to='/category/may-tinh-bang'
              className='menu__tablet--item--child'
              onClick={() => handleCloseMenu()}>
              <div className='tablet--item--child'>
                <span>
                  <IoIosTabletLandscape />
                </span>
                <p>TABLET</p>
              </div>
            </Link>
            <Link
              to={'/'}
              className='menu__tablet--item--child'
              onClick={() => handleCloseMenu()}>
              <div className='tablet--item--child'>
                <span>
                  <AiOutlineApple />
                </span>
                <p>APPLE</p>
              </div>
            </Link>
            <Link
              to={'/category/pc-linh-kien'}
              className='menu__tablet--item--child'
              onClick={() => handleCloseMenu()}>
              <div className='tablet--item--child'>
                <span>
                  <RiComputerLine />
                </span>
                <p>PC - LINH KIỆN</p>
              </div>
            </Link>
            <Link
              to={''}
              className='menu__tablet--item--child'
              onClick={() => handleCloseMenu()}>
              <div className='tablet--item--child'>
                <span>
                  <BiHeadphone />
                </span>
                <p>PHỤ KIỆN</p>
              </div>
            </Link>
            <Link
              to={''}
              className='menu__tablet--item--child'
              onClick={() => handleCloseMenu()}>
              <div className='tablet--item--child'>
                <span>
                  <MdOutlineRefresh />
                </span>
                <p>MÁY CŨ GIÁ RẺ</p>
              </div>
            </Link>
            <Link
              to={''}
              className='menu__tablet--item--child'
              onClick={() => handleCloseMenu()}>
              <div className='tablet--item--child'>
                <span>
                  <AiOutlineHome />
                </span>
                <p>HÀNG GIA DỤNG</p>
              </div>
            </Link>
            <Link
              to={''}
              className='menu__tablet--item--child'
              onClick={() => handleCloseMenu()}>
              <div className='tablet--item--child'>
                <span>
                  <BsSim />
                </span>
                <p>SIM & THẺ</p>
              </div>
            </Link>
            <Link
              to={'/login'}
              className='menu__tablet--item--child'
              onClick={() => handleCloseMenu()}>
              <div className='tablet--item--child'>
                <span>
                  <FaRegUserCircle />
                </span>
                <p>Tài Khoản</p>
              </div>
            </Link>
          </div>
          <div
            className='menu__tablet--overlay d-none'
            onClick={() => handleCloseMenu()}></div>
        </div>
        {/* <img
          src={Logo}
          alt=''
        /> */}
        {/* <div style={{flex:"0 0 10%",width:"10%"}}>
        </div> */}
        <Logo></Logo>

        <InputGroup className='input__form__search'>
          {/* <Form.Control
            as='input'
            aria-label='Nhập tên thiết bị cần tìm'
            placeholder='Nhập tên thiết bị cần tìm'
          />
          <InputGroup.Text style={{ backgroundColor: '#e02f2f', border: 'none', outline: 'none' }}>
            <AiOutlineSearch style={{ color: '#fff', fontSize: '25px', fontWeight: '600' }} />
          </InputGroup.Text> */}
          <SearchBoxClient />
        </InputGroup>

        <div className='nav-item account'>
          {user?.length > 0 ? (
            <Link to={'/account/profile'}>
              <span>
                <FaRegUserCircle />
              </span>
              {user[0].fullName.split(' ')[user[0].fullName.split(' ').length - 1]}
              <ul className='account--profile'>
                <Link to={'/account/profile'}>
                  <li>
                    <RiAccountCircleLine />
                    <span>Tài khoản của tôi</span>
                  </li>
                </Link>
                <Link to={'/account/order'}>
                  <li>
                    <TfiMenuAlt />
                    <span>Đơn hàng của tôi</span>
                  </li>
                </Link>
                <Link
                  to={''}
                  onClick={handleLogut}>
                  <li>
                    <AiOutlineLogout />
                    <span>Đăng Xuất</span>
                  </li>
                </Link>
              </ul>
            </Link>
          ) : (
            <Link to={'/login'}>
              <span>
                <FaRegUserCircle />
              </span>
              Tài Khoản
            </Link>
          )}
        </div>
        <div className='nav-item'>
          <Link to={'/cart'}>
            <span className='cart_icon'>
              <AiOutlineShoppingCart />
            </span>
            <span className='cart_number'>{totalItem}</span>
            Giỏ hàng
          </Link>
        </div>
        <div className='nav-item'>
          <a href='#'>
            <span>
              <AiOutlineQuestionCircle />
            </span>
            Hỏi đáp
          </a>
        </div>
        <div className='nav__table--item'>
          <Link to={'/cart'}>
            <span className='cart_icon'>
              <AiOutlineShoppingCart />
            </span>
            <span className='cart_number'>{totalItem}</span>
          </Link>
        </div>
        <InputGroup
          className='input__form__search--tablet'
          style={{ width: '100%', padding: '0 0 3rem 0' }}>
          {/* <Form.Control
            as='input'
            aria-label='Nhập tên thiết bị cần tìm'
            placeholder='Nhập tên thiết bị cần tìm'
          />
          <InputGroup.Text style={{ backgroundColor: '#e02f2f', border: 'none', outline: 'none' }}>
            <AiOutlineSearch style={{ color: '#fff', fontSize: '25px', fontWeight: '600' }} />
          </InputGroup.Text> */}
          <SearchBoxClient />
        </InputGroup>
      </div>
      <div className='headerBottom container-fluid col-lg-12 col-md-12 col-sm-12 col-12'>
        <Link to='/category/dienthoai'>
          <div className='headerBottom__item'>
            <span>
              <GiSmartphone />
            </span>
            <p>ĐIỆN THOẠI</p>
          </div>
        </Link>
        <Link to='/category/laptop'>
          <div className='headerBottom__item'>
            <span>
              <AiOutlineLaptop />
            </span>
            <p>LAPTOP</p>
          </div>
        </Link>
        <Link to='/category/may-tinh-bang'>
          <div className='headerBottom__item'>
            <span>
              <IoIosTabletLandscape />
            </span>
            <p>TABLET</p>
          </div>
        </Link>
        <Link to={'/'}>
          <div className='headerBottom__item'>
            <span>
              <AiOutlineApple />
            </span>
            <p>APPLE</p>
          </div>
        </Link>
        <Link to={'/category/pc-linh-kien'}>
          <div className='headerBottom__item'>
            <span>
              <RiComputerLine />
            </span>
            <p>PC - LINH KIỆN</p>
          </div>
        </Link>
        <Link to={''}>
          <div className='headerBottom__item'>
            <span>
              <BiHeadphone />
            </span>
            <p>PHỤ KIỆN</p>
          </div>
        </Link>
        <Link to={''}>
          <div className='headerBottom__item'>
            <span>
              <MdOutlineRefresh />
            </span>
            <p>MÁY CŨ GIÁ RẺ</p>
          </div>
        </Link>
        {/* <Link to={""}>
            <div className="headerBottom__item">
              <span><AiOutlineHome /></span>
              <p>HÀNG GIA DỤNG</p>
            </div>
          </Link> */}
        <Link to={''}>
          <div className='headerBottom__item'>
            <span>
              <BsSim />
            </span>
            <p>SIM & THẺ</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
