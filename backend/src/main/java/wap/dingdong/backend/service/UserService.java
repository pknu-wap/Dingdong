package wap.dingdong.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import wap.dingdong.backend.domain.User;
import wap.dingdong.backend.exception.ResourceNotFoundException;
import wap.dingdong.backend.payload.response.UserResponse;
import wap.dingdong.backend.repository.UserRepository;
import wap.dingdong.backend.security.UserPrincipal;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    //유저 정보 조회
    public UserResponse getUserDetail(UserPrincipal userPrincipal) {
        User user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));

        return UserResponse.of(user);
    }


}
