package wap.dingdong.backend.payload.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductCreateRequest {

    private String title;
    private Long price;
    private String contents;
    private List<String> locations;
    private List<String> images;

}
