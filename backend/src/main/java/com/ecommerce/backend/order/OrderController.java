package com.ecommerce.backend.order;

import com.ecommerce.backend.order.enums.OrderStatus;
import com.ecommerce.backend.util.enums.MessageStatus;
import com.ecommerce.backend.util.exception.RequestValidationException;
import com.ecommerce.backend.util.response.BaseResponse;
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
    @PreAuthorize("hasAuthority('order:read_all')")
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

    @GetMapping("/status")
    @PreAuthorize("hasAuthority('order:read_all')")
    public OrderResponse getOrdersByOrderStatus(
            @RequestParam(value = "orderStatus") OrderStatus orderStatus
    ) {
        var orderDTOList = orderService
                .fetchAllOrdersByOrderStatus(orderStatus)
                .stream()
                .map(orderDTOMapper)
                .toList();

        return new OrderResponse(
                HttpStatus.OK.value(),
                MessageStatus.SUCCESSFUL,
                orderDTOList
        );
    }

    @GetMapping("/worker")
    @PreAuthorize("hasAuthority('order:read_all')")
    public OrderResponse getOrdersByWorkerID(
            @RequestParam(value = "workerID") BigInteger workerID
    ) {
        var orderDTOList = orderService
                .fetchAllOrdersByWorkerID(workerID)
                .stream()
                .map(orderDTOMapper)
                .toList();

        return new OrderResponse(
                HttpStatus.OK.value(),
                MessageStatus.SUCCESSFUL,
                orderDTOList
        );
    }

    @GetMapping("/statistic/worker/month")
    @PreAuthorize("hasAuthority('order:read_all')")
    public OrderStatisticResponse getCountCompletedOrdersInMonthByWorkerID(
            @RequestParam(value = "id") BigInteger id,
            @RequestParam(value = "month") int month
    ) {
        var count = orderService.fetchCompletedOrderCountInMonthByWorkerID(
                id,
                month
        );

        return new OrderStatisticResponse(
                HttpStatus.OK.value(),
                MessageStatus.SUCCESSFUL,
                count
        );
    }

    @GetMapping("/statistic/worker/year")
    @PreAuthorize("hasAuthority('order:read_all')")
    public OrderStatisticResponse getCountCompletedOrdersInYearByWorkerID(
            @RequestParam(value = "id") BigInteger id,
            @RequestParam(value = "year") int year
    ) {
        var count = orderService.fetchCompletedOrderCountInYearByWorkerID(
                id,
                year
        );

        return new OrderStatisticResponse(
                HttpStatus.OK.value(),
                MessageStatus.SUCCESSFUL,
                count
        );
    }

    @GetMapping("{orderID}")
    @PreAuthorize("hasAuthority('order:read_one')")
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
    @PreAuthorize("hasAuthority('order:create')")
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

    @PutMapping("{orderID}")
    @PreAuthorize("hasAuthority('order:update')")
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

    @DeleteMapping("{orderID}")
    @PreAuthorize("hasAuthority('order:delete')")
    public BaseResponse deleteOrderByOrderID(
            @PathVariable("orderID") BigInteger orderID
    ) {
        orderService.deleteOrder(orderID);

        return new BaseResponse(
                HttpStatus.OK.value(),
                MessageStatus.SUCCESSFUL
        );
    }
}
