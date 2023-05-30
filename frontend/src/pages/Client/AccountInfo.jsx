import '../../assets/css/profile.scss'

import {AiFillEye, AiOutlineRight} from 'react-icons/ai'
import {Image, Pagination, Skeleton} from 'antd'
import React, { useEffect } from 'react'
import { getOrder, getOrderWithOrderID } from '../../Redux/slice/paymentSlice'
import { useDispatch, useSelector } from 'react-redux'

import Avatar from '../../assets/images/img-user.png'
import {BiCommentDetail} from 'react-icons/bi'
import {BiMap} from 'react-icons/bi'
import EmptyCart from '../../assets/images/empty-cart.png'
import Info from '../../assets/data/info'
import InfoImage from '../../assets/images/img-noti.png'
import { Link } from 'react-router-dom'
import {MdMonochromePhotos} from 'react-icons/md'
import {MdNotificationsActive} from 'react-icons/md'
import {RiAccountCircleLine} from 'react-icons/ri'
import {TfiMenuAlt} from 'react-icons/tfi'
import formatProductPrice from '../../Helper'
import { getAllProducts } from '../../Redux/slice/productSlice'
import { getAllRefund } from '../../Redux/slice/orderDetailSlice'
import { useState } from 'react'
import { getOrderDetail } from '../../Redux/slice/orderDetailSlice'

const AccountInfor = () => {
    const [active, setActive] = useState(false);
    const dispatch = useDispatch()
    const handleActiveProfile = () => {
        const containerRightItem = document.querySelector('.profile__container--item--tablet .profile__container--item--right');
        const itemLeft = document.querySelectorAll('.item__left--item')
        const itemTop = document.querySelector('.profile__container--item--tablet .profile__container--item--left');
        if (itemLeft[2].classList.contains('active')){
            containerRightItem.classList.remove('hidden')
            itemTop.classList.add('hidden')
        }
    }

    const {current:user} = useSelector(state => state.user)

    const fullname = user[0].fullName.split(' ')
    const name = (fullname[fullname.length - 2] + " " + fullname[fullname.length - 1])

    const userID = user[0].userID

    useEffect(() => {
        dispatch(getAllProducts())
        dispatch(getAllRefund())
        dispatch(getOrder(userID))
    }, [])

    const allOrder = useSelector((state) => state.order.data) || []
    const allProduct = useSelector((state) => state.product.data) || []
    const allRefund = useSelector((state) => state.orderDetail.data.data) || []

    const productLoading = useSelector((state) => state.product.productLoading)
    const orderLoading = useSelector((state) => state.order.loading)
    const refundStatus = useSelector(state => state.orderDetail.status)

    const handleShowMenuProfile = () => {
        const containerRightItem = document.querySelector('.profile__container--item--tablet .profile__container--item--right');
        const itemLeft = document.querySelectorAll('.item__left--item')
        const itemTop = document.querySelector('.profile__container--item--tablet .profile__container--item--left');
        if (itemLeft[2].classList.contains('active')){
            containerRightItem.classList.add('hidden')
            itemTop.classList.remove('hidden')
            setActive(false)
        }
    }

    const [activeType, setActiveType] = useState(1)
    const handleShowOrder = (type, number) => {
        if (type === "WAITTING"){
            setActiveType(number)
            setCurrentPage(1)
            dispatch(getAllRefund())
        }
        else if (type === "DONE"){
            setActiveType(number)
            setCurrentPage(1)
            dispatch(getOrderDetail())
        }
    }

    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const itemsPerPage = 4;
    let startIndex = (currentPage - 1) * itemsPerPage;
    let endIndex = currentPage * itemsPerPage - 1;

    let totalRefund = 0
    for(let i = 0; i < allRefund.length; i++){
        for (let j = 0; j < allOrder.length; j++){
            if (allRefund[i].orderID === allOrder[j].orderID){
                totalRefund = totalRefund + 1
            }

        }
    }
    const allRefundOrder = allOrder?.map(item => allRefund?.find((order) => order.orderID === item.orderID))

    const refundList = []
    for(let i = 0; i < allRefund.length; i++){
        for (let j = 0; j < allOrder.length; j++){
            if (allRefund[i].orderID === allOrder[j].orderID){
                refundList.push(allRefund[i])
            }

        }
    }

    const allRefundDone = []
    for(let i = 0; i < allRefund.length; i++){
        for (let j = 0; j < allOrder.length; j++){
            if (allRefund[i].orderID === allOrder[j].orderID && allOrder[j].userID ===  userID && allRefund[i].status === "REFUND_COMPLETED"){
                allRefundDone.push(allRefund[i])
            }

        }
    }

    console.log(allRefundDone)
  return (
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
                <div className="profile__container--item--left col-lg-3 col-md-12 col-sm-12 col-12 pe-3">
                    <div className="item__left--avatar">
                        <img src={Avatar} alt="" />
                        <div className="item__left--avatar--child">
                            <h5>{name}</h5>
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
                    <Link to={'/account/infor'}><div className="item__left--item active">
                        <i><MdNotificationsActive/></i>
                        <span>Danh Sách Hoàn Trả</span>
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
                <div className="profile__container--item--right col-lg-9 col-md-12 col-sm-12 col-12 px-3">
                    <h3>Danh Sách Sản Phẩm Trả</h3>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <Link to = {""}><button style={{padding: "8px 20px", backgroundColor: "transparent", color: "#ffffff", fontSize: "18px",
                        borderRadius: "5px"
                        }}>
                        Add New Orders
                        </button></Link>
                        <div style={{display: 'flex'}}>
                        <button style={{width: 'auto', minWidth: "150px",borderTopLeftRadius: '6px',  backgroundColor: (activeType == 1) ? '#03a213' : '#686766',
                            fontSize: "18px",fontWeight: "600", color: '#ffffff', padding: "10px 1rem", borderRight: "2px solid #ffffff"
                            }} onClick={() => handleShowOrder("WAITTING",1)}>Chờ Xử Lý</button>
                        <button style={{width: 'auto', minWidth: "150px", backgroundColor: (activeType == 2) ? '#03a213' : '#686766',
                            fontSize: "18px",fontWeight: "600", color: '#ffffff', padding: "10px 1rem", borderRight: "2px solid #ffffff", borderTopRightRadius: '6px'
                            }} onClick={() => handleShowOrder("DONE", 2)}>Đã Xử Lý</button>
                        </div>
                    </div>
                    <div className="container--item--right--order">
                        {
                            (!productLoading && !orderLoading && refundStatus === ("getAllrefundSuccess")) ? (
                                <>
                                {
                                    (activeType === 1) ? (
                                        refundList.length > 0 ? (
                                            <table>
                                                <tr>
                                                    <th>Mã ĐH</th>
                                                    <th>Tên Sản Phẩm</th>
                                                    <th>Hình Ảnh</th>
                                                    <th>Số Lượng</th>
                                                    <th>Tổng Tiền</th>
                                                </tr>
                                                {
                                                    refundList.slice(startIndex, endIndex + 1).map((refund, idx) => {
                                                        const productMatches = allProduct?.find((productItem) => productItem.productID == refund.productID)
                                                        if (productMatches){
                                                            return (
                                                                <tr key={idx}>
                                                                    <td>{refund.orderID}</td>
                                                                    <td><p>{productMatches.name}</p></td>
                                                                    <td><Image style={{maxHeight: "100px", maxWidth :"100px"}} src={require(`../../assets/images/${productMatches.image}`)}/></td>
                                                                    <td><span>{refund.quantity}</span></td>
                                                                    <td><span>{formatProductPrice(refund.quantity * refund.purchasePrice)}</span></td>
                                                                </tr>
                                                            )
                                                        }
                                                        else {
                                                            <td colspan="5">
                                                                <img src={EmptyCart} alt="" />
                                                                <h3>Không Có Đơn Hàng Trả</h3>
                                                            </td>
                                                        }
                                                    })
                                                }
                                                 <Pagination style={{padding: "1rem 0"}}
                                                    current={currentPage}
                                                    pageSize={itemsPerPage}
                                                    total= {refundList.length}
                                                    onChange={handlePageChange}
                                                />
                                            </table>
                                        ) : (
                                            <div className='right--container--notOrder'>
                                                <img src={EmptyCart} alt="" />
                                                <p>Không có đơn hàng được hoàn trả</p>
                                                <Link to = {'/'}>
                                                <button>
                                                    VỀ TRANG CHỦ
                                                </button>
                                                </Link>  
                                            </div>
                                        )) : (
                                            allRefundDone.length > 0 ? (
                                                <table>
                                                <tr>
                                                    <th>Mã ĐH</th>
                                                    <th>Tên Sản Phẩm</th>
                                                    <th>Hình Ảnh</th>
                                                    <th>Số Lượng</th>
                                                    <th>Tổng Tiền</th>
                                                </tr>
                                                {
                                                    allRefundDone.slice(startIndex, endIndex + 1).map((refund, idx) => {
                                                        const productMatches = allProduct?.find((productItem) => productItem.productID == refund.productID)
                                                        if (productMatches){
                                                            return (
                                                                <tr key={idx}>
                                                                    <td>{refund.orderID}</td>
                                                                    <td><p>{productMatches.name}</p></td>
                                                                    <td><Image style={{maxHeight: "100px", maxWidth :"100px"}} src={require(`../../assets/images/${productMatches.image}`)}/></td>
                                                                    <td><span>{refund.quantity}</span></td>
                                                                    <td><span>{formatProductPrice(refund.quantity * refund.purchasePrice)}</span></td>
                                                                </tr>
                                                            )
                                                        }
                                                        else {
                                                            <td colspan="5">
                                                                <img src={EmptyCart} alt="" />
                                                                <h3>Không Có Đơn Hàng Trả</h3>
                                                            </td>
                                                        }
                                                    })
                                                }
                                                 <Pagination style={{padding: "1rem 0"}}
                                                    current={currentPage}
                                                    pageSize={itemsPerPage}
                                                    total= {allRefundDone.length}
                                                    onChange={handlePageChange}
                                                />
                                            </table>
                                            ) : (
                                                <div className='right--container--notOrder'>
                                                    <img src={EmptyCart} alt="" />
                                                    <p>Không có đơn hàng được hoàn trả</p>
                                                    <Link to = {'/'}>
                                                    <button>
                                                        VỀ TRANG CHỦ
                                                    </button>
                                                    </Link>  
                                                </div>
                                            )
                                        )
                                    }
                                </>
                            ) : (
                                <Skeleton active/>
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
                    <Link to={'/account/order'}><div className='item__left--item'>
                        <div><i><TfiMenuAlt/></i>
                        <span>Đơn hàng của tôi</span></div>
                        <i style={{backgroundColor: "#ffffff", fontSize: '22px'}}><AiOutlineRight /></i>
                    </div></Link>
                    <Link to={'/account/infor'}onClick={() => handleActiveProfile(setActive(true))}><div className={`${active ? "active" : ""} item__left--item`}>
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