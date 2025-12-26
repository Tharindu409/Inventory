package backend.controller;

import backend.exception.InventoryNotFoundException;
import backend.model.InventModel;
import backend.repository.InventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
 public class InventController {

    @Autowired
    private InventRepository inventRepository;

    private final String UPLOAD_DIR = "E:/Download/spring/uploads/";

    // 1. GET ALL ITEMS (For Home Page)
    @GetMapping("/inventory")
    public List<InventModel> getAllItems() {
        return inventRepository.findAll();
    }

    // 2. GET SINGLE ITEM BY ID (Crucial for your "View Details" page)
    @GetMapping("/inventory/{id}")
    public InventModel getItemById(@PathVariable Long id) {
        return inventRepository.findById(id)
                .orElseThrow(() -> new InventoryNotFoundException(id));
    }

    // 3. CREATE NEW ITEM
    @PostMapping("/inventory")
    public InventModel newInventoryModel(@RequestBody InventModel newInventoryModel) {
        return inventRepository.save(newInventoryModel);
    }

    // 4. UPLOAD IMAGE
    @PostMapping("/inventory/itemImg")
    public String itemImage(@RequestParam("file") MultipartFile file) {
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        try {
            File dir = new File(UPLOAD_DIR);
            if (!dir.exists()) dir.mkdirs();
            file.transferTo(Paths.get(UPLOAD_DIR + fileName));
        } catch (IOException e) {
            return "error uploading file";
        }
        return fileName;
    }

    //  IMAGE TO FRONTEND
    @GetMapping("/uploads/{filename}")
    public ResponseEntity<FileSystemResource> getImage(@PathVariable String filename) {
        File file = new File(UPLOAD_DIR + filename);
        if (!file.exists()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(new FileSystemResource(file));
    }

    //update

    @PutMapping(value = "/inventory/{id}", consumes = "multipart/form-data")
    public InventModel updateItem(
            @RequestPart("itemDetails") String itemDetails,
            @RequestPart(value = "file", required = false) MultipartFile file,
            @PathVariable Long id
    ) {
        ObjectMapper mapper = new ObjectMapper();
        InventModel newInventory;
        try {
            newInventory = mapper.readValue(itemDetails, InventModel.class);
        } catch (Exception e) {
            throw new RuntimeException("Error parsing itemDetails", e);
        }

        return inventRepository.findById(id).map(existingInventory -> {
            existingInventory.setItemName(newInventory.getItemName());
            existingInventory.setItemCategory(newInventory.getItemCategory());
            existingInventory.setItemQty(newInventory.getItemQty());
            existingInventory.setItemDetails(newInventory.getItemDetails());

            // ADD THESE NEW FIELDS TO YOUR REPOSITORY SAVE LOGIC
            existingInventory.setItemPrice(newInventory.getItemPrice());
            existingInventory.setMinStockLimit(newInventory.getMinStockLimit());
            existingInventory.setLocation(newInventory.getLocation());

            if (file != null && !file.isEmpty()) {
                String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
                try {
                    file.transferTo(Paths.get(UPLOAD_DIR + fileName));
                    existingInventory.setItemImage(fileName);
                } catch (IOException e) {
                    throw new RuntimeException("Error saving file", e);
                }
            }
            return inventRepository.save(existingInventory);
        }).orElseThrow(() -> new InventoryNotFoundException(id));
    }

    // 7. DELETE ITEM
    @DeleteMapping("/inventory/{id}")
    public String deleteItem(@PathVariable Long id) {
        InventModel inventItem = inventRepository.findById(id)
                .orElseThrow(() -> new InventoryNotFoundException(id));

        // Delete image file if exists
        String itemImage = inventItem.getItemImage();
        if (itemImage != null && !itemImage.isEmpty()) {
            File imageFile = new File(UPLOAD_DIR + itemImage);
            if (imageFile.exists()) {
                imageFile.delete();
            }
        }

        inventRepository.deleteById(id);
        return "Item with ID " + id + " deleted successfully.";
    }
}