package com.ecommerce.backend.order;

import com.ecommerce.backend.util.enums.MessageStatus;
import com.ecommerce.backend.util.response.BaseResponse;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@EqualsAndHashCode(callSuper = true)
@Getter
@Setter
@ToString
public class OrderStatisticResponse extends BaseResponse {
    private int count;

    public OrderStatisticResponse(Integer status,
                                  MessageStatus message,
                                  int count) {
        super(status, message);
        this.count = count;
    }
}
