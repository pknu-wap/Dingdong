package wap.dingdong.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import wap.dingdong.backend.exception.ResourceNotFoundException;
import wap.dingdong.backend.domain.User;
import wap.dingdong.backend.payload.response.UserResponse;
import wap.dingdong.backend.repository.UserRepository;
import wap.dingdong.backend.security.CurrentUser;
import wap.dingdong.backend.security.UserPrincipal;
import wap.dingdong.backend.service.UserService;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    //자신의 회원 정보를 리턴
    @GetMapping("/user/me") //@CurrentUser : 프론트에서 주는 토큰을 가지고 객체를 만들어줌
    public ResponseEntity<?> findUserDetail(@CurrentUser UserPrincipal userPrincipal) {
        UserResponse response = userService.getUserDetail(userPrincipal);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}