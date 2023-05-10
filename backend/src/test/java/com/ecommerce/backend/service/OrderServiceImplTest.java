package com.ecommerce.backend.service;

import com.ecommerce.backend.order.*;
import com.ecommerce.backend.order.enums.OrderPaymentType;
import com.ecommerce.backend.order.enums.OrderStatus;
import com.ecommerce.backend.orderdetail.OrderDetailService;
import com.ecommerce.backend.product.ProductDAO;
import com.ecommerce.backend.shared.exception.DuplicateResourceException;
import com.ecommerce.backend.shared.exception.FailedOperationException;
import com.ecommerce.backend.shared.exception.ResourceNotFoundException;
import com.ecommerce.backend.user.User;
import com.ecommerce.backend.user.UserDAO;
import com.ecommerce.backend.user.enums.Gender;
import com.ecommerce.backend.user.enums.UserRole;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigInteger;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class OrderServiceImplTest {
    private final OrderDTOMapper orderDTOMapper = new OrderDTOMapper();
    private OrderServiceImpl orderService;
    @Mock
    private OrderDAO orderDAO;
    @Mock
    private UserDAO userDAO;
    @Mock
    private OrderDetailService orderDetailService;
    @Mock
    private ProductDAO productDAO;

    @BeforeEach
    void setUp() {
        orderService = new OrderServiceImpl(orderDAO, orderDTOMapper, userDAO, orderDetailService, productDAO);
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
        var user = new User(
                id,
                "admin@linkking.com",
                "admin",
                "string",
                Gender.MALE,
                "",
                "",
                UserRole.ADMIN,
                true
        );
        var order = new Order(
                id,
                user,
                BigInteger.valueOf(1),
                OrderPaymentType.COD,
                LocalDate.now(),
                "string"
        );

        // When
        when(userDAO.selectUserByID(id)).thenReturn(Optional.of(user));
        when(orderDAO.selectAllOrdersByUser(user)).thenReturn(List.of(order));

        var expected = List.of(orderDTOMapper.apply(order));
        var actual = orderService.fetchAllOrdersByUserID(id);

        // Then
        assertThat(actual).isEqualTo(expected);
    }

    @Test
    void givenUserID_whenfetchAllOrderByUserID_butUserReturnEmptyOptional_thenThrowException() {
        // Given
        var id = BigInteger.valueOf(1);
        var user = new User(
                id,
                "admin@linkking.com",
                "admin",
                "string",
                Gender.MALE,
                "",
                "",
                UserRole.ADMIN,
                true
        );
        var order = new Order(
                id,
                user,
                BigInteger.valueOf(1),
                OrderPaymentType.COD,
                LocalDate.now(),
                "string"
        );

        // When
        when(userDAO.selectUserByID(id)).thenReturn(Optional.empty());

        // Then
        assertThatThrownBy(() -> orderService.fetchAllOrdersByUserID(id))
                .isInstanceOf(ResourceNotFoundException.class);
    }

    @Test
    void fetchOrderByOrderID() {
        // Given
        var id = BigInteger.valueOf(1);
        var order = new Order(
                id,
                new User(),
                BigInteger.valueOf(1),
                OrderPaymentType.COD,
                LocalDate.now(),
                "string"
        );

        // When
        when(orderDAO.selectOrderByID(id)).thenReturn(Optional.of(order));

        var expected = orderDTOMapper.apply(order);
        var actual = orderService.fetchOrderByOrderID(id);

        // Then
        assertThat(actual).isEqualTo(expected);
    }

    @Test
    void givenID_whenFetchOrderByID_butReturnEmptyOptional_thenThrowException() {
        // Given
        var id = BigInteger.valueOf(1);

        // When
        when(orderDAO.selectOrderByID(id)).thenReturn(Optional.empty());

        // Then
        assertThatThrownBy(() -> orderService.fetchOrderByOrderID(id))
                .isInstanceOf(ResourceNotFoundException.class);
    }

    @Test
    void givenID_whenFetchOrderByID_butNotExistOrderID_thenThrowException() {
        // Given
        var id = BigInteger.valueOf(9_999_999);

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
                BigInteger.valueOf(1),
                OrderPaymentType.COD,
                "string"
        );

        var user = new User(
                id,
                "admin@linkking.com",
                "admin",
                "string",
                Gender.MALE,
                "",
                "",
                UserRole.ADMIN,
                true
        );

        var order = new Order(
                id,
                user,
                BigInteger.valueOf(1),
                OrderPaymentType.COD,
                LocalDate.now(),
                "string"
        );

        // When
        when(userDAO.selectUserByID(id)).thenReturn(Optional.of(user));
        when(orderDAO.insertOrder(order)).thenReturn(Optional.of(order));
        orderService.addOrder(request);

        // Then
        var captor = ArgumentCaptor.forClass(Order.class);
        verify(orderDAO).insertOrder(captor.capture());
        var capturedOrder = captor.getValue();
        assertThat(capturedOrder).isEqualTo(order);
        assertThat(capturedOrder.getOrderID()).isNull();
        assertThat(capturedOrder.getUser()).isEqualTo(user);
        assertThat(capturedOrder.getAdditionalPrice()).isEqualTo(request.additionalPrice());
        assertThat(capturedOrder.getPaymentType()).isEqualTo(request.paymentType());
    }

    @Test
    void givenUserID_whenAddOrder_butUserReturnEmptyOptional_thenThrowException() {
        // Given
        var id = BigInteger.valueOf(1);
        var request = new OrderAddRequest(
                id,
                BigInteger.valueOf(1),
                OrderPaymentType.COD,
                "string"
        );

        // When
        when(userDAO.selectUserByID(id)).thenReturn(Optional.empty());

        // Then
        assertThatThrownBy(() -> orderService.addOrder(request))
                .isInstanceOf(ResourceNotFoundException.class);
    }

    @Test
    void whenAddFailed_thenThrowException() {
        // Given
        var id = BigInteger.valueOf(1);
        var request = new OrderAddRequest(
                id,
                BigInteger.valueOf(1),
                OrderPaymentType.COD,
                "string"
        );

        var user = new User(
                id,
                "admin@linkking.com",
                "admin",
                "string",
                Gender.MALE,
                "",
                "",
                UserRole.ADMIN,
                true
        );

        // When
        when(userDAO.selectUserByID(id)).thenReturn(Optional.of(user));

        // Then
        assertThatThrownBy(() -> orderService.addOrder(request))
                .isInstanceOf(FailedOperationException.class);
    }

    @Test
    void updateOrder() {
        // Given
        var id = BigInteger.valueOf(1);
        var request = new OrderUpdateRequest(
                OrderPaymentType.COD,
                OrderStatus.CONFIRMED,
                "test-update"
        );

        var user = new User(
                id,
                "admin@linkking.com",
                "admin",
                "string",
                Gender.MALE,
                "",
                "",
                UserRole.ADMIN,
                true
        );

        var order = new Order(
                id,
                user,
                BigInteger.valueOf(1),
                OrderPaymentType.COD,
                OrderStatus.CONFIRMED,
                LocalDate.now(),
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
        assertThat(capturedOrder.getUser()).isEqualTo(user);
        assertThat(capturedOrder.getPaymentType()).isEqualTo(request.paymentType());
        assertThat(capturedOrder.getStatus()).isEqualTo(request.status());
        assertThat(capturedOrder.getAddress()).isEqualTo(request.address());
    }

    @Test
    void whenUpdateFailed_thenThrowException() {
        // Given
        var id = BigInteger.valueOf(1);
        var request = new OrderUpdateRequest(
                OrderPaymentType.COD,
                OrderStatus.CONFIRMED,
                "test-update"
        );

        var user = new User(
                id,
                "admin@linkking.com",
                "admin",
                "string",
                Gender.MALE,
                "",
                "",
                UserRole.ADMIN,
                true
        );

        var order = new Order(
                id,
                user,
                BigInteger.valueOf(1),
                OrderPaymentType.COD,
                OrderStatus.CONFIRMED,
                LocalDate.now(),
                "string"
        );

        // When
        when(orderDAO.selectOrderByID(id)).thenReturn(Optional.of(order));

        // Then
        assertThatThrownBy(() -> orderService.updateOrder(id, request))
                .isInstanceOf(FailedOperationException.class);
    }

    @Test
    void whenUpdate_butHasNoChanges_thenThrowException() {
        // Given
        var id = BigInteger.valueOf(1);
        var request = new OrderUpdateRequest(
                OrderPaymentType.COD,
                OrderStatus.CONFIRMED,
                "test-update"
        );

        var user = new User(
                id,
                "admin@linkking.com",
                "admin",
                "string",
                Gender.MALE,
                "",
                "",
                UserRole.ADMIN,
                true
        );

        var order = new Order(
                id,
                user,
                BigInteger.valueOf(1),
                request.paymentType(),
                request.status(),
                LocalDate.now(),
                request.address()
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
                new User(),
                BigInteger.valueOf(1),
                OrderPaymentType.COD,
                OrderStatus.CONFIRMED,
                LocalDate.now(),
                "string"
        );

        // When
        when(orderDAO.selectOrderByID(id)).thenReturn(Optional.of(order));
        orderService.deleteOrder(id);

        // Then
        verify(orderDAO).deleteOrderByID(id);
    }

    @Test
    void givenID_whenDeleteOrder_butNotExistOrderID_thenThrowException() {
        // Given
        var id = BigInteger.valueOf(9_999_999);

        // Then
        assertThatThrownBy(() -> orderService.deleteOrder(id))
                .isInstanceOf(ResourceNotFoundException.class);
    }
}