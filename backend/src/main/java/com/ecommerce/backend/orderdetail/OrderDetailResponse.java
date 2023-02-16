package com.ecommerce.backend.orderdetail;

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
public class OrderDetailResponse extends BaseResponse {
    private List<OrderDetailDTO> data;

    public OrderDetailResponse(Integer status,
                               MessageStatus message,
                               List<OrderDetailDTO> data
    ) {
        super(status, message);
        this.data = data;
    }
}
