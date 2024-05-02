package wap.dingdong.backend.repository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import wap.dingdong.backend.domain.Product;
import wap.dingdong.backend.repository.ProductRepository;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class ProductRepositoryTest {

    @Autowired
    private ProductRepository productRepository;
    @BeforeEach
    public void setUp() {
        productRepository.deleteAll();
    }
    @Test
    public void saveProductAndFindById() {
        // given
        Product product = Product.builder()
                .title("테스트 게시글")
                .contents("테스트 본문")
                .price(1000L)
                .build();

        // when
        Product savedProduct = productRepository.save(product);

        // then
        Product foundProduct = productRepository.findById(savedProduct.getId()).orElse(null);
        assertThat(foundProduct).isNotNull();
        assertThat(foundProduct.getTitle()).isEqualTo(product.getTitle());
        assertThat(foundProduct.getContents()).isEqualTo(product.getContents());
        assertThat(foundProduct.getPrice()).isEqualTo(product.getPrice());
    }

    @Test
    public void findAllProducts() {
        // given
        Product product1 = Product.builder()
                .title("테스트 게시글1")
                .contents("테스트 본문1")
                .price(1000L)
                .build();
        Product product2 = Product.builder()
                .title("테스트 게시글2")
                .contents("테스트 본문2")
                .price(2000L)
                .build();
        productRepository.save(product1);
        productRepository.save(product2);

        // when
        List<Product> products = productRepository.findAll();

        // then
        assertThat(products).hasSize(2);
        assertThat(products).extracting(Product::getTitle).containsExactlyInAnyOrder("테스트 게시글1", "테스트 게시글2");
        assertThat(products).extracting(Product::getContents).containsExactlyInAnyOrder("테스트 본문1", "테스트 본문2");
        assertThat(products).extracting(Product::getPrice).containsExactlyInAnyOrder(1000L, 2000L);
    }
}
