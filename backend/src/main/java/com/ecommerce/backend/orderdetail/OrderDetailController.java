package com.ecommerce.backend.orderdetail;

import com.ecommerce.backend.orderdetail.enums.OrderDetailStatus;
import com.ecommerce.backend.util.enums.MessageStatus;
import com.ecommerce.backend.util.exception.RequestValidationException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;
import java.util.Collections;
import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/api/v1/orderdetails")
@RestController
public class OrderDetailController {
    private final OrderDetailService orderDetailService;
    private final OrderDetailDTOMapper orderDetailDTOMapper;

    @GetMapping
    @PreAuthorize(
            "hasAnyAuthority('order_detail:read_all', 'order_detail:read_one')"
    )
    public OrderDetailResponse getOrderDetails(
            @RequestParam(value = "orderID", required = false) BigInteger orderID,
            @RequestParam(value = "productID", required = false) BigInteger productID
    ) {
        List<OrderDetailDTO> orderDetailDTOList;

        if (orderID == null && productID == null) {
            orderDetailDTOList = orderDetailService
                    .fetchAllOrderDetails()
                    .stream()
                    .map(orderDetailDTOMapper)
                    .toList();
        } else if (orderID != null && productID == null) {
            orderDetailDTOList = orderDetailService
                    .fetchAllOrderDetailsByOrderID(orderID)
                    .stream()
                    .map(orderDetailDTOMapper)
                    .toList();
        } else if (orderID == null) {
            orderDetailDTOList = orderDetailService
                    .fetchAllOrderDetailsByProductID(productID)
                    .stream()
                    .map(orderDetailDTOMapper)
                    .toList();
        } else {
            orderDetailDTOList = Collections.singletonList(
                    orderDetailDTOMapper.apply(
                            orderDetailService
                                    .fetchOrderDetailByOrderIDAndProductID(
                                            new OrderDetailID(
                                                    orderID,
                                                    productID
                                            )
                                    )
                    )
            );
        }

        return new OrderDetailResponse(
                HttpStatus.OK.value(),
                MessageStatus.SUCCESSFUL,
                orderDetailDTOList
        );
    }

    @PostMapping
    @PreAuthorize("hasAuthority('order_detail:create')")
    public OrderDetailResponse postOrderDetail(
            @Validated @RequestBody OrderDetailAddRequest request,
            BindingResult errors
    ) {
        if (errors.hasErrors()) {
            throw new RequestValidationException(errors);
        }

        var orderDetailDTOList = Collections.singletonList(
                orderDetailDTOMapper.apply(
                        orderDetailService.addOrderDetail(request)
                )
        );

        return new OrderDetailResponse(
                HttpStatus.OK.value(),
                MessageStatus.SUCCESSFUL,
                orderDetailDTOList
        );
    }

    @GetMapping("/refund")
    @PreAuthorize("hasAuthority('order_detail:read_all')")
    public OrderDetailResponse getOrderDetailsByStatus(
            @RequestParam(value = "status") OrderDetailStatus status
    ) {
        var orderDetailDTOList = orderDetailService
                .fetchOrderDetailsByStatus(status)
                .stream()
                .map(orderDetailDTOMapper)
                .toList();

        return new OrderDetailResponse(
                HttpStatus.OK.value(),
                MessageStatus.SUCCESSFUL,
                orderDetailDTOList
        );
    }

    @PutMapping("/refund")
    @PreAuthorize("hasAuthority('order_detail:update')")
    public OrderDetailResponse putOrderDetailStatus(
            @Validated @RequestBody OrderDetailUpdateRequest request,
            BindingResult errors
    ) {
        if (errors.hasErrors()) {
            throw new RequestValidationException(errors);
        }

        var orderDetailDTOList = Collections.singletonList(
                orderDetailDTOMapper.apply(
                        orderDetailService.updateOrderDetailStatus(request)
                )
        );

        return new OrderDetailResponse(
                HttpStatus.OK.value(),
                MessageStatus.SUCCESSFUL,
                orderDetailDTOList
        );
    }
}
