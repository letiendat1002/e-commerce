package com.ecommerce.backend.category;

import com.ecommerce.backend.util.enums.MessageStatus;
import com.ecommerce.backend.util.exception.RequestValidationException;
import com.ecommerce.backend.util.response.BaseResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;
import java.util.Collections;

@RequiredArgsConstructor
@RequestMapping("/api/v1/categories")
@RestController
public class CategoryController {
    private final CategoryService categoryService;
    private final CategoryDTOMapper categoryDTOMapper;

    @GetMapping
    public CategoryResponse getCategories() {
        var categoryDTOList = categoryService
                .fetchAllCategories()
                .stream()
                .map(categoryDTOMapper)
                .toList();

        return new CategoryResponse(
                HttpStatus.OK.value(),
                MessageStatus.SUCCESSFUL,
                categoryDTOList
        );
    }

    @GetMapping("{categoryID}")
    public CategoryResponse getCategoryByID(
            @PathVariable("categoryID") BigInteger categoryID
    ) {
        var categoryDTOList = Collections.singletonList(
                categoryDTOMapper.apply(
                        categoryService.fetchCategoryByID(categoryID)
                )
        );

        return new CategoryResponse(
                HttpStatus.OK.value(),
                MessageStatus.SUCCESSFUL,
                categoryDTOList
        );
    }

    @PostMapping
    @PreAuthorize("hasAuthority('category:create')")
    public CategoryResponse postCategory(
            @Validated @RequestBody CategoryRequest request,
            BindingResult errors
    ) {
        if (errors.hasErrors()) {
            throw new RequestValidationException(errors);
        }

        var categoryDTOList = Collections.singletonList(
                categoryDTOMapper.apply(categoryService.addCategory(request))
        );

        return new CategoryResponse(
                HttpStatus.OK.value(),
                MessageStatus.SUCCESSFUL,
                categoryDTOList
        );
    }

    @PutMapping("{categoryID}")
    @PreAuthorize("hasAuthority('category:update')")
    public CategoryResponse putCategory(
            @PathVariable("categoryID") BigInteger categoryID,
            @Validated @RequestBody CategoryRequest request,
            BindingResult errors
    ) {
        if (errors.hasErrors()) {
            throw new RequestValidationException(errors);
        }

        var categoryDTOList = Collections.singletonList(
                categoryDTOMapper.apply(
                        categoryService.updateCategory(categoryID, request)
                )
        );

        return new CategoryResponse(
                HttpStatus.OK.value(),
                MessageStatus.SUCCESSFUL,
                categoryDTOList
        );
    }

    @DeleteMapping("{categoryID}")
    @PreAuthorize("hasAuthority('category:delete')")
    public BaseResponse deleteCategory(
            @PathVariable("categoryID") BigInteger categoryID
    ) {
        categoryService.deleteCategory(categoryID);

        return new BaseResponse(
                HttpStatus.OK.value(),
                MessageStatus.SUCCESSFUL
        );
    }
}
