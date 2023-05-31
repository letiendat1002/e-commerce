package com.ecommerce.backend.orderdetail;

import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class OrderDetailDTOMapper implements Function<OrderDetail, OrderDetailDTO> {
    @Override
    public OrderDetailDTO apply(OrderDetail orderDetail) {
        return new OrderDetailDTO(
                orderDetail.getOrderID(),
                orderDetail.getProductID(),
                orderDetail.getPurchasePrice(),
                orderDetail.getQuantity(),
                orderDetail.getStatus()
        );
    }
}
