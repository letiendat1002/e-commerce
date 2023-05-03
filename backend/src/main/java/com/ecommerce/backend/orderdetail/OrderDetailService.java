package com.ecommerce.backend.orderdetail;

import java.math.BigInteger;
import java.util.List;

public interface OrderDetailService {
    List<OrderDetailDTO> fetchAllOrderDetails();

    List<OrderDetailDTO> fetchAllOrderDetailsByOrderID(BigInteger orderID);

    List<OrderDetailDTO> fetchAllOrderDetailsByProductID(BigInteger productID);

    OrderDetailDTO fetchOrderDetailByOrderIDAndProductID(BigInteger orderID,
                                                         BigInteger productID);

    OrderDetailDTO addOrderDetail(OrderDetailRequest request);

    OrderDetailDTO updateOrderDetail(OrderDetailRequest request);

    void deleteOrderDetail(BigInteger orderID, BigInteger productID);
}
