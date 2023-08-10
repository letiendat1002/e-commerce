package com.ecommerce.backend.util.response;

import com.ecommerce.backend.util.enums.MessageStatus;
import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class BaseResponse {
    private Integer status;
    private MessageStatus message;
}
