package wap.dingdong.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import wap.dingdong.backend.payload.request.CommentRequest;
import wap.dingdong.backend.payload.response.CommentResponse;
import wap.dingdong.backend.service.ProductService;

@RequiredArgsConstructor
@RestController
public class CommentController {

    @Autowired
    private ProductService productService;

    // 댓글 생성
    @PostMapping("/product/{productId}/comment")
    public ResponseEntity<CommentResponse> createComment(
            @PathVariable Long productId, @RequestBody CommentRequest commentDto) {
        CommentResponse createdComment = productService.createComment(productId, commentDto);
        return ResponseEntity.ok(createdComment);
    }
}
