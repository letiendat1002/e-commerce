import './ManagerOrder.scss';

import { AiFillCloseCircle, AiFillDelete, AiOutlineSearch } from 'react-icons/ai';
import { Image, Input, Pagination, Popconfirm } from 'antd';
import React, { useEffect, useState } from 'react';
import { addToCartAdmin, decreamentFromCartAdmin, increamentFromCartAdmin, removeFromToCartAdmin } from '../../../../Redux/slice/cartAdminSlice';
import { deleteOrderForID, getAllOrder, orderPayment, updateOrders } from '../../../../Redux/slice/paymentSlice';
import { getOrderDetail, orderDetail } from '../../../../Redux/slice/orderDetailSlice';
import { getShipper, getShipperSort } from '../../../../Redux/slice/shipperSlice';
import { useDispatch, useSelector } from 'react-redux';

import EmptyCart from '../../../../assets/images/empty-cart.png';
import { GrFormSubtract } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import convertDate from '../../../../Helper/convertDate';
import formatProductPrice from '../../../../Helper';
import { getAllProducts } from '../../../../Redux/slice/productSlice';
import { getAllUser } from '../../../../Redux/slice/usersSlice';
import { toast } from 'react-toastify';

const ManageOrders = (props) => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllOrder())
    dispatch(getAllUser())
    dispatch(getOrderDetail())
    dispatch(getAllProducts())
    dispatch(getShipperSort())
  }, [])

  const user = useSelector(state => state.userAPI.data)
  const orders = useSelector(state => state.order.data) || []
  const orderDetailed = useSelector(state => state.orderDetail.data.data) || []
  const shipper = useSelector((state) => state.shipper.data) || []  
  const [shipperAccend, setShipperAccend] = useState([shipper]);

  useEffect(() => {
    setShipperAccend(shipper)
  }, [shipper])

  const [order, setOrder] = useState([])
    
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
      setOrder(orders)
  }, [orders])
  const [activeType, setActiveType] = useState(1)
  
  const [showShipper, setShowShipper]= useState(false);
  const [idShipper, setIdShipper] = useState(shipperAccend?.[0])
  const [nameShipper, setNameShipper] = useState("")  
  const handleShowOrder = (type, number) => {
      const ulItem = document.querySelector('ul.list-shipper')
      ulItem.classList.add('d-none')
      if (type === "Tất Cả"){
          setOrder(orders)
          setCurrentPage(1)
          setActiveType(number)
      }
      else {
          const orderType = orders?.filter((item) => item.status === type)
          setOrder(orderType)
          setCurrentPage(1)
          setActiveType(number)
      }
  }

  const product = useSelector(state => state.product.data) || []

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
    const userAdmin = user.filter((item) => item.phone == phone)
    const userID = userAdmin[0].userID
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
      dispatch(getAllOrder())
    })
    setOrder(orders)
    setCurrentPage(1)
    setActiveType(1)
  }

  const handleDeleteOrder = (orderID) => {
    dispatch(deleteOrderForID(orderID))
    .then((res) => {
      if (res.payload.status === 200){
        toast.success("Xóa đơn hàng thành công!")
      }
      else {
        toast.error("Xóa đơn hàng thất bại")
      }
      dispatch(getAllOrder())
    })
  }

  // const [currentPage, setCurrentPage] = useState(1);

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

  const handleAddItemTocart = (item) => {
    dispatch(addToCartAdmin(item))
  }

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

  const handleAddOrder = (e) => {
    e.preventDefault()
    const userAdmin = user.filter((item) => item.phone == phone)
    const userID = userAdmin[0].userID
    const data = {
      userID, 
      additionalPrice: 0,
      address,
      paymentType: "COD"
    }
    dispatch(orderPayment(data))
    .then((response) => {
      const orderID = response.payload.data[0].orderID
      if (response.payload.status === 200){
        cartAdmin.map((item) => {
          const productID = item.productID
          const purchasePrice = item.unitPrice
          const quantity = item.cartQuantity
          dispatch(orderDetail({orderID, productID, purchasePrice, quantity}))
          .then((res) => {
            if (res.payload.status == 200){
              localStorage.removeItem('cartAdmin')
              dispatch(removeFromToCartAdmin(item))
              dispatch(getAllOrder())
              dispatch(getOrderDetail())
              handlePopup()
            }
            else {
              toast.error("Đặt hàng thất bại")
            }
          })
        })
        toast.success("Đặt hàng thành công")
      }
    })
  }

  
  const handleFocus = () => {
    const ulItem = document.querySelector('ul.list-shipper')
    ulItem.classList.remove('d-none')
  }

  const handleClosePopup = () => {
    const ulItem = document.querySelector('ul.list-shipper')
    ulItem.classList.add('d-none')
  }
  const handleShowItem = (item, name) => {
    const ulItem = document.querySelector('ul.list-shipper')
    ulItem.classList.add('d-none')
    setIdShipper(item)
    setNameShipper(name)
  }

  const handleSearchShipper = (e) => {
    const name = e.target.value.toLowerCase()
    setNameShipper(name)
    const shipperListid = user.filter((item) => item.fullName.toLowerCase().includes(name))
    const ShipperList = shipperListid.filter((item) => item.roles.includes("ROLE_SHIPPER"))
    const ShipperID = ShipperList.map((item) => item.userID)
    setShipperAccend(ShipperID.length > 0 ? ShipperID : shipper)
  }

  const handleUpdateOnShipping = (item, state) => {
    const ul = document.querySelector(`.statuslist-${item.orderID}`)
    ul.classList.add('d-none')
    const orderID = item.orderID
    const states = state
    const data = {
      status: states,
      workerID: idShipper
    }
    dispatch(updateOrders({orderID, data}))
    .then((res) => {
      if (res.payload.status === 200){
        toast.success("Cập nhật đơn hàng thành công!")
      }
      else{
        toast.error("Cập nhật đơn hàng thất bại!")
      }
      dispatch(getAllOrder())
    })
    setOrder(orders)
    setCurrentPage(1)
    setActiveType(1)
  }
  return (
    <div className="manager__order">
      <h3>Manager Orders</h3>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <Link onClick={() => handlePopup()} to = {""}><button style={{padding: "8px 20px", backgroundColor: "#0a3b97", color: "#ffffff", fontSize: "18px",
          borderRadius: "5px"
        }} onClick={() => handleClosePopup()}>
          Add New Orders
        </button></Link>
        <div className="manager__orderShipper">
            <Input value={nameShipper} placeholder = "Tìm kiếm theo tên shipper" prefix = {<AiOutlineSearch fontSize={"20px"}/>}
              onFocus={handleFocus} onChange={(e) => handleSearchShipper(e)}
            />
            <ul className={'list-shipper d-none'}>
              {
                  (shipperAccend)?.map((item, idx) => {
                    const shiperMatches = user.find((user) => {
                      return item === user.userID
                    })
                    if (shiperMatches){
                      return (
                        <li onClick={() => handleShowItem(item, shiperMatches.fullName)}><p>{`${item} - ${shiperMatches.fullName}`}</p></li>
                      )
                    }
                  })
              }
            </ul>
        </div>
        <div style={{display: 'flex'}}>
          <button style={{width: 'auto', minWidth: "150px", backgroundColor: (activeType == 1) ? '#03a213' : '#686766',
            fontSize: "18px", fontWeight: "600", color: '#ffffff', padding: "10px 1rem", borderTopLeftRadius: '6px', borderRight: "2px solid #ffffff"
            }} onClick={() => handleShowOrder("Tất Cả", 1)}>Tất Cả</button>
          <button style={{width: 'auto', minWidth: "150px", backgroundColor: (activeType == 2) ? '#03a213' : '#686766',
            fontSize: "18px",fontWeight: "600", color: '#ffffff', padding: "10px 1rem", borderRight: "2px solid #ffffff"
            }} onClick={() => handleShowOrder("PENDING", 2)}>Chờ Xác Nhận</button>
          <button style={{width: 'auto', minWidth: "150px", backgroundColor: (activeType == 3) ? '#03a213' : '#686766',
            fontSize: "18px",fontWeight: "600", color: '#ffffff', padding: "10px 1rem", borderRight: "2px solid #ffffff"
            }} onClick={() => handleShowOrder("CONFIRMED",3)}>Chờ Giao Hàng</button>
          <button style={{width: 'auto', minWidth: "150px", backgroundColor: (activeType == 4) ? '#03a213' : '#686766',
            fontSize: "18px",fontWeight: "600", color: '#ffffff', padding: "10px 1rem", borderRight: "2px solid #ffffff"
            }} onClick={() => handleShowOrder("ON_SHIPPING",4)}>Đang Giao</button>
          <button style={{width: 'auto', minWidth: "150px", backgroundColor: (activeType == 5) ? '#03a213' : '#686766',
            fontSize: "18px",fontWeight: "600", color: '#ffffff', padding: "10px 1rem", borderRight: "2px solid #ffffff"
            }} onClick={() => handleShowOrder("SHIP_COMPLETED", 5)}>Đã Giao</button>
          <button style={{width: 'auto', minWidth: "150px", backgroundColor: (activeType == 6) ? '#03a213' : '#686766',
            fontSize: "18px",fontWeight: "600", color: '#ffffff', padding: "10px 1rem", borderTopRightRadius: '6px'
            }}onClick={() => handleShowOrder("CANCELLED", 6)}>ĐH Đã Hủy</button>
          </div>
      </div>
      <table onClick={() => handleClosePopup()}>
        <tr>
          <th>STT</th>
          <th>Họ Tên</th>
          <th>Tổng Tiền</th>
          <th>Ngày đặt</th>
          <th>Trạng thái</th>
          <th>Hoạt động</th>
        </tr>
          {
            (order.length > 0) ? (
              order.slice(startIndex, endIndex + 1).map((item) => {
                const userMatches = user.find((user) => {
                  return item.userID === user.userID;
                })
                const orderDetails = orderDetailed.filter((detail) => detail.orderID === item.orderID);
                const total = orderDetails.reduce((acc, curr) => acc + curr.quantity * curr.purchasePrice, 0);
                if (userMatches){
                  return (
                    <tr>
                      <td><span>{item.orderID}</span></td>
                      <td><span>{userMatches.fullName}</span></td>
                      <td><span>{formatProductPrice(total)}</span></td>
                      <td><span>{convertDate(item.dateOrder)}</span></td>
                      <td><span>{item.status === "PENDING"
                              ? "Chờ xác nhận"
                              : item.status === "CONFIRMED"
                              ? "Chờ giao hàng"
                              : item.status === "ON_SHIPPING"
                              ? "Đang giao hàng"
                              : item.status === "SHIP_COMPLETED"
                              ? "Đã giao hàng" : item.status === "USER_RECEIVED" ? "Đã Nhận Hàng"
                              : "Đã hủy"}</span></td>
                      <td><div style={{display: "flex", justifyContent: "space-evenly"}}>
                        <Link to = {`${item.orderID}`}><button style={{padding: "4px 20px", backgroundColor: "#e6b112",fontSize: "18px",  color: "#ffffff", borderRadius: "5px"}}>Xem</button></Link>
                        <button onClick={() => popup(item)} style={{padding: "4px 22px", backgroundColor: (item.status === "CANCELLED" || item.status === "USER_RECEIVED") ? "#686766"  : "#54d717",fontSize: "18px",  color: "#ffffff", borderRadius: "5px", position: "relative"}}>Sửa
                          {
                            (item.status === "PENDING") ? (
                              <ul className={`statuslist-${item.orderID} d-none`}>
                                <li onClick={() => handleUpdate(item, "CONFIRMED")}>
                                  CONFIRMED
                                </li>
                                <li style={{backgroundColor: "#f92626"}} onClick={() => handleUpdate(item, "CANCELLED")}>
                                  CANCELLED
                                </li>
                              </ul>
                            ) : (item.status === "CONFIRMED") ? (
                              <ul className={`statuslist-${item.orderID} d-none`}>
                                <li onClick={() => handleUpdateOnShipping(item, "ON_SHIPPING")}>
                                  SHIPPING
                                </li>
                                <li style={{backgroundColor: "#f92626"}} onClick={() => handleUpdate(item, "CANCELLED")}>
                                  CANCELLED
                                </li>
                              </ul>
                            ) : (item.status === "ON_SHIPPING") ? (
                              <ul className={`statuslist-${item.orderID} d-none`}>
                                <li onClick={() => handleUpdate(item, "SHIP_COMPLETED")}>
                                  COMPLETED
                                </li>
                                <li style={{backgroundColor: "#f92626"}} onClick={() => handleUpdate(item, "CANCELLED")}>
                                  CANCELLED
                                </li>
                              </ul>
                            ) : (item.status === "SHIP_COMPLETED") ? (
                              <ul className={`statuslist-${item.orderID} d-none`}>
                                <li style={{backgroundColor: "#f92626"}} onClick={() => handleUpdate(item, "CANCELLED")}>
                                  CANCELLED
                                </li>
                              </ul>
                            ) : ("")
                          }
                        </button>
                        
                        <Popconfirm 
                          title="Xóa đơn hàng"
                          description="Bạn có chắc muốn xóa đơn hàng?"
                          onConfirm={() => handleDeleteOrder(item.orderID)}
                          okText="Yes"
                          cancelText="No"
                        >
                          <button style={{padding: "4px 22px", backgroundColor: "#a93411",fontSize: "18px",  color: "#ffffff", borderRadius: "5px"}}>Xóa</button>
                        </Popconfirm>
                      </div>
                      </td>
                  </tr>
                )}})
            )  : (<tr>
              <td colspan="6">
                                <img src={EmptyCart} alt="" />
                                <h3>Đơn hàng hiện tại đang trống</h3>
                              </td>
            </tr>)
          }
      </table>
      <Pagination
        current={currentPage}
        pageSize={itemsPerPage}
        total={order.length}
        onChange={handlePageChange}
      />
      <div className="overlay addOrder-overlay d-none"></div>
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
          <div className="addOrderRight">
              <form>
                <div className="addOrderRight--container">
                  {(cartAdmin.length > 0) ? (
                    <div className="addOrderRight--container--item">
                      <table>
                        <tr>
                          <th>Hình ảnh</th>
                          <th>Thực hiện</th>
                          <th>Thành tiền</th>
                          <th>Xóa</th>
                        </tr>
                            {
                              cartAdmin.slice(startIndexCartAdmin, endIndexCartAdmin + 1).map((item) => {
                                return (
                                  <tr>
                                    <td><Image src={require(`../../../../assets/images/${item.image}`)} preview = {true}/></td>
                                    <td><div style={{display: "flex", justifyContent: "space-evenly", padding: "0 1.5rem"}}>
                                        <i onClick={() => dispatch(decreamentFromCartAdmin(item))} style={{color: "#f00c00"}}><GrFormSubtract /></i>
                                        <span>{item.cartQuantity}</span>
                                        <i onClick={() => dispatch(increamentFromCartAdmin(item))} style={{color: "#f00c00"}}><MdAdd /></i>
                                    </div></td>
                                    <td><span>{formatProductPrice(item.cartQuantity * item.unitPrice)}</span></td>
                                    <td>
                                      <Popconfirm 
                                        title="Xóa sản phẩm khỏi giỏ hàng!"
                                        description="Bạn có muốn xóa sản phẩm khỏi đơn hàng?"
                                        onConfirm={() => dispatch(removeFromToCartAdmin(item))}
                                        okText="Yes"
                                        cancelText="No"
                                      >
                                        <i style={{color: "#f00c00"}}><AiFillDelete /></i>
                                      </Popconfirm>
                                    </td>
                                  </tr>
                                )
                              })
                            }
                      </table>
                      <Pagination
                        current={currentPageCartAdmin}
                        pageSize={itemsPerPageCartAdmin}
                        total={cartAdmin.length}
                        onChange={handlePageChangeCartAdmin}
                      />
                    </div>
                  ) : (
                    <div className="addOrderRight--container--item">
                      <table>
                        <tr>
                          <th>Hình ảnh</th>
                          <th>Thực hiện</th>
                          <th>Thành tiền</th>
                          <th>Xóa</th>
                        </tr>
                        <tr>
                        <td colspan="4">
                          <img src={EmptyCart} alt="" />
                          <h3>Đơn hàng trống</h3>
                        </td>
                        </tr>
                      </table>
                    </div>
                  )        
                } 
                </div>
                <div className="addOrderRight--container--form">
                      <div className="form--container--item">
                        <span>Số Điện Thoại</span><br />
                        <input onChange={(e) => setPhone(e.target.value)} style={{marginBottom: '5px'}} type="text" placeholder='Vui lòng nhập số điện thoại' />
                      </div>
                      <div className="form--container--item" style={{paddingBottom: "1rem"}}>
                        <span>Địa chỉ</span><br />
                        <input onChange={(e) => setAddress(e.target.value)} type="text" placeholder='Vui lòng nhập số địa chỉ' />
                      </div>
                      <button style={{backgroundColor: "#f00c0c", color: "#ffffff", 
                        borderRadius: "4px", padding: "8px 10px", display: "flex", margin: "0 auto", zIndex: "100"}}
                        onClick={(e) => handleAddOrder(e)}
                      >
                      Thêm Đơn Hàng</button>
                  </div>
              </form>
          </div>
        </div>
      </div>
    </div>
  )
};

ManageOrders.propTypes = {};

export default ManageOrders;
