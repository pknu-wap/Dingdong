package wap.dingdong.backend.payload.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import wap.dingdong.backend.domain.Product;
import wap.dingdong.backend.payload.ImageDto;
import wap.dingdong.backend.payload.LocationDto;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter
public class ProductInfoResponse {

    private Long productId;
    private String title;
    private Long price;
    private String contents;
    private List<LocationDto> locations;
    private List<ImageDto> images;
    private String productLike;
    private String createdAt;

    public static ProductInfoResponse of(Product product) {
        return new ProductInfoResponse(
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
                product.getProductLike().name(),
                product.getCreatedAt().toString()
        );
    }
}