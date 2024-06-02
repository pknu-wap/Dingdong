package wap.dingdong.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import wap.dingdong.backend.domain.User;
import wap.dingdong.backend.payload.request.CommentRequest;
import wap.dingdong.backend.payload.response.CommentResponse;
import wap.dingdong.backend.security.CurrentUser;
import wap.dingdong.backend.security.UserPrincipal;
import wap.dingdong.backend.service.CommentService;
import wap.dingdong.backend.service.ProductService;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class CommentController {

    private final CommentService commentService;

    // 댓글 생성
    @PostMapping("/product/{productId}/comment")
    public ResponseEntity<CommentResponse> createComment(
            @PathVariable Long productId, @RequestBody CommentRequest commentDto,
            @CurrentUser UserPrincipal userPrincipal) {
        CommentResponse createdComment = commentService.createComment(productId, commentDto, userPrincipal);
        return ResponseEntity.ok(createdComment);
    }
}
