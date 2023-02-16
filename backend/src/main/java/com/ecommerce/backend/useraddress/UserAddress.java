package com.ecommerce.backend.useraddress;

import com.ecommerce.backend.user.User;
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

    @Column(name = "UserID")
    private BigInteger userID;

    @Column(name = "Address")
    private String address;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "UserID", insertable = false, updatable = false)
    @ToString.Exclude
    private User user;

    public UserAddress(BigInteger userID, String address) {
        this.userID = userID;
        this.address = address;
    }

    public UserAddress(BigInteger userAddressID,
                       BigInteger userID,
                       String address) {
        this.userAddressID = userAddressID;
        this.userID = userID;
        this.address = address;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserAddress that = (UserAddress) o;
        return Objects.equals(getAddress(), that.getAddress());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getAddress());
    }
}
