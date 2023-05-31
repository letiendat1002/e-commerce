import './style.scss'

import {Image, Pagination, Skeleton} from 'antd'
import React, { useEffect, useState } from 'react'
import { getAllOrder, getOrder, getOrderWithOrderID } from '../../../../Redux/slice/paymentSlice';
import { getOrderDetail, refundOrderID } from '../../../../Redux/slice/orderDetailSlice';
import { useDispatch, useSelector } from 'react-redux';

import formatProductPrice from '../../../../Helper';
import { getAllProducts } from '../../../../Redux/slice/productSlice';
import { getUserForID } from '../../../../Redux/slice/usersSlice';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom'
import EmptyCart from '../../../../assets/images/empty-cart.png'

const ModalViewOrderShipper = () => {
    const slug = useParams();

    const orderID = slug.orderID
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getOrderWithOrderID(orderID))
        dispatch(getOrderDetail())
        dispatch(getAllProducts())
      }, [])

    const order = useSelector(state => state.order.data) || []

    const orderLoading = useSelector((state) => state.order.loading)
    useEffect(() => {
        if(order.length > 0){
            dispatch(getUserForID(order[0]?.userID))
        }
    }, [order])

    const orderDetail = useSelector(state => state.orderDetail.data.data) || [];
    const product = useSelector(state => state.product.data) || []
    const user = useSelector((state) => state.userAPI.data)
    const orderDetailForID = orderDetail.filter(item => item.orderID == orderID)
    const userLoading = useSelector((state) => state.userAPI.loading);
    const productLoading = useSelector((state) => state.product.productLoading);
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (page) => {
      setCurrentPage(page);
    };
  
    const itemsPerPage = 3;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = currentPage * itemsPerPage - 1;
    return (
        <div>
            {
                (userLoading || productLoading || orderLoading) ? (
                    <Skeleton active/>
                ) : (
                <div className="modalview">
                    <h3 style={{padding: "1rem 0",fontSize: "25px", color: "#f92626", fontWeight: "bolder"}}>{`CHI TIẾT ĐƠN HÀNG ${orderID}`}</h3>
                    <table className='viewordership'>
                        <tr>
                            <th>Họ Tên</th>
                            <th>Số Điện Thoại</th>
                            <th>Tên Sản Phẩm</th>
                            <th>Hình Ảnh</th>
                            <th>Tổng tiền</th>
                        </tr>
                        {
                            orderDetailForID?.slice(startIndex, endIndex + 1)?.filter((title) => title.orderID == orderID)?.map((items) => {
                                const productMatches = product?.find((productItem) => {
                                    return items.productID === productItem.productID;
                                });
                                if (productMatches){
                                    return (
                                        <tr>
                                            <td><span>{user[0]?.fullName}</span></td>
                                            <td><span>{user[0]?.phone}</span></td>
                                            <td><span>{formatProductPrice(productMatches.unitPrice)}</span></td>
                                            <td><Image src={require(`../../../../assets/images/${productMatches.image}`)} preview = {true} /></td>
                                            <td><span>{formatProductPrice(items.purchasePrice*items.quantity)}</span></td>
                                        </tr>
                                    )
                                }
                                // else {
                                //     return (
                                //         <tr>
                                //             <td colspan="6">
                                //                 <img src={EmptyCart} alt="" />
                                //                 <h3>Đơn hàng không có sản phẩm nào</h3>
                                //             </td>
                                //         </tr>
                                //     )
                                // }
                            })
                        }
                    </table>
                    <Pagination className='viewordership'
                        current={currentPage}
                        pageSize={itemsPerPage}
                        total={orderDetailForID?.filter((item) => item.orderID == orderID).length}
                        onChange={handlePageChange}
                    />
                </div>
            )
            }
        </div>
    )
}

export default ModalViewOrderShipper