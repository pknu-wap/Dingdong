package wap.dingdong.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import wap.dingdong.backend.domain.Product;
import wap.dingdong.backend.domain.User;
import wap.dingdong.backend.domain.Wish;
import wap.dingdong.backend.payload.response.ProductInfoResponse;
import wap.dingdong.backend.repository.ProductRepository;
import wap.dingdong.backend.repository.UserRepository;
import wap.dingdong.backend.repository.WishRepository;
import wap.dingdong.backend.security.UserPrincipal;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MyPageService {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final WishRepository wishRepository;

    //찜목록 가져오기
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
