package com.ecommerce.backend.order;

import com.ecommerce.backend.order.enums.OrderStatus;
import com.ecommerce.backend.user.User;

import java.math.BigInteger;
import java.util.List;

public interface OrderService {
    List<Order> fetchAllOrders();

    List<Order> fetchAllOrdersByUserID(BigInteger userID);

    List<Order> fetchAllOrdersByOrderStatus(OrderStatus orderStatus);

    List<Order> fetchAllOrdersByWorkerID(BigInteger workerID);

    Order fetchOrderByOrderID(BigInteger orderID);

    Order addOrder(OrderAddRequest request);

    Order updateOrder(BigInteger orderID, OrderUpdateRequest request);

    void deleteOrder(BigInteger orderID);

    boolean existsOrderByID(BigInteger orderID);

    boolean existsOrderByOrderIDAndUser(BigInteger orderID, User user);

    void deleteAllOrdersByUserID(BigInteger userID);

    int fetchCompletedOrderCountInMonthByWorkerID(BigInteger workerID, int month);

    int fetchCompletedOrderCountInYearByWorkerID(BigInteger workerID, int year);

    int fetchOrderCountByWorkerID(BigInteger workerID);
}
