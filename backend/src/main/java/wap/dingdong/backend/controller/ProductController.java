package wap.dingdong.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import wap.dingdong.backend.domain.User;
import wap.dingdong.backend.payload.request.ProductCreateRequest;
import wap.dingdong.backend.payload.response.ProductInfoResponse;
import wap.dingdong.backend.payload.response.ProductResponse;
import wap.dingdong.backend.payload.response.ProductDetailResponse;
import wap.dingdong.backend.payload.response.ProductsResponse;
import wap.dingdong.backend.security.CurrentUser;
import wap.dingdong.backend.security.UserPrincipal;
import wap.dingdong.backend.service.ProductService;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
public class ProductController {

    private final ProductService productService;

    //상품 등록
    @PostMapping("/product")
    public ResponseEntity<?> createProduct(@CurrentUser UserPrincipal userPrincipal, //User 와 요청 DTO 를 별개로 취급
                                           @RequestBody ProductCreateRequest request) {
        productService.save(userPrincipal, request);
        return new ResponseEntity<>(HttpStatus.OK);
    }

//    // 상품 상세보기
//    //@GetMapping("/product/{productId}")
//    public ResponseEntity<ProductResponse> getProductByProductId(@PathVariable Long productId) {
//        ProductResponse productResponse = productService.getProduct(productId);
//        return ResponseEntity.ok(productResponse);
//    }

    //상품 상세보기
    @GetMapping("/product/{productId}")
    public ResponseEntity<?> getBookDetails(@PathVariable Long productId) {
        ProductDetailResponse response = productService.getProductDetails(productId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 전체 상품 조회
    //ProductInfoResponse는 하나의 개별 상품의 정보를 담는 DTO (상품상세 DTO와 비슷)
    //ProductsResponse는 전체 상품 목록을 담는 DTO,
    // 여러 개의 ProductInfoResponse 객체를 리스트 형태로 가짐
    @GetMapping("/product/list")
    public ResponseEntity<?> findAllProducts() {
        List<ProductInfoResponse> products = productService.getAllProducts();
        ProductsResponse response = new ProductsResponse(products);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    //전체 상품 조회 (페이지네이션)
    // ex) page=1 을보내면  최신순으로 첫번째 에서 8번째까지 상품 목록을 리스트로 반환함 , page=2 는 9번째부터 16번째
    @GetMapping("/product/list/recent")
    public ResponseEntity<?> findRecentUserBooks(@RequestParam int page) {
        int size = 8; // 페이지 당 상품의 수
        List<ProductInfoResponse> responses = productService.getRecentPaginatedProducts(page, size);
        ProductsResponse response = new ProductsResponse(responses);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 상품 상태 변경하기 기능
    @PostMapping("/product/{productId}/status")
    public ResponseEntity<ProductResponse> changeStatus(@PathVariable Long productId,
                                                       @CurrentUser UserPrincipal userPrincipal) {
        ProductResponse changedStatus = productService.changeStatus(productId, userPrincipal);
        return ResponseEntity.ok(changedStatus);
    }

    // 상품 찜하기
    @PostMapping("/product/{productId}/like")
    public ResponseEntity<?> likeProduct(@PathVariable Long productId, @CurrentUser UserPrincipal currentUser) {
        productService.likeProduct(productId, currentUser);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 찜한 상품 목록 조회
    @GetMapping("/mypage/liked")
    public ResponseEntity<?> getLikedProducts(@CurrentUser UserPrincipal currentUser) {
        List<ProductInfoResponse> likedProducts = productService.getLikedProducts(currentUser)
                .stream()
                .map(ProductInfoResponse::of)
                .collect(Collectors.toList());

        ProductsResponse response = new ProductsResponse(likedProducts);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}