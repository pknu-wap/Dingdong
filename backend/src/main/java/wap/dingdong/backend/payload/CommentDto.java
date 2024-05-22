package wap.dingdong.backend.payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor @AllArgsConstructor
public class CommentDto {
    private Long cmtId;
    private Long userId;
    private String email;
    private String cmtContent;


}
