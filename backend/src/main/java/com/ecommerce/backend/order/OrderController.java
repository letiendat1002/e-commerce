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
import java.util.Collections;
import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/api/v1/orders")
@RestController
public class OrderController {
    private final OrderService orderService;
    private final OrderDTOMapper orderDTOMapper;

    @GetMapping
    @PreAuthorize("hasAuthority('order:read')")
    public OrderResponse getOrders(
            @RequestParam(value = "userID", required = false) BigInteger userID
    ) {
        List<OrderDTO> orderDTOList;

        if (userID == null) {
            orderDTOList = orderService
                    .fetchAllOrders()
                    .stream()
                    .map(orderDTOMapper)
                    .toList();
        } else {
            orderDTOList = orderService
                    .fetchAllOrdersByUserID(userID)
                    .stream()
                    .map(orderDTOMapper)
                    .toList();
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
        var orderDTOList = Collections.singletonList(
                orderDTOMapper.apply(orderService.fetchOrderByOrderID(orderID))
        );

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

        var orderDTOList = Collections.singletonList(
                orderDTOMapper.apply(orderService.addOrder(request))
        );

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

        var orderDTOList = Collections.singletonList(
                orderDTOMapper.apply(orderService.updateOrder(orderID, request))
        );

        return new OrderResponse(
                HttpStatus.OK.value(),
                MessageStatus.SUCCESSFUL,
                orderDTOList
        );
    }
}
