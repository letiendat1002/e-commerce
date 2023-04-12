package com.ecommerce.backend.product;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigInteger;
import java.util.Objects;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(name = "Product")
public class Product {
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE
    )
    @Column(name = "ProductID")
    private BigInteger productID;
    @Column(name = "CategoryID")
    private BigInteger categoryID;
    @Column(name = "Name")
    private String name;
    @Column(name = "Slug")
    private String slug;
    @Column(name = "Image")
    private String image;
    @Column(name = "ImageReview1")
    private String imageReview1;
    @Column(name = "ImageReview2")
    private String imageReview2;
    @Column(name = "ImageReview3")
    private String imageReview3;
    @Column(name = "UnitPrice")
    private BigInteger unitPrice;
    @Column(name = "Quantity")
    private Long quantity;
    @Column(name = "Description")
    private String description;
    @Column(name = "YearRelease")
    private String yearRelease;
    @Column(name = "Manufacturer")
    private String manufacturer;
    @Column(name = "Monitor")
    private String monitor;
    @Column(name = "CPU")
    private String cpu;
    @Column(name = "RAM")
    private String ram;
    @Column(name = "VGA")
    private String vga;
    @Column(name = "HardDisk")
    private String hardDisk;
    @Column(name = "Camera")
    private String camera;
    @Column(name = "Battery")
    private String battery;
    @Column(name = "Status")
    private Boolean status;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Product product = (Product) o;
        return Objects.equals(productID, product.productID) && Objects.equals(categoryID, product.categoryID) && Objects.equals(name, product.name) && Objects.equals(slug, product.slug) && Objects.equals(image, product.image) && Objects.equals(imageReview1, product.imageReview1) && Objects.equals(imageReview2, product.imageReview2) && Objects.equals(imageReview3, product.imageReview3) && Objects.equals(unitPrice, product.unitPrice) && Objects.equals(quantity, product.quantity) && Objects.equals(description, product.description) && Objects.equals(yearRelease, product.yearRelease) && Objects.equals(manufacturer, product.manufacturer) && Objects.equals(monitor, product.monitor) && Objects.equals(cpu, product.cpu) && Objects.equals(ram, product.ram) && Objects.equals(vga, product.vga) && Objects.equals(hardDisk, product.hardDisk) && Objects.equals(camera, product.camera) && Objects.equals(battery, product.battery) && Objects.equals(status, product.status);
    }

    @Override
    public int hashCode() {
        return Objects.hash(productID, categoryID, name, slug, image, imageReview1, imageReview2, imageReview3, unitPrice, quantity, description, yearRelease, manufacturer, monitor, cpu, ram, vga, hardDisk, camera, battery, status);
    }
}
