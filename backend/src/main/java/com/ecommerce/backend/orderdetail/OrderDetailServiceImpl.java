package com.ecommerce.backend.orderdetail;

import com.ecommerce.backend.order.OrderDAO;
import com.ecommerce.backend.order.enums.OrderStatus;
import com.ecommerce.backend.product.ProductDAO;
import com.ecommerce.backend.shared.exception.DuplicateResourceException;
import com.ecommerce.backend.shared.exception.FailedOperationException;
import com.ecommerce.backend.shared.exception.ResourceNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class OrderDetailServiceImpl implements OrderDetailService {
    private final OrderDetailDAO orderDetailDAO;
    private final OrderDetailDTOMapper orderDetailDTOMapper;
    private final OrderDAO orderDAO;
    private final ProductDAO productDAO;

    @Override
    public List<OrderDetailDTO> fetchAllOrderDetails() {
        return orderDetailDAO
                .selectAllOrderDetails()
                .stream()
                .map(orderDetailDTOMapper)
                .collect(Collectors.toList());
    }

    @Override
    public List<OrderDetailDTO> fetchAllOrderDetailsByOrderID(BigInteger orderID) {
        checkIfOrderExistsByIdOrThrow(orderID);

        return orderDetailDAO
                .selectOrderDetailsByOrderID(orderID)
                .stream()
                .map(orderDetailDTOMapper)
                .collect(Collectors.toList());
    }

    private void checkIfOrderExistsByIdOrThrow(BigInteger orderID) {
        var isExists = orderDAO.existsOrderByID(orderID);
        if (!isExists) {
            throw new ResourceNotFoundException(
                    "Order not found by orderID {%d}".formatted(orderID)
            );
        }
    }

    @Override
    public List<OrderDetailDTO> fetchAllOrderDetailsByProductID(BigInteger productID) {
        checkIfProductExistsByIdOrThrow(productID);

        return orderDetailDAO
                .selectOrderDetailsByProductID(productID)
                .stream()
                .map(orderDetailDTOMapper)
                .collect(Collectors.toList());
    }

    private void checkIfProductExistsByIdOrThrow(BigInteger productID) {
        var isExists = productDAO.existsProductByID(productID);
        if (!isExists) {
            throw new ResourceNotFoundException(
                    "Product not found by productID {%d}".formatted(productID)
            );
        }
    }

    @Override
    public OrderDetailDTO fetchOrderDetailByOrderIDAndProductID(BigInteger orderID, BigInteger productID) {
        return orderDetailDAO
                .selectOrderDetailByID(
                        new OrderDetailID(orderID, productID)
                )
                .map(orderDetailDTOMapper)
                .orElseThrow(
                        () -> new ResourceNotFoundException(
                                "Order detail not found by orderID {%d} and productID {%d}"
                                        .formatted(orderID, productID)
                        )
                );
    }

    @Override
    @Transactional
    public OrderDetailDTO addOrderDetail(OrderDetailRequest request) {
        checkIfOrderDetailNotExistsByIdOrThrow(
                request.orderID(),
                request.productID()
        );

        var orderStatus = orderDAO.selectOrderByID(request.orderID())
                .orElseThrow(
                        () -> new ResourceNotFoundException(
                                "Order not found by orderID {%d}"
                                        .formatted(request.orderID())
                        )
                );

        if (orderStatus.getStatus() != OrderStatus.PENDING) {
            throw new FailedOperationException(
                    "Failed to add order detail, order status is not at PENDING stage, but it was {%s}"
                            .formatted(orderStatus.getStatus())
            );
        }

        updateProductQuantity(request.productID(), request.quantity());

        var orderDetail = new OrderDetail(
                request.orderID(),
                request.productID(),
                request.purchasePrice(),
                request.quantity()
        );

        return orderDetailDAO
                .insertOrderDetail(orderDetail)
                .map(orderDetailDTOMapper)
                .orElseThrow(
                        () -> new FailedOperationException(
                                "Failed to add order detail"
                        )
                );
    }

    private void updateProductQuantity(BigInteger productID, Integer quantity) {
        var product = productDAO
                .selectProductByID(productID)
                .orElseThrow(
                        () -> new ResourceNotFoundException(
                                "Product not found by productID {%d}"
                                        .formatted(productID)
                        )
                );

        if (product.getQuantity() < quantity) {
            throw new DataIntegrityViolationException(
                    "Product quantity is {%d} but quantity needed more to succeed is {%d}"
                            .formatted(product.getQuantity(), quantity)
            );
        }

        product.setQuantity(product.getQuantity() - quantity);
        productDAO.updateProduct(product).orElseThrow(
                () -> new FailedOperationException(
                        "Failed to update product quantity"
                )
        );
    }

    private void checkIfOrderDetailNotExistsByIdOrThrow(BigInteger orderID,
                                                        BigInteger productID) {
        checkIfOrderExistsByIdOrThrow(orderID);
        checkIfProductExistsByIdOrThrow(productID);
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

    @Override
    @Transactional
    public OrderDetailDTO updateOrderDetail(OrderDetailRequest request) {
        var orderDetail = selectOrderDetailOrThrow(
                request.orderID(),
                request.productID()
        );

        var order = orderDAO.selectOrderByID(request.orderID())
                .orElseThrow(
                        () -> new ResourceNotFoundException(
                                "Order not found by orderID {%d}"
                                        .formatted(request.orderID())
                        )
                );

        if (order.getStatus() != OrderStatus.PENDING) {
            throw new FailedOperationException(
                    "Failed to update order detail, order status is not at PENDING stage, but it was {%s}"
                            .formatted(order.getStatus())
            );
        }

        var updateQuantity = -(orderDetail.getQuantity() - request.quantity());

        if (updateQuantity > 0) {
            updateProductQuantity(request.productID(), updateQuantity);
        } else if (updateQuantity < 0) {
            updateProductQuantity(request.productID(), updateQuantity);
        }

        checkAndUpdateChangesOrThrow(request, orderDetail);

        return orderDetailDAO
                .updateOrderDetail(orderDetail)
                .map(orderDetailDTOMapper)
                .orElseThrow(
                        () -> new FailedOperationException(
                                "Failed to update order detail"
                        )
                );
    }

    private OrderDetail selectOrderDetailOrThrow(BigInteger orderID,
                                                 BigInteger productID) {
        return orderDetailDAO
                .selectOrderDetailByID(
                        new OrderDetailID(orderID, productID)
                )
                .orElseThrow(
                        () -> new ResourceNotFoundException(
                                "Order detail not found by orderID {%d} and productID {%d}"
                                        .formatted(orderID, productID)
                        )
                );
    }

    private void checkAndUpdateChangesOrThrow(OrderDetailRequest request, OrderDetail orderDetail) {
        var isChanged = false;

        if (!request.purchasePrice().equals(orderDetail.getPurchasePrice())) {
            orderDetail.setPurchasePrice(request.purchasePrice());
            isChanged = true;
        }

        if (!request.quantity().equals(orderDetail.getQuantity())) {
            orderDetail.setQuantity(request.quantity());
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
    public void deleteOrderDetail(BigInteger orderID, BigInteger productID) {
        var orderDetail = selectOrderDetailOrThrow(
                orderID,
                productID
        );

        var order = orderDAO.selectOrderByID(orderID)
                .orElseThrow(
                        () -> new ResourceNotFoundException(
                                "Order not found by orderID {%d}"
                                        .formatted(orderID)
                        )
                );

        var orderStatus = order.getStatus();

        if (orderStatus == OrderStatus.PENDING
                || orderStatus == OrderStatus.CONFIRMED
        ) {
            updateProductQuantity(productID, -orderDetail.getQuantity());
        }

        orderDetailDAO.deleteOrderDetailByID(
                new OrderDetailID(orderID, productID)
        );
    }
}
