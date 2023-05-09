package com.ecommerce.backend.product;

import com.ecommerce.backend.shared.enums.MessageStatus;
import com.ecommerce.backend.shared.exception.RequestValidationException;
import com.ecommerce.backend.shared.response.BaseResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;
import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/api/v1/products")
@RestController
public class ProductController {
    private final ProductService productService;

    @GetMapping
    public ProductResponse getProducts(
            @RequestParam(value = "categoryID", required = false) BigInteger categoryID
    ) {
        List<ProductDTO> productDTOList;

        if (categoryID == null) {
            productDTOList = productService.fetchAllProducts();
        } else {
            productDTOList = productService.fetchAllProductsByCategoryID(categoryID);
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
        var productDTOList = List.of(productService.fetchProductByProductID(productID));

        return new ProductResponse(
                HttpStatus.OK.value(),
                MessageStatus.SUCCESSFUL,
                productDTOList
        );
    }

    @PostMapping
    @PreAuthorize("hasAuthority('product:write')")
    public ProductResponse postProduct(
            @Validated @RequestBody ProductRequest request,
            BindingResult errors
    ) {
        if (errors.hasErrors()) {
            throw new RequestValidationException(errors);
        }

        var productDTOList = List.of(productService.addProduct(request));

        return new ProductResponse(
                HttpStatus.OK.value(),
                MessageStatus.SUCCESSFUL,
                productDTOList
        );
    }

    @DeleteMapping("{productID}")
    @PreAuthorize("hasAuthority('product:write')")
    public BaseResponse deleteProduct(
            @PathVariable("productID") BigInteger productID
    ) {
        productService.deleteProduct(productID);

        return new BaseResponse(
                HttpStatus.OK.value(),
                MessageStatus.SUCCESSFUL
        );
    }

    @PutMapping("{productID}")
    @PreAuthorize("hasAuthority('product:write')")
    public ProductResponse putProduct(
            @PathVariable("productID") BigInteger productID,
            @Validated @RequestBody ProductRequest request,
            BindingResult errors
    ) {
        if (errors.hasErrors()) {
            throw new RequestValidationException(errors);
        }

        var productDTOList = List.of(productService.updateProduct(productID, request));

        return new ProductResponse(
                HttpStatus.OK.value(),
                MessageStatus.SUCCESSFUL,
                productDTOList
        );
    }
}
