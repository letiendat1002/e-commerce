package com.ecommerce.backend.order;

import com.ecommerce.backend.shared.exception.DuplicateResourceException;
import com.ecommerce.backend.shared.exception.FailedOperationException;
import com.ecommerce.backend.shared.exception.ResourceNotFoundException;
import com.ecommerce.backend.user.User;
import com.ecommerce.backend.user.UserDAO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class OrderServiceImpl implements OrderService {
    private final OrderDAO orderDAO;
    private final OrderDTOMapper orderDTOMapper;
    private final UserDAO userDAO;

    @Override
    public List<OrderDTO> fetchAllOrders() {
        return orderDAO
                .selectAllOrders()
                .stream()
                .map(orderDTOMapper)
                .collect(Collectors.toList());
    }

    @Override
    public List<OrderDTO> fetchAllOrdersByUserID(BigInteger userID) {
        var user = selectUserByIdOrThrow(userID);

        return orderDAO
                .selectAllOrdersByUser(user)
                .stream()
                .map(orderDTOMapper)
                .collect(Collectors.toList());
    }

    private User selectUserByIdOrThrow(BigInteger userID) {
        return userDAO
                .selectUserByID(userID)
                .orElseThrow(
                        () -> new ResourceNotFoundException(
                                "User not found by userID {%d}".formatted(userID)
                        )
                );
    }

    @Override
    public OrderDTO fetchOrderByOrderID(BigInteger orderID) {
        return orderDTOMapper
                .apply(selectOrderByIdOrThrow(orderID));
    }

    private Order selectOrderByIdOrThrow(BigInteger orderID) {
        return orderDAO
                .selectOrderByID(orderID)
                .orElseThrow(
                        () -> new ResourceNotFoundException(
                                "Order not found by orderID {%d}".formatted(orderID)
                        )
                );
    }

    @Override
    public OrderDTO addOrder(OrderAddRequest request) {
        var user = selectUserByIdOrThrow(request.userID());
        var order = new Order(
                user,
                request.total(),
                request.paymentType(),
                LocalDate.now(),
                request.address()
        );

        return orderDAO
                .insertOrder(order)
                .map(orderDTOMapper)
                .orElseThrow(
                        () -> new FailedOperationException(
                                "Failed to add order"
                        )
                );
    }

    @Override
    public OrderDTO updateOrder(BigInteger orderID, OrderUpdateRequest request) {
        var order = selectOrderByIdOrThrow(orderID);

        checkAndUpdateChangesOrThrow(request, order);

        return orderDAO
                .updateOrder(order)
                .map(orderDTOMapper)
                .orElseThrow(
                        () -> new FailedOperationException(
                                "Failed to update order"
                        )
                );
    }

    private void checkAndUpdateChangesOrThrow(OrderUpdateRequest request, Order order) {
        var isChanged = false;

        if (!request.paymentType().equals(order.getPaymentType())) {
            order.setPaymentType(request.paymentType());
            isChanged = true;
        }

        if (!request.status().equals(order.getStatus())) {
            order.setStatus(request.status());
            isChanged = true;
        }

        if (!request.address().equals(order.getAddress())) {
            order.setAddress(request.address());
            isChanged = true;
        }

        if (!isChanged) {
            throw new DuplicateResourceException(
                    "No data changes detected"
            );
        }
    }

    @Override
    public void deleteOrder(BigInteger orderID) {
        checkIfOrderExistsByIdOrThrow(orderID);
        orderDAO.deleteOrderByID(orderID);
    }

    private void checkIfOrderExistsByIdOrThrow(BigInteger orderID) {
        var isExists = orderDAO.existsOrderByID(orderID);
        if (!isExists) {
            throw new ResourceNotFoundException(
                    "Order not found by orderID {%d}".formatted(orderID)
            );
        }
    }
}
