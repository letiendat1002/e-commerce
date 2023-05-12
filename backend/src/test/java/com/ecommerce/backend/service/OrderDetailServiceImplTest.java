package com.ecommerce.backend.service;

import com.ecommerce.backend.order.OrderDAO;
import com.ecommerce.backend.orderdetail.*;
import com.ecommerce.backend.product.ProductDAO;
import com.ecommerce.backend.shared.exception.ResourceNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class OrderDetailServiceImplTest {
    private final OrderDetailDTOMapper orderDetailDTOMapper = new OrderDetailDTOMapper();
    private OrderDetailServiceImpl orderDetailService;
    @Mock
    private OrderDetailDAO orderDetailDAO;
    @Mock
    private OrderDAO orderDAO;
    @Mock
    private ProductDAO productDAO;

    @BeforeEach
    void setUp() {
        orderDetailService = new OrderDetailServiceImpl(orderDetailDAO, orderDetailDTOMapper, orderDAO, productDAO);
    }

    @Test
    void fetchAllOrderDetails() {
        // When
        orderDetailService.fetchAllOrderDetails();

        // Then
        verify(orderDetailDAO).selectAllOrderDetails();
    }

    @Test
    void fetchAllOrderDetailsByOrderID() {
        // Given
        var id = BigInteger.valueOf(1);

        var orderDetail = new OrderDetail(
                BigInteger.valueOf(1),
                BigInteger.valueOf(1),
                BigInteger.valueOf(1),
                1
        );

        // When
        when(orderDAO.existsOrderByID(id)).thenReturn(true);
        when(orderDetailDAO.selectOrderDetailsByOrderID(id)).thenReturn(List.of(orderDetail));

        var expected = List.of(orderDetailDTOMapper.apply(orderDetail));
        var actual = orderDetailService.fetchAllOrderDetailsByOrderID(id);

        // Then
        verify(orderDetailDAO).selectOrderDetailsByOrderID(id);
        assertThat(actual).isEqualTo(expected);
    }

    @Test
    void fetchAllOrderDetailsByProductID() {
        // Given
        var id = BigInteger.valueOf(1);

        var orderDetail = new OrderDetail(
                BigInteger.valueOf(1),
                BigInteger.valueOf(1),
                BigInteger.valueOf(1),
                1
        );

        // When
        when(productDAO.existsProductByID(id)).thenReturn(true);
        when(orderDetailDAO.selectOrderDetailsByProductID(id)).thenReturn(List.of(orderDetail));

        var expected = List.of(orderDetailDTOMapper.apply(orderDetail));
        var actual = orderDetailService.fetchAllOrderDetailsByProductID(id);

        // Then
        verify(orderDetailDAO).selectOrderDetailsByProductID(id);
        assertThat(actual).isEqualTo(expected);
    }

    @Test
    void fetchOrderDetailByOrderIDAndProductID() {
        // Given
        var id = BigInteger.valueOf(1);

        var orderDetail = new OrderDetail(id, id, id, 1);

        // When
        when(orderDetailDAO.selectOrderDetailByID(new OrderDetailID(id, id))).thenReturn(Optional.of(orderDetail));

        var expected = orderDetailDTOMapper.apply(orderDetail);
        var actual = orderDetailService.fetchOrderDetailByOrderIDAndProductID(
                new OrderDetailID(id, id)
        );

        // Then
        verify(orderDetailDAO).selectOrderDetailByID(new OrderDetailID(id, id));
        assertThat(actual).isEqualTo(expected);
    }

    @Test
    void givenOrderID_whenFetchAllOrderDetailsByOrderID_butNotExistOrderID_thenThrowException() {
        // Given
        var id = BigInteger.valueOf(1);

        // When
        when(orderDAO.existsOrderByID(id)).thenReturn(false);

        // Then
        assertThatThrownBy(() -> orderDetailService.fetchAllOrderDetailsByOrderID(id))
                .isInstanceOf(ResourceNotFoundException.class);
    }

    @Test
    void givenProductID_whenFetchAllOrderDetailsByProductID_butNotExistProductID_thenThrowException() {
        // Given
        var id = BigInteger.valueOf(1);

        // When
        when(productDAO.existsProductByID(id)).thenReturn(false);

        // Then
        assertThatThrownBy(() -> orderDetailService.fetchAllOrderDetailsByProductID(id))
                .isInstanceOf(ResourceNotFoundException.class);
    }

    @Test
    void givenOrderIDAndProductID_whenFetchOrderDetailByOrderIDAndProductID_butNotExistOrderDetail_thenThrowException() {
        // Given
        var id = BigInteger.valueOf(1);

        // When
        when(orderDetailDAO.selectOrderDetailByID(new OrderDetailID(id, id))).thenReturn(Optional.empty());

        // Then
        assertThatThrownBy(() -> orderDetailService
                .fetchOrderDetailByOrderIDAndProductID(new OrderDetailID(id, id)))
                .isInstanceOf(ResourceNotFoundException.class);
    }

    @Test
    void addOrderDetail() {

    }

    @Test
    void updateOrderDetail() {
    }

    @Test
    void deleteOrderDetail() {
    }
}