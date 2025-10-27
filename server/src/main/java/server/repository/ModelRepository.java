package server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import server.model.Model;

@Repository
public interface ModelRepository extends JpaRepository<Model, Integer> { }
