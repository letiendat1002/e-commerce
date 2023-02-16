package com.ecommerce.backend.product;

import com.ecommerce.backend.category.Category;
import com.ecommerce.backend.orderdetail.OrderDetail;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.SQLDelete;

import java.math.BigInteger;
import java.util.List;
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

    @Column(name = "Discount")
    private Integer discount;

    @Column(name = "Quantity")
    private Long quantity;

    @Column(name = "Description")
    private String description;

    @Column(name = "YearRelease")
    private Integer yearRelease;

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

    @Column(name = "Memory")
    private String memory;

    @Column(name = "Demand")
    private String demand;

    @Column(name = "Status")
    private Boolean status;

    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY)
    @ToString.Exclude
    private List<OrderDetail> orderDetails;

    public Product(BigInteger productID,
                   Category category,
                   String name,
                   String slug,
                   String image,
                   String imageReview1,
                   String imageReview2,
                   String imageReview3,
                   BigInteger unitPrice,
                   Integer discount,
                   Long quantity,
                   String description,
                   Integer yearRelease,
                   String manufacturer,
                   String monitor,
                   String cpu,
                   String ram,
                   String vga,
                   String hardDisk,
                   String camera,
                   String battery,
                   String memory,
                   String demand,
                   Boolean status) {
        this.productID = productID;
        this.category = category;
        this.name = name;
        this.slug = slug;
        this.image = image;
        this.imageReview1 = imageReview1;
        this.imageReview2 = imageReview2;
        this.imageReview3 = imageReview3;
        this.unitPrice = unitPrice;
        this.discount = discount;
        this.quantity = quantity;
        this.description = description;
        this.yearRelease = yearRelease;
        this.manufacturer = manufacturer;
        this.monitor = monitor;
        this.cpu = cpu;
        this.ram = ram;
        this.vga = vga;
        this.hardDisk = hardDisk;
        this.camera = camera;
        this.battery = battery;
        this.memory = memory;
        this.demand = demand;
        this.status = status;
    }

    public Product(Category category,
                   String name,
                   String slug,
                   String image,
                   String imageReview1,
                   String imageReview2,
                   String imageReview3,
                   BigInteger unitPrice,
                   Integer discount,
                   Long quantity,
                   String description,
                   Integer yearRelease,
                   String manufacturer,
                   String monitor,
                   String cpu,
                   String ram,
                   String vga,
                   String hardDisk,
                   String camera,
                   String battery,
                   String memory,
                   String demand,
                   Boolean status) {
        this.category = category;
        this.name = name;
        this.slug = slug;
        this.image = image;
        this.imageReview1 = imageReview1;
        this.imageReview2 = imageReview2;
        this.imageReview3 = imageReview3;
        this.unitPrice = unitPrice;
        this.discount = discount;
        this.quantity = quantity;
        this.description = description;
        this.yearRelease = yearRelease;
        this.manufacturer = manufacturer;
        this.monitor = monitor;
        this.cpu = cpu;
        this.ram = ram;
        this.vga = vga;
        this.hardDisk = hardDisk;
        this.camera = camera;
        this.battery = battery;
        this.memory = memory;
        this.demand = demand;
        this.status = status;
    }

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
