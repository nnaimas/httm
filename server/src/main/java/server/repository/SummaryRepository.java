package server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import server.model.Summary;
import java.util.List;

@Repository
public interface SummaryRepository extends JpaRepository<Summary, Integer> {
    //tim ten
    List<Summary> findByUserId(Integer userId);
    //lay lich su
    List<Summary> findTop5ByUserIdOrderByCreateAtDesc(Integer userId);
}
