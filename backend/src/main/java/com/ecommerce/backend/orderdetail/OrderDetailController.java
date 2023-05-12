package com.ecommerce.backend.orderdetail;

import com.ecommerce.backend.shared.enums.MessageStatus;
import com.ecommerce.backend.shared.exception.RequestValidationException;
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
    @PreAuthorize("hasAuthority('order_detail:read')")
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
    @PreAuthorize("hasAuthority('order_detail:write')")
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
    @PreAuthorize("hasAuthority('order_detail:read')")
    public OrderDetailResponse getOnRefundOrderDetails() {
        var orderDetailDTOList = orderDetailService
                .fetchAllOnRefundOrderDetails()
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
    @PreAuthorize("hasAuthority('order_detail:write')")
    public OrderDetailResponse putOnRefundOrderDetail(
            @Validated @RequestBody OrderDetailUpdateRequest request,
            BindingResult errors
    ) {
        if (errors.hasErrors()) {
            throw new RequestValidationException(errors);
        }

        var orderDetailDTOList = Collections.singletonList(
                orderDetailDTOMapper.apply(
                        orderDetailService.updateOrderDetail(request)
                )
        );

        return new OrderDetailResponse(
                HttpStatus.OK.value(),
                MessageStatus.SUCCESSFUL,
                orderDetailDTOList
        );
    }
}
