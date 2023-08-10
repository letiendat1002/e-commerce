package com.ecommerce.backend.user;

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
public class UserResponse extends BaseResponse {
    private List<UserDTO> data;

    public UserResponse(Integer status,
                        MessageStatus message,
                        List<UserDTO> data
    ) {
        super(status, message);
        this.data = data;
    }
}
