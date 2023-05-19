package com.ecommerce.backend.rating;

import com.ecommerce.backend.orderdetail.OrderDetail;
import com.ecommerce.backend.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.math.BigInteger;
import java.time.LocalDate;
import java.util.Objects;

@NoArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(name = "Rating")
@IdClass(RatingID.class)
public class Rating {
    @Id
    @Column(name = "UserID")
    private BigInteger userID;

    @Id
    @Column(name = "OrderID")
    private BigInteger orderID;

    @Id
    @Column(name = "ProductID")
    private BigInteger productID;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "UserID",
            insertable = false,
            updatable = false
    )
    @ToString.Exclude
    private User user;

    @Column(name = "RateAmount")
    private Integer rateAmount;

    @Column(name = "Comment")
    private String comment;

    @Column(name = "DateRating")
    private LocalDate dateRating = LocalDate.now();

    @OneToOne
    @JoinColumns({
            @JoinColumn(
                    name = "OrderID",
                    referencedColumnName = "OrderID",
                    insertable = false,
                    updatable = false
            ),
            @JoinColumn(
                    name = "ProductID",
                    referencedColumnName = "ProductID",
                    insertable = false,
                    updatable = false
            )
    })
    @ToString.Exclude
    private OrderDetail orderDetail;

    public Rating(BigInteger userID,
                  BigInteger orderID,
                  BigInteger productID,
                  User user,
                  Integer rateAmount,
                  String comment) {
        this.userID = userID;
        this.orderID = orderID;
        this.productID = productID;
        this.user = user;
        this.rateAmount = rateAmount;
        this.comment = comment;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Rating rating = (Rating) o;
        return Objects.equals(getUserID(), rating.getUserID()) && Objects.equals(getOrderID(), rating.getOrderID()) && Objects.equals(getProductID(), rating.getProductID());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getUserID(), getOrderID(), getProductID());
    }
}
