package wap.dingdong.backend.payload.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import wap.dingdong.backend.domain.Comment;
import wap.dingdong.backend.domain.User;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CommentRequest {
    private String cmtContent;
//    private String userName;

    // Dto -> Entity
    public Comment toEntity() {
        Comment comment = Comment.builder()
                .cmtContent(cmtContent)
                .build();

        return comment;
    }
}
