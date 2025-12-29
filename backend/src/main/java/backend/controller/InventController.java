package backend.controller;

import backend.exception.InventoryNotFoundException;
import backend.model.InventModel;
import backend.repository.InventRepository;
import backend.service.InventoryService;
import backend.service.QRCodeGenerator;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.Column;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;



@RestController
@RequestMapping("/inventory")
@CrossOrigin(origins = "http://localhost:3000")
public class InventController {
    @Autowired
    private InventoryService inventoryService;

    @Autowired
    private InventRepository inventRepository;

    private final String UPLOAD_DIR = System.getProperty("user.dir") + File.separator + "uploads" + File.separator;

    @GetMapping
    public List<InventModel> getAllItems() {
        return inventRepository.findAll();
    }

    @GetMapping("/{id}")
    public InventModel getItemById(@PathVariable Long id) {
        return inventRepository.findById(id)
                .orElseThrow(() -> new InventoryNotFoundException(id));
    }

     @PostMapping("/itemImg")
    public String uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            File dir = new File(UPLOAD_DIR);
            if (!dir.exists()) dir.mkdirs();
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            file.transferTo(new File(UPLOAD_DIR + fileName));
            return fileName;
        } catch (IOException e) {
            return "error";
        }
    }

    // 2. Handle Saving Item Data
    @PostMapping
    public InventModel saveItem(@RequestBody InventModel item) {
        return inventRepository.save(item);
    }

    // 3. Handle Updates (Multipart for Edit/Cart)
    @PutMapping("/{id}")
    public InventModel updateItem(
            @PathVariable Long id,
            @RequestParam("itemDetails") String itemDetails,
            @RequestParam(value = "file", required = false) MultipartFile file) throws IOException {

        ObjectMapper objectMapper = new ObjectMapper();
        InventModel newDetails = objectMapper.readValue(itemDetails, InventModel.class);

        return inventRepository.findById(id).map(item -> {
            item.setItemName(newDetails.getItemName());
            item.setItemCategory(newDetails.getItemCategory());
            item.setItemQty(newDetails.getItemQty());
            item.setItemPrice(newDetails.getItemPrice());
            item.setLocation(newDetails.getLocation());

            if (file != null && !file.isEmpty()) {
                String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
                try {
                    file.transferTo(new File(UPLOAD_DIR + fileName));
                    item.setItemImage(fileName);
                } catch (IOException e) { e.printStackTrace(); }
            } else {
                item.setItemImage(newDetails.getItemImage());
            }

            return inventRepository.save(item);
        }).orElseThrow(() -> new InventoryNotFoundException(id));
    }

    @DeleteMapping("/{id}")
    public String deleteItem(@PathVariable Long id) {
        if (!inventRepository.existsById(id)) {
            throw new InventoryNotFoundException(id);
        }
        inventRepository.deleteById(id);
        return "Deleted successfully";
    }


    // MASS UPDATE ENDPOINT (Unique path to avoid ID conflict)
    @PutMapping("/action/mass-update-price")
    public ResponseEntity<String> massUpdatePrice(@RequestParam double percentage) {
        try {
            inventoryService.updateAllPrices(percentage);
            return ResponseEntity.ok("Successfully updated prices");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Update failed");
        }
    }

    //for QR code generator
    @GetMapping("/{id}/qrcode")
    public ResponseEntity<String> getQRCode(@PathVariable Long id) {
        try {
            // 1. Get your computer's IP address (e.g., 192.168.1.10)
            // Note: Using "localhost" won't work on your mobile phone's camera!
            String myIp = "192.168.78.123"; // <--- CHANGE THIS to your actual IP from 'ipconfig'

             String qrContent = "http://" + myIp + ":5173/inventory/edit/" + id;

             String base64Image = QRCodeGenerator.getQRCodeImage(qrContent, 250, 250);

            return ResponseEntity.ok(base64Image);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error generating QR");
        }
    }

}