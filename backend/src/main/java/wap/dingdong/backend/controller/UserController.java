package wap.dingdong.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import wap.dingdong.backend.exception.ResourceNotFoundException;
import wap.dingdong.backend.domain.User;
import wap.dingdong.backend.repository.UserRepository;
import wap.dingdong.backend.security.CurrentUser;
import wap.dingdong.backend.security.UserPrincipal;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;

    @GetMapping("/user/me") //@CurrentUser : 프론트에서 주는 토큰을 가지고 객체를 만들어줌
    public User getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {

        return userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));
    }
}
