package wap.dingdong.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import wap.dingdong.backend.domain.Product;
import wap.dingdong.backend.domain.User;
import wap.dingdong.backend.domain.Wish;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product,Long> {
    List<Product> findAllByOrderByIdDesc();

    List<Product> findByUser(User user);

    @Query("SELECT p FROM Product p WHERE p.id = :productId AND p.user.id = :userId")
    Product findByProductIdAndUser(@Param("productId") Long productId, @Param("userId") Long userId);

    @Query("SELECT p FROM Product p WHERE lower(p.title) like lower(concat('%', :name, '%')) ORDER BY p.id DESC")
    List<Product> searchAllProductsByName(@Param("name") String name);

    @Query("SELECT p FROM Product p JOIN p.locations l WHERE (l.location LIKE :location1 OR l.location LIKE :location2) AND (lower(p.title) like lower(concat('%', :name, '%'))) ORDER BY p.id DESC")
    List<Product> searchAllProductsByTwoRegion(@Param("location1") String location1, @Param("location2") String location2, @Param("name") String name);

    @Query("SELECT p FROM Product p JOIN p.locations l WHERE (l.location LIKE :location1) AND (lower(p.title) like lower(concat('%', :name, '%'))) ORDER BY p.id DESC")
    List<Product> searchAllProductsByOneRegion(@Param("location1") String location1, @Param("name") String name);

}
