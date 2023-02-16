package com.ecommerce.backend.orderdetail;

import com.ecommerce.backend.orderdetail.enums.OrderDetailStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.util.List;

@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetail, OrderDetailID> {
    List<OrderDetail> findAllByOrderID(BigInteger orderID);

    List<OrderDetail> findAllByProductID(BigInteger productID);

    List<OrderDetail> findAllByStatus(OrderDetailStatus status);
}
