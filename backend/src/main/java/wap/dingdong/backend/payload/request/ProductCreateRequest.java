package wap.dingdong.backend.payload.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import wap.dingdong.backend.domain.Product;
import wap.dingdong.backend.payload.ImageDto;
import wap.dingdong.backend.payload.LocationDto;
import wap.dingdong.backend.security.UserPrincipal;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ProductCreateRequest {

    private String title;
    private Long price;
    private String contents;
    private List<LocationDto> locations;
    private List<ImageDto> images;


}
