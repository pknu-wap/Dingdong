package wap.dingdong.backend.payload.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import wap.dingdong.backend.domain.Image;
import wap.dingdong.backend.domain.Location;
import wap.dingdong.backend.domain.Product;

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
    private List<String> locations;
    private List<String> images;
    private String productLike;
    private String createdAt;

    public static ProductInfoResponse of(Product product) {
        return new ProductInfoResponse(
                product.getId(),
                product.getTitle(),
                product.getPrice(),
                product.getContents(),
                product.getLocations().stream()
                        .map(Location::getLocation)
                        .collect(Collectors.toList()),
                product.getImages().stream()
                        .map(Image::getImageUrl)
                        .collect(Collectors.toList()),
                product.getProductLike().name(),
                product.getCreatedAt().toString()
        );
    }
}
