package com.ecommerce.backend.auth;

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
public class AuthenticationRegisterResponse extends BaseResponse {
    private String token;

    public AuthenticationRegisterResponse(Integer status,
                                          MessageStatus message,
                                          String token
    ) {
        super(status, message);
        this.token = token;
    }
}
