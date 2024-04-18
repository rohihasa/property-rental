package com.app.propertyrental.main.controller;



import com.app.propertyrental.main.models.File;
import com.app.propertyrental.main.service.FileService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
//@CrossOrigin("*")
@RequestMapping("/file")
public class FileController {

    private final FileService fileService;

    public FileController(FileService fileService) {
        this.fileService = fileService;
    }

    @PostMapping("/upload")
    public ResponseEntity<File> upload(@RequestParam("file") MultipartFile file) throws IOException {
        return ResponseEntity.ok(fileService.uploadFile(file));
    }

    @GetMapping("/{id}")
    public ResponseEntity<byte[]> getFile(@PathVariable String id, @RequestParam("view") boolean view) {

        File file = fileService.getFile(id);
        String contentDisposition = view ? "inline" : "attachment";
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType((String) file.getMetaData()))
                .header(HttpHeaders.CONTENT_DISPOSITION, contentDisposition
                        + "; filename=\"" + file.getFilename() + "\"")
                .body(file.getContent());
    }

}
