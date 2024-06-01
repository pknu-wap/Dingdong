package wap.dingdong.backend.payload.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import wap.dingdong.backend.domain.Product;
import wap.dingdong.backend.payload.ImageDto;
import wap.dingdong.backend.payload.LocationDto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class ProductInfoResponse {

    private String email;
    private Long productId;
    private String title;
    private Long price;
    private String contents;
    private List<LocationDto> locations;
    private List<ImageDto> images;
    private Integer liked;
    private LocalDateTime createdAt;
    private Integer status;


    public static ProductInfoResponse of(Product product) {
        return new ProductInfoResponse(
                product.getUser().getEmail(), //연관관계가 연결되어 있으므로 이렇게 조회 가능
                product.getId(),
                product.getTitle(),
                product.getPrice(),
                product.getContents(),
                product.getLocations().stream()
                        .map(location -> new LocationDto(location.getLocation()))
                        .collect(Collectors.toList()),
                product.getImages().stream()
                        .map(image -> new ImageDto(image.getImage()))
                        .collect(Collectors.toList()),
                product.getLiked(),
                product.getCreatedAt(),
                product.getStatus()
        );
    }
}