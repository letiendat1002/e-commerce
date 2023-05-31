import '../ManagerRefund/style.scss'

import { Image, Pagination } from 'antd'
import React, { useEffect, useState } from 'react'
import { getOrderDetail, refundOrderID } from '../../../../Redux/slice/orderDetailSlice'
import { useDispatch, useSelector } from 'react-redux'

import EmptyCart from '../../../../assets/images/empty-cart.png'
import TableComponent from '../../../../components/Table'
import formatProductPrice from '../../../../Helper/index'
import { getAllOrder } from '../../../../Redux/slice/paymentSlice'
import { getAllProducts } from '../../../../Redux/slice/productSlice'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'

const ModelViewRefund = () => {

  const slug = useParams()

  const orderID = slug.orderID

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllOrder())
    dispatch(getOrderDetail())
    dispatch(getAllProducts())
  }, [])

  const order = useSelector(state => state.order.data) || []
  const orderDetail = useSelector(state => state.orderDetail.data.data) || [];
  const product = useSelector(state => state.product.data) || []

  const orderDetailForID = orderDetail.filter(item => item.orderID == orderID)
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const itemsPerPage = 8;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage - 1;

  const handleRefund = (item, product) => {
    const data = {
        orderID: item.orderID, 
        productID: product.productID,
        status: "REFUND_COMPLETED"
    }

    dispatch(refundOrderID(data))
    .then((res) => {
        if (res.payload.status === 200){
            toast.success(("Hoàn trả sản phẩm hoàn tất"))
        }
        else{
            toast.error('Hoàn trả đơn hàng thất bại')
        }
        dispatch(getOrderDetail())
    })
}
  return (
    <div className="manager__order">
    <h3>QUẢN LÝ SẢN PHẨM HOÀN TRẢ</h3>
    <table>
    <thead>
      <tr>
        <th>Mã Đơn Hàng</th>
        <th>Tên Sản phẩm</th>
        <th>Hình ảnh</th>
        <th>Giá</th>
        <th>Tổng tiền</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {
        (orderDetailForID.map((items) => {
          const productMatches = product.find((productItem) => {
            return items.productID === productItem.productID;
          });
          if (productMatches && items.status == "ON_REFUND"){
            return (
              <tr>
                <td><span>{items.orderID}</span></td>
                <td><span style={{maxWidth: "300px"}}>{productMatches.name}</span></td>
                <td><Image style={{maxHeight: "150px", maxWidth: "150px"}} src={require(`../../../../assets/images/${productMatches.image}`)} preview = {true} /></td>
                <td>{formatProductPrice(items.purchasePrice)}</td>
                <td>{formatProductPrice(items.purchasePrice*items.quantity)}</td>
                <td><button onClick={() => handleRefund(items, productMatches)} style={{padding: "4px 20px", backgroundColor: "#e6b112",fontSize: "18px",  color: "#ffffff", borderRadius: "5px"}}>Xác nhận</button></td>
              </tr>
            )
          }
        }))
      }
      </tbody>
      </table>
      <Pagination
        current={currentPage}
        pageSize={itemsPerPage}
        total={orderDetailForID.length}
        onChange={handlePageChange}
      />
      </div>
  )
}

export default ModelViewRefund