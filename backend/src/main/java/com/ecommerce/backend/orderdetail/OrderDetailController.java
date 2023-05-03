package com.ecommerce.backend.orderdetail;

import com.ecommerce.backend.shared.enums.MessageStatus;
import com.ecommerce.backend.shared.exception.RequestValidationException;
import com.ecommerce.backend.shared.response.BaseResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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

    @GetMapping
    public OrderDetailResponse getOrderDetails(
            @RequestParam(value = "orderID", required = false) BigInteger orderID,
            @RequestParam(value = "productID", required = false) BigInteger productID
    ) {
        List<OrderDetailDTO> orderDetailDTOList;

        if (orderID == null && productID == null) {
            orderDetailDTOList = orderDetailService.fetchAllOrderDetails();
        } else if (orderID != null && productID == null) {
            orderDetailDTOList = orderDetailService
                    .fetchAllOrderDetailsByOrderID(orderID);
        } else if (orderID == null && productID != null) {
            orderDetailDTOList = orderDetailService
                    .fetchAllOrderDetailsByProductID(productID);
        } else {
            orderDetailDTOList = Collections.singletonList(
                    orderDetailService
                            .fetchOrderDetailByOrderIDAndProductID(
                                    orderID,
                                    productID
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
    public OrderDetailResponse postOrderDetail(
            @Validated @RequestBody OrderDetailRequest request,
            BindingResult errors
    ) {
        if (errors.hasErrors()) {
            throw new RequestValidationException(errors);
        }

        var orderDetailDTOList = Collections.singletonList(
                orderDetailService.addOrderDetail(request)
        );

        return new OrderDetailResponse(
                HttpStatus.OK.value(),
                MessageStatus.SUCCESSFUL,
                orderDetailDTOList
        );
    }

    @DeleteMapping
    public BaseResponse deleteOrderDetailByOrderID(
            @RequestParam("orderID") BigInteger orderID,
            @RequestParam("productID") BigInteger productID
    ) {
        orderDetailService.deleteOrderDetail(orderID, productID);

        return new BaseResponse(
                HttpStatus.OK.value(),
                MessageStatus.SUCCESSFUL
        );
    }

    @PutMapping
    public OrderDetailResponse updateOrderDetailByOrderID(
            @Validated @RequestBody OrderDetailRequest request,
            BindingResult errors
    ) {
        if (errors.hasErrors()) {
            throw new RequestValidationException(errors);
        }

        var orderDetailDTOList = Collections.singletonList(
                orderDetailService.updateOrderDetail(request)
        );

        return new OrderDetailResponse(
                HttpStatus.OK.value(),
                MessageStatus.SUCCESSFUL,
                orderDetailDTOList
        );
    }
}
