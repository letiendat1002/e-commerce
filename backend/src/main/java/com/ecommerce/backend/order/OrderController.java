package com.ecommerce.backend.order;

import com.ecommerce.backend.shared.enums.MessageStatus;
import com.ecommerce.backend.shared.exception.RequestValidationException;
import com.ecommerce.backend.shared.response.BaseResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;
import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/api/v1/orders")
@RestController
public class OrderController {
    private final OrderService orderService;

    @GetMapping
    @PreAuthorize("hasAuthority('order:read')")
    public OrderResponse getOrders(
            @RequestParam(value = "userID", required = false) BigInteger userID
    ) {
        List<OrderDTO> orderDTOList;

        if (userID == null) {
            orderDTOList = orderService.fetchAllOrders();
        } else {
            orderDTOList = orderService.fetchAllOrdersByUserID(userID);
        }

        return new OrderResponse(
                HttpStatus.OK.value(),
                MessageStatus.SUCCESSFUL,
                orderDTOList
        );
    }

    @GetMapping("{orderID}")
    @PreAuthorize("hasAuthority('order:read')")
    public OrderResponse getOrderByOrderID(
            @PathVariable("orderID") BigInteger orderID
    ) {
        var orderDTOList = List.of(orderService.fetchOrderByOrderID(orderID));

        return new OrderResponse(
                HttpStatus.OK.value(),
                MessageStatus.SUCCESSFUL,
                orderDTOList
        );
    }

    @PostMapping
    @PreAuthorize("hasAuthority('order:write')")
    public OrderResponse postOrder(
            @Validated @RequestBody OrderAddRequest request,
            BindingResult errors
    ) {
        if (errors.hasErrors()) {
            throw new RequestValidationException(errors);
        }

        var orderDTOList = List.of(orderService.addOrder(request));

        return new OrderResponse(
                HttpStatus.OK.value(),
                MessageStatus.SUCCESSFUL,
                orderDTOList
        );
    }

    @DeleteMapping("{orderID}")
    @PreAuthorize("hasAuthority('order:write')")
    public BaseResponse deleteOrderByOrderID(
            @PathVariable("orderID") BigInteger orderID
    ) {
        orderService.deleteOrder(orderID);

        return new BaseResponse(
                HttpStatus.OK.value(),
                MessageStatus.SUCCESSFUL
        );
    }

    @PutMapping("{orderID}")
    @PreAuthorize("hasAuthority('order:write')")
    public OrderResponse putOrderByOrderID(
            @PathVariable("orderID") BigInteger orderID,
            @Validated @RequestBody OrderUpdateRequest request,
            BindingResult errors
    ) {
        if (errors.hasErrors()) {
            throw new RequestValidationException(errors);
        }

        var orderDTOList = List.of(orderService.updateOrder(orderID, request));

        return new OrderResponse(
                HttpStatus.OK.value(),
                MessageStatus.SUCCESSFUL,
                orderDTOList
        );
    }
}
