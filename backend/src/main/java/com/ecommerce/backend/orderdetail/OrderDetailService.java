package com.ecommerce.backend.orderdetail;

import com.ecommerce.backend.orderdetail.enums.OrderDetailStatus;

import java.math.BigInteger;
import java.util.List;

public interface OrderDetailService {
    List<OrderDetail> fetchAllOrderDetails();

    List<OrderDetail> fetchAllOrderDetailsByOrderID(BigInteger orderID);

    List<OrderDetail> fetchAllOrderDetailsByProductID(BigInteger productID);

    OrderDetail fetchOrderDetailByOrderIDAndProductID(OrderDetailID orderDetailID);

    OrderDetail addOrderDetail(OrderDetailAddRequest request);

    boolean existsOrderDetailByID(OrderDetailID orderDetailID);

    void updateProductQuantityWhenOrderCancelled(BigInteger orderID);

    void deleteAllOrderDetailsByOrderID(BigInteger orderID);

    List<OrderDetail> fetchOrderDetailsByStatus(OrderDetailStatus status);

    OrderDetail updateOrderDetailStatus(OrderDetailUpdateRequest request);
}
