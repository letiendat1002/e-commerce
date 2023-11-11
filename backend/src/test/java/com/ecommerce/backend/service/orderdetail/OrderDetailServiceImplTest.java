package com.ecommerce.backend.service.orderdetail;

import com.ecommerce.backend.orderdetail.*;
import com.ecommerce.backend.orderdetail.enums.OrderDetailStatus;
import com.ecommerce.backend.product.ProductService;
import com.ecommerce.backend.util.exception.DuplicateResourceException;
import com.ecommerce.backend.util.exception.FailedOperationException;
import com.ecommerce.backend.util.exception.ResourceNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class OrderDetailServiceImplTest {
    private OrderDetailServiceImpl orderDetailService;
    @Mock
    private OrderDetailDAO orderDetailDAO;
    @Mock
    private ProductService productService;

    @BeforeEach
    void setUp() {
        orderDetailService = new OrderDetailServiceImpl(
                orderDetailDAO,
                productService
        );
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
                id,
                id,
                BigInteger.valueOf(10),
                1
        );

        // When
        when(orderDetailDAO.selectOrderDetailsByOrderID(id))
                .thenReturn(List.of(orderDetail));
        var actual = orderDetailService.fetchAllOrderDetailsByOrderID(id);

        // Then
        verify(orderDetailDAO).selectOrderDetailsByOrderID(id);
        assertThat(actual).isEqualTo(List.of(orderDetail));
    }

    @Test
    void fetchAllOrderDetailsByProductID() {
        // Given
        var id = BigInteger.valueOf(1);

        var orderDetail = new OrderDetail(
                id,
                id,
                BigInteger.valueOf(10),
                1
        );

        // When
        when(productService.existsProductByID(id)).thenReturn(true);
        when(orderDetailDAO.selectOrderDetailsByProductID(id))
                .thenReturn(List.of(orderDetail));

        var actual = orderDetailService.fetchAllOrderDetailsByProductID(id);

        // Then
        verify(orderDetailDAO).selectOrderDetailsByProductID(id);
        assertThat(actual).isEqualTo(List.of(orderDetail));
    }

    @Test
    void whenFetchAllOrderDetailsByProductID_butNotExistProductID_thenThrowException() {
        // Given
        var id = BigInteger.valueOf(1);

        // When
        when(productService.existsProductByID(id)).thenReturn(false);

        // Then
        assertThatThrownBy(() -> orderDetailService.fetchAllOrderDetailsByProductID(id))
                .isInstanceOf(ResourceNotFoundException.class);
        verify(orderDetailDAO, never()).selectOrderDetailsByProductID(id);
    }

    @Test
    void fetchOrderDetailByOrderIDAndProductID() {
        // Given
        var id = BigInteger.valueOf(1);

        var orderDetail = new OrderDetail(
                id,
                id,
                BigInteger.valueOf(10),
                1
        );

        // When
        when(orderDetailDAO.selectOrderDetailByID(new OrderDetailID(id, id)))
                .thenReturn(Optional.of(orderDetail));

        var actual = orderDetailService.fetchOrderDetailByOrderIDAndProductID(
                new OrderDetailID(id, id)
        );

        // Then
        verify(orderDetailDAO).selectOrderDetailByID(new OrderDetailID(id, id));
        assertThat(actual).isEqualTo(orderDetail);
    }

    @Test
    void addOrderDetail() {
        // Given
        var id = BigInteger.valueOf(1);
        var request = new OrderDetailAddRequest(
                id,
                id,
                BigInteger.valueOf(10),
                1
        );

        var orderDetail = new OrderDetail(
                request.orderID(),
                request.productID(),
                request.purchasePrice(),
                request.quantity()
        );

        var orderDetailID = new OrderDetailID(id, id);

        // When
        when(orderDetailDAO.existsOrderDetailByID(orderDetailID))
                .thenReturn(false);
        when(orderDetailDAO.insertOrderDetail(orderDetail))
                .thenReturn(Optional.of(orderDetail));
        orderDetailService.addOrderDetail(request);

        // Then
        var captor = ArgumentCaptor.forClass(OrderDetail.class);
        verify(orderDetailDAO).existsOrderDetailByID(orderDetailID);
        verify(productService)
                .updateProductQuantityByAmount(
                        any(BigInteger.class),
                        any(Integer.class)
                );
        verify(orderDetailDAO).insertOrderDetail(captor.capture());

        var capturedOrderDetail = captor.getValue();
        assertThat(capturedOrderDetail.getOrderID())
                .isEqualTo(request.orderID());
        assertThat(capturedOrderDetail.getProductID())
                .isEqualTo(request.productID());
        assertThat(capturedOrderDetail.getPurchasePrice())
                .isEqualTo(request.purchasePrice());
        assertThat(capturedOrderDetail.getQuantity())
                .isEqualTo(request.quantity());
    }

    @Test
    void whenAddOrderDetail_butAlreadyExistsOrderDetailID_thenThrowException() {
        // Given
        var id = BigInteger.valueOf(1);
        var request = new OrderDetailAddRequest(
                id,
                id,
                BigInteger.valueOf(10),
                1
        );

        // When
        when(orderDetailDAO.existsOrderDetailByID(new OrderDetailID(id, id)))
                .thenReturn(true);

        // Then
        assertThatThrownBy(
                () -> orderDetailService.addOrderDetail(request)
        ).isInstanceOf(DuplicateResourceException.class);
        verify(productService, never())
                .updateProductQuantityByAmount(
                        any(BigInteger.class),
                        any(Integer.class)
                );
        verify(orderDetailDAO, never())
                .insertOrderDetail(any(OrderDetail.class));
    }

    @Test
    void whenAddFailed_thenThrowException() {
        // Given
        var id = BigInteger.valueOf(1);
        var request = new OrderDetailAddRequest(
                id,
                id,
                BigInteger.valueOf(10),
                1
        );

        // When
        when(orderDetailDAO.existsOrderDetailByID(new OrderDetailID(id, id)))
                .thenReturn(false);
        when(orderDetailDAO.insertOrderDetail(any(OrderDetail.class)))
                .thenReturn(Optional.empty());

        // Then
        assertThatThrownBy(
                () -> orderDetailService.addOrderDetail(request)
        ).isInstanceOf(FailedOperationException.class);

        verify(orderDetailDAO).existsOrderDetailByID(any(OrderDetailID.class));
        verify(productService)
                .updateProductQuantityByAmount(
                        any(BigInteger.class),
                        any(Integer.class)
                );
        verify(orderDetailDAO).insertOrderDetail(any(OrderDetail.class));
    }

    @Test
    void existsOrderDetailByID() {
        // Given
        var id = BigInteger.valueOf(1);
        var orderDetailID = new OrderDetailID(id, id);

        // When
        when(orderDetailDAO.existsOrderDetailByID(orderDetailID))
                .thenReturn(true);
        var result = orderDetailService
                .existsOrderDetailByID(orderDetailID);

        // Then
        verify(orderDetailDAO).existsOrderDetailByID(orderDetailID);
        assertThat(result).isTrue();
    }

    @Test
    void notExistsOrderDetailByID() {
        // Given
        var id = BigInteger.valueOf(1);
        var orderDetailID = new OrderDetailID(id, id);

        // When
        when(orderDetailDAO.existsOrderDetailByID(orderDetailID))
                .thenReturn(false);
        var result = orderDetailService
                .existsOrderDetailByID(orderDetailID);

        // Then
        verify(orderDetailDAO).existsOrderDetailByID(orderDetailID);
        assertThat(result).isFalse();
    }

    @Test
    void updateProductQuantityWhenOrderCancelled() {
        // Given
        var id = BigInteger.valueOf(1);
        var orderDetail = new OrderDetail(
                id,
                id,
                BigInteger.ONE,
                10
        );

        // When
        when(orderDetailDAO.selectOrderDetailsByOrderID(id))
                .thenReturn(List.of(orderDetail));
        orderDetailService.updateProductQuantityWhenOrderCancelled(id);

        // Then
        verify(productService).updateProductQuantityByAmount(
                any(BigInteger.class),
                any(Integer.class)
        );
        verify(orderDetailDAO).selectOrderDetailsByOrderID(id);
    }

    @Test
    void deleteAllOrderDetailsByOrderID() {
        // Given
        var id = BigInteger.valueOf(1);
        var orderDetail = new OrderDetail(
                id,
                id,
                BigInteger.ONE,
                10
        );
        var orderDetailID = new OrderDetailID(id, id);

        // When
        when(orderDetailDAO.selectOrderDetailsByOrderID(id))
                .thenReturn(List.of(orderDetail));
        when(orderDetailDAO.selectOrderDetailByID(orderDetailID))
                .thenReturn(Optional.of(orderDetail));
        orderDetailService.deleteAllOrderDetailsByOrderID(id);

        // Then
        verify(orderDetailDAO).selectOrderDetailsByOrderID(id);
        verify(orderDetailDAO).selectOrderDetailByID(orderDetailID);
        verify(productService).updateProductQuantityByAmount(
                any(BigInteger.class),
                any(Integer.class)
        );
        verify(orderDetailDAO).deleteOrderDetailByID(orderDetailID);
    }

    @Test
    void whenSelectOrderDetailById_butOrderDetailIdNotFound_thenThrowException() {
        // Given
        var id = BigInteger.valueOf(1);
        var orderDetail = new OrderDetail(
                id,
                id,
                BigInteger.ONE,
                10
        );
        var orderDetailID = new OrderDetailID(id, id);

        // When
        when(orderDetailDAO.selectOrderDetailsByOrderID(id))
                .thenReturn(List.of(orderDetail));
        when(orderDetailDAO.selectOrderDetailByID(orderDetailID))
                .thenReturn(Optional.empty());

        // Then
        assertThatThrownBy(
                () -> orderDetailService.deleteAllOrderDetailsByOrderID(id)
        ).isInstanceOf(ResourceNotFoundException.class);

        verify(orderDetailDAO).selectOrderDetailsByOrderID(id);
        verify(productService, never()).updateProductQuantityByAmount(
                any(BigInteger.class),
                any(Integer.class)
        );
        verify(orderDetailDAO, never())
                .deleteOrderDetailByID(any(OrderDetailID.class));
    }

    @Test
    void fetchOrderDetailsByStatus() {
        // Given
        var id = BigInteger.valueOf(1);
        var orderDetail = new OrderDetail(
                id,
                id,
                BigInteger.ONE,
                10
        );
        var status = OrderDetailStatus.ON_REFUND;

        // When
        when(orderDetailDAO.selectOrderDetailsByStatus(status))
                .thenReturn(List.of(orderDetail));

        var result = orderDetailService.fetchOrderDetailsByStatus(status);

        // Then
        verify(orderDetailDAO).selectOrderDetailsByStatus(status);
        assertThat(result).isEqualTo(List.of(orderDetail));
    }

    @Test
    void updateOrderDetail() {
        // Given
        var id = BigInteger.valueOf(1);
        var orderDetail = new OrderDetail(
                id,
                id,
                BigInteger.ONE,
                10
        );
        orderDetail.setStatus(OrderDetailStatus.ON_REFUND);
        var orderDetailID = new OrderDetailID(id, id);
        var request = new OrderDetailUpdateRequest(
                id,
                id,
                OrderDetailStatus.REFUND_COMPLETED
        );

        // When
        when(orderDetailDAO.selectOrderDetailByID(orderDetailID))
                .thenReturn(Optional.of(orderDetail));
        when(orderDetailDAO.updateOrderDetail(orderDetail))
                .thenReturn(Optional.of(orderDetail));
        orderDetailService.updateOrderDetailStatus(request);

        // Then
        verify(orderDetailDAO).selectOrderDetailByID(orderDetailID);
        verify(productService).updateProductQuantityByAmount(
                any(BigInteger.class),
                any(Integer.class)
        );
        verify(orderDetailDAO).updateOrderDetail(
                orderDetail
        );
    }

    @Test
    void whenUpdateOrderDetailFailed_thenThrowException() {
        // Given
        var id = BigInteger.valueOf(1);
        var orderDetail = new OrderDetail(
                id,
                id,
                BigInteger.ONE,
                10
        );
        orderDetail.setStatus(OrderDetailStatus.ON_REFUND);
        var orderDetailID = new OrderDetailID(id, id);
        var request = new OrderDetailUpdateRequest(
                id,
                id,
                OrderDetailStatus.REFUND_COMPLETED
        );

        // When
        when(orderDetailDAO.selectOrderDetailByID(orderDetailID))
                .thenReturn(Optional.of(orderDetail));
        when(orderDetailDAO.updateOrderDetail(orderDetail))
                .thenReturn(Optional.empty());

        // Then
        assertThatThrownBy(
                () -> orderDetailService.updateOrderDetailStatus(request)
        ).isInstanceOf(FailedOperationException.class);

        verify(orderDetailDAO).selectOrderDetailByID(orderDetailID);
        verify(productService).updateProductQuantityByAmount(
                any(BigInteger.class),
                any(Integer.class)
        );
        verify(orderDetailDAO).updateOrderDetail(
                orderDetail
        );
    }

    @Test
    void updateOrderDetailStatus_whenRequestStatusIsNullAndOrderDetailStatusIsNotNull() {
        // Given
        var id = BigInteger.valueOf(1);
        var orderDetail = new OrderDetail(
                id,
                id,
                BigInteger.ONE,
                10
        );
        orderDetail.setStatus(OrderDetailStatus.ON_REFUND);
        var orderDetailID = new OrderDetailID(id, id);
        var request = new OrderDetailUpdateRequest(
                id,
                id,
                null
        );

        // When
        when(orderDetailDAO.selectOrderDetailByID(orderDetailID))
                .thenReturn(Optional.of(orderDetail));
        when(orderDetailDAO.updateOrderDetail(orderDetail))
                .thenReturn(Optional.of(orderDetail));
        orderDetailService.updateOrderDetailStatus(request);

        // Then
        verify(orderDetailDAO).selectOrderDetailByID(orderDetailID);
        verify(orderDetailDAO).updateOrderDetail(
                orderDetail
        );
    }

    @Test
    void whenUpdateOrderDetail_butHasNoChange_thenThrowException() {
        // Given
        var id = BigInteger.valueOf(1);

        var orderDetailID = new OrderDetailID(id, id);
        var request = new OrderDetailUpdateRequest(
                id,
                id,
                OrderDetailStatus.ON_REFUND
        );

        var orderDetail = new OrderDetail(
                request.orderID(),
                request.productID(),
                BigInteger.ONE,
                10
        );
        orderDetail.setStatus(request.status());

        // When
        when(orderDetailDAO.selectOrderDetailByID(orderDetailID))
                .thenReturn(Optional.of(orderDetail));

        // Then
        assertThatThrownBy(
                () -> orderDetailService.updateOrderDetailStatus(request)
        ).isInstanceOf(DuplicateResourceException.class);

        verify(orderDetailDAO).selectOrderDetailByID(orderDetailID);
        verify(productService, never()).updateProductQuantityByAmount(
                any(BigInteger.class),
                any(Integer.class)
        );
        verify(orderDetailDAO, never()).updateOrderDetail(
                orderDetail
        );
    }
}