package backend.controller;

import backend.model.InventModel;
import backend.repository.InventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/inventory")
public class InventController {

    @Autowired
    private InventRepository inventRepository;

    // SAVE INVENTORY
    @PostMapping
    public InventModel saveInventory(@RequestBody InventModel inventory) {
        return inventRepository.save(inventory);
    }

    // IMAGE UPLOAD
    @PostMapping(value = "/itemImg", consumes = "multipart/form-data")
    public String uploadImage(@RequestPart("file") MultipartFile file) {

        if (file.isEmpty()) {
            return "error";
        }

        String uploadDir = System.getProperty("user.dir") + "/uploads/";
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();

        try {
            File dir = new File(uploadDir);
            if (!dir.exists()) {
                dir.mkdirs();
            }

            file.transferTo(Paths.get(uploadDir + fileName));
        } catch (IOException e) {
            e.printStackTrace();
            return "error";
        }

        return fileName;
    }
}
