package wap.dingdong.backend.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@Entity
@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
@Table(name = "user", uniqueConstraints = {@UniqueConstraint(columnNames = "email")})
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @Column(nullable = false)
    private String name;

    @Email
    @Column(nullable = false)
    private String email;

    private String imageUrl;

    @Column(nullable = false)
    private Boolean emailVerified = false;

    @JsonIgnore
    private String password;

    @NotNull
    @Enumerated(EnumType.STRING)
    private AuthProvider provider;

    private String providerId;

    //연관관계 매핑

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    List<Product> products = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Wish> wishList = new ArrayList<>();

    public List<Product> getLikedProducts() {
        return wishList.stream()
                .map(Wish::getProduct)
                .collect(Collectors.toList());
    }
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    List<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    List<Sell> sells = new ArrayList<>();

//    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
//    List<Buy> buys = new ArrayList<>();


}
