package com.ecommerce.backend.orderdetail;

import com.ecommerce.backend.order.OrderDAO;
import com.ecommerce.backend.product.ProductDAO;
import com.ecommerce.backend.shared.exception.DuplicateResourceException;
import com.ecommerce.backend.shared.exception.FailedOperationException;
import com.ecommerce.backend.shared.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
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
    public OrderDetailDTO addOrderDetail(OrderDetailRequest request) {
        checkIfOrderDetailNotExistsByIdOrThrow(
                request.orderID(),
                request.productID()
        );

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
    public OrderDetailDTO updateOrderDetail(OrderDetailRequest request) {
        var orderDetail = selectOrderDetailOrThrow(request.orderID(), request.productID());

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
    public void deleteOrderDetail(BigInteger orderID, BigInteger productID) {
        checkIfOrderDetailExistsByIdOrThrow(orderID, productID);

        orderDetailDAO.deleteOrderDetailByID(
                new OrderDetailID(orderID, productID)
        );
    }

    private void checkIfOrderDetailExistsByIdOrThrow(BigInteger orderID, BigInteger productID) {
        var isExists = orderDetailDAO.existsOrderDetailByID(
                new OrderDetailID(orderID, productID)
        );
        if (!isExists) {
            throw new ResourceNotFoundException(
                    "Order detail not found by orderID {%d} and productID {%d}"
                            .formatted(orderID, productID)
            );
        }
    }
}
