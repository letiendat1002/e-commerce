import React, { useState } from 'react'
import '../../assets/css/profile.scss'
import { Link } from 'react-router-dom'
import {RiAccountCircleLine} from 'react-icons/ri'
import {MdNotificationsActive} from 'react-icons/md'
import {BiMap} from 'react-icons/bi'
import {AiFillEye, AiOutlineRight} from 'react-icons/ai'
import {BiCommentDetail} from 'react-icons/bi'
import {TfiMenuAlt} from 'react-icons/tfi'
import Avatar from '../../assets/images/img-user.png'
import {MdMonochromePhotos} from 'react-icons/md'
import order from '../../assets/data/order'
import EmptyCart from '../../assets/images/empty-cart.png' 
const AccountOrder = () => {
    const [active, setActive] = useState(false);
    const handleActiveProfile = () => {
        const containerRightItem = document.querySelector('.profile__container--item--tablet .profile__container--item--right');
        const itemLeft = document.querySelectorAll('.item__left--item')
        const itemTop = document.querySelector('.profile__container--item--tablet .profile__container--item--left');
        if (itemLeft[1].classList.contains('active')){
            containerRightItem.classList.remove('hidden')
            itemTop.classList.add('hidden')
        }
    }

    const handleShowMenuProfile = () => {
        const containerRightItem = document.querySelector('.profile__container--item--tablet .profile__container--item--right');
        const itemLeft = document.querySelectorAll('.item__left--item')
        const itemTop = document.querySelector('.profile__container--item--tablet .profile__container--item--left');
        if (itemLeft[1].classList.contains('active')){
            containerRightItem.classList.add('hidden')
            itemTop.classList.remove('hidden')
            setActive(false)
        }
    }
  return (
    <>
        <div className="profile container-fluid">
            <div className="top" style={{height: "3rem", backgroundColor: "#f1f2f1"}}></div>
            <div className="profile__container container col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="profile__container--navbar col-lg-12 col-md-12 col-sm-12 col-12 ps-4">
                    <div className="breadcrumb">
                        <Link to={"/"}>Trang Chủ /</Link>
                        <span className="active" onClick={() => handleShowMenuProfile()}>Tài khoản</span> 
                    </div>  
                    <p style={{fontSize: "18px"}}>Xin chào <b style={{color: "#DB4437"}}>Trần Đăng Nguyễn Bảo</b></p>
                </div>
                <div className="profile__container--item col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="profile__container--item--left col-lg-3 col-md-3 col-sm-12 col-12 pe-3">
                        <div className="item__left--avatar">
                            <img src={Avatar} alt="" />
                            <div className="item__left--avatar--child">
                                <h5>Nguyễn Bảo</h5>
                                <p>0978585758</p>
                            </div>
                        </div>
                        <Link to={'/account/profile'}><div className="item__left--item">
                            <i><RiAccountCircleLine/></i>
                            <span>Tài khoản của tôi</span>
                        </div></Link>
                        <Link to={'/account/order'}><div className="item__left--item active">
                            <i><TfiMenuAlt/></i>
                            <span>Đơn hàng của tôi</span>
                        </div></Link>
                        <Link to={'/account/infor'}><div className="item__left--item">
                            <i><MdNotificationsActive/></i>
                            <span>Thông báo của tôi</span>
                        </div></Link>
                        <Link to={'/account/address'}><div className="item__left--item">
                            <i><BiMap/></i>
                            <span>Sổ địa chỉ nhận hàng</span>
                        </div></Link>
                        <Link to={'/account/comment'}><div className="item__left--item">
                            <i><BiCommentDetail/></i>
                            <span>Đánh giá sản phẩm</span>
                        </div></Link>
                    </div>
                    <div className="profile__container--item--right col-lg-9 col-md-9 colsm-12 col-12 px-3">
                        <h3>Thông Tin Đơn Hàng</h3>
                        <div className="container--item--right--order">
                            {
                                order.length > 0 ? (
                                    <table>
                                        <tr>
                                            <th>Mã Đơn Hàng</th>
                                            <th>Ngày Mua</th>
                                            <th>Sản Phẩm</th>
                                            <th>Tổng Tiền</th>
                                            <th>Trạng Thái</th>
                                        </tr>
                                            {
                                                order.map((item) => {
                                                    return (
                                                        <tr>
                                                            <td><span>{item.id}</span></td>
                                                            <td><span>{item.date}</span></td>
                                                            <td><p>{item.product}</p></td>
                                                            <td><span>{item.UnitPrice}</span></td>
                                                            <td><span>{item.state}</span></td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                    </table>
                                ) : (
                                    <div className='right--container--notOrder'>
                                        <img src={EmptyCart} alt="" />
                                        <p>Không có đơn hàng nào trong giỏ hàng</p>
                                        <Link to = {'/'}>
                                        <button>
                                            VỀ TRANG CHỦ
                                        </button>
                                        </Link>  
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className="profile__container--item--tablet col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="profile__container--item--left col-lg-3 col-md-12 col-sm-12 col-12 pe-3">
                        <div className="item__left--avatar">
                            <img src={Avatar} alt="" />
                            <div className="item__left--avatar--child">
                                <h5>Nguyễn Bảo</h5>
                                <p>0978585758</p>
                            </div>
                        </div>
                        <Link to={'/account/profile'}><div className='item__left--item'>
                        <div><i><RiAccountCircleLine/></i>
                        <span>Tài khoản của tôi</span></div>
                        <i style={{backgroundColor: "#ffffff", fontSize: '22px'}}><AiOutlineRight /></i>
                    </div></Link>
                    <Link to={'/account/order'}  onClick={() => handleActiveProfile(setActive(true))}><div className={`${active ? "active" : ""} item__left--item`}>
                        <div><i><TfiMenuAlt/></i>
                        <span>Đơn hàng của tôi</span></div>
                        <i style={{backgroundColor: "#ffffff", fontSize: '22px'}}><AiOutlineRight /></i>
                    </div></Link>
                    <Link to={'/account/infor'}><div className="item__left--item">
                        <div><i><MdNotificationsActive/></i>
                        <span>Thông báo của tôi</span></div>
                        <i style={{backgroundColor: "#ffffff", fontSize: '22px'}}><AiOutlineRight /></i>
                    </div></Link>
                    <Link to={'/account/address'}><div className="item__left--item">
                        <div><i><BiMap/></i>
                        <span>Sổ địa chỉ nhận hàng</span></div>
                        <i style={{backgroundColor: "#ffffff", fontSize: '22px'}}><AiOutlineRight /></i>
                    </div></Link>
                    <Link to={'/account/comment'}><div className="item__left--item">
                        <div><i><BiCommentDetail/></i>
                        <span>Đánh giá sản phẩm</span></div>
                        <i style={{backgroundColor: "#ffffff", fontSize: '22px'}}><AiOutlineRight /></i>
                    </div></Link>
                    </div>
                    <div className="profile__container--item--right col-lg-9 col-md-12 col-sm-12 col-12 px-3 hidden">
                        <h3>Thông Tin Đơn Hàng</h3>
                        <div className="container--item--right--order">
                            {
                                order.length > 0 ? (
                                    <table>
                                        <tr>
                                            <th>Mã Đơn Hàng</th>
                                            <th>Ngày Mua</th>
                                            <th>Sản Phẩm</th>
                                            <th>Tổng Tiền</th>
                                            <th>Trạng Thái</th>
                                        </tr>
                                            {
                                                order.map((item) => {
                                                    return (
                                                        <tr>
                                                            <td><span>{item.id}</span></td>
                                                            <td><span>{item.date}</span></td>
                                                            <td><p>{item.product}</p></td>
                                                            <td><span>{item.UnitPrice}</span></td>
                                                            <td><span>{item.state}</span></td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                    </table>
                                ) : (
                                    <div className='right--container--notOrder'>
                                        <img src={EmptyCart} alt="" />
                                        <p>Không có đơn hàng nào trong giỏ hàng</p>
                                        <Link to = {'/'}>
                                        <button>
                                            VỀ TRANG CHỦ
                                        </button>
                                        </Link>  
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="bottom"  style={{height: "3rem", backgroundColor: "#f1f2f1"}}></div>
        </div>
    </>
  )
}

export default AccountOrder