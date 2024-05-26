package wap.dingdong.backend.payload.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import wap.dingdong.backend.domain.Product;
import wap.dingdong.backend.payload.CommentDto;
import wap.dingdong.backend.payload.ImageDto;
import wap.dingdong.backend.payload.LocationDto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@AllArgsConstructor @NoArgsConstructor
public class ProductDetailResponse {

    private String email;
    private Long productId;
    private String title;
    private Long price;
    private String contents;
    private List<LocationDto> locations;
    private String status;
    private List<ImageDto> image;
    private String productLike;
    private String createdAt;
    private List<CommentDto> comment;

    public static ProductDetailResponse of(Product product) {
        return new ProductDetailResponse(
                product.getUser().getEmail(),
                product.getId(),
                product.getTitle(),
                product.getPrice(),
                product.getContents(),
                product.getLocations().stream()
                        .map(location -> new LocationDto(location.getLocation()))
                        .collect(Collectors.toList()),
                product.getStatus().toString(),
                product.getImages().stream()
                                .map(image -> new ImageDto(image.getImage()))
                                .collect(Collectors.toList()),
                product.getProductLike().toString(),
                product.getCreatedAt().toString(),
                product.getComments().stream()
                        .map(comment -> new CommentDto(comment.getCmtId(),comment.getUser().getId(),
                                comment.getUser().getEmail(), comment.getCmtContent()))
                        .collect(Collectors.toList())
        );
    }

}
