package com.ecommerce.backend.user;

import com.ecommerce.backend.shared.enums.MessageStatus;
import com.ecommerce.backend.shared.response.BaseResponse;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.math.BigInteger;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Getter
@Setter
@ToString
public class UserShipperResponse extends BaseResponse {
    private List<BigInteger> data;

    public UserShipperResponse(Integer status,
                               MessageStatus message,
                               List<BigInteger> data
    ) {
        super(status, message);
        this.data = data;
    }
}
