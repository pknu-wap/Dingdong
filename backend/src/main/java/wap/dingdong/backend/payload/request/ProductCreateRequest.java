package wap.dingdong.backend.payload.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;
import wap.dingdong.backend.payload.ImageDto;
import wap.dingdong.backend.payload.LocationDto;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductCreateRequest {

    private String title;
    private Long price;
    private String contents;
    private List<LocationDto> locations;
    private List<ImageDto> images;
    private List<MultipartFile> imageFiles;


    public ProductCreateRequest(List<ImageDto> imageDtos) {
        this.images = imageDtos;
    }
}
