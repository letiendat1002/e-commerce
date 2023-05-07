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
import Info from '../../assets/data/info'
import InfoImage from '../../assets/images/img-noti.png'
import AddressImage from '../../assets/images/img-location.png'
import {AiFillCloseCircle} from 'react-icons/ai'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserAddressForIDUser } from '../../Redux/slice/userAddressSlice'

const AccountAddress = () => {
    const handleOpen = () => {
        const overlay = document.querySelector('.overlay')
        const formOverlay = document.querySelector('.form--overlay')

        if ((overlay.classList.contains('d-none')) && (formOverlay.classList.contains('d-none'))){
            overlay.classList.remove('d-none')
            formOverlay.classList.remove('d-none')
        }
        else {
            overlay.classList.add('d-none')
            formOverlay.classList.add('d-none')
        }
    }

    const [active, setActive] = useState(false);
    const handleActiveProfile = () => {
        const containerRightItem = document.querySelector('.profile__container--item--tablet .profile__container--item--right');
        const itemLeft = document.querySelectorAll('.item__left--item')
        const itemTop = document.querySelector('.profile__container--item--tablet .profile__container--item--left');
        if (itemLeft[3].classList.contains('active')){
            containerRightItem.classList.remove('hidden')
            itemTop.classList.add('hidden')
        }
    }

    const handleShowMenuProfile = () => {
        const containerRightItem = document.querySelector('.profile__container--item--tablet .profile__container--item--right');
        const itemLeft = document.querySelectorAll('.item__left--item')
        const itemTop = document.querySelector('.profile__container--item--tablet .profile__container--item--left');
        if (itemLeft[3].classList.contains('active')){
            containerRightItem.classList.add('hidden')
            itemTop.classList.remove('hidden')
            setActive(false)
        }
    }

    const dispatch = useDispatch()
    const userID = JSON.parse(localStorage.getItem('user'))[0].userID
    const user = useSelector(state => state.user.current)
    useEffect(() => {
        dispatch(getUserAddressForIDUser(userID))
    }, [])

    const address = useSelector(state => state.userAddress.data)
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
                    <p style={{fontSize: "18px"}}>Xin chào <b style={{color: "#DB4437"}}>{user[0].fullName}</b></p>
                </div>
                <div className="profile__container--item col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="profile__container--item--left col-lg-3 col-md-3 col-sm-12 col-12 pe-3">
                        <div className="item__left--avatar">
                            <img src={Avatar} alt="" />
                            <div className="item__left--avatar--child">
                                <h5>{user[0].fullName}</h5>
                                <p>{user[0].phone}</p>
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
                        <Link to={'/account/infor'}><div className="item__left--item">
                            <i><MdNotificationsActive/></i>
                            <span>Thông báo của tôi</span>
                        </div></Link>
                        <Link to={'/account/address'}><div className="item__left--item active">
                            <i><BiMap/></i>
                            <span>Sổ địa chỉ nhận hàng</span>
                        </div></Link>
                        <Link to={'/account/comment'}><div className="item__left--item">
                            <i><BiCommentDetail/></i>
                            <span>Đánh giá sản phẩm</span>
                        </div></Link>
                    </div>
                    <div className="profile__container--item--right col-lg-9 col-md-9 colsm-12 col-12 px-3">
                    {
                            address.length > 0 ? (
                                <>
                                <div className="address-action">
                                    <h3>Địa Chỉ Nhận Hàng Của Tôi</h3>
                                    <button onClick={handleOpen}>THÊM ĐỊA CHỈ MỚI</button>
                                </div>
                                <div className="item--right--container">
                                    
                                </div>
                                </>
                            ) : (
                                <>
                                <h3>Địa Chỉ Nhận Hàng Của Tôi</h3>
                                <div className="item--right--container">
                                    <div className='right--container--notInfo'>
                                        <img src= {AddressImage} alt="" />
                                        <p>Quý khách chưa có địa chỉ nhận hàng nào</p>
                                        <button onClick={handleOpen}>THÊM ĐỊA CHỈ MỚI</button>
                                    </div>
                                </div>
                                </>
                            )
                        }
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
                    <Link to={'/account/order'}><div className='item__left--item'>
                        <div><i><TfiMenuAlt/></i>
                        <span>Đơn hàng của tôi</span></div>
                        <i style={{backgroundColor: "#ffffff", fontSize: '22px'}}><AiOutlineRight /></i>
                    </div></Link>
                    <Link to={'/account/infor'}><div className="item__left--item">
                        <div><i><MdNotificationsActive/></i>
                        <span>Thông báo của tôi</span></div>
                        <i style={{backgroundColor: "#ffffff", fontSize: '22px'}}><AiOutlineRight /></i>
                    </div></Link>
                    <Link to={'/account/address'}  onClick={() => handleActiveProfile(setActive(true))}><div className={`${active ? "active" : ""} item__left--item`}>
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
                        <h3>Địa Chỉ Nhận Hàng Của Tôi</h3>
                        <div className="item--right--container">
                            {
                                Info.length > 0 ? (
                                    <div>
                                        
                                    </div>
                                ) : (
                                    <div className='right--container--notInfo'>
                                        <img src= {AddressImage} alt="" />
                                        <p>Quý khách chưa có địa chỉ nhận hàng nào</p>
                                        <button onClick={handleOpen}>THÊM ĐỊA CHỈ MỚI</button>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="bottom"  style={{height: "3rem", backgroundColor: "#f1f2f1"}}></div>
        </div>
        <div className="overlay container-fluid d-none" onClick={handleOpen}> 
        </div>
        <div className="form--overlay d-none">
                <div className = "navbars"><h3>Thêm Địa Chỉ Mới</h3>
                <i onClick={handleOpen}><AiFillCloseCircle style={{color: "000000"}} /></i></div>
                <form action="">
                    <input type="text" name='fullname' placeholder='Nhập tên' /><br/>
                    <input type="text" name='phone' placeholder='Nhập số điện thoại' /><br />
                    <div className="address">
                        <select name="city" id="">
                            <option value="Chọn tỉnh/thành">Chọn tỉnh/thành</option>
                            <option value="Thành Phố Hồ Chí Minh">Thành Phố Hồ Chí Minh</option>
                            <option value="Bà Rịa Vũng Tàu">Bà Rịa Vũng Tàu</option>
                        </select>
                        <select name="province" id="">
                            <option value="Chọn quận/huyện">Chọn quận/huyện</option>
                            <option value="Thành Phố Hồ Chí Minh">Thành Phố Hồ Chí Minh</option>
                            <option value="Bà Rịa Vũng Tàu">Bà Rịa Vũng Tàu</option>
                        </select>
                    </div>
                    <select name="stress" id="">
                            <option value="Chọn Đường">Chọn Đường</option>
                            <option value="Thành Phố Hồ Chí Minh">Thành Phố Hồ Chí Minh</option>
                            <option value="Bà Rịa Vũng Tàu">Bà Rịa Vũng Tàu</option>
                    </select>
                    <input type="text" name='address' placeholder='Nhập địa chỉ' />< br/>
                    <input type="checkbox" name="defaultAddress" id="" />
                    <span>Chọn làm địa chỉ mặc định</span>
                    <br/>
                    <button type='submit'>HOÀN TẤT</button>
                </form>
            </div>
    </>
  )
}

export default AccountAddress