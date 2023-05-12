package com.ecommerce.backend.orderdetail;

import com.ecommerce.backend.orderdetail.enums.OrderDetailStatus;
import com.ecommerce.backend.product.ProductService;
import com.ecommerce.backend.shared.exception.DuplicateResourceException;
import com.ecommerce.backend.shared.exception.FailedOperationException;
import com.ecommerce.backend.shared.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigInteger;
import java.util.List;

@RequiredArgsConstructor
@Service
public class OrderDetailServiceImpl implements OrderDetailService {
    private final OrderDetailDAO orderDetailDAO;
    private final ProductService productService;

    @Override
    public List<OrderDetail> fetchAllOrderDetails() {
        return orderDetailDAO.selectAllOrderDetails();
    }

    @Override
    public List<OrderDetail> fetchAllOrderDetailsByOrderID(BigInteger orderID) {
        return orderDetailDAO.selectOrderDetailsByOrderID(orderID);
    }

    @Override
    public List<OrderDetail> fetchAllOrderDetailsByProductID(
            BigInteger productID
    ) {
        checkIfProductExistsByIdOrThrow(productID);

        return orderDetailDAO.selectOrderDetailsByProductID(productID);
    }

    private void checkIfProductExistsByIdOrThrow(BigInteger productID) {
        var isExists = productService.existsProductByID(productID);
        if (!isExists) {
            throw new ResourceNotFoundException(
                    "Product not found by productID {%d}".formatted(productID)
            );
        }
    }

    @Override
    public OrderDetail fetchOrderDetailByOrderIDAndProductID(
            OrderDetailID orderDetailID
    ) {
        return orderDetailDAO
                .selectOrderDetailByID(orderDetailID)
                .orElseThrow(
                        () -> new ResourceNotFoundException(
                                "Order detail not found by orderID {%d} and productID {%d}"
                                        .formatted(
                                                orderDetailID.getOrderID(),
                                                orderDetailID.getProductID()
                                        )
                        )
                );
    }

    @Override
    @Transactional
    public OrderDetail addOrderDetail(OrderDetailAddRequest request) {
        checkIfOrderDetailNotExistsByIdOrThrow(
                request.orderID(),
                request.productID()
        );

        productService.updateProductQuantityByAmount(
                request.productID(),
                -request.quantity()
        );

        var orderDetail = new OrderDetail(
                request.orderID(),
                request.productID(),
                request.purchasePrice(),
                request.quantity()
        );

        return orderDetailDAO
                .insertOrderDetail(orderDetail)
                .orElseThrow(
                        () -> new FailedOperationException(
                                "Failed to add order detail"
                        )
                );
    }

    private void checkIfOrderDetailNotExistsByIdOrThrow(BigInteger orderID,
                                                        BigInteger productID
    ) {
        var isExists = orderDetailDAO.existsOrderDetailByID(
                new OrderDetailID(orderID, productID)
        );
        if (isExists) {
            throw new DuplicateResourceException(
                    "Order detail already exists by orderID {%d} and productID {%d}"
                            .formatted(orderID, productID)
            );
        }
    }

    private OrderDetail selectOrderDetailByIdOrThrow(
            OrderDetailID orderDetailID
    ) {
        return orderDetailDAO
                .selectOrderDetailByID(orderDetailID)
                .orElseThrow(
                        () -> new ResourceNotFoundException(
                                "Order detail not found by orderID {%d} and productID {%d}"
                                        .formatted(
                                                orderDetailID.getOrderID(),
                                                orderDetailID.getProductID()
                                        )
                        )
                );
    }

    @Override
    public boolean existsOrderDetailByID(OrderDetailID orderDetailID) {
        return orderDetailDAO.existsOrderDetailByID(orderDetailID);
    }

    @Override
    @Transactional
    public void updateProductQuantityWhenOrderCancelled(
            BigInteger orderID
    ) {
        fetchAllOrderDetailsByOrderID(orderID)
                .forEach(
                        orderDetail -> {
                            productService.updateProductQuantityByAmount(
                                    orderDetail.getProductID(),
                                    orderDetail.getQuantity()
                            );
                        }
                );
    }

    @Override
    @Transactional
    public void deleteAllOrderDetailsByOrderID(BigInteger orderID) {
        fetchAllOrderDetailsByOrderID(orderID)
                .forEach(
                        orderDetail -> {
                            deleteOrderDetail(
                                    new OrderDetailID(
                                            orderDetail.getOrderID(),
                                            orderDetail.getProductID()
                                    )
                            );
                        }
                );
    }

    private void deleteOrderDetail(OrderDetailID orderDetailID) {
        var orderDetail = selectOrderDetailByIdOrThrow(orderDetailID);

        productService.updateProductQuantityByAmount(
                orderDetailID.getProductID(),
                orderDetail.getQuantity()
        );

        orderDetailDAO.deleteOrderDetailByID(orderDetailID);
    }

    @Override
    public List<OrderDetail> fetchAllOnRefundOrderDetails() {
        return orderDetailDAO.selectAllOnRefundOrderDetails();
    }

    @Override
    public OrderDetail updateOrderDetail(OrderDetailUpdateRequest request) {
        var orderDetail = selectOrderDetailByIdOrThrow(
                new OrderDetailID(
                        request.orderID(),
                        request.productID()
                )
        );

        var beforeChangeStatus = orderDetail.getStatus();
        checkAndUpdateChangesOrThrow(request, orderDetail);
        var afterChangeStatus = orderDetail.getStatus();

        var isStatusOnRefundChangedToRefundCompleted =
                beforeChangeStatus == OrderDetailStatus.ON_REFUND &&
                        afterChangeStatus == OrderDetailStatus.REFUND_COMPLETED;

        if (isStatusOnRefundChangedToRefundCompleted) {
            productService.updateProductQuantityByAmount(
                    orderDetail.getProductID(),
                    orderDetail.getQuantity()
            );
        }

        return orderDetailDAO
                .updateOrderDetail(orderDetail)
                .orElseThrow(
                        () -> new FailedOperationException(
                                "Failed to update order detail"
                        )
                );
    }

    private void checkAndUpdateChangesOrThrow(
            OrderDetailUpdateRequest request,
            OrderDetail orderDetail
    ) {
        var isChanged = false;

        if (!request.status().equals(orderDetail.getStatus())) {
            orderDetail.setStatus(request.status());
            isChanged = true;
        }

        if (!isChanged) {
            throw new DuplicateResourceException(
                    "No data changes detected"
            );
        }
    }
}
