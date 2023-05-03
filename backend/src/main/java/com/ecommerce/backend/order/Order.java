package com.ecommerce.backend.order;


import com.ecommerce.backend.order.enums.OrderPaymentType;
import com.ecommerce.backend.order.enums.OrderStatus;
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "UserID")
    @ToString.Exclude
    private User user;

    @Column(name = "Total")
    private BigInteger total;

    @Column(name = "PaymentType")
    @Enumerated(EnumType.STRING)
    private OrderPaymentType paymentType;

    @Column(name = "Status")
    @Enumerated(EnumType.STRING)
    private OrderStatus status = OrderStatus.PENDING;

    @Column(name = "DateOrder")
    private LocalDate dateOrder;

    @Column(name = "Address")
    private String address;

    public Order(User user,
                 BigInteger total,
                 OrderPaymentType paymentType,
                 LocalDate dateOrder,
                 String address) {
        this.user = user;
        this.total = total;
        this.paymentType = paymentType;
        this.dateOrder = dateOrder;
        this.address = address;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Order order = (Order) o;
        return Objects.equals(getTotal(), order.getTotal()) && Objects.equals(getPaymentType(), order.getPaymentType()) && Objects.equals(getStatus(), order.getStatus()) && Objects.equals(getDateOrder(), order.getDateOrder());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getTotal(), getPaymentType(), getStatus(), getDateOrder());
    }
}
