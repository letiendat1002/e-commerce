import React from 'react'
import Logo from '../assets/images/Logo.svg'
import '../assets/css/header.scss'
import '../assets/css/config.scss'
import { Form, InputGroup, NavItem } from 'react-bootstrap'
import {GiSmartphone} from 'react-icons/gi'
import {AiOutlineLaptop, AiOutlineShoppingCart,AiOutlineSearch, AiOutlineQuestionCircle} from 'react-icons/ai'
import {IoIosTabletLandscape} from 'react-icons/io'
import {FaRegUserCircle} from 'react-icons/fa'
const Header = () => {
  return (
    <div className="container-fluid p-0 m-0 col-lg-12 col-sm-12 col-md-12 ">
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
              <p className='menu-show'>Danh mục sản phẩm</p>
              <ul className="catagory">
                  <a href="#"><li className="catagory-item">
                  <span>
                    <AiOutlineLaptop/>
                  </span>
                  Laptop
                  </li></a>
                  <a href="#"><li className="catagory-item">
                  <span>
                    <IoIosTabletLandscape />
                  </span>
                  Máy tính bảng
                  </li></a>
                  <a href="#"><li className="catagory-item">
                  <span>
                    <GiSmartphone />
                  </span>
                  Điện Thoại
                  </li></a>
              </ul>
          </div>
          <div className="nav-item">
            <a href="#">
              <span>
                <FaRegUserCircle />
              </span>
              Tài Khoản
            </a>
          </div>
          <div className="nav-item">
            <a href="#">
            <span>
              <AiOutlineShoppingCart/>
            </span>  
            Giỏ hàng
            </a>
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
    </div>
  )
}

export default Header
