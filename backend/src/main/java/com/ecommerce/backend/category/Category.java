package com.ecommerce.backend.category;

import com.ecommerce.backend.product.Product;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.math.BigInteger;
import java.util.List;
import java.util.Objects;

@NoArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(name = "Category")
public class Category {
    @Id
    @SequenceGenerator(
            name = "category_id_seq",
            sequenceName = "category_id_seq",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "category_id_seq"
    )
    @Column(name = "CategoryID")
    private BigInteger categoryID;
    @Column(name = "Name")
    private String name;
    @Column(name = "Slug")
    private String slug;
    @Column(name = "Image")
    private String image;

    @OneToMany(mappedBy = "category", fetch = FetchType.LAZY)
    @ToString.Exclude
    private List<Product> products;

    public Category(BigInteger categoryID,
                    String name,
                    String slug,
                    String image) {
        this.categoryID = categoryID;
        this.name = name;
        this.slug = slug;
        this.image = image;
    }

    public Category(String name, String slug, String image) {
        this.name = name;
        this.slug = slug;
        this.image = image;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Category category = (Category) o;
        return Objects.equals(getSlug(), category.getSlug());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getSlug());
    }
}
