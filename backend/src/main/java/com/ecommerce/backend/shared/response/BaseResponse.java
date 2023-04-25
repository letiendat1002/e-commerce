package com.ecommerce.backend.shared.response;

import com.ecommerce.backend.shared.enums.MessageStatus;
import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class BaseResponse {
    private Integer status;
    private MessageStatus message;
}
