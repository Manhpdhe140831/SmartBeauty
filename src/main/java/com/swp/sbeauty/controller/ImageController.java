package com.swp.sbeauty.controller;



import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/image")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ImageController {

    @GetMapping(value = "/getImage")
    public ResponseEntity<ByteArrayResource> getImage(@RequestParam("image") String image){
        if(!image.equals("")||image!=null){
            try{
                Path CURRENT_FOLDER = Paths.get(System.getProperty("user.dir"));
                Path fileName = Paths.get(CURRENT_FOLDER+ "\\static\\images\\", image);
                byte[] buffer = Files.readAllBytes(fileName);
                ByteArrayResource byteArrayResource = new ByteArrayResource(buffer);
                return ResponseEntity.ok()
                        .contentLength(buffer.length)
                        .contentType(MediaType.parseMediaType("image/png"))
                        .body(byteArrayResource);
            } catch (Exception e){
                e.printStackTrace();
            }
        }
        return ResponseEntity.badRequest().build();
    }
}
