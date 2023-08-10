package com.ecommerce.backend.service.order;

import com.ecommerce.backend.order.*;
import com.ecommerce.backend.order.enums.OrderPaymentType;
import com.ecommerce.backend.order.enums.OrderStatus;
import com.ecommerce.backend.orderdetail.OrderDetailService;
import com.ecommerce.backend.util.exception.DuplicateResourceException;
import com.ecommerce.backend.util.exception.FailedOperationException;
import com.ecommerce.backend.util.exception.ResourceNotFoundException;
import com.ecommerce.backend.user.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.context.ApplicationContext;

import java.math.BigInteger;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class OrderServiceImplTest {
    private OrderServiceImpl orderService;
    @Mock
    private OrderDAO orderDAO;
    @Mock
    private OrderDetailService orderDetailService;
    @Mock
    private ApplicationContext applicationContext;

    @BeforeEach
    void setUp() {
        orderService = new OrderServiceImpl(
                orderDAO,
                orderDetailService,
                applicationContext
        );
    }

    @Test
    void fetchAllOrders() {
        // When
        orderService.fetchAllOrders();

        // Then
        verify(orderDAO).selectAllOrders();
    }

    @Test
    void fetchAllOrdersByUserID() {
        // Given
        var id = BigInteger.valueOf(1);
        var order = new Order(
                id,
                id,
                BigInteger.valueOf(1),
                OrderPaymentType.COD,
                "string"
        );

        // When
        when(orderDAO.selectAllOrdersByUserID(id)).thenReturn(List.of(order));

        var actual = orderService.fetchAllOrdersByUserID(id);

        // Then
        verify(orderDAO).selectAllOrdersByUserID(id);
        assertThat(actual).isEqualTo(List.of(order));
    }

    @Test
    void fetchAllOrdersByOrderStatus() {
        // Given
        var id = BigInteger.valueOf(1);
        var orderStatus = OrderStatus.PENDING;
        var order = new Order(
                id,
                id,
                BigInteger.valueOf(1),
                OrderPaymentType.COD,
                "string"
        );

        // When
        when(orderDAO.selectAllOrdersByOrderStatus(orderStatus))
                .thenReturn(List.of(order));

        var actual = orderService.fetchAllOrdersByOrderStatus(orderStatus);

        // Then
        verify(orderDAO).selectAllOrdersByOrderStatus(orderStatus);
        assertThat(actual).isEqualTo(List.of(order));
    }

    @Test
    void fetchAllOrdersByWorkerID() {
        // Given
        var id = BigInteger.valueOf(1);
        var order = new Order(
                id,
                id,
                BigInteger.valueOf(1),
                OrderPaymentType.COD,
                "string"
        );

        // When
        when(orderDAO.selectAllOrdersByWorkerID(id))
                .thenReturn(List.of(order));

        var actual = orderService.fetchAllOrdersByWorkerID(id);

        // Then
        verify(orderDAO).selectAllOrdersByWorkerID(id);
        assertThat(actual).isEqualTo(List.of(order));
    }

    @Test
    void fetchCountCompletedOrdersInMonthByWorkerID() {
        // Given
        var id = BigInteger.valueOf(1);
        var month = 1;
        var count = 100;

        // When
        when(orderDAO.selectCompletedOrderCountInMonthByWorkerID(id, month))
                .thenReturn(count);

        var actual = orderService
                .fetchCompletedOrderCountInMonthByWorkerID(id, month);

        // Then
        verify(orderDAO).selectCompletedOrderCountInMonthByWorkerID(id, month);
        assertThat(actual).isEqualTo(count);
    }

    @Test
    void fetchCountCompletedOrdersInYearByWorkerID() {
        // Given
        var id = BigInteger.valueOf(1);
        var year = 2023;
        var count = 100;

        // When
        when(orderDAO.selectCompletedOrderCountInYearByWorkerID(id, year))
                .thenReturn(count);

        var actual = orderService
                .fetchCompletedOrderCountInYearByWorkerID(id, year);

        // Then
        verify(orderDAO).selectCompletedOrderCountInYearByWorkerID(id, year);
        assertThat(actual).isEqualTo(count);
    }

    @Test
    void fetchOrderByOrderID() {
        // Given
        var id = BigInteger.valueOf(1);
        var order = new Order(
                id,
                id,
                BigInteger.valueOf(1),
                OrderPaymentType.COD,
                "string"
        );

        // When
        when(orderDAO.selectOrderByID(id)).thenReturn(Optional.of(order));

        var actual = orderService.fetchOrderByOrderID(id);

        // Then
        assertThat(actual).isEqualTo(order);
    }

    @Test
    void whenFetchOrderByID_butReturnEmptyOptional_thenThrowException() {
        // Given
        var id = BigInteger.valueOf(1);

        // When
        when(orderDAO.selectOrderByID(id)).thenReturn(Optional.empty());

        // Then
        assertThatThrownBy(() -> orderService.fetchOrderByOrderID(id))
                .isInstanceOf(ResourceNotFoundException.class);
    }

    @Test
    void addOrder() {
        // Given
        var id = BigInteger.valueOf(1);
        var request = new OrderAddRequest(
                id,
                BigInteger.valueOf(10),
                OrderPaymentType.COD,
                "string"
        );

        var order = new Order(
                request.userID(),
                request.additionalPrice(),
                request.paymentType(),
                request.address()
        );

        // When
        when(orderDAO.insertOrder(order)).thenReturn(Optional.of(order));

        orderService.addOrder(request);

        // Then
        var captor = ArgumentCaptor.forClass(Order.class);
        verify(orderDAO).insertOrder(captor.capture());
        var capturedOrder = captor.getValue();
        assertThat(capturedOrder.getOrderID()).isNull();
        assertThat(capturedOrder.getUserID())
                .isEqualTo(request.userID());
        assertThat(capturedOrder.getAdditionalPrice())
                .isEqualTo(request.additionalPrice());
        assertThat(capturedOrder.getPaymentType())
                .isEqualTo(request.paymentType());
        assertThat(capturedOrder.getAddress())
                .isEqualTo(request.address());
    }

    @Test
    void whenAddFailed_thenThrowException() {
        // Given
        var id = BigInteger.valueOf(1);
        var request = new OrderAddRequest(
                id,
                BigInteger.valueOf(10),
                OrderPaymentType.COD,
                "string"
        );

        // When
        when(orderDAO.insertOrder(any(Order.class)))
                .thenReturn(Optional.empty());

        // Then
        assertThatThrownBy(() -> orderService.addOrder(request))
                .isInstanceOf(FailedOperationException.class);
    }

    @Test
    void updateOrder_changeStatusPendingToConfirmed() {
        // Given
        var id = BigInteger.valueOf(1);
        var request = new OrderUpdateRequest(
                OrderStatus.CONFIRMED,
                id
        );

        var order = new Order(
                id,
                id,
                BigInteger.valueOf(1),
                null,
                OrderStatus.PENDING,
                "string"
        );

        // When
        when(orderDAO.selectOrderByID(id)).thenReturn(Optional.of(order));
        when(orderDAO.updateOrder(order)).thenReturn(Optional.of(order));
        orderService.updateOrder(id, request);

        // Then
        var captor = ArgumentCaptor.forClass(Order.class);
        verify(orderDAO).updateOrder(captor.capture());
        var capturedOrder = captor.getValue();
        assertThat(capturedOrder).isEqualTo(order);
        assertThat(capturedOrder.getOrderID()).isEqualTo(id);
        assertThat(capturedOrder.getUserID()).isEqualTo(id);
        assertThat(capturedOrder.getStatus()).isEqualTo(request.status());
        assertThat(capturedOrder.isPreparing()).isTrue();
        assertThat(capturedOrder.getDatePreparing()).isEqualTo(LocalDate.now());
        assertThat(capturedOrder.isShipping()).isFalse();
        assertThat(capturedOrder.getDateShipping()).isNull();
        assertThat(capturedOrder.isCompleted()).isFalse();
        assertThat(capturedOrder.getDateCompleted()).isNull();
        assertThat(capturedOrder.getWorkerID()).isNull();
    }

    @Test
    void updateOrder_changeStatusConfirmedToOnShipping() {
        // Given
        var id = BigInteger.valueOf(1);
        var request = new OrderUpdateRequest(
                OrderStatus.ON_SHIPPING,
                id
        );

        var order = new Order(
                id,
                id,
                BigInteger.valueOf(1),
                null,
                OrderStatus.CONFIRMED,
                "string"
        );

        // When
        when(orderDAO.selectOrderByID(id)).thenReturn(Optional.of(order));
        when(orderDAO.updateOrder(order)).thenReturn(Optional.of(order));
        orderService.updateOrder(id, request);

        // Then
        var captor = ArgumentCaptor.forClass(Order.class);
        verify(orderDAO).updateOrder(captor.capture());
        var capturedOrder = captor.getValue();
        assertThat(capturedOrder).isEqualTo(order);
        assertThat(capturedOrder.getOrderID()).isEqualTo(id);
        assertThat(capturedOrder.getUserID()).isEqualTo(id);
        assertThat(capturedOrder.getStatus()).isEqualTo(request.status());
        assertThat(capturedOrder.isShipping()).isTrue();
        assertThat(capturedOrder.getDateShipping()).isEqualTo(LocalDate.now());
        assertThat(capturedOrder.isCompleted()).isFalse();
        assertThat(capturedOrder.getDateCompleted()).isNull();
        assertThat(capturedOrder.getWorkerID()).isEqualTo(id);
    }

    @Test
    void updateOrder_changeStatusOnShippingToCompleted() {
        // Given
        var id = BigInteger.valueOf(1);
        var request = new OrderUpdateRequest(
                OrderStatus.SHIP_COMPLETED,
                id
        );

        var order = new Order(
                id,
                id,
                BigInteger.valueOf(1),
                null,
                OrderStatus.ON_SHIPPING,
                "string"
        );

        // When
        when(orderDAO.selectOrderByID(id)).thenReturn(Optional.of(order));
        when(orderDAO.updateOrder(order)).thenReturn(Optional.of(order));
        orderService.updateOrder(id, request);

        // Then
        var captor = ArgumentCaptor.forClass(Order.class);
        verify(orderDAO).updateOrder(captor.capture());
        var capturedOrder = captor.getValue();
        assertThat(capturedOrder).isEqualTo(order);
        assertThat(capturedOrder.getOrderID()).isEqualTo(id);
        assertThat(capturedOrder.getUserID()).isEqualTo(id);
        assertThat(capturedOrder.getStatus()).isEqualTo(request.status());
        assertThat(capturedOrder.isCompleted()).isTrue();
        assertThat(capturedOrder.getDateCompleted()).isEqualTo(LocalDate.now());
        assertThat(capturedOrder.getWorkerID()).isNull();
    }

    @Test
    void updateOrder_changeStatusAbleToUpdateProductQuantityToCancelled() {
        // Given
        var id = BigInteger.valueOf(1);
        var request = new OrderUpdateRequest(
                OrderStatus.CANCELLED,
                id
        );

        var order = new Order(
                id,
                id,
                BigInteger.valueOf(1),
                OrderPaymentType.COD,
                OrderStatus.PENDING,
                "string"
        );

        // When
        when(orderDAO.selectOrderByID(id)).thenReturn(Optional.of(order));
        when(orderDAO.updateOrder(order)).thenReturn(Optional.of(order));
        orderService.updateOrder(id, request);

        // Then
        var captor = ArgumentCaptor.forClass(Order.class);
        verify(orderDAO).updateOrder(captor.capture());
        var capturedOrder = captor.getValue();
        assertThat(capturedOrder).isEqualTo(order);
        assertThat(capturedOrder.getOrderID()).isEqualTo(id);
        assertThat(capturedOrder.getUserID()).isEqualTo(id);
        assertThat(capturedOrder.getStatus()).isEqualTo(request.status());
        assertThat(capturedOrder.getWorkerID()).isNull();
    }

    @Test
    void whenUpdateFailed_thenThrowException() {
        // Given
        var id = BigInteger.valueOf(1);
        var request = new OrderUpdateRequest(
                OrderStatus.SHIP_COMPLETED,
                id
        );

        var order = new Order(
                id,
                id,
                BigInteger.valueOf(1),
                OrderPaymentType.COD,
                OrderStatus.CONFIRMED,
                "string"
        );

        // When
        when(orderDAO.selectOrderByID(id)).thenReturn(Optional.of(order));
        when(orderDAO.updateOrder(order)).thenReturn(Optional.empty());

        // Then
        assertThatThrownBy(() -> orderService.updateOrder(id, request))
                .isInstanceOf(FailedOperationException.class);
    }

    @Test
    void whenUpdate_butHasNoChange_thenThrowException() {
        // Given
        var id = BigInteger.valueOf(1);
        var request = new OrderUpdateRequest(
                OrderStatus.CONFIRMED,
                id
        );

        var order = new Order(
                id,
                id,
                BigInteger.valueOf(1),
                OrderPaymentType.COD,
                request.status(),
                "Test address"
        );

        // When
        when(orderDAO.selectOrderByID(id)).thenReturn(Optional.of(order));

        // Then
        assertThatThrownBy(() -> orderService.updateOrder(id, request))
                .isInstanceOf(DuplicateResourceException.class);
    }

    @Test
    void deleteOrder() {
        // Given
        var id = BigInteger.valueOf(1);
        var order = new Order(
                id,
                id,
                BigInteger.valueOf(1),
                OrderPaymentType.COD,
                OrderStatus.CONFIRMED,
                "string"
        );

        // When
        when(orderDAO.selectOrderByID(id)).thenReturn(Optional.of(order));
        orderService.deleteOrder(id);

        // Then
        verify(orderDetailService).deleteAllOrderDetailsByOrderID(id);
        verify(orderDAO).deleteOrderByID(id);
    }

    @Test
    void whenDeleteOrder_butNotExistOrderID_thenThrowException() {
        // Given
        var id = BigInteger.valueOf(1);

        // When
        when(orderDAO.selectOrderByID(id)).thenReturn(Optional.empty());

        // Then
        assertThatThrownBy(() -> orderService.deleteOrder(id))
                .isInstanceOf(ResourceNotFoundException.class);
        verify(orderDetailService, never())
                .deleteAllOrderDetailsByOrderID(id);
        verify(orderDAO, never()).deleteOrderByID(id);
    }

    @Test
    void existsOrderByID() {
        // Given
        var id = BigInteger.valueOf(1);

        // When
        when(orderDAO.existsOrderByID(id)).thenReturn(true);
        var result = orderService.existsOrderByID(id);

        // Then
        verify(orderDAO).existsOrderByID(id);
        assertThat(result).isTrue();
    }

    @Test
    void notExistsOrderByID() {
        // Given
        var id = BigInteger.valueOf(1);

        // When
        when(orderDAO.existsOrderByID(id)).thenReturn(false);
        var result = orderService.existsOrderByID(id);

        // Then
        verify(orderDAO).existsOrderByID(id);
        assertThat(result).isFalse();
    }

    @Test
    void existsOrderByOrderIDAndUser() {
        // Given
        var id = BigInteger.valueOf(1);
        var user = new User();

        // When
        when(orderDAO.existsOrderByOrderIDAndUser(id, user)).thenReturn(true);
        var result = orderService.existsOrderByOrderIDAndUser(id, user);

        // Then
        verify(orderDAO).existsOrderByOrderIDAndUser(id, user);
        assertThat(result).isTrue();
    }

    @Test
    void notExistsOrderByOrderIDAndUser() {
        // Given
        var id = BigInteger.valueOf(1);
        var user = new User();

        // When
        when(orderDAO.existsOrderByOrderIDAndUser(id, user))
                .thenReturn(false);
        var result = orderService.existsOrderByOrderIDAndUser(id, user);

        // Then
        verify(orderDAO).existsOrderByOrderIDAndUser(id, user);
        assertThat(result).isFalse();
    }

    @Test
    void deleteAllOrdersByUserID() {
        // Given
        var id = BigInteger.valueOf(1);
        var order = new Order();
        order.setOrderID(id);

        // When
        when(orderService.fetchAllOrdersByUserID(id)).thenReturn(List.of(order));
        when(applicationContext.getBean(OrderService.class)).thenReturn(orderService);
        when(orderDAO.selectOrderByID(id)).thenReturn(Optional.of(order));
        orderService.deleteAllOrdersByUserID(id);

        // Then
        verify(orderDAO).selectAllOrdersByUserID(id);
        verify(orderDAO).selectOrderByID(id);
        verify(orderDetailService).deleteAllOrderDetailsByOrderID(id);
        verify(orderDAO).deleteOrderByID(id);
    }

    @Test
    void fetchOrderCountByWorkerID() {
        // Given
        var workerID = BigInteger.ONE;
        var count = 2;

        // When
        when(orderDAO.selectOrderCountByWorkerID(workerID)).thenReturn(count);
        var result = orderService.fetchOrderCountByWorkerID(workerID);

        // Then
        verify(orderDAO).selectOrderCountByWorkerID(workerID);
        assertThat(result).isEqualTo(count);
    }
}
