package wap.dingdong.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import wap.dingdong.backend.payload.request.ProductCreateRequest;
import wap.dingdong.backend.payload.response.ProductInfoResponse;
import wap.dingdong.backend.payload.response.ProductDetailResponse;
import wap.dingdong.backend.payload.response.ProductsResponse;
import wap.dingdong.backend.security.CurrentUser;
import wap.dingdong.backend.security.UserPrincipal;
import wap.dingdong.backend.service.ProductService;

import java.util.List;

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

    //상품 상세보기
    @GetMapping("/product/{productId}")
    public ResponseEntity<?> getBookDetails(@PathVariable Long productId) {
        ProductDetailResponse response = productService.getProductDetails(productId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }



}