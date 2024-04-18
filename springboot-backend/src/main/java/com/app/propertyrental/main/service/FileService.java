package com.app.propertyrental.main.service;

import com.app.propertyrental.main.models.File;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface FileService {

     File uploadFile(MultipartFile file) throws IOException;

     File getFile(String id);
}
