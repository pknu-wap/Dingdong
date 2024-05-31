package wap.dingdong.backend.payload.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import wap.dingdong.backend.payload.LocationDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ProductCreateRequest {
    private String title;
    private Long price;
    private String contents;
    private List<LocationDto> locations;
    private List<MultipartFile> images; // 이미지 데이터를 MultipartFile 타입으로 수정
}
