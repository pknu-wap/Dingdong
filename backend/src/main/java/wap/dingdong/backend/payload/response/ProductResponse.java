package wap.dingdong.backend.payload.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import wap.dingdong.backend.domain.Product;

import java.sql.Timestamp;
import java.util.List;

@Getter
@AllArgsConstructor
public class ProductResponse {

    private Long id;
    private String title;
    private String contents;

    private Long user_id;
    private String user_email;

    private Timestamp productRegDate;
    private Integer productLike;
    private List<CommentResponse> comment;

    /* Entity -> Dto*/
    public ProductResponse(Product product) {
        this.id = product.getId();
        this.title = product.getTitle();
        this.contents = product.getContents();
        this.user_id = product.getUser().getId();
        this.user_email = product.getUser().getEmail();
        this.productRegDate = product.getProductRegDate();
        this.productLike = product.getProductLike();
    }
}
