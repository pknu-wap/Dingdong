package wap.dingdong.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import wap.dingdong.backend.payload.request.CommentRequest;
import wap.dingdong.backend.payload.response.CommentResponse;
import wap.dingdong.backend.service.ProductService;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class CommentController {

    @Autowired
    private ProductService productService;

    // 댓글 조회
    @GetMapping("/product/{productId}/comment")
    public ResponseEntity<List<CommentResponse>> getAllCommentsForBoard(@PathVariable Long productId) {
        List<CommentResponse> comments = productService.getAllCommentsForBoard(productId);
        return ResponseEntity.ok(comments);
    }
    // 댓글 생성
    @PostMapping("/product/{productId}/comment")
    public ResponseEntity<CommentResponse> createComment(
            @PathVariable Long productId, @RequestBody CommentRequest commentDto) {
        CommentResponse createdComment = productService.createComment(productId, commentDto);
        return ResponseEntity.ok(createdComment);
    }
}
