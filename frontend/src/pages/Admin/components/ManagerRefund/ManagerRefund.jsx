import './style.scss';

import { AiFillCloseCircle, AiFillDelete } from 'react-icons/ai';
import { Image, Pagination, Popconfirm } from 'antd';
import React, { useEffect, useState } from 'react';
import { addToCartAdmin, decreamentFromCartAdmin, increamentFromCartAdmin, removeFromToCartAdmin } from '../../../../Redux/slice/cartAdminSlice';
import { deleteOrderForID, getAllOrder, orderPayment, updateOrders } from '../../../../Redux/slice/paymentSlice';
import { getOrderDetail, orderDetail } from '../../../../Redux/slice/orderDetailSlice';
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

const ManageRefund = (props) => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllOrder())
    dispatch(getAllUser())
    dispatch(getOrderDetail())
    dispatch(getAllProducts())
  }, [])

  const user = useSelector(state => state.userAPI.data)
  const order = useSelector(state => state.order.data) || []
  const orderDetailed = useSelector(state => state.orderDetail.data.data) || []
  const product = useSelector(state => state.product.data) || []

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const itemsPerPage = 8;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage - 1;


  const [currentPageRefund, setCurrentPageRefund] = useState(1);

  const handlePageChangeRefund = (page) => {
    setCurrentPageRefund(page);
  };

  const itemsPerPageRefund = 4;
  const startIndexRefund = (currentPageRefund - 1) * itemsPerPageRefund;
  const endIndexRefund = currentPageRefund * itemsPerPageRefund - 1;

  const orderRefund = orderDetailed?.filter((item) => item.status == "ON_REFUND")

  const groupedOrders = orderRefund?.reduce((accumulator, currentValue) => {
    const orderID = currentValue.orderID;
    const matchingOrder = accumulator?.find(order => order.orderID === orderID);
    const orderDetails = orderDetailed?.filter(detail => detail.orderID === orderID);
    const total = orderDetails?.reduce((acc, curr) => acc + curr.quantity * curr.purchasePrice, 0);
    if (matchingOrder) {
      matchingOrder.total += total;
    } else {
      const orderOFUser = order?.find(order => order.orderID === orderID);
      const userMatches = user?.find(user => user?.userID === orderOFUser?.userID);
      accumulator.push({
        orderID,
        fullName: userMatches?.fullName,
        dateOrder: orderOFUser?.dateOrder,
        total
      });
    }
    return accumulator;
  }, []);

  const [activeType, setActiveType] = useState(1)
  const handleShowOrder = (type, number) => {
        setCurrentPage(1)
        setActiveType(number)

  }
  return (
    <div className="manager__order">
      <h3>Manager Refund</h3>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <Link to = {""}><button style={{padding: "8px 20px", backgroundColor: "transparent", color: "#ffffff", fontSize: "18px",
              borderRadius: "5px"
            }}>
              Add New Orders
            </button></Link>
            <div style={{display: 'flex'}}>
              <button style={{width: 'auto', minWidth: "150px",borderTopLeftRadius: '6px',  backgroundColor: (activeType == 1) ? '#03a213' : '#686766',
                fontSize: "18px",fontWeight: "600", color: '#ffffff', padding: "10px 1rem", borderRight: "2px solid #ffffff"
                }} onClick={() => handleShowOrder("ON_SHIPPING",1)}>Chờ Xử Lý</button>
              <button style={{width: 'auto', minWidth: "150px", backgroundColor: (activeType == 2) ? '#03a213' : '#686766',
                fontSize: "18px",fontWeight: "600", color: '#ffffff', padding: "10px 1rem", borderRight: "2px solid #ffffff", borderTopRightRadius: '6px'
                }} onClick={() => handleShowOrder("SHIP_COMPLETED", 2)}>Đã Xử Lý</button>
              </div>
            </div>
        {
          (activeType === 1) ? (
            <>
            <table>
              <thead>
                <tr>
                  <th>Mã Đơn Hàng</th>
                  <th>Họ Tên</th>
                  <th>Tổng tiền</th>
                  <th>Ngày đặt hàng</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  (groupedOrders.length > 0) ? (
                    groupedOrders.slice(startIndex, endIndex + 1)?.map(order => (
                      <tr key={order.orderID}>
                        <td>{order?.orderID}</td>
                        <td>{order?.fullName}</td>
                        <td>{formatProductPrice(order.total)}</td>
                        <td>{convertDate(order.dateOrder)}</td>
                        <td><Link to = {`${order.orderID}`}><button style={{padding: "4px 20px", backgroundColor: "#e6b112",fontSize: "18px",  color: "#ffffff", borderRadius: "5px"}}>Xem</button></Link></td>
                      </tr>
                    ))
                  )  : (
                    <td colspan="5">
                        <img src={EmptyCart} alt="" />
                          <h3>Đơn hàng trống</h3>
                        </td>
                  )
                }
              </tbody>
              </table>
              <Pagination
                current={currentPage}
                pageSize={itemsPerPage}
                total={groupedOrders.length}
                onChange={handlePageChange}
              /></>
          ) : (
            <>
            <table>
              <thead>
                <tr>
                  <th>Mã Đơn Hàng</th>
                  <th>Tên Sản Phẩm</th>
                  <th>Hình Ảnh</th>
                  <th>Giá</th>
                  <th>Tổng Tiền</th>
                </tr>
              </thead>
              <tbody>
                {
                  (orderDetailed.length > 0) ? (
                    orderDetailed?.filter((item) => item.status === "REFUND_COMPLETED")?.slice(startIndexRefund, endIndexRefund + 1)?.map((orderItem) => {
                      const productMatches =  product.find((productItem) => {
                        return orderItem.productID === productItem.productID;
                      })
                      if (productMatches){
                        return (
                          <tr>
                            <td><span>{orderItem.orderID}</span></td>
                            <td><span style={{maxWidth: "300px"}}>{productMatches.name}</span></td>
                            <td><Image style={{maxHeight: "150px", maxWidth: "150px"}} src={require(`../../../../assets/images/${productMatches.image}`)} preview = {true} /></td>
                            <td>{formatProductPrice(orderItem.purchasePrice)}</td>
                            <td>{formatProductPrice(orderItem.purchasePrice*orderItem.quantity)}</td>
                          </tr>
                        )
                      }
                    })
                  ) : (<></>)
                }
              </tbody>
              </table>
              <Pagination
                current={currentPageRefund}
                pageSize={itemsPerPageRefund}
                total={orderDetailed?.filter((item) => item.status === "REFUND_COMPLETED")?.length}
                onChange={handlePageChangeRefund}
              /></>
          )
        }
    </div>
  )
};

ManageRefund.propTypes = {};

export default ManageRefund;
