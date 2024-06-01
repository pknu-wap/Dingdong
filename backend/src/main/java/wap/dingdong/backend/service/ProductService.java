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
import wap.dingdong.backend.payload.response.ProductResponse;
import wap.dingdong.backend.payload.response.ProductDetailResponse;
import wap.dingdong.backend.payload.response.ProductsResponse;
import wap.dingdong.backend.repository.CommentRepository;
import wap.dingdong.backend.repository.ProductRepository;
import wap.dingdong.backend.repository.UserRepository;
import wap.dingdong.backend.repository.WishRepository;
import wap.dingdong.backend.security.UserPrincipal;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final WishRepository wishRepository;
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

        // 양방향 연관관계 데이터 일관성 유지 : 연관관계의 주인이 아닌쪽의 엔티티가 변경되었을때 연관관계의 주인의 엔티티도 set
        locations.forEach(location -> location.updateProduct(product));
        images.forEach(image -> image.updateProduct(product));

        productRepository.save(product);
    }



    //모든 책 리스트 가져오기 (페이지네이션 X)
    public List<ProductInfoResponse> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return ProductsResponse.of(products); //응답 데이터를 던져야 함으로 DTO 로 변환
    }

    // 페이지네이션 된 책 리스트 가져오기
    public List<ProductInfoResponse> getRecentPaginatedProducts(int page, int size) {
        int offset = (page - 1) * size;
        List<Product> products = productRepository.findAllByOrderByIdDesc()
                .stream()
                .skip(offset) //offset 만큼 건너뜀
                .limit(size) //size 만큼 가져옴
                .collect(Collectors.toList());
        return ProductsResponse.of(products);
    }

//    /* ------------- id값에 해당하는 상품 불러오기 -------------- */
//    public ProductResponse getProduct(Long id) {
//        Product product = productRepository.findById(id)
//                .orElseThrow(() -> new ResourceNotFoundException("Product", "id", id));
//        return new ProductResponse(product);
//    }



    // 댓글 조회
//    public List<CommentResponse> getAllCommentsForBoard(Long id) {
//        Product product = productRepository.findById(id)
//                .orElseThrow(() -> new ResourceNotFoundException("Product", "id", id));
//
//        List<CommentResponse> responseDtoList = new ArrayList<>();
//        for (Comment comment : product.getComments()) {
//            CommentResponse responseDto = new CommentResponse(comment);
//            responseDtoList.add(responseDto);
//        }
//    }



/*
    상품 상세 조회
 */
    public ProductDetailResponse getProductDetails(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        return ProductDetailResponse.of(product);
    }

    /* ------------- 상품 상태 변경하기  ------------- */
    // status = 0 : 판매중, status = 1 : 판매완료

    public ProductResponse changeStatus(Long id, UserPrincipal userPrincipal) {
        User user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("게시글을 찾을 수 없습니다."));

        if (product.getStatus() == 1) {
            product.changeToOnsale(user.getId()); // status 값 -1
        } else {
            product.changeToSoldout(user.getId()); // status 값 +1
        }

        Product changedStatus = productRepository.save(product);
        return ProductResponse.of(changedStatus);
    }

    /* ------------- 상품 찜하기  ------------- */
    @Transactional
    public void likeProduct(Long productId, UserPrincipal currentUser) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        User user = userRepository.findById(currentUser.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Wish wish = wishRepository.findByProductAndUser(product, user)
                .orElse(new Wish(product, user));

        if (wish.getLiked() == 0) {
            wish.setLiked(1);
            product.increaseLiked();
        } else {
            wish.setLiked(0);
            product.decreaseLiked();
        }

        wishRepository.save(wish);
        productRepository.save(product);
    }

    @Transactional
    public List<Product> getLikedProducts(UserPrincipal currentUser) {
        User user = userRepository.findById(currentUser.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Wish> wishes = wishRepository.findByUserAndLiked(user, 1);
        return wishes.stream()
                .map(Wish::getProduct)
                .collect(Collectors.toList());
    }

}



