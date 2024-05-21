package wap.dingdong.backend.payload.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import wap.dingdong.backend.domain.Comment;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class CommentResponse {
    private Long cmtId;
    private String cmtContent;
    private Timestamp cmtRegDate = Timestamp.valueOf(LocalDateTime.now());
//    private String userName;
    private Long productId;
    private String title; // 상품 이름

    // Entity -> Dto
    public CommentResponse(Comment comment) {
        this.cmtId = comment.getCmtId();
        this.cmtContent = comment.getCmtContent();
        this.cmtRegDate = comment.getCmtRegDate();
        this.productId = comment.getProduct().getProductId();
        this.title = comment.getProduct().getTitle();
    }
}
