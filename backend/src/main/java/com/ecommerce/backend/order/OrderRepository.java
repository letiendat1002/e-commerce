package com.ecommerce.backend.order;

import com.ecommerce.backend.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, BigInteger> {
    List<Order> findAllByUser(User user);

    boolean existsByOrderIDAndUser(BigInteger orderID, User user);
}
