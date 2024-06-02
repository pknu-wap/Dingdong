package wap.dingdong.backend.payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor @AllArgsConstructor
public class CommentDto {
    private Long cmtId;
    private Long userId;
    private String userName;
    private String cmtContent;
    private LocalDateTime cmtRegDate;

}
