package wap.dingdong.backend.payload.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter
public class ProductInfoResponse {

    private Long productId;
    private String title;
    private Long price;
    private String contents;
    private List<String> locations;
    private List<String> images;
    private String productLike;
    private String createdAt;
}
