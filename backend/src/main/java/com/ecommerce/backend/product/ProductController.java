package com.ecommerce.backend.product;

import com.ecommerce.backend.util.enums.MessageStatus;
import com.ecommerce.backend.util.exception.RequestValidationException;
import com.ecommerce.backend.util.response.BaseResponse;
import io.swagger.v3.oas.models.annotations.OpenAPI30;
import io.swagger.v3.oas.models.annotations.OpenAPI31;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;
import java.util.Collections;
import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/api/v1/products")
@RestController
public class ProductController {
    private final ProductService productService;
    private final ProductDTOMapper productDTOMapper;

    @GetMapping
    public ProductResponse getProducts(
            @RequestParam(value = "categoryID", required = false) BigInteger categoryID
    ) {
        List<ProductDTO> productDTOList;

        if (categoryID == null) {
            productDTOList = productService
                    .fetchAllProducts()
                    .stream()
                    .map(productDTOMapper)
                    .toList();
        } else {
            productDTOList = productService
                    .fetchAllProductsByCategoryID(categoryID)
                    .stream()
                    .map(productDTOMapper)
                    .toList();
        }

        return new ProductResponse(
                HttpStatus.OK.value(),
                MessageStatus.SUCCESSFUL,
                productDTOList
        );
    }

    @GetMapping("{productID}")
    public ProductResponse getProductByProductID(
            @PathVariable("productID") BigInteger productID
    ) {
        var productDTOList = Collections.singletonList(
                productDTOMapper.apply(
                        productService.fetchProductByProductID(productID)
                )
        );

        return new ProductResponse(
                HttpStatus.OK.value(),
                MessageStatus.SUCCESSFUL,
                productDTOList
        );
    }

    @PostMapping
    @PreAuthorize("hasAuthority('product:create')")
    public ProductResponse postProduct(
            @Validated @RequestBody ProductRequest request,
            BindingResult errors
    ) {
        if (errors.hasErrors()) {
            throw new RequestValidationException(errors);
        }

        var productDTOList = Collections.singletonList(
                productDTOMapper.apply(
                        productService.addProduct(request)
                )
        );

        return new ProductResponse(
                HttpStatus.OK.value(),
                MessageStatus.SUCCESSFUL,
                productDTOList
        );
    }

    @PutMapping("{productID}")
    @PreAuthorize("hasAuthority('product:update')")
    public ProductResponse putProduct(
            @PathVariable("productID") BigInteger productID,
            @Validated @RequestBody ProductRequest request,
            BindingResult errors
    ) {
        if (errors.hasErrors()) {
            throw new RequestValidationException(errors);
        }

        var productDTOList = Collections.singletonList(
                productDTOMapper.apply(
                        productService.updateProduct(productID, request)
                )
        );

        return new ProductResponse(
                HttpStatus.OK.value(),
                MessageStatus.SUCCESSFUL,
                productDTOList
        );
    }

    @DeleteMapping("{productID}")
    @PreAuthorize("hasAuthority('product:delete')")
    public BaseResponse deleteProduct(
            @PathVariable("productID") BigInteger productID
    ) {
        productService.deleteProduct(productID);

        return new BaseResponse(
                HttpStatus.OK.value(),
                MessageStatus.SUCCESSFUL
        );
    }
}
