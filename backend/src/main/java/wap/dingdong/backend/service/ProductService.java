package wap.dingdong.backend.service;


import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import wap.dingdong.backend.config.S3Config;
import wap.dingdong.backend.domain.*;
import wap.dingdong.backend.exception.ResourceNotFoundException;
import wap.dingdong.backend.payload.ImageDto;
import wap.dingdong.backend.payload.request.CommentRequest;
import wap.dingdong.backend.payload.request.ProductCreateRequest;
import wap.dingdong.backend.payload.request.ProductUpdateRequest;
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
import wap.dingdong.backend.util.AwsUtils;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final WishRepository wishRepository;
    private final AwsUtils awsUtils;

    /*
      상품 등록
   */
    @Transactional
    public void save(UserPrincipal userPrincipal, ProductCreateRequest request) throws IOException {
        User user = userRepository.findById(userPrincipal.getId()).orElseThrow(() -> new IllegalArgumentException("Invalid user Id"));
        List<String> imageUrls = awsUtils.uploadImagesToS3(request.getImageFiles());
        Product product = Product.createProduct(user, request, imageUrls);
        productRepository.save(product);
    }

    //모든 상품 리스트 가져오기 (페이지네이션 X)
    public List<ProductInfoResponse> getAllProducts() {
        return productRepository.findAll()
                .stream()
                .map(ProductInfoResponse::of)
                .collect(Collectors.toList()); //응답 데이터를 던져야 함으로 DTO 로 변환
    }

    // 페이지네이션 된 상품 리스트 가져오기
    public List<ProductInfoResponse> getRecentPaginatedProducts(int page, int size) {
        int offset = (page - 1) * size;
        List<Product> products = productRepository.findAllByOrderByIdDesc();
        return products.stream()
                .skip(offset)
                .limit(size)
                .map(ProductInfoResponse::of)
                .collect(Collectors.toList());
    }

    //상품 이름으로 검색 (페이지네이션)
    public List<ProductInfoResponse> searchProductsByName(String name, int page, int size) {
        int offset = (page - 1) * size;
        List<Product> products = productRepository.searchAllProductsByName(name);
        return products.stream()
                .skip(offset)
                .limit(size)
                .map(ProductInfoResponse::of)
                .collect(Collectors.toList());
    }

    //상품 지역2개로 검색 (페이지네이션)
    public List<ProductInfoResponse> searchProductsByTwoRegion(String name, String location1, String location2, int page, int size) {
        int offset = (page - 1) * size;
        List<Product> products = productRepository.searchAllProductsByTwoRegion(location1, location2, name);
        return products.stream()
                .skip(offset)
                .limit(size)
                .map(ProductInfoResponse::of)
                .collect(Collectors.toList());
    }

    //상품 지역1개로 검색 (페이지네이션)
    public List<ProductInfoResponse> searchProductsByOneRegion(String name, String location1, int page, int size) {
        int offset = (page - 1) * size;
        List<Product> products = productRepository.searchAllProductsByOneRegion(location1, name);
        return products.stream()
                .skip(offset)
                .limit(size)
                .map(ProductInfoResponse::of)
                .collect(Collectors.toList());
    }

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

    //상품 수정
    @Transactional
    public void update(Long productId, UserPrincipal userPrincipal, ProductUpdateRequest request) throws IOException {
        User user = userRepository.findById(userPrincipal.getId()).orElseThrow(() -> new IllegalArgumentException("Invalid user Id"));
        List<String> imageUrls = awsUtils.uploadImagesToS3(request.getImageFiles());

        //현재 로그인된 유저가 작성한 특정(PathParameter)상품을 가져옴 : 자신이 작성한 상품이 아니면 가져올 수 없음
        Product product = productRepository.findByProductIdAndUser(productId, user.getId());

        product.updateProduct(request, imageUrls);
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


    /* ------------- 내가 등록한 상품 목록 불러오기  ------------- */
    @Transactional
    public List<ProductInfoResponse> getUploadedProducts(UserPrincipal currentUser) {
        User user = userRepository.findById(currentUser.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Product> products = productRepository.findByUser(user);
        return products.stream()
                .map(ProductInfoResponse::of)
                .collect(Collectors.toList());
    }
}



