package com.app.propertyrental.main.controller;

import com.app.propertyrental.common.models.User;
import com.app.propertyrental.common.repository.UserRepository;
import com.app.propertyrental.main.exception.ResourceNotFoundException;
import com.app.propertyrental.main.models.File;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;

@RestController
//@CrossOrigin("*")
@RequestMapping("/file")
public class FileController {

    private final UserRepository userRepository;

    public FileController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @GetMapping("/{reportType}/{userId}")
    public ResponseEntity<byte[]> getReport(@PathVariable String reportType, @PathVariable String userId, @RequestParam("view") boolean view) {
        File file = getReport(reportType, userId);
        String contentDisposition = view ? "inline" : "attachment";

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType("application/pdf"))
                .header(HttpHeaders.CONTENT_DISPOSITION, contentDisposition
                        + "; filename=\"" + file.getFilename() + ".pdf\"")
                .body(file.getContent());
    }

    public File getReport(String reportType, String userId) {
        try{
            User user = userRepository.findById(userId).get();
            if(reportType.equals("credit")){
                return File.builder()
                        .content(convertBase64StringToByteArray(user.getCreditReport()))
                        .filename("credit report")
                        .build();
            }else if(reportType.equals("id")){
                return File.builder()
                        .content(convertBase64StringToByteArray(user.getIdentityProof()))
                        .filename("id proof")
                        .build();
            }else{
                throw new ResourceNotFoundException("Report type not found");
            }
        }catch (Exception e) {
            throw new ResourceNotFoundException("User not found");
        }
    }


    public byte[] convertBase64StringToByteArray(String base64String) {
        base64String = base64String.split(",")[1];
        return Base64.getDecoder().decode(base64String);
    }

}
