package wap.dingdong.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import wap.dingdong.backend.domain.Product;
import wap.dingdong.backend.dto.ProductResponseDto;
import wap.dingdong.backend.dto.ProductSaveRequestDto;
import wap.dingdong.backend.dto.ProductUpdateRequestDto;
import wap.dingdong.backend.service.ProductService;

import java.util.List;

@RequiredArgsConstructor
@Controller
public class ProductController {

    private final ProductService productService;

    // 게시글 저장, id return
    @PostMapping("/api/v1/posts")
    public Long save(@RequestBody ProductSaveRequestDto requestDto) {
        return productService.save(requestDto);
    }

    //게시글 수정
    @PutMapping("/api/v1/posts/{id}")
    public Long update(@PathVariable Long id, @RequestBody ProductUpdateRequestDto requestDto){
        return productService.update(id, requestDto);
    }

    //게시글 조회
    @GetMapping("/api/v1/posts/{id}")
    public ProductResponseDto findById(@PathVariable Long id) {
        return productService.findById(id);
    }
}
