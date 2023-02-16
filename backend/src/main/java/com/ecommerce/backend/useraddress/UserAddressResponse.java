package com.ecommerce.backend.useraddress;

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
public class UserAddressResponse extends BaseResponse {
    private List<UserAddressDTO> data;

    public UserAddressResponse(Integer status,
                               MessageStatus message,
                               List<UserAddressDTO> data
    ) {
        super(status, message);
        this.data = data;
    }
}
