import React from 'react';
import Logo from '../assets/images/Logo.svg';
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
} from 'react-icons/ai';
import { IoIosTabletLandscape } from 'react-icons/io';
import { FaRegUserCircle } from 'react-icons/fa';
import { RiComputerLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { BiHeadphone } from 'react-icons/bi';
import { BsSim } from 'react-icons/bs';
import { MdOutlineRefresh } from 'react-icons/md';
const Header = () => {
  return (
    <div className="container-fluid p-0 m-0 col-lg-12 col-sm-12 col-md-12" style={{paddingBottom: "2rem"}}>
      <div className="headerTop col-lg-12 col-md-12 col-sm-12 " />
      <div className="navbar col-lg-12 col-md-12 col-sm-12 flex justify-content-around">
          <img src={Logo} alt=""/>
          <InputGroup className='w-50'>
            <Form.Control 
              as="input" 
              aria-label="Nhập tên thiết bị cần tìm" 
              placeholder="Nhập tên thiết bị cần tìm"/>
            <InputGroup.Text style={{backgroundColor: "#e02f2f", border: "none", outline: "none"}}>
                <AiOutlineSearch style={{color: '#fff', fontSize: '25px', fontWeight: '600'}} />
            </InputGroup.Text>
          </InputGroup>
          <div className="nav-item">
            <Link to={'/login'}>
              <span>
                <FaRegUserCircle />
              </span>
              Tài Khoản
            </Link>
          </div>
          <div className="nav-item">
            <Link to={"/cart"}>
            <span>
              <AiOutlineShoppingCart/>
            </span>  
            Giỏ hàng
            </Link>
          </div>
          <div className="nav-item">
            <a href="#">
            <span>
              <AiOutlineQuestionCircle />
            </span>
            Hỏi đáp
          </a>
        </div>
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
        <Link to={''}>
          <div className='headerBottom__item'>
            <span>
              <AiOutlineApple />
            </span>
            <p>APPLE</p>
          </div>
        </Link>
        <Link to={''}>
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
        <Link to={''}>
          <div className='headerBottom__item'>
            <span>
              <AiOutlineHome />
            </span>
            <p>HÀNG GIA DỤNG</p>
          </div>
        </Link>
        <Link to={''}>
          <div className='headerBottom__item'>
            <span>
              <BsSim />
            </span>
            <p>SIM & THẺ</p>
          </div>
        </Link>
      </div>
      <div className="headerBottom container-fluid col-lg-12 col-md-12 col-sm-12 col-12">
          <Link to="/category/dienthoai">
            <div className="headerBottom__item">
              <span><GiSmartphone /></span>
              <p>ĐIỆN THOẠI</p>
            </div>
          </Link>
          <Link to="/category/laptop">
            <div className="headerBottom__item">
              <span><AiOutlineLaptop /></span>
              <p>LAPTOP</p>
            </div>
          </Link>
          <Link to="/category/may-tinh-bang">
            <div className="headerBottom__item">
              <span><IoIosTabletLandscape /></span>
              <p>TABLET</p>
            </div>
          </Link>
          <Link to={"/"}>
            <div className="headerBottom__item">
              <span><AiOutlineApple /></span>
              <p>APPLE</p>
            </div>
          </Link>
          <Link to={"/category/pc-linh-kien"}>
            <div className="headerBottom__item">
              <span><RiComputerLine /></span>
              <p>PC - LINH KIỆN</p>
            </div>
          </Link>
          <Link to={""}>
            <div className="headerBottom__item">
              <span><BiHeadphone /></span>
              <p>PHỤ KIỆN</p>
            </div>
          </Link>
          <Link to={""}>
            <div className="headerBottom__item">
              <span><MdOutlineRefresh /></span>
              <p>MÁY CŨ GIÁ RẺ</p>
            </div>
          </Link>
          <Link to={""}>
            <div className="headerBottom__item">
              <span><AiOutlineHome /></span>
              <p>HÀNG GIA DỤNG</p>
            </div>
          </Link>
          <Link to={""}>
            <div className="headerBottom__item">
              <span><BsSim /></span>
              <p>SIM & THẺ</p>
            </div>
          </Link>
      </div>  
    </div>
  );
};

export default Header;
