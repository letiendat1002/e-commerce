package com.ecommerce.backend.product;

import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class ProductDTOMapper implements Function<Product, ProductDTO> {
    @Override
    public ProductDTO apply(Product product) {
        return new ProductDTO(
                product.getProductID(),
                product.getCategory().getCategoryID(),
                product.getName(),
                product.getSlug(),
                product.getImage(),
                product.getImageReview1(),
                product.getImageReview2(),
                product.getImageReview3(),
                product.getUnitPrice(),
                product.getQuantity(),
                product.getDescription(),
                product.getYearRelease(),
                product.getManufacturer(),
                product.getMonitor(),
                product.getCpu(),
                product.getRam(),
                product.getVga(),
                product.getHardDisk(),
                product.getCamera(),
                product.getBattery(),
                product.getStatus()
        );
    }
}
