package com.ecommerce.backend.rating;

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
public class RatingResponse extends BaseResponse {
    private List<RatingDTO> data;

    public RatingResponse(Integer status,
                          MessageStatus message,
                          List<RatingDTO> data) {
        super(status, message);
        this.data = data;
    }
}
