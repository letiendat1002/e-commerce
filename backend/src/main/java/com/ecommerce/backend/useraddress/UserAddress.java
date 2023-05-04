package com.ecommerce.backend.useraddress;

import com.ecommerce.backend.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.math.BigInteger;
import java.time.LocalDateTime;
import java.util.Objects;

@NoArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(name = "UserAddress")
public class UserAddress {
    @Id
    @SequenceGenerator(
            name = "user_address_id_seq",
            sequenceName = "user_address_id_seq",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "user_address_id_seq"
    )
    @Column(name = "UserAddressID")
    private BigInteger userAddressID;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "UserID")
    @ToString.Exclude
    private User user;

    @Column(name = "Address")
    private String address;

    @Transient
    private LocalDateTime createdAt = LocalDateTime.now();

    public UserAddress(User user, String address) {
        this.user = user;
        this.address = address;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserAddress that = (UserAddress) o;
        return Objects.equals(getCreatedAt(), that.getCreatedAt());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getCreatedAt());
    }
}
