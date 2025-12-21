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
 public class InventController {

    @Autowired
    private InventRepository inventRepository;

    @PostMapping("/inventory")
    public InventModel newInventoryModel(@RequestBody InventModel newInventoryModel){
        return inventRepository.save(newInventoryModel);
    }

    @PostMapping("/inventory/itemImg")
    public String itemImage(@RequestParam("file") MultipartFile file) {
        String folder = "E:/Download/spring/backend/src/main/uploads";
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



}
