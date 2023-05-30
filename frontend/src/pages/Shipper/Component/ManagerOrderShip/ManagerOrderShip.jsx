import './ManagerOrderShip.scss'

import { Image, Pagination, Popconfirm, Skeleton } from 'antd'
import React, { useEffect, useState } from 'react'
import { getAllOrder, getOrderType, getOrderWorker, updateOrders } from '../../../../Redux/slice/paymentSlice'
import { useDispatch, useSelector } from 'react-redux'

import { AiFillDelete } from 'react-icons/ai'
import EmptyCart from '../../../../assets/images/empty-cart.png';
import { Link } from 'react-router-dom'
import { MdAdd } from 'react-icons/md'
import convertDate from '../../../../Helper/convertDate'
import formatProductPrice from '../../../../Helper'
import { getAllProducts } from '../../../../Redux/slice/productSlice'
import { getOrderDetail } from '../../../../Redux/slice/orderDetailSlice'
import { toast } from 'react-toastify'

const ManagerOrderShip = (props) => {
    const dispatch = useDispatch()
    const [activeType, setActiveType] = useState(3)
  
    const userID = JSON.parse(localStorage.getItem('user'))[0]?.userID || 0
  
    useEffect(() => {
      dispatch(getOrderDetail())
      dispatch(getOrderWorker(userID))
    }, [])

    const order = useSelector(state => state.order.data.data) || []
    const orderDetailed = useSelector(state => state.orderDetail.data.data) || []
    const [orderWorker, setOrderWorker] = useState([])
    useEffect(() => {
        setOrderWorker(order)
    }, [order])
    const [currentPage, setCurrentPage] = useState(1);
    const handleShowOrder = (type, number) => {
        if (type === "Tất cả"){
          setOrderWorker(order)
          setCurrentPage(1)
          setActiveType(3)
        }
        else if (type === "ON_SHIPPING"){
            const orderType = order.filter(item => item.status === "ON_SHIPPING")
            setOrderWorker(orderType)
            setCurrentPage(1)
            setActiveType(number)
        }
        else if (type === "SHIP_COMPLETED"){
            const orderType = order.filter((item) => item.status === "SHIP_COMPLETED" || item.status == "USER_RECEIVED")
            setOrderWorker(orderType)
            setCurrentPage(1)
            setActiveType(number)
        }
    }
  
    const product = useSelector(state => state.product.data) || []
    const userLoading = useSelector(state => state.userAPI.loading)
  
    const popup = (item) =>{
      const ul = document.querySelector(`.statuslist-${item.orderID}`)
      if(ul.classList.contains('d-none')){
        ul.classList.remove('d-none')
      }
      else {
        ul.classList.add('d-none')
      }
    }
  
    const handleUpdate = (item, state) => {
      const ul = document.querySelector(`.statuslist-${item.orderID}`)
      ul.classList.add('d-none')
      const orderID = item.orderID
      const states = state
      const data = {
        status: states,
        workerID: userID
      }
      dispatch(updateOrders({orderID, data}))
      .then((res) => {
        if (res.payload.status === 200){
          toast.success("Cập nhật đơn hàng thành công!")
        }
        else{
          toast.error("Cập nhật đơn hàng thất bại!")
        }
        dispatch(getOrderWorker(userID))
      })
      // setOrder(orders)
      setCurrentPage(1)
      setActiveType(3)
    }
  
    const handlePageChange = (page) => {
      setCurrentPage(page);
    };
  
    const itemsPerPage = 8;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = currentPage * itemsPerPage - 1;
  
    const [currentPageProduct, setCurrentPageProduct] = useState(1);
  
    const handlePageChangeProduct = (page) => {
      setCurrentPageProduct(page);
    };
  
    const itemsPerPageProduct = 4;
    const startIndexProduct = (currentPageProduct - 1) * itemsPerPageProduct;
    const endIndexProduct = currentPageProduct * itemsPerPageProduct - 1;
  
  
    const [currentPageCartAdmin, setCurrentPageCartAdmin] = useState(1);
  
    const handlePageChangeCartAdmin = (page) => {
      setCurrentPageCartAdmin(page);
    };
  
    const itemsPerPageCartAdmin = 2;
    const startIndexCartAdmin = (currentPageCartAdmin - 1) * itemsPerPageCartAdmin;
    const endIndexCartAdmin = currentPageCartAdmin * itemsPerPageCartAdmin - 1;
    const cartAdmin = useSelector(state => state.allAdminCart.cart)
    const totalAdmin = cartAdmin.reduce((a, i) => a + i.cartQuantity * i.unitPrice, 0);
  
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
  
    const handlePopup = () => {
      const overlay = document.querySelector('.addOrder-overlay')
      const orderAdd = document.querySelector('.addOrder')
      if (overlay.classList.contains('d-none') && orderAdd.classList.contains('d-none')){
        overlay.classList.remove('d-none')
        orderAdd.classList.remove('d-none')
      }
      else {
        overlay.classList.add('d-none')
        orderAdd.classList.add('d-none')
      }
    }

    // const total = order?.filter((item) => item.workerID == userID)?.length || 0
  
    const orderStatus = useSelector((state) => state.order.status) 
    return (
    <div>
    {
        (orderStatus === "successForWorker") ? (
            <div className="manager__order">
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
            {/* <Link onClick={() => handlePopup()} to = {""}><button style={{padding: "8px 20px", backgroundColor: "transparent", color: "#ffffff", fontSize: "18px",
              borderRadius: "5px"
            }}>
              Add New Orders
            </button></Link> */}
            <h3 style={{color: "#f92626", padding: "1rem 2rem", fontWeight: "bolder"}}>QUẢN LÝ ĐƠN HÀNG</h3>
            <div style={{display: 'flex'}}>
              <button style={{width: 'auto', minWidth: "150px", backgroundColor: (activeType == 3) ? '#03a213' : '#686766',
                fontSize: "18px",fontWeight: "600", color: '#ffffff', padding: "10px 1rem", borderTopLeftRadius: '6px',borderRight: "2px solid #ffffff"
                }}onClick={() => handleShowOrder("Tất cả", 3)}>Tất Cả</button>
              <button style={{width: 'auto', minWidth: "150px",  backgroundColor: (activeType == 1) ? '#03a213' : '#686766',
                fontSize: "18px",fontWeight: "600", color: '#ffffff', padding: "10px 1rem", borderRight: "2px solid #ffffff"
                }} onClick={() => handleShowOrder("ON_SHIPPING",1)}>Đang Giao</button>
              <button style={{width: 'auto', minWidth: "150px", backgroundColor: (activeType == 2) ? '#03a213' : '#686766',
                fontSize: "18px",fontWeight: "600", color: '#ffffff', padding: "10px 1rem", borderRight: "2px solid #ffffff", borderTopRightRadius: '6px'
                }} onClick={() => handleShowOrder("SHIP_COMPLETED", 2)}>Đã Giao</button>
              </div>
            </div>
            <table>
              <tr>
                <th>STT</th>
                <th>Mã KH</th>
                <th>Tổng Tiền</th>
                <th>Ngày đặt</th>
                <th>Trạng thái</th>
                <th>Hoạt động</th>
              </tr>
                {
                  (orderWorker.length > 0 && activeType == 1) ? (
                    orderWorker.sort((a, b) => b.orderID - a.orderID).slice(startIndex, endIndex + 1).map((item) => {
                      const orderDetails = orderDetailed?.filter((detail) => detail.orderID === item.orderID);
                      const total = orderDetails.reduce((acc, curr) => acc + curr.quantity * curr.purchasePrice, 0);
                        return (
                          <tr>
                            <td><span>{item.orderID}</span></td>
                            <td><span>{item.userID}</span></td>
                            <td><span>{formatProductPrice(total)}</span></td>
                            <td><span>{convertDate(item.dateOrder)}</span></td>
                            <td><span>{item.status === "PENDING"
                                    ? "Chờ xác nhận"
                                    : item.status === "CONFIRMED"
                                    ? "Chờ giao hàng"
                                    : item.status === "ON_SHIPPING"
                                    ? "Đang giao hàng"
                                    : item.status === "SHIP_COMPLETED"
                                    ? "Đã giao hàng"
                                    : "Đã hủy"}</span></td>
                            <td><div style={{display: "flex", justifyContent: "space-evenly"}}>
                              <Link to = {`${item.orderID}`}><button style={{padding: "4px 20px", backgroundColor: "#e6b112",fontSize: "18px",  color: "#ffffff", borderRadius: "5px"}}>Xem</button></Link>  
                                <button onClick={() => popup(item)} style={{padding: "4px 22px", backgroundColor: (item.status == "CANCELLED" || item.status == "SHIP_COMPLETED") ? "#686766"  : "#54d717",fontSize: "18px",  color: "#ffffff", borderRadius: "5px", position: "relative"}}>Sửa
                                {
                                    (item.status == "ON_SHIPPING") ? (
                                        <ul className={`statuslist-${item.orderID} d-none`}>
                                            <li onClick={() => handleUpdate(item, "SHIP_COMPLETED")}>
                                                COMPLETED
                                            </li>
                                        </ul>
                                    ) : ("")
                                }
                                </button>
                            </div>
                            </td>
                        </tr>
                      )})
                  )  : (orderWorker.length > 0 && orderWorker?.filter((item) => item.workerID == userID)?.length > 0) ?  (
                    orderWorker?.filter((child) => child.workerID == userID)?.sort((a, b) => b.orderID - a.orderID)?.slice(startIndex, endIndex + 1).map((item) => {
                        const orderDetails = orderDetailed?.filter((detail) => detail.orderID === item.orderID);
                        const total = orderDetails.reduce((acc, curr) => acc + curr.quantity * curr.purchasePrice, 0);
                        return (
                            <tr>
                            <td><span>{item.orderID}</span></td>
                            <td><span>{item.userID}</span></td>
                            <td><span>{formatProductPrice(total)}</span></td>
                            <td><span>{convertDate(item.dateOrder)}</span></td>
                            <td><span>{item.status === "PENDING"
                                    ? "Chờ xác nhận"
                                    : item.status === "CONFIRMED"
                                    ? "Chờ giao hàng"
                                    : item.status === "ON_SHIPPING"
                                    ? "Đang giao hàng"
                                    : (item.status === "SHIP_COMPLETED" || item.status === "USER_RECEIVED" || item.status === "CANCELLED")
                                    ? "Đã giao hàng" : ""}</span></td>
                            <td><div style={{display: "flex", justifyContent: "space-evenly"}}>
                                <Link to = {`${item.orderID}`}><button style={{padding: "4px 20px", backgroundColor: "#e6b112",fontSize: "18px",  color: "#ffffff", borderRadius: "5px"}}>Xem</button></Link>  
                                <button onClick={() => popup(item)} style={{padding: "4px 22px", backgroundColor: (item.status == "CANCELLED" || item.status == "SHIP_COMPLETED" || item.status == "USER_RECEIVED") ? "#686766"  : "#54d717",fontSize: "18px",  color: "#ffffff", borderRadius: "5px", position: "relative"}}>Sửa
                                {
                                    (item.status == "ON_SHIPPING") ? (
                                        <ul className={`statuslist-${item.orderID} d-none`}>
                                            <li onClick={() => handleUpdate(item, "SHIP_COMPLETED")}>
                                                COMPLETED
                                            </li>
                                        </ul>
                                    ) : ("")
                                }
                                {/* <ul className={`statuslist-${item.orderID} d-none`}>
                                    <li onClick={() => handleUpdate(item, "SHIP_COMPLETED")}>
                                        COMPLETED
                                    </li>
                                    <li style={{backgroundColor: "#f92626"}} onClick={() => handleUpdate(item, "CANCELLED")}>
                                        CANCELLED
                                    </li>
                                </ul> */}
                                </button>
                            </div>
                            </td>
                        </tr>
                    )})) : ((orderWorker?.filter((item) => item.workerID == userID)?.length == 0 && activeType != 1)) ? 
                    (<td colspan="6">
                        <img src={EmptyCart} alt="" />
                        <h3>Đơn hàng trống</h3>
                    </td>) : (
                    (<td colspan="6">
                    <img src={EmptyCart} alt="" />
                    <h3>Đơn hàng trống</h3>
                     </td>) 
                  )
                }
            </table>
            <Pagination
              current={currentPage}
              pageSize={itemsPerPage}
              total={orderWorker.length}
              onChange={handlePageChange}
            />
            {/* <div className="overlay addOrder-overlay d-none"></div>
            <div className="addOrder d-none">
              <div style={{display: "flex", justifyContent: "space-between", padding: "0 1rem"}}><h3>Thêm Đơn Hàng</h3>
                <AiFillCloseCircle onClick={() => handlePopup()} style={{fontSize: "25px", color: "#f00c0c"}} />
              </div>
              <div style={{display: "flex", justifyContent: "space-between"}}>
                <div className="addOrder__left">
                  <table>
                    <tr>
                      <th>Sản Phẩm</th>
                      <th>Hình Ảnh</th>
                      <th>Giá Tiền</th>
                      <th>Thực Hiện</th>
                    </tr>
                      {
                        product.slice(startIndexProduct, endIndexProduct + 1).map((item) => {
                          return (
                            <tr>
                              <td><span>{item.name}</span></td>
                              <td><Image src={require(`../../../../assets/images/${item.image}`)} preview = {true}/></td>
                              <td><span>{formatProductPrice(item.unitPrice)}</span></td>
                              <td>
                                <button onClick={() => handleAddItemTocart(item)}>
                                  Mua Hàng
                                </button>
                              </td>
                            </tr>
                          )
                        })
                      }
                  </table>
                  <Pagination
                    current={currentPageProduct}
                    pageSize={itemsPerPageProduct}
                    total={product.length}
                    onChange={handlePageChangeProduct}
                  />
                </div>
              </div>
            </div> */}
            </div>
        ) : (
          <Skeleton active/>
        )
    }
    </div>
    )
}

ManagerOrderShip.propTypes = {};

export default ManagerOrderShip;



