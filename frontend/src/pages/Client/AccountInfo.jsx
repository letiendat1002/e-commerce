import React from 'react'
import '../../assets/css/profile.scss'
import { Link } from 'react-router-dom'
import {RiAccountCircleLine} from 'react-icons/ri'
import {MdNotificationsActive} from 'react-icons/md'
import {BiMap} from 'react-icons/bi'
import {AiFillEye} from 'react-icons/ai'
import {BiCommentDetail} from 'react-icons/bi'
import {TfiMenuAlt} from 'react-icons/tfi'
import Avatar from '../../assets/images/img-user.png'
import {MdMonochromePhotos} from 'react-icons/md'
import Info from '../../assets/data/info'
import InfoImage from '../../assets/images/img-noti.png'

const AccountInfor = () => {
  return (
    <div className="profile container-fluid">
        <div className="top" style={{height: "3rem", backgroundColor: "#f1f2f1"}}></div>
        <div className="profile__container container col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="profile__container--navbar col-lg-12 col-md-12 col-sm-12 col-12 ps-4">
                <div className="breadcrumb">
                    <Link to={"/"}>Trang Chủ /</Link>
                      <span className="active">Tài khoản</span> 
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
                    <Link to={'/account/order'}><div className="item__left--item ">
                        <i><TfiMenuAlt/></i>
                        <span>Đơn hàng của tôi</span>
                    </div></Link>
                    <Link to={'/account/infor'}><div className="item__left--item active">
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
                    <h3>Thông Báo Của Tôi</h3>
                    <div className="item--right--container">
                        {
                            Info.length > 0 ? (
                                <div>
                                    
                                </div>
                            ) : (
                                <div className='right--container--notInfo'>
                                    <img src= {InfoImage} alt="" />
                                    <p>Quý khách không có thông báo nào</p>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
        <div className="bottom"  style={{height: "3rem", backgroundColor: "#f1f2f1"}}></div>
    </div>
  )
}

export default AccountInfor