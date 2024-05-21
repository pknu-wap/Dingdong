package wap.dingdong.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import wap.dingdong.backend.domain.Comment;

public interface CommentRepository extends JpaRepository <Comment, Integer> {
}
