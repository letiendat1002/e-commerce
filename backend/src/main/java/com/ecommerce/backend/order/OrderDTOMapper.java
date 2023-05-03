package com.ecommerce.backend.order;

import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class OrderDTOMapper implements Function<Order, OrderDTO> {
    @Override
    public OrderDTO apply(Order order) {
        return new OrderDTO(
                order.getOrderID(),
                order.getUser().getUserID(),
                order.getTotal(),
                order.getPaymentType(),
                order.getStatus(),
                order.getDateOrder(),
                order.getAddress()
        );
    }
}
