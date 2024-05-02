package wap.dingdong.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import wap.dingdong.backend.payload.request.ProductCreateRequest;
import wap.dingdong.backend.service.ProductService;

@RequiredArgsConstructor
@RestController
public class ProductController {

    private final ProductService productService;

    @PostMapping("/product")
    public void registerProduct(@RequestBody ProductCreateRequest request) {
        productService.save(request);

    }

}
