package wap.dingdong.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import wap.dingdong.backend.exception.ResourceNotFoundException;
import wap.dingdong.backend.model.User;
import wap.dingdong.backend.repository.UserRepository;
import wap.dingdong.backend.security.CurrentUser;
import wap.dingdong.backend.security.UserPrincipal;

@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/user/me") //
    public User getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {

        return userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));
    }
}
