package com.ecommerce.backend.order;

import com.ecommerce.backend.order.enums.OrderStatus;
import com.ecommerce.backend.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, BigInteger> {
    List<Order> findAllByUserID(BigInteger userID);

    List<Order> findAllByStatus(OrderStatus status);

    List<Order> findAllByWorkerID(BigInteger workerID);

    @Query("SELECT COUNT(o) FROM Order o WHERE o.workerID = ?1 AND MONTH(o.dateCompleted) = ?2")
    int countCompletedOrdersInMonthByWorkerID(BigInteger workerID, int month);

    @Query("SELECT COUNT(o) FROM Order o WHERE o.workerID = ?1 AND YEAR(o.dateCompleted) = ?2")
    int countCompletedOrdersInYearByWorkerID(BigInteger workerID, int year);

    @Query("SELECT COUNT(o) FROM Order o WHERE o.workerID = ?1")
    int countOrdersByWorkerID(BigInteger workerID);

    boolean existsByOrderIDAndUser(BigInteger orderID, User user);
}
