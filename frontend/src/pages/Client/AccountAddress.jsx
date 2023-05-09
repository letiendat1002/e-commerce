import { Pagination } from 'antd'
import React, { useEffect, useState } from 'react'
import { AiFillCloseCircle, AiFillDelete, AiOutlineRight } from 'react-icons/ai'
import { BiCommentDetail, BiEdit, BiMap } from 'react-icons/bi'
import { MdNotificationsActive } from 'react-icons/md'
import { RiAccountCircleLine } from 'react-icons/ri'
import { TfiMenuAlt } from 'react-icons/tfi'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { addAddress, deleteAddress, getUserAddressForIDUser, updateAddress } from '../../Redux/slice/userAddressSlice'
import '../../assets/css/profile.scss'
import AddressImage from '../../assets/images/img-location.png'
import Avatar from '../../assets/images/img-user.png'

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

    const handleClose = () => {
        const overlay = document.querySelector('.overlay')
        const formOverlay = document.querySelector('.form--overlay')
        const formOverlays = document.querySelector('.form--overlay.update')
        overlay.classList.add('d-none')
        formOverlay.classList.add('d-none')
        formOverlays.classList.add('d-none')
    }

    const dispatch = useDispatch()
    const userID = JSON.parse(localStorage.getItem('user'))[0].userID
    const user = useSelector(state => state.user.current)
    useEffect(() => {
        dispatch(getUserAddressForIDUser(userID))
    }, [])

    const name = user[0].fullName
    const phone = user[0].phone

    const addresses = useSelector(state => state.userAddress.data)

    const [address, setAddress] = useState('')
    const handleAddAddress = (e) => {
        e.preventDefault()
        const data = {
            address, 
            userID
        }

        dispatch(addAddress(data))
        .then((res) => {
            if (res.payload.status === 200){
                toast.success("Thêm địa chỉ thành công!")
                handleOpen()
            }
            else if(res.payload.status === 400){
                if (res.payload.message === '[Address must not be blank, but it was {}]'){
                    toast.error('Vui lòng nhập địa chỉ của bạn!')
                }
                else{
                    toast.error('Thêm địa chỉ thất bại!')
                }
            }
            dispatch(getUserAddressForIDUser(userID))
        })
        .catch((error) => {
            if (error.response && error.response.status === 400) {
              toast.error("Thêm địa chỉ thất bại!")
          }
        })
    }

    const handleDeleteAddress = (userAddressID) => {
        dispatch(deleteAddress(userAddressID))
        .then((res) => {
            if (res.payload.status === 200){
                toast.success("Xóa địa chỉ thành công!")
            }
            else{
                toast.error("Xóa địa chỉ thất bại!")
            }
            dispatch(getUserAddressForIDUser(userID))
        })
        .catch((error) => {
            if (error.response && error.response.status === 400) {
                toast.error("Xóa địa chỉ thất bại!")
          }
        })
    }

    const [userAddressID, setUserAddressID] = useState(0)

    const handleOpenUpdate = (userAddressID) => {
        const overlay = document.querySelector('.overlay')
        const formOverlay = document.querySelector('.form--overlay.update')

        const item = addresses.filter(item => item.userAddressID === userAddressID);
        const addressUpdate = item[0].address
        // setAddress(addressUpdate)
        setUserAddressID(userAddressID)
        if ((overlay.classList.contains('d-none')) && (formOverlay.classList.contains('d-none'))){
            overlay.classList.remove('d-none')
            formOverlay.classList.remove('d-none')
            setAddress(addressUpdate)
        }
        else {
            overlay.classList.add('d-none')
            formOverlay.classList.add('d-none')
            setAddress(address)
        }
    }
    const handleUpdateAddress = (e) => {
        e.preventDefault()
        const data = {
            address, 
            userID
        }

        dispatch(updateAddress({userAddressID, data}))
        .then((res) => {
            if (res.payload.status === 200){
                toast.success("Cập nhật địa chỉ thành công!")
                handleClose()
            }
            else if(res.payload.status === 400){
                if (res.payload.message === 'No data changes detected'){
                    toast.error('Dữ liệu đầu vào không đổi!')
                }
                else{
                    toast.error('Thêm địa chỉ thất bại!')
                }
            }
            dispatch(getUserAddressForIDUser(userID))
        })
        .catch((error) => {
            if (error.response && error.response.status === 400) {
              toast.error("Thêm địa chỉ thất bại!")
          }
        })
    }

    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const itemsPerPage = 4;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = currentPage * itemsPerPage - 1;
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
                            addresses.length > 0 ? (
                                <>
                                <div className="address-action">
                                    <h3>Địa Chỉ Nhận Hàng Của Tôi</h3>
                                    <button onClick={handleOpen}>THÊM ĐỊA CHỈ MỚI</button>
                                </div>
                                    {
                                        addresses.slice(startIndex, endIndex + 1).map((item) => {
                                            return (
                                                <div className="item--right--containers">
                                                <div className="right--container-content">
                                                    <div className="container-content--title">
                                                        <h5>{user[0].fullName}</h5>
                                                        <h5>{user[0].phone}</h5>
                                                    </div>
                                                    <p>{item.address}</p>
                                                </div>
                                                <div className="right--container-action">
                                                    <button onClick={() => handleOpenUpdate(item.userAddressID)}><BiEdit /><span>Chỉnh sửa</span></button>
                                                    <i onClick = {() => handleDeleteAddress(item.userAddressID)}><AiFillDelete /></i>
                                                </div>      
                                            </div>
                                            )
                                        })
                                    }
                                <Pagination style={{padding: "1rem 0"}}
                                        current={currentPage}
                                        pageSize={itemsPerPage}
                                        total={addresses.length}
                                        onChange={handlePageChange}
                                        />
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
                            <h5>{user[0].fullName}</h5>
                            <p>{user[0].phone}</p>
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
                    {
                            addresses.length > 0 ? (
                                <>
                                <div className="address-action">
                                    <h3>Địa Chỉ Nhận Hàng Của Tôi</h3>
                                    <button onClick={handleOpen}>THÊM ĐỊA CHỈ MỚI</button>
                                </div>
                                    {
                                        addresses.map((item) => {
                                            return (
                                                <div className="item--right--containers">
                                                <div className="right--container-content">
                                                    <div className="container-content--title">
                                                        <h5>{user[0].fullName}</h5>
                                                        <h5>{user[0].phone}</h5>
                                                    </div>
                                                    <p>{item.address}</p>
                                                </div>
                                                <div className="right--container-action">
                                                    <button onClick={() => handleOpenUpdate(item.userAddressID)}><BiEdit /><span>Chỉnh sửa</span></button>
                                                    <i onClick = {() => handleDeleteAddress(item.userAddressID)}><AiFillDelete /></i>
                                                </div>
                                            </div>
                                            )
                                        })
                                    }
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
            </div>
            <div className="bottom"  style={{height: "3rem", backgroundColor: "#f1f2f1"}}></div>
        </div>
        <div className="overlay container-fluid d-none" onClick={handleClose}> 
        </div>
        <div className="form--overlay d-none">
                <div className = "navbars"><h3>Thêm Địa Chỉ Mới</h3>
                <i onClick={handleOpen}><AiFillCloseCircle style={{color: "000000"}} /></i></div>
                <form id='myForm'>
                    <input type="text" name='fullname' value={name} disabled placeholder='Nhập tên' /><br/>
                    <input type="text" name='phone' value={phone} disabled placeholder='Nhập số điện thoại' /><br />
                    <div className="address">
                        <select name="city" disabled id="">
                            <option value="Chọn tỉnh/thành">Chọn tỉnh/thành</option>
                            <option value="Thành Phố Hồ Chí Minh">Thành Phố Hồ Chí Minh</option>
                            <option value="Bà Rịa Vũng Tàu">Bà Rịa Vũng Tàu</option>
                        </select>
                        <select name="province" disabled  id="">
                            <option value="Chọn quận/huyện">Chọn quận/huyện</option>
                            <option value="Thành Phố Hồ Chí Minh">Thành Phố Hồ Chí Minh</option>
                            <option value="Bà Rịa Vũng Tàu">Bà Rịa Vũng Tàu</option>
                        </select>
                    </div>
                    <select name="stress" disabled id="">
                            <option value="Chọn Đường">Chọn Đường</option>
                            <option value="Thành Phố Hồ Chí Minh">Thành Phố Hồ Chí Minh</option>
                            <option value="Bà Rịa Vũng Tàu">Bà Rịa Vũng Tàu</option>
                    </select>
                    <input type="text" name='address' defaultValue={address} onChange={(e) => setAddress(e.target.value)} placeholder='Nhập địa chỉ' />< br/>
                    <input type="checkbox" name="defaultAddress" id="" />
                    <span>Chọn làm địa chỉ mặc định</span>
                    <br/>
                    <button onClick={(e) => handleAddAddress(e)}>HOÀN TẤT</button>
                </form>
            </div>

            <div className="overlay container-fluid d-none" onClick={handleOpenUpdate}> 
        </div>
        <div className="form--overlay update d-none">
                <div className = "navbars"><h3>Cập nhật địa chỉ</h3>
                <i onClick={handleClose}><AiFillCloseCircle style={{color: "000000"}} /></i></div>
                <form id='myForm'>
                    <input type="text" name='fullname' value={name} disabled placeholder='Nhập tên' /><br/>
                    <input type="text" name='phone' value={phone} disabled placeholder='Nhập số điện thoại' /><br />
                    <div className="address">
                        <select name="city" disabled id="">
                            <option value="Chọn tỉnh/thành">Chọn tỉnh/thành</option>
                            <option value="Thành Phố Hồ Chí Minh">Thành Phố Hồ Chí Minh</option>
                            <option value="Bà Rịa Vũng Tàu">Bà Rịa Vũng Tàu</option>
                        </select>
                        <select name="province" disabled  id="">
                            <option value="Chọn quận/huyện">Chọn quận/huyện</option>
                            <option value="Thành Phố Hồ Chí Minh">Thành Phố Hồ Chí Minh</option>
                            <option value="Bà Rịa Vũng Tàu">Bà Rịa Vũng Tàu</option>
                        </select>
                    </div>
                    <select name="stress" disabled id="">
                            <option value="Chọn Đường">Chọn Đường</option>
                            <option value="Thành Phố Hồ Chí Minh">Thành Phố Hồ Chí Minh</option>
                            <option value="Bà Rịa Vũng Tàu">Bà Rịa Vũng Tàu</option>
                    </select>
                    <input type="text" name='address' defaultValue={address} onChange={(e) => setAddress(e.target.value)} placeholder='Nhập địa chỉ' />< br/>
                    <input type="checkbox" name="defaultAddress" id="" />
                    <span>Chọn làm địa chỉ mặc định</span>
                    <br/>
                    <button onClick={(e) => handleUpdateAddress(e)}>HOÀN TẤT</button>
                </form>
            </div>
    </>
  )
}

export default AccountAddress