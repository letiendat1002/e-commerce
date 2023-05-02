package com.ecommerce.backend.auth;

import com.ecommerce.backend.shared.enums.MessageStatus;
import com.ecommerce.backend.shared.response.BaseResponse;
import com.ecommerce.backend.user.UserDTO;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;


@EqualsAndHashCode(callSuper = true)
@Getter
@Setter
@ToString
public class AuthenticationResponse extends BaseResponse {
    private String token;
    private List<UserDTO> data;

    public AuthenticationResponse(Integer status,
                                  MessageStatus message,
                                  String token,
                                  List<UserDTO> data) {
        super(status, message);
        this.token = token;
        this.data = data;
    }
}
