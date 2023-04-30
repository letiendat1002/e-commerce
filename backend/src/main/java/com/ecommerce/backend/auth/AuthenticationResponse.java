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
public class AuthenticationResponse extends BaseResponse {
    private String token;

    public AuthenticationResponse(Integer status,
                                  MessageStatus message,
                                  String token) {
        super(status, message);
        this.token = token;
    }
}