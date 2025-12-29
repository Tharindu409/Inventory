package backend.repository;


import backend.model.InventModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository

public interface InventRepository extends JpaRepository<InventModel, Long> {
    @Modifying
    @Query("UPDATE InventModel i SET i.ItemPrice = i.ItemPrice * :multiplier")
    void applyGlobalPriceChange(@Param("multiplier") double multiplier);
}
