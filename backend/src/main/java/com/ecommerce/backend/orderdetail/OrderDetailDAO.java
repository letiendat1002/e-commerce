package com.ecommerce.backend.orderdetail;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

public interface OrderDetailDAO {
    List<OrderDetail> selectAllOrderDetails();

    List<OrderDetail> selectOrderDetailsByOrderID(BigInteger orderID);

    List<OrderDetail> selectOrderDetailsByProductID(BigInteger productID);

    Optional<OrderDetail> selectOrderDetailByID(OrderDetailID orderDetailID);

    Optional<OrderDetail> insertOrderDetail(OrderDetail orderDetail);

    Optional<OrderDetail> updateOrderDetail(OrderDetail update);

    void deleteOrderDetailByID(OrderDetailID orderDetailID);

    boolean existsOrderDetailByID(OrderDetailID orderDetailID);

    List<OrderDetail> selectAllOnRefundOrderDetails();
}
