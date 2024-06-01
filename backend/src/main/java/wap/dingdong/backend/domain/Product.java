package wap.dingdong.backend.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import wap.dingdong.backend.payload.request.ProductCreateRequest;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@Getter
@Setter
@AllArgsConstructor @NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Product {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private Long id;

    private String title;
    private Long price;
    private String contents;

    @Column(columnDefinition = "int default 0")
    private Integer status = 0; // 0 : 기본값, 판매중 / 1 : 판매완료

    // 찜 - 수정
    @Column(columnDefinition = "int default 0")
    private Integer liked = 0; // 상품 찜 수

    // 어노테이션, 데이터타입, 변수명 수정
    @CreatedDate
    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

//    @OneToOne(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//    private Buy buy;

    @OneToOne(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Sell sell;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Wish> wishes = new ArrayList<>();

    @OneToMany(mappedBy = "product",cascade = CascadeType.ALL)
    private List<Image> images = new ArrayList<>();

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private List<Location> locations = new ArrayList<>();

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private List<Comment> comments = new ArrayList<>();


    public Product(User user, String title, Long price, String contents, List<Location> locations, List<Image> images) {
        this.user = user;
        this.title = title;
        this.price = price;
        this.contents = contents;
        this.images = images;
        this.locations = locations;
    }


    /* ------------- 상품 상태 변경 메소드 -------------- */
    public void changeToSoldout(Long user_id) {
        if (!user.getId().equals(user_id)) {
            throw new IllegalStateException("상품을 게시한 사용자만 상품의 상태를 변경할 수 있습니다.");
        } else {
            status++;
        }
    }

    public void changeToOnsale(Long user_id) {
        if (!user.getId().equals(user_id)) {
            throw new IllegalStateException("상품을 게시한 사용자만 상품의 상태를 변경할 수 있습니다.");
        } else {
            status--;
        }
    }

    /* ------------- 상품 찜하기 -------------- */
    public void increaseLiked() {
        this.liked += 1;
    }

    public void decreaseLiked() {
        this.liked -= 1;
    }

    //상품 생성 메서드
    public static Product createProduct(User user, ProductCreateRequest request, List<String> imageUrls) {
        List<Location> locations = request.getLocations().stream()
                .map(locationDto -> new Location(locationDto.getLocation()))
                .collect(Collectors.toList());

        List<Image> images = imageUrls.stream()
                .map(Image::new)
                .collect(Collectors.toList());

        Product product = new Product(user, request.getTitle(), request.getPrice(),
                request.getContents(), locations, images);

        locations.forEach(location -> location.updateProduct(product));
        images.forEach(image -> image.updateProduct(product));

        return product;
    }

}