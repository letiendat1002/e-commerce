package com.ecommerce.backend.order;

import com.ecommerce.backend.user.User;

import java.math.BigInteger;
import java.util.List;

public interface OrderService {
    List<OrderDTO> fetchAllOrders();

    List<OrderDTO> fetchAllOrdersByUserID(BigInteger userID);

    OrderDTO fetchOrderByOrderID(BigInteger orderID);

    OrderDTO addOrder(OrderAddRequest request);

    OrderDTO updateOrder(BigInteger orderID, OrderUpdateRequest request);

    void deleteOrder(BigInteger orderID);

    boolean existsOrderByID(BigInteger orderID);

    boolean existsOrderByOrderIDAndUser(BigInteger orderID, User user);
}
