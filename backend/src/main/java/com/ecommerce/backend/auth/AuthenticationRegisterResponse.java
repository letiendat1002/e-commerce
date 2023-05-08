package com.ecommerce.backend.auth;

import com.ecommerce.backend.shared.enums.MessageStatus;
import com.ecommerce.backend.shared.response.BaseResponse;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


@EqualsAndHashCode(callSuper = true)
@Getter
@Setter
@ToString
public class AuthenticationRegisterResponse extends BaseResponse {
    private String url;

    public AuthenticationRegisterResponse(Integer status,
                                          MessageStatus message,
                                          String url
    ) {
        super(status, message);
        this.url = url;
    }
}
