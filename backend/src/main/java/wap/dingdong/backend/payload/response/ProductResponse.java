package wap.dingdong.backend.payload.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import wap.dingdong.backend.domain.Product;
import wap.dingdong.backend.payload.CommentDto;
import wap.dingdong.backend.payload.ImageDto;
import wap.dingdong.backend.payload.LocationDto;

import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@AllArgsConstructor
public class ProductResponse {

    private String email;
    private Long productId;
    private String title;
    private Long price;
    private String contents;
    private List<LocationDto> locations;
    private Integer status;
    private List<ImageDto> images;
    private Integer liked;
    private String createdAt;
    private List<CommentDto> comment;

    public static ProductResponse of(Product product) {
        return new ProductResponse(
                product.getUser().getEmail(),
                product.getId(),
                product.getTitle(),
                product.getPrice(),
                product.getContents(),
                product.getLocations().stream()
                        .map(location -> new LocationDto(location.getLocation()))
                        .collect(Collectors.toList()),
                product.getStatus(),
                product.getImages().stream()
                        .map(image -> new ImageDto(image.getImage()))
                        .collect(Collectors.toList()),
                product.getLiked(),
                product.getCreatedAt().toString(),
                product.getComments().stream()
                        .map(comment -> new CommentDto(comment.getCmtId(),comment.getUser().getId(),
                                comment.getUser().getEmail(), comment.getCmtContent(), comment.getCmtRegDate()))
                        .collect(Collectors.toList())
        );
    }
}
