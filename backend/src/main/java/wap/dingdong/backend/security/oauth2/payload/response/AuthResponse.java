package wap.dingdong.backend.security.oauth2.payload.response;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class AuthResponse {
    private String accessToken;
    private String tokenType = "Bearer";

    public AuthResponse(String accessToken) {
        this.accessToken = accessToken;
    }
}
