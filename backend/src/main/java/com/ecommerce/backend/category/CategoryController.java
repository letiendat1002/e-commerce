package com.ecommerce.backend.category;

import com.ecommerce.backend.shared.enums.MessageStatus;
import com.ecommerce.backend.shared.exception.RequestValidationException;
import com.ecommerce.backend.shared.response.BaseResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;
import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/api/v1/categories")
@RestController
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping
    public CategoryResponse getCategories() {
        var categoryDTOList = categoryService.fetchAllCategories();

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
        var categoryDTOList = List.of(categoryService.fetchCategoryByID(categoryID));

        return new CategoryResponse(
                HttpStatus.OK.value(),
                MessageStatus.SUCCESSFUL,
                categoryDTOList
        );
    }

    @GetMapping("search/{slug}")
    public CategoryResponse getCategoryBySlug(
            @PathVariable("slug") String slug
    ) {
        var categoryDTOList = List.of(categoryService.fetchCategoryBySlug(slug));

        return new CategoryResponse(
                HttpStatus.OK.value(),
                MessageStatus.SUCCESSFUL,
                categoryDTOList
        );
    }

    @PostMapping
    public CategoryResponse postCategory(
            @Validated @RequestBody CategoryRequest request,
            BindingResult errors
    ) {
        if (errors.hasErrors()) {
            throw new RequestValidationException(errors);
        }

        var categoryDTOList = List.of(categoryService.addCategory(request));

        return new CategoryResponse(
                HttpStatus.OK.value(),
                MessageStatus.SUCCESSFUL,
                categoryDTOList
        );
    }

    @DeleteMapping("{categoryID}")
    public BaseResponse deleteCategory(
            @PathVariable("categoryID") BigInteger categoryID
    ) {
        categoryService.deleteCategory(categoryID);

        return new BaseResponse(
                HttpStatus.OK.value(),
                MessageStatus.SUCCESSFUL
        );
    }

    @PutMapping("{categoryID}")
    public CategoryResponse putCategory(
            @PathVariable("categoryID") BigInteger categoryID,
            @Validated @RequestBody CategoryRequest request,
            BindingResult errors
    ) {
        if (errors.hasErrors()) {
            throw new RequestValidationException(errors);
        }

        var categoryDTOList = List.of(categoryService.updateCategory(categoryID, request));

        return new CategoryResponse(
                HttpStatus.OK.value(),
                MessageStatus.SUCCESSFUL,
                categoryDTOList
        );
    }
}
