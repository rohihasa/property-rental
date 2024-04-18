package com.app.propertyrental.main.service;

import com.app.propertyrental.main.exception.ResourceNotFoundException;
import com.app.propertyrental.main.models.File;
import com.app.propertyrental.main.repository.FileRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;


@Service
public class FileServiceImpl implements  FileService{



    private FileRepository fileRepository;

    public  FileServiceImpl(FileRepository fileRepository){
        this.fileRepository = fileRepository;
    }

    @Override
public File uploadFile(MultipartFile multipartFile) throws IOException {
    System.out.println("Uploading image");
    // remove time and space from file name
    String fileName = multipartFile.getOriginalFilename().replaceAll(" ", "_").replaceAll(":", "_");
    // sanitize filename by replacing non-breaking spaces with regular spaces
    fileName = fileName.replace((char) 8239, ' ');
    // further sanitize filename by removing any characters outside the permitted range
    fileName = fileName.replaceAll("[^\\x00-\\xFF]", "");

    File file = File.builder()
            .content(multipartFile.getBytes())
            .filename(fileName)
            .length(multipartFile.getSize())
            .metaData(multipartFile.getContentType())
            .build();
    // save and return file
    return fileRepository.save(file);
}

    @Override
    public File getFile(String id) {
        Optional<File> fileOptional = fileRepository.findById(id);
        if(fileOptional.isPresent()){
            return fileOptional.get();
        }
        throw new ResourceNotFoundException("please check file id");
    }


}
