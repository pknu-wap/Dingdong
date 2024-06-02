package wap.dingdong.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import wap.dingdong.backend.domain.Product;
import wap.dingdong.backend.domain.User;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product,Long> {
    List<Product> findAllByOrderByIdDesc();

    List<Product> findByUser(User user);
}
