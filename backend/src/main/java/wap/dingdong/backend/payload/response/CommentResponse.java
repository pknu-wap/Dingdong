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
    private LocalDateTime cmtRegDate;
    private Long userId;
    private Long productId;

    // Entity -> Dto
    public CommentResponse(Comment comment) {
        this.cmtId = comment.getCmtId();
        this.cmtContent = comment.getCmtContent();
        this.cmtRegDate = comment.getCmtRegDate();
        this.userId = comment.getUser().getId();
        this.productId = comment.getProduct().getId();
    }
}
