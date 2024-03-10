package com.ecommerce.backend.order;

import com.ecommerce.backend.order.enums.OrderStatus;
import com.ecommerce.backend.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Repository
public class OrderJpaDAOImpl implements OrderDAO {
    private final OrderRepository orderRepository;

    @Override
    public List<Order> selectAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public List<Order> selectAllOrdersByUserID(BigInteger userID) {
        return orderRepository.findAllByUserID(userID);
    }

    @Override
    public List<Order> selectAllOrdersByOrderStatus(OrderStatus orderStatus) {
        return orderRepository.findAllByStatus(orderStatus);
    }

    @Override
    public List<Order> selectAllOrdersByWorkerID(BigInteger workerID) {
        return orderRepository.findAllByWorkerID(workerID);
    }

    @Override
    public Optional<Order> selectOrderByID(BigInteger orderID) {
        return orderRepository.findById(orderID);
    }

    @Override
    public Optional<Order> insertOrder(Order order) {
        return Optional.of(orderRepository.save(order));
    }

    @Override
    public void deleteOrderByID(BigInteger orderID) {
        orderRepository.deleteById(orderID);
    }

    @Override
    public Optional<Order> updateOrder(Order update) {
        return Optional.of(orderRepository.save(update));
    }

    @Override
    public boolean existsOrderByID(BigInteger orderID) {
        return orderRepository.existsById(orderID);
    }

    @Override
    public boolean existsOrderByOrderIDAndUser(BigInteger orderID, User user) {
        return orderRepository.existsByOrderIDAndUser(orderID, user);
    }

    @Override
    public int selectCompletedOrderCountInMonthByWorkerID(BigInteger workerID, int month) {
        return orderRepository.countCompletedOrdersInMonthByWorkerID(workerID, month);
    }

    @Override
    public int selectCompletedOrderCountInYearByWorkerID(BigInteger workerID, int year) {
        return orderRepository.countCompletedOrdersInYearByWorkerID(workerID, year);
    }

    @Override
    public int selectOrderCountByWorkerID(BigInteger workerID) {
        return orderRepository.countOrdersByWorkerID(workerID);
    }
}
