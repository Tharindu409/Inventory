package backend.repository;


import backend.model.InventModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InventRepository extends JpaRepository<InventModel, Long> {
}
