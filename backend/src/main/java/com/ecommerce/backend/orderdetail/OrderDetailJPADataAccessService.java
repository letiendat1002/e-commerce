package com.ecommerce.backend.orderdetail;

import com.ecommerce.backend.orderdetail.enums.OrderDetailStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Repository
public class OrderDetailJPADataAccessService implements OrderDetailDAO {
    private final OrderDetailRepository orderDetailRepository;

    @Override
    public List<OrderDetail> selectAllOrderDetails() {
        return orderDetailRepository.findAll();
    }

    @Override
    public List<OrderDetail> selectOrderDetailsByOrderID(BigInteger orderID) {
        return orderDetailRepository.findAllByOrderID(orderID);
    }

    @Override
    public List<OrderDetail> selectOrderDetailsByProductID(BigInteger productID) {
        return orderDetailRepository.findAllByProductID(productID);
    }

    @Override
    public Optional<OrderDetail> selectOrderDetailByID(OrderDetailID orderDetailID) {
        return orderDetailRepository.findById(orderDetailID);
    }

    @Override
    public Optional<OrderDetail> insertOrderDetail(OrderDetail orderDetail) {
        return Optional.of(orderDetailRepository.save(orderDetail));
    }

    @Override
    public Optional<OrderDetail> updateOrderDetail(OrderDetail update) {
        return Optional.of(orderDetailRepository.save(update));
    }

    @Override
    public void deleteOrderDetailByID(OrderDetailID orderDetailID) {
        orderDetailRepository.deleteById(orderDetailID);
    }

    @Override
    public boolean existsOrderDetailByID(OrderDetailID orderDetailID) {
        return orderDetailRepository.existsById(orderDetailID);
    }

    @Override
    public List<OrderDetail> selectOrderDetailsByStatus(OrderDetailStatus status) {
        return orderDetailRepository.findAllByStatus(status);
    }
}
