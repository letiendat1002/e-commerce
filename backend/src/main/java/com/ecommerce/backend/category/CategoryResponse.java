package com.ecommerce.backend.category;

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
public class CategoryResponse extends BaseResponse {
    private List<CategoryDTO> data;

    public CategoryResponse(Integer status,
                            MessageStatus message,
                            List<CategoryDTO> data
    ) {
        super(status, message);
        this.data = data;
    }
}
