package wap.dingdong.backend.service;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import wap.dingdong.backend.domain.Image;
import wap.dingdong.backend.domain.Location;
import wap.dingdong.backend.domain.Product;
import wap.dingdong.backend.payload.request.ProductCreateRequest;
import wap.dingdong.backend.payload.response.ProductInfoResponse;
import wap.dingdong.backend.repository.ProductRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

/*
    상품 등록
 */
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

//===========================================================================================

/*
    모든 상품 조회 (메인페이지 상품 목록)
 */

//ProductInfoResponse는 하나의 개별 상품의 정보를 담는 DTO (상품상세 DTO와 비슷)
//ProductsResponse는 전체 상품 목록을 담는 DTO,
// 여러 개의 ProductInfoResponse 객체를 리스트 형태로 가짐

    public List<ProductInfoResponse> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return ProductMapper.toProductInfoResponseList(products);
    }

    public static class ProductMapper {

        public static ProductInfoResponse toProductInfoResponse(Product product) {
            ProductInfoResponse response = new ProductInfoResponse();
            response.setProductId(product.getId());
            response.setTitle(product.getTitle());
            response.setPrice(product.getPrice());
            response.setContents(product.getContents());
            response.setLocations(product.getLocations().stream()
                    .map(Location::getLocation)
                    .collect(Collectors.toList()));
            response.setImages(product.getImages().stream()
                    .map(Image::getImageUrl)
                    .collect(Collectors.toList()));
            response.setProductLike(product.getProductLike().name());
            response.setCreatedAt(product.getCreatedAt().toString()); // 형식에 맞게 수정 필요
            return response;
        }

        public static List<ProductInfoResponse> toProductInfoResponseList(List<Product> products) {
            return products.stream()
                    .map(ProductMapper::toProductInfoResponse)
                    .collect(Collectors.toList());
        }

//======================================================================================================

    }
}
