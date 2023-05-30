import '../../assets/css/profile.scss'

import { AiFillCar, AiFillCheckCircle, AiFillCloseCircle, AiOutlineFileDone, AiOutlineRight } from 'react-icons/ai'
import { BiCommentDetail, BiMap, BiPackage } from 'react-icons/bi'
import { Image, Pagination, Rate, Skeleton, Spin, Steps } from 'antd'
import React, { useEffect, useState } from 'react'
import { getOrder, updateOrders } from '../../Redux/slice/paymentSlice'
import { getOrderDetail, refundOrderID } from '../../Redux/slice/orderDetailSlice'
import { useDispatch, useSelector } from 'react-redux'

import Avatar from '../../assets/images/img-user.png'
import EmptyCart from '../../assets/images/empty-cart.png'
import { Link } from 'react-router-dom'
import { MdNotificationsActive } from 'react-icons/md'
import { RiAccountCircleLine } from 'react-icons/ri'
import TableComponent from '../../components/Table'
import { TfiMenuAlt } from 'react-icons/tfi'
import convertDate from '../../Helper/convertDate'
import formatProductPrice from '../../Helper'
import { getAllProducts } from '../../Redux/slice/productSlice'
import { postRating } from '../../Redux/slice/ratingSlice'
import { toast } from 'react-toastify'

const AccountOrder = () => {
    const [active, setActive] = useState(false);
    const dispatch = useDispatch()
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

    const {current:user} = useSelector(state => state.user)
    const fullname = user[0].fullName.split(' ')
    const name = (fullname[fullname.length - 2] + " " + fullname[fullname.length - 1])

    const userID = user[0].userID
    const userName = user[0].fullName

    useEffect(() => {
        dispatch(getOrder(userID))
        dispatch(getOrderDetail())
    }, [])

    const orders = useSelector((state) => state.order.data) || []

    const [order, setOrder] = useState([])
    
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        setOrder(orders)
    }, [orders])
    const [activeType, setActiveType] = useState(1)
    
    const handleShowOrder = (type, number) => {
        if (type === "Tất Cả"){
            setOrder(orders)
            setCurrentPage(1)
            setActiveType(number)
        }
        else {
            const orderType = orders?.filter((item) => item.status === type) || []
            setOrder(orderType)
            setCurrentPage(1)
            setActiveType(number)
        }
    }
    const orderDetail = useSelector((state) => state.orderDetail.data.data) || []

    const [viewID, setViewID] = useState(0)
    const [shipping, setShipping] = useState([]);
    const handleViewOrder = (item) => {
        setViewID(item.orderID)
        const table = document.querySelector('.orderDetail-view')
        const overlay = document.querySelector('.overlay')
        if (table.classList.contains('d-none') && overlay.classList.contains('d-none')){
            table.classList.remove('d-none')
            overlay.classList.remove('d-none')
        }
        else {
            table.classList.add('d-none')
            overlay.classList.add('d-none')
        }
        const shippingItem = order?.filter((orders) => orders.orderID == item.orderID);
        setShipping(shippingItem)
    }

    const closePopup = () => {
        const table = document.querySelector('.orderDetail-view')
        const overlay = document.querySelector('.overlay')
        const ratingForms = document.querySelector('.rating-container')
        if (table.classList.contains('d-none') && overlay.classList.contains('d-none')){
            table.classList.remove('d-none')
            overlay.classList.remove('d-none')
        }
        else {
            table.classList.add('d-none')
            overlay.classList.add('d-none')
        }
        ratingForms.classList.add('d-none')
    }

    useEffect(() => {
        dispatch(getAllProducts())
    }, [])

    const [rateAmount, setRateAmount] = useState(3);
    const [comment, setComment] = useState("")
    const product = useSelector(state => state.product.data)
    const collums = [
        {
          title: "STT", 
          dataIndex: "STT"
        }, 
        {
          title: "Hình Ảnh", 
          dataIndex: "image"
        }, 
        {
          title: "Số lượng", 
          dataIndex: "quantity", 
          sorter: {
    
          }
        }, 
        {
          title: "Giá Tiền", 
          dataIndex: "cost", 
          sorter: {
    
          }
        },
        {
          title: "Tổng tiền", 
          dataIndex: "SumCost", 
          sorter: {
    
          }
        }, 
        {
            title: "Đánh giá",
            dataIndex: 'rating'
        }, 
        {
            title: "Trả Đơn",
            dataIndex: 'refund'
        }
      ]

    const [productRating, setProductRating] = useState([])
    const [orderIDOrder, setOrderIDOrder] = useState('')

    const handleRating = (product, idOrder) => {
        setProductRating(product.productID)
        setOrderIDOrder(idOrder)
        const ratingForms = document.querySelector('.rating-container')
        ratingForms.classList.remove('d-none')
        const viewPopup = document.querySelector('.orderDetail-view');
        viewPopup.classList.add('d-none')
    }

    const ratingItem = product?.filter(item => item.productID ==productRating)

    const handleCloseRating = () => {
        const ratingForms = document.querySelector('.rating-container')
        const overlay = document.querySelector('.overlay')
        const table = document.querySelector('.orderDetail-view')
        ratingForms.classList.add('d-none')
        overlay.classList.add('d-none')
        table.classList.add('d-none')
    }

    const handleRefund = (product, idOrder) => {
        const data = {
            orderID: idOrder, 
            productID: product.productID,
            status: "ON_REFUND"
        }

        dispatch(refundOrderID(data))
        .then((res) => {
            if (res.payload.status === 200){
                toast.success(("Hoàn trả sản phẩm hoàn tất"))
            }
            else{
                toast.error('Hoàn trả đơn hàng thất bại')
            }
            dispatch(getOrder(userID))
            dispatch(getOrderDetail())
            handleCloseRating()
        })
        setOrder(orders)
        setCurrentPage(1)
        setActiveType(1)
    }

    const orderDetailForID = orderDetail?.filter(item => item.orderID === viewID)
    const data = orderDetailForID?.map((items) => {
        const orders = order?.filter(order => order.orderID === items.orderID)
        const dateOrder = orders[0]?.dateOrder?.split('-')[orders[0].dateOrder?.split('-').length - 2]
        const dateCompleted = orders[0]?.dateCompleted?.split('-')[orders[0]?.dateCompleted?.split('-').length - 2] || null
        const status = orders[0]?.status
        const productMatches = product?.find((productItem) => {
            return items.productID === productItem.productID;
        });
        if (productMatches){
            return ({
                STT: <span>{items.orderID}</span>, 
                image: <Image src={require(`../../assets/images/${productMatches.image}`)} preview = {true} />,
                quantity: <span>{items.quantity}</span>,
                cost: <span>{formatProductPrice(items.purchasePrice)}</span>,
                SumCost: <span>{formatProductPrice(items.purchasePrice*items.quantity)}</span>,
                rating: <div>{
                    (status == "USER_RECEIVED") ? (
                        <button onClick={() => handleRating(productMatches, items.orderID)} style={{padding: "5px 5px", borderRadius: "5px", backgroundColor: "#e6b112", color: "#ffffff"}}>Vote</button>
                    ) : (
                        <button style={{padding: "5px 5px", borderRadius: "5px", backgroundColor: "#d5d5d5", color: "#000000"}}>Vote</button>
                    )}
                </div>,
                refund: <div>{
                    (status == "SHIP_COMPLETED" || status == "USER_RECEIVED") ? ((dateCompleted != "null" || dateCompleted != "undefined") && ((dateCompleted - dateOrder) <= 3) && ((dateCompleted - dateOrder) >= 0) && (items.status != "ON_REFUND") &&(items.status != "REFUND_COMPLETED")) ? (
                        <button onClick={() => handleRefund(productMatches, items.orderID)} style={{padding: "5px 5px", borderRadius: "5px", backgroundColor: "#e6b112", color: "#ffffff"}}>Refund</button>
                    ) : (
                        <button style={{padding: "5px 5px", borderRadius: "5px", backgroundColor: "#d5d5d5", color: "#000000"}}>Refund</button>
                    ) : (<button style={{padding: "5px 5px", borderRadius: "5px", backgroundColor: "#d5d5d5", color: "#000000"}}>Refund</button>)}
                </div>
        })
        }
    })

    const handleCancelOrder = (item) => {
        const orderID = item.orderID
        const data = {
            workerID: userID,
            status: "CANCELLED",
        }
        dispatch(updateOrders({orderID, data}))
        .then((res) => {
            if (res.payload.status === 200){
                toast.success("Hủy đơn hàng thành công!")
            }
            else if(res.payload.status === 400){
                toast.error('Hủy đơn hàng thất bại!')
            }
            dispatch(getOrder(userID))
            dispatch(getOrderDetail())
        })
        .catch((error) => {
            if (error.response && error.response.status === 400) {
              toast.error("Hủy đơn hàng thất bại!")
          }
        })
        setOrder(orders)
        setCurrentPage(1)
        setActiveType(1)
    }

    const handleReived = (item) => {
        const orderID = item.orderID
        const data = {
            workerID: userID,
            status: "USER_RECEIVED",
        }
        dispatch(updateOrders({orderID, data}))
        .then((res) => {
            if (res.payload.status === 200){
                toast.success("Cập nhật đơn hàng thành công!")
            }
            else if(res.payload.status === 400){
                toast.error('Cập nhật đơn hàng thất bại!')
            }
            dispatch(getOrder(userID))
            dispatch(getOrderDetail())
        })
        .catch((error) => {
            if (error.response && error.response.status === 400) {
              toast.error("Cập nhật đơn hàng thất bại!")
          }
        })
        setOrder(orders)
        setCurrentPage(1)
        setActiveType(1)
    }

    const handleRatingProduct = (e) => {
        e.preventDefault()
        const data = {
            userID, 
            orderID: orderIDOrder, 
            productID: productRating, 
            rateAmount, 
            comment, 
            userFullName: userName
        }
        dispatch(postRating(data))
        .then((res) => {
            if (res.payload.status === 200){
                toast.success("Đánh giá thành công!")
            }
            else if (res.payload.status === 400){
                toast.error("Sản phẩm đã được đánh giá!")
            }
        })
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const itemsPerPage = 9;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = currentPage * itemsPerPage - 1;


    const productLoading = useSelector((state) => state.product.productLoading)
    const orderLoading = useSelector((state) => state.order.loading);
    const orderDetailLoading = useSelector((state) => state.orderDetail.loading)

    return (
    <>
        {
            (productLoading || orderDetailLoading || orderLoading || order.length < 0) ? (<Skeleton active />) : 
            (
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
                                        <h5>{name}</h5>
                                        <p>{user[0].phone}</p>
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
                                    <span>Danh sách hoàn trả</span>
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
                                <div className="order__container">
                                    <h3>Thông Tin Đơn Hàng</h3>
                                    <div className="order__container--button">
                                        <button style={{width: 'calc(100% / 7)', backgroundColor: (activeType == 1) ? '#03a213' : '#686766',
                                            fontSize: "18px", fontWeight: "600", color: '#ffffff', padding: "10px 1rem", borderTopLeftRadius: '6px', borderRight: "2px solid #ffffff"
                                        }} onClick={() => handleShowOrder("Tất Cả", 1)}>Tất cả</button>
                                        <button style={{width: 'calc(100% / 7)', backgroundColor: (activeType == 2) ? '#03a213' : '#686766',
                                            fontSize: "18px",fontWeight: "600", color: '#ffffff', padding: "10px 1rem", borderRight: "2px solid #ffffff"
                                        }} onClick={() => handleShowOrder("PENDING", 2)}>Chờ xác nhận</button>
                                        <button style={{width: 'calc(100% / 7)', backgroundColor: (activeType == 3) ? '#03a213' : '#686766',
                                            fontSize: "18px",fontWeight: "600", color: '#ffffff', padding: "10px 1rem", borderRight: "2px solid #ffffff"
                                        }} onClick={() => handleShowOrder("CONFIRMED",3)}>Chờ lấy hàng</button>
                                        <button style={{width: 'calc(100% / 7)', backgroundColor: (activeType == 4) ? '#03a213' : '#686766',
                                            fontSize: "18px",fontWeight: "600", color: '#ffffff', padding: "10px 1rem", borderRight: "2px solid #ffffff"
                                        }} onClick={() => handleShowOrder("ON_SHIPPING",4)}>Đang giao</button>
                                        <button style={{width: 'calc(100% / 7)', backgroundColor: (activeType == 5) ? '#03a213' : '#686766',
                                            fontSize: "18px",fontWeight: "600", color: '#ffffff', padding: "10px 1rem", borderRight: "2px solid #ffffff"
                                        }} onClick={() => handleShowOrder("SHIP_COMPLETED",5)}>Đã giao</button>
                                        <button style={{width: 'calc(100% / 7)', backgroundColor: (activeType == 6) ? '#03a213' : '#686766',
                                            fontSize: "18px",fontWeight: "600", color: '#ffffff', padding: "10px 1rem", borderRight: "2px solid #ffffff"
                                        }} onClick={() => handleShowOrder("USER_RECEIVED", 6)}>Đã Nhận</button>
                                        <button style={{width: 'calc(100% / 7)', backgroundColor: (activeType == 7) ? '#03a213' : '#686766',
                                            fontSize: "18px",fontWeight: "600", color: '#ffffff', padding: "10px 1rem", borderTopRightRadius: '6px'
                                        }} onClick={() => handleShowOrder("CANCELLED", 7)}>Đã Hủy</button>
                                    </div>
                                </div>
                                <div className="container--item--right--order">
                                    {
                                        order.length > 0 ? (
                                            <table>
                                                <tr>
                                                    <th>Mã Đơn Hàng</th>
                                                    <th>Ngày Mua</th>
                                                    <th>Tổng Tiền</th>
                                                    <th>Trạng Thái</th>
                                                    <th>Hủy ĐH</th>
                                                </tr>
                                                {
                                                    order?.slice(startIndex, endIndex + 1).map((item) => {
                                                        const orderDetails = orderDetail?.filter((detail) => detail.orderID === item.orderID);
                                                        const total = orderDetails?.reduce((acc, curr) => acc + curr.quantity * curr.purchasePrice, 0);
                                                        return (
                                                            <tr key={item?.orderID}>
                                                                <td><span>{item?.orderID}</span></td>
                                                                <td><span>{convertDate(item?.dateOrder)}</span></td>
                                                                <td><p>{formatProductPrice(total)}</p></td>
                                                                <td><span>
                                                                    {item.status === "PENDING"
                                                                    ? "Chờ xác nhận"
                                                                    : item.status === "CONFIRMED"
                                                                    ? "Chờ lấy hàng"
                                                                    : item.status === "ON_SHIPPING"
                                                                    ? "Đang giao hàng"
                                                                    : item.status === "SHIP_COMPLETED"
                                                                    ? "Đã giao hàng"
                                                                    : item.status === "USER_RECEIVED"
                                                                    ? "Đã nhận hàng"
                                                                    : "Đã hủy"}
                                                                </span>
                                                                </td>
                                                                <td style={{display: 'flex', justifyContent: "space-around"}}>
                                                                    <button onClick={() => handleViewOrder(item)} style={{padding: "5px 20px", backgroundColor: "#e6b112", color: "#ffff",
                                                                    fontSize: "16px", fontWeight: "600", borderRadius: '4px'
                                                                    }}>Xem</button>
                                                                    {
                                                                        item.status === "PENDING" ? (
                                                                        <button onClick={() => handleCancelOrder(item)} style={{padding: "5px 20px", backgroundColor: "#e36a36", color: "#ffff",
                                                                        fontSize: "16px", fontWeight: "600",borderRadius: '4px'}}>Hủy</button>
                                                                        ) : item.status === "SHIP_COMPLETED" ? (
                                                                        <button onClick={() => handleReived(item)} style={{padding: "5px 20px", backgroundColor: "#034EA2", color: "#ffff",
                                                                        fontSize: "16px", fontWeight: "600",borderRadius: '4px'}}>Nhận</button>
                                                                        ) : (
                                                                        <button style={{padding: "5px 20px",fontSize: "16px", color: "#828080", fontWeight: "600",borderRadius: '4px'}}>Hủy</button>
                                                                        )
                                                                    }
                                                                </td>
                                                            </tr>
                                                        );
                                                    })
                                                }
                                                <Pagination style={{padding: "1rem 0"}}
                                                current={currentPage}
                                                pageSize={itemsPerPage}
                                                total={order.length}
                                                onChange={handlePageChange}
                                                />
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
                            <div className="overlay d-none" onClick={closePopup}>
                            </div>
                            <div className="orderDetail-view d-none">
                                    <div className="order_infor">
                                        <h5>Thông tin đơn hàng</h5>
                                        <TableComponent
                                            columns={collums}
                                            dataSource={data}
                                            pageSize={3}
                                        />
                                    </div>
                                    <div className="order__ship">
                                        <h5>Thông tin vận chuyển</h5>
                                    <Steps 
                                        direction="vertical"
                                        current={1}
                                        items={
                                            (shipping[0]?.status === "CANCELLED") ? (
                                                (shipping[0]?.dateOrder && (shipping[0]?.dateShipping == null && shipping[0]?.datePreparing == null && shipping[0]?.dateCompleted == null)) ?
                                                (
                                                    [{
                                                        title: "Đã đặt hàng",
                                                        description: `Đơn hàng đã được đặt vào ngày ${convertDate(shipping[0]?.dateOrder)}`,
                                                        status: 'finish'
                                                    }, 
                                                    {
                                                        title: "Đơn hàng đã hủy",
                                                        description: `Đơn hàng đã bị hủy vào ngày....`,
                                                        status: 'error'
                                                    }]
                                                ) : (shipping[0]?.dateOrder && shipping[0]?.dateShipping == null && shipping[0]?.datePreparing != null && shipping[0]?.dateCompleted == null) ? (
                                                    [{
                                                        title: "Đã đặt hàng",
                                                        description: `Đơn hàng đã được đặt vào ngày ${convertDate(shipping[0]?.dateOrder)}`, 
                                                        status: 'finish'
                                                    }, 
                                                    {
                                                        title: "Đã giải quyết",
                                                        description: `Đơn hàng đã được chuẩn bị vào ngày ${convertDate(shipping[0]?.datePreparing)}`,
                                                        status: 'finish',
                                                        icon: <BiPackage />
                                                    }, 
                                                    {
                                                        title: "Đơn hàng đã hủy",
                                                        description: `Đơn hàng đã bị hủy vào ngày....`,
                                                        status: 'error'
                                                    }]
                                                ) : (shipping[0]?.dateOrder && shipping[0]?.dateShipping != null && shipping[0]?.datePreparing != null && shipping[0]?.dateCompleted == null) ? (
                                                    [{
                                                        title: "Đã đặt hàng",
                                                        description: `Đơn hàng đã được đặt vào ngày ${convertDate(shipping[0]?.dateOrder)}`, 
                                                        status: 'finish'
                                                    }, 
                                                    {
                                                        title: "Đã giải quyết",
                                                        description: `Đơn hàng đã được chuẩn bị vào ngày ${convertDate(shipping[0]?.datePreparing)}`,
                                                        status: 'finish',
                                                        icon: <BiPackage />
                                                    }, 
                                                    {
                                                        title: "Đã được vận chuyển",
                                                        description: `Đơn hàng đã được vận chuyển vào ngày ${convertDate(shipping[0]?.dateShipping)}`,
                                                        status: 'finish',
                                                        icon: <AiFillCar color='#1677ff'/>
                                                    },
                                                    {
                                                        title: "Đơn hàng đã hủy",
                                                        description: `Đơn hàng đã bị hủy vào ngày....`,
                                                        status: 'error'
                                                    }]
                                                ) : (
                                                    [{
                                                        title: "Đã đặt hàng",
                                                        description: `Đơn hàng đã được đặt vào ngày ${convertDate(shipping[0]?.dateOrder)}`, 
                                                        status: 'finish'
                                                    }, 
                                                    {
                                                        title: "Đơn hàng đã hủy",
                                                        description: `Đơn hàng đã bị hủy vào ngày....`,
                                                        status: 'error'
                                                    }]
                                                )
                                            ) : (shipping[0]?.status === "PENDING") ? (
                                                [
                                                    {
                                                        title: "Đã đặt hàng",
                                                        description: `Đơn hàng đã được đặt vào ngày ${convertDate(shipping[0]?.dateOrder)}`, 
                                                        status: 'finish'
                                                    }, 
                                                    {
                                                        title: "Đang chờ giải quyết",
                                                        description: `Đơn hàng đang chờ giải quyết`,
                                                        status: 'process',
                                                        icon: <BiPackage />
                                                    }, 
                                                    {
                                                        title: "Đang chờ vận chuyển",
                                                        description: `Đơn hàng đang chờ được vận chuyển`,
                                                        status: 'wait',
                                                        icon: <AiFillCar color='#d5d5d5'/>
                                                    }
                                                ]
                                            ) : (shipping[0]?.status === "CONFIRMED") ? (
                                                [
                                                    {
                                                        title: "Đã đặt hàng",
                                                        description: `Đơn hàng đã được đặt vào ngày ${convertDate(shipping[0]?.dateOrder)}`, 
                                                        status: 'finish'
                                                    }, 
                                                    {
                                                        title: "Đã giải quyết",
                                                        description: `Đơn hàng đã được chuẩn bị vào ngày ${convertDate(shipping[0]?.datePreparing)}`,
                                                        status: 'finish',
                                                        icon: <BiPackage />
                                                    }, 
                                                    {
                                                        title: "Đang chờ vận chuyển",
                                                        description: `Đơn hàng đang chờ được vận chuyển`,
                                                        status: 'process',
                                                        icon: <AiFillCar color='blue'/>
                                                    },
                                                    {
                                                        title: "Đang vận chuyển",
                                                        description: `Đơn hàng đang được vận chuyển`,
                                                        status: 'wait',
                                                        icon: <AiFillCar color='#d5d5d5'/>
                                                    }
                                                ]
                                            ) : (shipping[0]?.status === "ON_SHIPPING") ? (
                                                [
                                                    {
                                                        title: "Đã đặt hàng",
                                                        description: `Đơn hàng đã được đặt vào ngày ${convertDate(shipping[0]?.dateOrder)}`, 
                                                        status: 'finish'
                                                    }, 
                                                    {
                                                        title: "Đã giải quyết",
                                                        description: `Đơn hàng đã được chuẩn bị vào ngày ${convertDate(shipping[0]?.datePreparing)}`,
                                                        status: 'finish',
                                                        icon: <BiPackage />
                                                    }, 
                                                    {
                                                        title: "Đã được vận chuyển",
                                                        description: `Đơn hàng đã được vận chuyển vào ngày ${convertDate(shipping[0]?.dateShipping)}`,
                                                        status: 'finish',
                                                        icon: <AiFillCar color='#1677ff'/>
                                                    },
                                                    {
                                                        title: "Đang vận chuyển",
                                                        description: `Đơn hàng đang được vận chuyển`,
                                                        status: 'process',
                                                        icon: <AiFillCar color='blue'/>
                                                    },
                                                    {
                                                        title: "Đã giao hàng",
                                                        description: `Đơn hàng đã được giao`,
                                                        status: 'wait',
                                                        icon: <AiOutlineFileDone color='#d5d5d5'/>
                                                    }
                                                ]
                                            ) : (shipping[0]?.status === "SHIP_COMPLETED") ? (
                                                [
                                                    {
                                                        title: "Đã đặt hàng",
                                                        description: `Đơn hàng đã được đặt vào ngày ${convertDate(shipping[0]?.dateOrder)}`, 
                                                        status: 'finish'
                                                    }, 
                                                    {
                                                        title: "Đã giải quyết",
                                                        description: `Đơn hàng đã được chuẩn bị vào ngày ${convertDate(shipping[0]?.datePreparing)}`,
                                                        status: 'finish',
                                                        icon: <BiPackage />
                                                    }, 
                                                    {
                                                        title: "Đã được vận chuyển",
                                                        description: `Đơn hàng đã được vận chuyển vào ngày ${convertDate(shipping[0]?.dateShipping)}`,
                                                        status: 'finish',
                                                        icon: <AiFillCar color='#1677ff'/>
                                                    },
                                                    {
                                                        title: "Đã giao hàng",
                                                        description: `Đơn hàng đã được giao vào ngày ${convertDate(shipping[0]?.dateCompleted)}`,
                                                        status: 'finish',
                                                        icon: <AiOutlineFileDone color='#blue'/>
                                                    },
                                                    {
                                                        title: "Hoàn Tất",
                                                        description: `Đơn hàng đã được giao hoàn tất vào ngày ${convertDate(shipping[0]?.dateCompleted)}`,
                                                        status: 'finish', 
                                                        icon: <AiFillCheckCircle color = "#blue"/>
                                                    }
                                                ]
                                            ) : (
                                                    [
                                                        {
                                                            title: "Đã đặt hàng",
                                                            description: `Đơn hàng đã được đặt vào ngày ${convertDate(shipping[0]?.dateOrder)}`, 
                                                            status: 'finish'
                                                        }, 
                                                        {
                                                            title: "Đã giải quyết",
                                                            description: `Đơn hàng đã được chuẩn bị vào ngày ${convertDate(shipping[0]?.datePreparing)}`,
                                                            status: 'finish',
                                                            icon: <BiPackage />
                                                        }, 
                                                        {
                                                            title: "Đã được vận chuyển",
                                                            description: `Đơn hàng đã được vận chuyển vào ngày ${convertDate(shipping[0]?.dateShipping)}`,
                                                            status: 'finish',
                                                            icon: <AiFillCar color='#1677ff'/>
                                                        },
                                                        {
                                                            title: "Đã giao hàng",
                                                            description: `Đơn hàng đã được giao vào ngày ${convertDate(shipping[0]?.dateCompleted)}`,
                                                            status: 'finish',
                                                            icon: <AiOutlineFileDone color='#blue'/>
                                                        },
                                                        {
                                                            title: "Hoàn Tất",
                                                            description: `Đơn hàng đã được giao hoàn tất vào ngày ${convertDate(shipping[0]?.dateCompleted)}`,
                                                            status: 'finish', 
                                                            icon: <AiFillCheckCircle color = "#blue"/>
                                                        }
                                                    ]
                                            )
                                        }
                                    />
                                    </div>
                            </div>
                            {
                                (ratingItem?.length > 0) ? (
                                <div className="rating-container">
                                    <form className='rating'>
                                        <div style={{display: "flex", justifyContent:"space-between", padding: "0 1rem"}}>
                                            <h3>Đánh giá sản phẩm</h3>
                                            <AiFillCloseCircle onClick={() => handleCloseRating()} style={{fontSize: "20px", color: "#000000"}}/>
                                        </div>
                                        <div style={{display: "flex", justifyContent: "space-around"}}>
                                            <div className="product-info">
                                                <img src={require(`../../assets/images/${ratingItem[0].image}`)} alt="" />
                                                <div style={{paddingTop: "3rem"}}>
                                                    <p>{ratingItem[0].name}</p>
                                                    <p>{ratingItem[0].unitPrice}</p>
                                                </div>
                                            </div>
                                            <div className="product-rating">
                                                <h3>Đánh giá của bạn</h3>
                                                <Rate style={{paddingBottom: "2rem"}} defaultValue={3} onChange={(value) => setRateAmount(value)} /> <br />
                                                <textarea type="text" placeholder='Vui lòng nhập ý kiến của bạn' onChange={(e) => setComment(e.target.value)} />
                                                <button onClick={(e) => handleRatingProduct(e)} style={{padding: "10px 2rem", backgroundColor: "#cb1e23", color: "#ffffff", borderRadius: "5px", marginTop: "1.5rem"}}>Đánh Giá</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                )  : (
                                    <div></div>
                                )
                            }
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
                                        (orderLoading && orderDetailLoading && productLoading) ? (
                                            <div className="overLay">
                                                <Spin />
                                            </div>
                                        ) : (
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
                                                                        <td><span>{convertDate(item.date)}</span></td>
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
    </>
  )
}

export default AccountOrder