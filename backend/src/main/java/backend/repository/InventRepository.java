package backend.repository;


import backend.model.InventModel;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository

public interface InventRepository extends JpaRepository<InventModel, Long> {
    @Modifying
    @Transactional
    @Query("UPDATE InventModel i SET i.itemPrice = i.itemPrice * :multiplier")
    void applyGlobalPriceChange(@Param("multiplier") double multiplier);
}
