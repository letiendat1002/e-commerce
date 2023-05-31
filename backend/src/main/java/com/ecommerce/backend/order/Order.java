package com.ecommerce.backend.order;


import com.ecommerce.backend.order.enums.OrderPaymentType;
import com.ecommerce.backend.order.enums.OrderStatus;
import com.ecommerce.backend.orderdetail.OrderDetail;
import com.ecommerce.backend.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.math.BigInteger;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

@NoArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(name = "`Order`")
public class Order {
    @Id
    @SequenceGenerator(
            name = "order_id_seq",
            sequenceName = "order_id_seq",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "order_id_seq"
    )
    @Column(name = "OrderID")
    private BigInteger orderID;

    @Column(name = "UserID")
    private BigInteger userID;

    @Column(name = "AdditionalPrice")
    private BigInteger additionalPrice;

    @Column(name = "PaymentType")
    @Enumerated(EnumType.STRING)
    private OrderPaymentType paymentType;

    @Column(name = "Status")
    @Enumerated(EnumType.STRING)
    private OrderStatus status = OrderStatus.PENDING;

    @Column(name = "DateOrder")
    private LocalDate dateOrder = LocalDate.now();

    @Column(name = "Address")
    private String address;

    @Column(name = "IsPreparing")
    private boolean isPreparing = false;

    @Column(name = "DatePreparing")
    private LocalDate datePreparing;

    @Column(name = "IsShipping")
    private boolean isShipping = false;

    @Column(name = "DateShipping")
    private LocalDate dateShipping;

    @Column(name = "IsCompleted")
    private boolean isCompleted = false;

    @Column(name = "DateCompleted")
    private LocalDate dateCompleted;

    @Column(name = "WorkerID")
    private BigInteger workerID;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "UserID", insertable = false, updatable = false)
    @ToString.Exclude
    private User user;

    @OneToMany(mappedBy = "order", fetch = FetchType.LAZY)
    @ToString.Exclude
    private List<OrderDetail> orderDetails;

    public Order(BigInteger orderID,
                 BigInteger userID,
                 BigInteger additionalPrice,
                 OrderPaymentType paymentType,
                 String address) {
        this.orderID = orderID;
        this.userID = userID;
        this.additionalPrice = additionalPrice;
        this.paymentType = paymentType;
        this.address = address;
    }

    public Order(BigInteger orderID,
                 BigInteger userID,
                 BigInteger additionalPrice,
                 OrderPaymentType paymentType,
                 OrderStatus status,
                 String address) {
        this.orderID = orderID;
        this.userID = userID;
        this.additionalPrice = additionalPrice;
        this.paymentType = paymentType;
        this.status = status;
        this.address = address;
    }

    public Order(BigInteger userID,
                 BigInteger additionalPrice,
                 OrderPaymentType paymentType,
                 String address) {
        this.userID = userID;
        this.additionalPrice = additionalPrice;
        this.paymentType = paymentType;
        this.address = address;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Order order = (Order) o;
        return Objects.equals(getUserID(), order.getUserID()) && Objects.equals(getAdditionalPrice(), order.getAdditionalPrice()) && getPaymentType() == order.getPaymentType() && getStatus() == order.getStatus() && Objects.equals(getDateOrder(), order.getDateOrder()) && Objects.equals(getAddress(), order.getAddress());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getUserID(), getAdditionalPrice(), getPaymentType(), getStatus(), getDateOrder(), getAddress());
    }
}
