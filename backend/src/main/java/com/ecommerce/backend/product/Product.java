package com.ecommerce.backend.product;

import com.ecommerce.backend.category.Category;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.SQLDelete;

import java.math.BigInteger;
import java.util.Objects;

@NoArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(name = "Product")
@SQLDelete(sql = "UPDATE Product SET Status = false WHERE ProductID = ?")
public class Product {
    @Id
    @SequenceGenerator(
            name = "product_id_seq",
            sequenceName = "product_id_seq",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "product_id_seq"
    )
    @Column(name = "ProductID")
    private BigInteger productID;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CategoryID")
    @ToString.Exclude
    private Category category;

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
        return Objects.equals(getSlug(), product.getSlug());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getSlug());
    }
}
