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
public class Product {
    @Id
    @SequenceGenerator(
            name = "product_id_sequence",
            sequenceName = "product_id_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "product_id_sequence"
    )
    private BigInteger ProductID;
    private BigInteger CategoryID;
    private String Name;
    private String Slug;
    private String Image;
    private String ImageReview1;
    private String ImageReview2;
    private String ImageReview3;
    private BigInteger UnitPrice;
    private Long Quantity;
    private String Description;
    private String YearRelease;
    private String Manufacturer;
    private String Monitor;
    private String CPU;
    private String RAM;
    private String VGA;
    private String HardDisk;
    private String Camera;
    private String Battery;
    private Boolean Status;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Product product = (Product) o;
        return Objects.equals(ProductID, product.ProductID) && Objects.equals(CategoryID, product.CategoryID) && Objects.equals(Name, product.Name) && Objects.equals(Slug, product.Slug) && Objects.equals(Image, product.Image) && Objects.equals(UnitPrice, product.UnitPrice) && Objects.equals(Quantity, product.Quantity) && Objects.equals(Description, product.Description) && Objects.equals(Status, product.Status) && Objects.equals(YearRelease, product.YearRelease) && Objects.equals(Manufacturer, product.Manufacturer) && Objects.equals(Monitor, product.Monitor) && Objects.equals(CPU, product.CPU) && Objects.equals(RAM, product.RAM) && Objects.equals(VGA, product.VGA) && Objects.equals(HardDisk, product.HardDisk) && Objects.equals(Camera, product.Camera) && Objects.equals(Battery, product.Battery);
    }

    @Override
    public int hashCode() {
        return Objects.hash(ProductID, CategoryID, Name, Slug, Image, UnitPrice, Quantity, Description, Status, YearRelease, Manufacturer, Monitor, CPU, RAM, VGA, HardDisk, Camera, Battery);
    }
}
