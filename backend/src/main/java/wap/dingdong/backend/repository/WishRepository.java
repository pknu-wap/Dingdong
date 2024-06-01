package wap.dingdong.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import wap.dingdong.backend.domain.Product;
import wap.dingdong.backend.domain.User;
import wap.dingdong.backend.domain.Wish;

import java.util.List;
import java.util.Optional;

@Repository
public interface WishRepository extends JpaRepository<Wish, Long> {
    Optional<Wish> findByProductAndUser(Product product, User user);
    List<Wish> findByUserAndLiked(User user, Integer liked);
}
