package wap.dingdong.backend.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ProductUpdateRequestDto {

    private String title;
    private String contents;

    @Builder
    public ProductUpdateRequestDto(String title, String contents){
        this.title = title;
        this.contents = contents;
    }
}
