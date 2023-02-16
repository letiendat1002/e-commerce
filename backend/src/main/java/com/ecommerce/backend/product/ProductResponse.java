package com.ecommerce.backend.product;

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
public class ProductResponse extends BaseResponse {
    private List<ProductDTO> data;

    public ProductResponse(Integer status,
                           MessageStatus message,
                           List<ProductDTO> data
    ) {
        super(status, message);
        this.data = data;
    }
}
