package wap.dingdong.backend.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import wap.dingdong.backend.domain.Product;

@Getter
@NoArgsConstructor
public class ProductResponseDto {
    private String title;
    private String contents;
    private Long price;

//    @Builder
    public ProductResponseDto(Product entity) {
        this.title = entity.getTitle();
        this.contents = entity.getContents();
        this.price = entity.getPrice();
    }
}
