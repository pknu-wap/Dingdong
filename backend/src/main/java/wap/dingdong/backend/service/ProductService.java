package wap.dingdong.backend.service;


import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import wap.dingdong.backend.domain.*;
import wap.dingdong.backend.exception.ResourceNotFoundException;
import wap.dingdong.backend.payload.request.CommentRequest;
import wap.dingdong.backend.payload.request.ProductCreateRequest;
import wap.dingdong.backend.payload.response.CommentResponse;
import wap.dingdong.backend.payload.response.ProductInfoResponse;
import wap.dingdong.backend.payload.response.ProductsResponse;
import wap.dingdong.backend.repository.CommentRepository;
import wap.dingdong.backend.repository.ProductRepository;
import wap.dingdong.backend.repository.UserRepository;
import wap.dingdong.backend.security.UserPrincipal;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    @Autowired
    private CommentRepository commentRepository;

    /*
      상품 등록
   */
    @Transactional
    public void save(UserPrincipal userPrincipal, ProductCreateRequest request) {

        //요청토큰에 해당하는 user 를 꺼내옴
        User user = userRepository.findById(userPrincipal.getId()).get();

        //locationDto 를 location 엔티티객체로 변환 (DB 사용을 위해)
        List<Location> locations = request.getLocations().stream()
                .map(locationDto -> new Location(locationDto.getLocation()))
                .collect(Collectors.toList());

        List<Image> images = request.getImages().stream()
                .map(imageDto -> new Image(imageDto.getImage()))
                .collect(Collectors.toList());

        Product product = new Product(user, request.getTitle(), request.getPrice(),
                request.getContents(), locations, images);

        // 양방향 연관관계 데이터 일관성 유지
        locations.forEach(location -> location.updateProduct(product));
        images.forEach(image -> image.updateProduct(product));

        productRepository.save(product);
    }

//===========================================================================================

/*
    모든 상품 조회 (메인페이지 상품 목록)
 */

    public List<ProductInfoResponse> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return ProductsResponse.of(products); //응답 데이터를 던져야 함으로 DTO 로 변환
    }


    /* ------------- 댓글 -------------- */

    // 댓글 작성
    public CommentResponse createComment(Long productId, CommentRequest commentDto) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "id", productId));

        Comment comment = commentDto.toEntity();
        comment.setProduct(product);

        Comment savedComment = commentRepository.save(comment);
        CommentResponse responseDto = new CommentResponse(savedComment);
        return responseDto;
    }

    // 댓글 조회
    public List<CommentResponse> getAllCommentsForBoard(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "id", productId));

        List<CommentResponse> responseDtoList = new ArrayList<>();
        for (Comment comment : product.getComments()) {
            CommentResponse responseDto = new CommentResponse(comment);
            responseDtoList.add(responseDto);
        }

        return responseDtoList;
    }

}
