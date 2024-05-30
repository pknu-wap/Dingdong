package wap.dingdong.backend.payload;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ImageDto {
    @Column(columnDefinition = "LONGTEXT")
    private String image;
}