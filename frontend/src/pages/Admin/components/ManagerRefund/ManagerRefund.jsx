import { Image, Pagination, Popconfirm } from 'antd';
import React, { useEffect, useState } from 'react';
import { AiFillCloseCircle, AiFillDelete } from 'react-icons/ai';
import { GrFormSubtract } from 'react-icons/gr';
import { MdAdd } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import formatProductPrice from '../../../../Helper';
import { addToCartAdmin, decreamentFromCartAdmin, increamentFromCartAdmin, removeFromToCartAdmin } from '../../../../Redux/slice/cartAdminSlice';
import { getOrderDetail, orderDetail } from '../../../../Redux/slice/orderDetailSlice';
import { deleteOrderForID, getAllOrder, orderPayment, updateOrders } from '../../../../Redux/slice/paymentSlice';
import { getAllProducts } from '../../../../Redux/slice/productSlice';
import { getAllUser } from '../../../../Redux/slice/usersSlice';
import EmptyCart from '../../../../assets/images/empty-cart.png';
import './style.scss';
import convertDate from '../../../../Helper/convertDate';

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

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const itemsPerPage = 8;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage - 1;

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
      const userMatches = user?.find(user => user.userID === orderOFUser.userID);
      accumulator.push({
        orderID,
        fullName: userMatches?.fullName,
        dateOrder: orderOFUser?.dateOrder,
        total
      });
    }
    return accumulator;
  }, []);

  return (
    <div className="manager__order">
      <h3>Manager Refund</h3>
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
            groupedOrders?.map(order => (
              <tr key={order.orderID}>
                <td>{order?.orderID}</td>
                <td>{order?.fullName}</td>
                <td>{formatProductPrice(order.total)}</td>
                <td>{convertDate(order.dateOrder)}</td>
                <td><Link to = {`${order.orderID}`}><button style={{padding: "4px 20px", backgroundColor: "#e6b112",fontSize: "18px",  color: "#ffffff", borderRadius: "5px"}}>Xem</button></Link></td>
              </tr>
            ))
          )  : (
            ""
          )
        }
      </tbody>
    </table>
      <Pagination
        current={currentPage}
        pageSize={itemsPerPage}
        total={groupedOrders.length}
        onChange={handlePageChange}
      />
    </div>
  )
};

ManageRefund.propTypes = {};

export default ManageRefund;
