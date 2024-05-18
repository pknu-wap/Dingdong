package wap.dingdong.backend.controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping("/demo/hello")
    public String HelloWorld(){
        return "스프링 리액트 연동 테스트 \n";
    }
}