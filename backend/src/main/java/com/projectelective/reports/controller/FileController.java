package com.projectelective.reports.controller;

import com.projectelective.reports.dao.SiteReportsRepository;
import com.projectelective.reports.entity.FileDB;
import com.projectelective.reports.message.ResponseFile;
import com.projectelective.reports.message.ResponseMessage;
import com.projectelective.reports.service.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.stream.Collectors;

@Controller
@CrossOrigin("http://localhost:4200")
public class FileController {

    @Autowired
    private FileStorageService storageService;
    @Autowired
    private SiteReportsRepository siteReportsRepository;

    public void runPython(){

        System.out.println("running python");
        try{
            Runtime.getRuntime().exec("/usr/bin/python3"+" "+"/home/nupur/Desktop/PE/code/findsite.py").waitFor();
            System.out.println("executed");
        }
        catch(Exception e){
            System.out.println("not executed");
            e.printStackTrace();
        }
    }

    @PostMapping("/upload")
    public ResponseEntity<ResponseMessage> uploadFile(@RequestParam("file") MultipartFile file) {
        String message = "";
        System.out.println("in upload file");
        try {
            System.out.println("file is : "+file.getOriginalFilename());
            storageService.store(file);
            message = "Uploaded the file successfully: " + file.getOriginalFilename();
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
        } catch (Exception e) {
            message = "Could not upload the file: " + file.getOriginalFilename() + "!";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
        }
    }

    @GetMapping("/parse")
    public ResponseEntity<Integer> parseFiles(){
        FileController obj = new FileController();
        System.out.println("before python call");
        obj.runPython();
        System.out.println("after python call");
        return new ResponseEntity<>(1,HttpStatus.OK);
    }
}
