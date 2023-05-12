package com.ecommerce.backend.order;

import com.ecommerce.backend.user.User;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

public interface OrderDAO {
    List<Order> selectAllOrders();

    List<Order> selectAllOrdersByUser(BigInteger userID);

    Optional<Order> selectOrderByID(BigInteger orderID);

    Optional<Order> insertOrder(Order order);

    void deleteOrderByID(BigInteger orderID);

    Optional<Order> updateOrder(Order update);

    boolean existsOrderByID(BigInteger orderID);

    boolean existsOrderByOrderIDAndUser(BigInteger orderID, User user);
}
