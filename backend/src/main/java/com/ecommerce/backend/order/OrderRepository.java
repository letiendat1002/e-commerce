package com.ecommerce.backend.order;

import com.ecommerce.backend.order.enums.OrderStatus;
import com.ecommerce.backend.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, BigInteger> {
    List<Order> findAllByUserID(BigInteger userID);

    List<Order> findAllByStatus(OrderStatus status);

    List<Order> findAllByWorkerID(BigInteger workerID);

    boolean existsByOrderIDAndUser(BigInteger orderID, User user);
}
