package com.ecommerce.backend.order;

import com.ecommerce.backend.util.enums.MessageStatus;
import com.ecommerce.backend.util.response.BaseResponse;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Getter
@Setter
@ToString
public class OrderResponse extends BaseResponse {
    private List<OrderDTO> data;

    public OrderResponse(Integer status,
                         MessageStatus message,
                         List<OrderDTO> data
    ) {
        super(status, message);
        this.data = data;
    }
}
