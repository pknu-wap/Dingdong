package wap.dingdong.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import wap.dingdong.backend.payload.response.ProductInfoResponse;
import wap.dingdong.backend.payload.response.ProductsResponse;
import wap.dingdong.backend.security.CurrentUser;
import wap.dingdong.backend.security.UserPrincipal;
import wap.dingdong.backend.service.MyPageService;
import wap.dingdong.backend.service.ProductService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class MyPageController {

    private final MyPageService myPageService;

    // 찜한 상품 목록 조회
    @GetMapping("/myPage/likes")
    public ResponseEntity<?> getLikedProducts(@CurrentUser UserPrincipal currentUser) {
        List<ProductInfoResponse> likedProducts = myPageService.getLikedProducts(currentUser)
                .stream()
                .map(ProductInfoResponse::of)
                .collect(Collectors.toList());

        ProductsResponse response = new ProductsResponse(likedProducts);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 판매 상품 조회
    @GetMapping("/myPage/products")
    public ResponseEntity<?> getMyUploadedProducts(@CurrentUser UserPrincipal currentUser) {
        List<ProductInfoResponse> uploadedProducts = myPageService.getUploadedProducts(currentUser);
        ProductsResponse response = new ProductsResponse(uploadedProducts);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
