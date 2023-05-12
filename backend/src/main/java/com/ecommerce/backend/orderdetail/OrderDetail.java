package com.ecommerce.backend.orderdetail;


import com.ecommerce.backend.order.Order;
import com.ecommerce.backend.orderdetail.enums.OrderDetailStatus;
import com.ecommerce.backend.product.Product;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.math.BigInteger;
import java.util.Objects;

@NoArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(name = "OrderDetail")
@IdClass(OrderDetailID.class)
public class OrderDetail {
    @Id
    @Column(name = "OrderID")
    private BigInteger orderID;

    @Id
    @Column(name = "ProductID")
    private BigInteger productID;

    @Column(name = "PurchasePrice")
    private BigInteger purchasePrice;

    @Column(name = "Quantity")
    private Integer quantity;

    @Column(name = "Status")
    @Enumerated(EnumType.STRING)
    private OrderDetailStatus status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "OrderID", insertable = false, updatable = false)
    @ToString.Exclude
    private Order order;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ProductID", insertable = false, updatable = false)
    @ToString.Exclude
    private Product product;

    public OrderDetail(BigInteger orderID,
                       BigInteger productID,
                       BigInteger purchasePrice,
                       Integer quantity) {
        this.orderID = orderID;
        this.productID = productID;
        this.purchasePrice = purchasePrice;
        this.quantity = quantity;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        OrderDetail that = (OrderDetail) o;
        return Objects.equals(getOrderID(), that.getOrderID()) && Objects.equals(getProductID(), that.getProductID());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getOrderID(), getProductID());
    }
}
