package wap.dingdong.backend.service;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import wap.dingdong.backend.domain.Image;
import wap.dingdong.backend.domain.Location;
import wap.dingdong.backend.domain.Product;
import wap.dingdong.backend.payload.request.ProductCreateRequest;
import wap.dingdong.backend.repository.ProductRepository;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    @Transactional
    public void save(ProductCreateRequest request) {
        // 도메인객체를 생성 후 요청 DTO를 이용하여 상품 엔티티 생성
        Product product = new Product();

        product.setTitle(request.getTitle());
        product.setPrice(request.getPrice());
        product.setContents(request.getContents());

        // ProductLocationDTO와 ImageDTO는 별도의 DTO 객체이므로 각각의 필드 값을 가져와서 새로운 List에 복사해야함
        // 새로운 List를 생성하여 값을 복사하는 방식으로

        // 지역 정보 추가
        for (String location : request.getLocations()) {
            Location loc = new Location();
            loc.setLocation(location);
            loc.setProduct(product);
            product.getLocations().add(loc);
        }

        // 이미지 정보 추가
        for (String imageUrl : request.getImages()) {
            Image image = new Image();
            image.setImageUrl(imageUrl);
            image.setProduct(product);
            product.getImages().add(image);
        }

        // 상품 저장
        productRepository.save(product);
    }
}
