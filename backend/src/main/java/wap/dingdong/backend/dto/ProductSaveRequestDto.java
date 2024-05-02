package wap.dingdong.backend.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import wap.dingdong.backend.domain.Product;

@Getter
@NoArgsConstructor
public class ProductSaveRequestDto {
//    @NotEmpty
    private String title;
    private String contents;
    private Long price;

    @Builder
    public ProductSaveRequestDto(String title, String contents, Long price) {
        this.title = title;
        this.contents = contents;
        this.price = price;
    }

    public Product toEntity() {
        return Product.builder()
                .title(title)
                .contents(contents)
                .price(price)
                .build();
    }

//    public ProductSaveRequestDto toDto(Product product) {
//        return ProductSaveRequestDto.builder()
//                .title(product.getTitle())
//                .contents(product.getContents())
//                .price(product.getPrice())
//                .build();
//    }
}
