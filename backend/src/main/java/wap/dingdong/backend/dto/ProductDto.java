package wap.dingdong.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import wap.dingdong.backend.domain.Product;
import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
public class ProductDto {
    private Long id;
    private String title;
    private Long price;
    private LocalDateTime createdAt;
    // 다른 필드도 필요한 경우 추가하면 됩니다.

    // Entity -> Dto

    public static ProductDto toDTO(Product product) {
        return ProductDto.builder()
                .id(product.getId())
                .title(product.getTitle())
                .price(product.getPrice())
//                .createdAt(product.getCreatedAt())
                // 다른 필드도 필요한 경우 추가하면 됩니다.
                .build();
    }
}
