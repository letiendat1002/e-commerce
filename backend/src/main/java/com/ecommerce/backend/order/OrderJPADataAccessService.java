package com.ecommerce.backend.order;

import com.ecommerce.backend.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Repository
public class OrderJPADataAccessService implements OrderDAO {
    private final OrderRepository orderRepository;

    @Override
    public List<Order> selectAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public List<Order> selectAllOrdersByUser(User user) {
        return orderRepository.findAllByUser(user);
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
}