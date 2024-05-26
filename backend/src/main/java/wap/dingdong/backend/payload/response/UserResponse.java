package wap.dingdong.backend.payload.response;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import wap.dingdong.backend.domain.User;

@Getter
@AllArgsConstructor @NoArgsConstructor
public class UserResponse {
    private Long id;
    private String name;
    private String email;
    private String imageUrl;



    public static UserResponse of(User user) {
        return new UserResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getImageUrl()
        );
    }

}
