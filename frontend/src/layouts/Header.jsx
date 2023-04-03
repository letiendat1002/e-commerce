import React from 'react'
import Logo from '../assets/images/Logo.svg'
import '../assets/css/Header.scss'
import '../assets/css/config.scss'
import { Form, InputGroup, NavItem } from 'react-bootstrap'
import {GiSmartphone} from 'react-icons/gi'
import {AiOutlineLaptop, AiOutlineShoppingCart,AiOutlineSearch, AiOutlineQuestionCircle, AiOutlineApple, AiOutlineHome} from 'react-icons/ai'
import {IoIosTabletLandscape} from 'react-icons/io'
import {FaRegUserCircle} from 'react-icons/fa'
import {RiComputerLine} from 'react-icons/ri'
import {Link} from 'react-router-dom'
import {BiHeadphone} from 'react-icons/bi'
import {BsSim} from 'react-icons/bs'
import {MdOutlineRefresh} from 'react-icons/md'
import {TfiMenuAlt} from 'react-icons/tfi'
import {AiOutlineMenu} from 'react-icons/ai'
import {BsCartFill} from 'react-icons/bs'
import {AiFillCloseCircle} from 'react-icons/ai'
const Header = () => {
  const handleShowMenu = () => {
    const menuTabletItem = document.querySelector('.menu__tablet--item')
    const menuOverlay = document.querySelector('.menu__tablet--overlay')

    if (menuOverlay.classList.contains('d-none') && menuTabletItem.classList.contains('d-none')){
      menuTabletItem.classList.remove('d-none')
      menuOverlay.classList.remove('d-none')
    }
    else if ((!menuOverlay.classList.contains('d-none')) && (!menuTabletItem.classList.contains('d-none'))){
      menuTabletItem.classList.add('d-none')
      menuOverlay.classList.add('d-none')
    }
  }

  const handleCloseMenu = (() => {
    const closeItem = document.querySelector('i.closeIcon')
    const menuTabletItem = document.querySelector('.menu__tablet--item')
    const menuOverlay = document.querySelector('.menu__tablet--overlay')

    // if (!menuTabletItem.classList.contains('d-none') && (!menuOverlay.classList.contains)){
        menuTabletItem.classList.add('d-none')
        menuOverlay.classList.add('d-none')
    // }
  })
  return (
    <div className="container-fluid p-0 m-0 col-lg-12 col-sm-12 col-md-12" style={{paddingBottom: "2rem"}}>
      <div className="headerTop col-lg-12 col-md-12 col-sm-12 " />
      <div className="navbar col-lg-12 col-md-12 col-sm-12 flex">
          <div className="nav__tablet">
              <i><AiOutlineMenu onClick={() => handleShowMenu()}/></i>
          </div>
          <div className="menu__tablet">
          <div className="menu__tablet--item">
            <Link to="/category/dienthoai" className='menu__tablet--item--child' onClick={() => handleCloseMenu()}>
              <div className="tablet--item--child">
                <span><GiSmartphone /></span>
                <p>ĐIỆN THOẠI</p>
              </div>
              <i className='closeIcon' onClick={() => handleCloseMenu()}><AiFillCloseCircle /></i>
            </Link>
            <Link to="/category/laptop" className='menu__tablet--item--child' onClick={() => handleCloseMenu()}>
              <div className="tablet--item--child">
                <span><AiOutlineLaptop /></span>
                <p>LAPTOP</p>
              </div>
            </Link>
            <Link to="/category/may-tinh-bang" className='menu__tablet--item--child' onClick={() => handleCloseMenu()}>
              <div className="tablet--item--child">
                <span><IoIosTabletLandscape /></span>
                <p>TABLET</p>
              </div>
            </Link>
            <Link to={"/"} className='menu__tablet--item--child' onClick={() => handleCloseMenu()}>
              <div className="tablet--item--child">
                <span><AiOutlineApple /></span>
                <p>APPLE</p>
              </div>
            </Link>
            <Link to={"/category/pc-linh-kien"} className='menu__tablet--item--child' onClick={() => handleCloseMenu()}>
              <div className="tablet--item--child">
                <span><RiComputerLine /></span>
                <p>PC - LINH KIỆN</p>
              </div>
            </Link>
            <Link to={""} className='menu__tablet--item--child' onClick={() => handleCloseMenu()}>
              <div className="tablet--item--child">
                <span><BiHeadphone /></span>
                <p>PHỤ KIỆN</p>
              </div>
            </Link>
            <Link to={""} className='menu__tablet--item--child' onClick={() => handleCloseMenu()}>
              <div className="tablet--item--child">
                <span><MdOutlineRefresh /></span>
                <p>MÁY CŨ GIÁ RẺ</p>
              </div>
            </Link>
            <Link to={""} className='menu__tablet--item--child' onClick={() => handleCloseMenu()}>
              <div className="tablet--item--child">
                <span><AiOutlineHome /></span>
                <p>HÀNG GIA DỤNG</p>
              </div>
            </Link>
            <Link to={""} className='menu__tablet--item--child' onClick={() => handleCloseMenu()}>
              <div className="tablet--item--child">
                <span><BsSim /></span>
                <p>SIM & THẺ</p>
              </div>
            </Link>
            <Link to={"/login"} className='menu__tablet--item--child' onClick={() => handleCloseMenu()}>
              <div className="tablet--item--child"> 
                <span><FaRegUserCircle /></span>
                <p>Tài Khoản</p>
              </div>
            </Link>
          </div>
          <div className="menu__tablet--overlay" onClick={() => handleCloseMenu()}>
          </div>
          </div>
          
          <img src={Logo} alt=""/>
          <InputGroup className='input__form__search'>
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
          <div className="nav__table--item">
            <Link to={"/cart"}>
            <span>
              <AiOutlineShoppingCart/>
            </span>  
            </Link>
          </div>
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
  )
}

export default Header
