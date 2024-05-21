package wap.dingdong.backend.payload.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import wap.dingdong.backend.domain.Product;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ProductsResponse{

    private List<ProductInfoResponse> productsResponse;

    //리스트를 반환해야 함으로 상품 리스트의 각 요소들을 ProductInfoResponse.of 메서드의 매개변수에 넣어 변환하고 리스트로 만듬
    public static List<ProductInfoResponse> of(List<Product> products) {
        return products.stream()
                .map(ProductInfoResponse::of)
                .collect(Collectors.toList());
    }

}


