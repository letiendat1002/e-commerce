package com.ecommerce.backend.user;

import com.ecommerce.backend.order.Order;
import com.ecommerce.backend.rating.Rating;
import com.ecommerce.backend.util.security.enums.UserRole;
import com.ecommerce.backend.user.enums.Gender;
import com.ecommerce.backend.useraddress.UserAddress;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.math.BigInteger;
import java.util.Collection;
import java.util.List;
import java.util.Objects;

@NoArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(name = "`User`")
public class User implements UserDetails {
    @Id
    @SequenceGenerator(
            name = "user_id_seq",
            sequenceName = "user_id_seq",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "user_id_seq"
    )
    @Column(name = "UserID")
    private BigInteger userID;

    @Column(name = "Email")
    private String email;

    @Column(name = "Password")
    @Setter(AccessLevel.NONE)
    @Getter(AccessLevel.NONE)
    private String password;

    @Column(name = "FullName")
    private String fullName;

    @Column(name = "Gender")
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Column(name = "Phone")
    private String phone;

    @Column(name = "Image")
    private String image;

    @Column(name = "Role")
    @Enumerated(EnumType.STRING)
    private UserRole role = UserRole.CUSTOMER;

    @Column(name = "Locked")
    private boolean locked = false;

    @Column(name = "Enabled")
    private boolean enabled = false;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    @ToString.Exclude
    private List<UserAddress> userAddresses;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    @ToString.Exclude
    private List<Order> orders;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    @ToString.Exclude
    private List<Rating> ratings;

    public User(BigInteger userID,
                String email,
                String password,
                String fullName,
                Gender gender,
                String phone,
                String image) {
        this.userID = userID;
        this.email = email;
        this.password = password;
        this.fullName = fullName;
        this.gender = gender;
        this.phone = phone;
        this.image = image;
    }

    public User(String email,
                String password,
                String fullName,
                Gender gender,
                String phone,
                String image) {
        this.email = email;
        this.password = password;
        this.fullName = fullName;
        this.gender = gender;
        this.phone = phone;
        this.image = image;
    }

    public User(BigInteger userID,
                String email,
                String password,
                String fullName,
                Gender gender,
                String phone,
                String image,
                UserRole role,
                boolean enabled) {
        this.userID = userID;
        this.email = email;
        this.password = password;
        this.fullName = fullName;
        this.gender = gender;
        this.phone = phone;
        this.image = image;
        this.role = role;
        this.enabled = enabled;
    }

    public User(String email,
                String password,
                String fullName,
                Gender gender,
                String phone,
                String image,
                UserRole role,
                boolean enabled) {
        this.email = email;
        this.password = password;
        this.fullName = fullName;
        this.gender = gender;
        this.phone = phone;
        this.image = image;
        this.role = role;
        this.enabled = enabled;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return role.getGrantedAuthorities();
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !locked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(getEmail(), user.getEmail()) && Objects.equals(getPhone(), user.getPhone());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getEmail(), getPhone());
    }
}
