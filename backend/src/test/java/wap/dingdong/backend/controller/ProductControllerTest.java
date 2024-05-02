package wap.dingdong.backend.controller;

import org.aspectj.lang.annotation.After;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import wap.dingdong.backend.domain.Product;
import wap.dingdong.backend.dto.ProductSaveRequestDto;
import wap.dingdong.backend.repository.ProductRepository;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class ProductControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private ProductRepository productRepository;

    // 각 테스트 메소드 실행 후에 실행되는 메소드
    @AfterEach
    public void tearDown() {
        productRepository.deleteAll();
    }

    //게시글 저장 테스트
    @Test
    public void Posts_등록된다() throws Exception {
        //given
        String title = "게시글";
        String contents = "본문";

        ProductSaveRequestDto requestDto = ProductSaveRequestDto.builder()
                .title(title)
                .contents(contents)
                .price(1000L)
                .build();

        //PostsApiController 에 게시글 저장 url을 설정
        String url = "http://localhost:"+port+"/api/v1/posts";

        //when
        //ResponseEntity 를 이용해서 해당url 에 requestDto로 게시글저장 실행
        ResponseEntity<Long> responseEntity = restTemplate.postForEntity(url, requestDto, Long.class);

        //then
        //요청응답 status 정상확인

        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
        //저장후 키값이 정상리턴되었는지 확인
        assertThat(responseEntity.getBody()).isGreaterThan(0L);


//게시글전체 조회
        List<Product> all = productRepository.findAll();
        //게시글 첫번재row의 데이터가 정상인지 확인
        assertThat(all.get(0).getTitle()).isEqualTo(title);
        assertThat(all.get(0).getContents()).isEqualTo(contents);
    }
}