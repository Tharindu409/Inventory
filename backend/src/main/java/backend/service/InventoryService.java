package backend.service;

import backend.repository.InventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class InventoryService {

    @Autowired
    private InventRepository inventRepository;

    @Transactional
    public void updateAllPrices(double percentage) {
        double multiplier = 1 + (percentage / 100);
        inventRepository.applyGlobalPriceChange(multiplier);
    }
}