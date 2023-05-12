package com.ecommerce.backend.order;

import com.ecommerce.backend.order.enums.OrderStatus;
import com.ecommerce.backend.orderdetail.OrderDetailService;
import com.ecommerce.backend.shared.exception.DuplicateResourceException;
import com.ecommerce.backend.shared.exception.FailedOperationException;
import com.ecommerce.backend.shared.exception.ResourceNotFoundException;
import com.ecommerce.backend.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigInteger;
import java.time.LocalDate;
import java.util.List;

@RequiredArgsConstructor
@Service
public class OrderServiceImpl implements OrderService {
    private final OrderDAO orderDAO;
    private final OrderDetailService orderDetailService;
    private final ApplicationContext context;

    @Override
    public List<Order> fetchAllOrders() {
        return orderDAO.selectAllOrders();
    }

    @Override
    public List<Order> fetchAllOrdersByUserID(BigInteger userID) {
        return orderDAO.selectAllOrdersByUser(userID);
    }

    @Override
    public Order fetchOrderByOrderID(BigInteger orderID) {
        return orderDAO
                .selectOrderByID(orderID)
                .orElseThrow(
                        () -> new ResourceNotFoundException(
                                "Order not found by orderID {%d}".formatted(orderID)
                        )
                );
    }

    @Override
    public Order addOrder(OrderAddRequest request) {
        var order = new Order(
                request.userID(),
                request.additionalPrice(),
                request.paymentType(),
                LocalDate.now(),
                request.address()
        );

        return orderDAO
                .insertOrder(order)
                .orElseThrow(
                        () -> new FailedOperationException(
                                "Failed to add order"
                        )
                );
    }

    @Override
    @Transactional
    public Order updateOrder(BigInteger orderID, OrderUpdateRequest request) {
        var order = fetchOrderByOrderID(orderID);

        var beforeChangeStatus = order.getStatus();
        checkAndUpdateChangesOrThrow(request, order);
        var afterChangeStatus = order.getStatus();

        var isBeforeStatusPendingOrConfirmed =
                beforeChangeStatus == OrderStatus.PENDING ||
                        beforeChangeStatus == OrderStatus.CONFIRMED;

        var isStatusPendingOrConfirmedChangedToCancelled =
                isBeforeStatusPendingOrConfirmed &&
                        afterChangeStatus == OrderStatus.CANCELLED;

        if (isStatusPendingOrConfirmedChangedToCancelled) {
            orderDetailService
                    .updateProductQuantityWhenOrderCancelled(
                            orderID
                    );
        }

        return orderDAO
                .updateOrder(order)
                .orElseThrow(
                        () -> new FailedOperationException(
                                "Failed to update order"
                        )
                );
    }

    private void checkAndUpdateChangesOrThrow(
            OrderUpdateRequest request,
            Order order
    ) {
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
    @Transactional
    public void deleteOrder(BigInteger orderID) {
        var order = fetchOrderByOrderID(orderID);

        var orderStatus = order.getStatus();

        if (orderStatus == OrderStatus.PENDING
                || orderStatus == OrderStatus.CONFIRMED
        ) {
            orderDetailService.deleteAllOrderDetailsByOrderID(orderID);
        }

        orderDAO.deleteOrderByID(orderID);
    }

    @Override
    public boolean existsOrderByID(BigInteger orderID) {
        return orderDAO.existsOrderByID(orderID);
    }

    @Override
    public boolean existsOrderByOrderIDAndUser(BigInteger orderID, User user) {
        return orderDAO.existsOrderByOrderIDAndUser(orderID, user);
    }

    @Override
    @Transactional
    public void deleteAllOrdersByUserID(BigInteger userID) {
        fetchAllOrdersByUserID(userID)
                .forEach(
                        order -> context
                                .getBean(OrderService.class)
                                .deleteOrder(order.getOrderID())
                );
    }
}
