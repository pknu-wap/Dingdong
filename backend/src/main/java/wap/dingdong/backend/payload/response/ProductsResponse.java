package wap.dingdong.backend.payload.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import wap.dingdong.backend.domain.Product;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor
public class ProductsResponse{

    private List<ProductInfoResponse> productsResponse;
    private int pageCount;

    public ProductsResponse(List<ProductInfoResponse> productsResponse) {
        this.productsResponse = productsResponse;
    }

    public ProductsResponse(List<ProductInfoResponse> productsResponse, int pageCount) {
        if (pageCount % 8 != 0) {
            this.pageCount = (pageCount / 8) + 1;
        } else {
            this.pageCount = pageCount / 8;
        }
        this.productsResponse = productsResponse;

    }
}