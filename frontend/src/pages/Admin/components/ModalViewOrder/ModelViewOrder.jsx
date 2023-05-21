import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrder } from '../../../../Redux/slice/paymentSlice'
import { useParams } from 'react-router-dom'
import { getOrderDetail } from '../../../../Redux/slice/orderDetailSlice'
import { getAllProducts } from '../../../../Redux/slice/productSlice'
import TableComponent from '../../../../components/Table'
import formatProductPrice from '../../../../Helper/index'
import { Image } from 'antd'
import './ModelViewOrder.scss'
const ModelViewOrder = () => {

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
  const collumes = [
    {
      title: "STT", 
      dataIndex: "STT"
    }, 
    {
      title: "Tên Sản phẩm", 
      dataIndex: "productName"
    }, 
    {
      title: "Sản phẩm", 
      dataIndex: "productImage"
    }, 
    {
      title: "Số lượng", 
      dataIndex: "quantity"
    },
    {
      title: "Tổng Tiền", 
      dataIndex: "sumcost", 
      sorter:(a, b) => a.sumcost - b.sumcost
    }
  ]
  const data = orderDetailForID.map((items) => {
    const productMatches = product.find((productItem) => {
      return items.productID === productItem.productID;
    });
    if (productMatches){
      return ({
        STT: <span>{items.orderID}</span>, 
        productName: <span>{productMatches.name}</span>,
        productImage: <Image src={require(`../../../../assets/images/${productMatches.image}`)} preview = {true} />,
        quantity: <span>{items.quantity}</span>,
        sumcost: <span>{formatProductPrice(items.purchasePrice*items.quantity)}</span>
      })
    }
  })
  return (
    <div className="modalview">
      <h3>{`Chi tiết đơn hàng ${orderID}`}</h3>
      <TableComponent 
        columns={collumes}
        dataSource={data}
        pageSize={2}
      />
    </div>
  )
}

export default ModelViewOrder