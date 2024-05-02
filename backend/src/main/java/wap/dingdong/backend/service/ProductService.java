package wap.dingdong.backend.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import wap.dingdong.backend.domain.Product;
import wap.dingdong.backend.dto.ProductResponseDto;
import wap.dingdong.backend.dto.ProductSaveRequestDto;
import wap.dingdong.backend.dto.ProductUpdateRequestDto;
import wap.dingdong.backend.repository.ProductRepository;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ProductService {
    private ProductRepository productRepository;

    @Transactional
    public Long save(ProductSaveRequestDto requestDto) {
        return productRepository.save(requestDto.toEntity()).getId();
    }

    @Transactional
    public Long update(Long id, ProductUpdateRequestDto requestDto){
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. id="+id));
        product.update(requestDto.getTitle(), requestDto.getContents());
        return id;
    }
    @Transactional
    public ProductResponseDto findById (Long id) {
        Product entity = productRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다 id =" +id));
        return new ProductResponseDto(entity);
    }
}
