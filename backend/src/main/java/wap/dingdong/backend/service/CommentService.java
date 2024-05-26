package wap.dingdong.backend.service;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import wap.dingdong.backend.domain.Comment;
import wap.dingdong.backend.domain.Product;
import wap.dingdong.backend.domain.User;
import wap.dingdong.backend.exception.ResourceNotFoundException;
import wap.dingdong.backend.payload.request.CommentRequest;
import wap.dingdong.backend.payload.response.CommentResponse;
import wap.dingdong.backend.repository.CommentRepository;
import wap.dingdong.backend.repository.ProductRepository;
import wap.dingdong.backend.repository.UserRepository;
import wap.dingdong.backend.security.UserPrincipal;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final ProductRepository productRepository;
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;

    // 댓글 작성
    @Transactional
    public CommentResponse createComment(Long productId, CommentRequest commentDto, UserPrincipal userPrincipal) {
        User user = userRepository.findById(userPrincipal.getId()).get();

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "id", productId));

        //이미 등록된 상품에 새 댓글을 등록할때는 댓글엔티티의 상품 FK만 적절히 넣으면됨
        Comment comment = new Comment(commentDto.getCmtContent(), user);
        comment.setProduct(product);

        Comment savedComment = commentRepository.save(comment);
        CommentResponse responseDto = new CommentResponse(savedComment);
        return responseDto;
    }

//    // 댓글 조회 ( 상품 상세 조회가 댓글 조회이므로 제외)
//    public List<CommentResponse> getAllCommentsForBoard(Long productId) {
//        Product product = productRepository.findById(productId)
//                .orElseThrow(() -> new ResourceNotFoundException("Product", "id", productId));
//
//        List<CommentResponse> responseDtoList = new ArrayList<>();
//        for (Comment comment : product.getComments()) {
//            CommentResponse responseDto = new CommentResponse(comment);
//            responseDtoList.add(responseDto);
//        }
//
//        return responseDtoList;
//    }
}
