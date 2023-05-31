package com.ecommerce.backend.order;

import com.ecommerce.backend.order.enums.OrderStatus;
import com.ecommerce.backend.user.User;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

public interface OrderDAO {
    List<Order> selectAllOrders();

    List<Order> selectAllOrdersByUserID(BigInteger userID);

    List<Order> selectAllOrdersByOrderStatus(OrderStatus orderStatus);

    List<Order> selectAllOrdersByWorkerID(BigInteger workerID);

    Optional<Order> selectOrderByID(BigInteger orderID);

    Optional<Order> insertOrder(Order order);

    void deleteOrderByID(BigInteger orderID);

    Optional<Order> updateOrder(Order update);

    boolean existsOrderByID(BigInteger orderID);

    boolean existsOrderByOrderIDAndUser(BigInteger orderID, User user);

    int selectCompletedOrderCountInMonthByWorkerID(BigInteger workerID, int month);

    int selectCompletedOrderCountInYearByWorkerID(BigInteger workerID, int year);

    int selectOrderCountByWorkerID(BigInteger workerID);
}
