package backend.controller;

import backend.exception.InventoryNotFoundException;
import backend.model.InventModel;
import backend.repository.InventRepository;
import jdk.jshell.spi.ExecutionControlProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tools.jackson.databind.ObjectMapper;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.sql.SQLOutput;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
 public class InventController {

    @Autowired
    private InventRepository inventRepository;

    @PostMapping("/inventory")
    public InventModel newInventoryModel(@RequestBody InventModel newInventoryModel){
        return inventRepository.save(newInventoryModel);
    }

    @PostMapping("/inventory/itemImg")
    public String itemImage(@RequestParam("file") MultipartFile file) {
        String folder = "E:/Download/spring/uploads/";
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename(); // avoid duplicates

        try {
            File dir = new File(folder);
            if (!dir.exists()) dir.mkdirs();

            file.transferTo(Paths.get(folder + fileName));
        } catch (IOException e) {
            e.printStackTrace();
            return "error uploading file";
        }

        return fileName;
    }




    @GetMapping("/inventory")
    public List<InventModel> getAllItems() {
        return inventRepository.findAll();
    }



    @GetMapping("/inventory/{id}")
    InventModel getItemId(@PathVariable Long id){
        return inventRepository.findById(id).orElseThrow(()-> new InventoryNotFoundException(id));

    }

    private final String UPLOAD_DIR = "E:/Download/spring/uploads/";

    @GetMapping("/uploads/{filename}")
    public ResponseEntity<FileSystemResource> getImage(@PathVariable String filename){
        File file = new File(UPLOAD_DIR+filename);

        if(!file.exists()){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(new FileSystemResource(file));

    }


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

            // ✅ CORRECT SETTERS
            existingInventory.setItemId(newInventory.getItemId());
            existingInventory.setItemName(newInventory.getItemName());
            existingInventory.setItemCategory(newInventory.getItemCategory());
            existingInventory.setItemQty(newInventory.getItemQty());
            existingInventory.setItemDetails(newInventory.getItemDetails());

            // ✅ IMAGE UPDATE (OPTIONAL)
            if (file != null && !file.isEmpty()) {
                String uploadDir = "E:/Download/spring/uploads/";
                String fileName = file.getOriginalFilename();

                try {
                    File dir = new File(uploadDir);
                    if (!dir.exists()) dir.mkdirs();

                    file.transferTo(Paths.get(uploadDir + fileName));
                    existingInventory.setItemImage(fileName);

                } catch (IOException e) {
                    throw new RuntimeException("Error saving uploaded file", e);
                }
            }

            return inventRepository.save(existingInventory);

        }).orElseThrow(() -> new InventoryNotFoundException(id));
    }

}
