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

//    public Integer getCount(){
//        System.out.println("get count");
//        return  siteReportsRepository.findAllBySiteEquals("undefined").size();
//    }
    public void runPython(){



        System.out.println("running python");
        try{
            Process p = Runtime.getRuntime().exec("/usr/bin/python3"+" "+"/home/nupur/Desktop/PE/code/findsite.py");
//            Process p = Runtime.getRuntime().exec("/usr/bin/python3"+" "+"../../../../../../../../findsite.py");
            //p.destroy();
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
        try {
            System.out.println("file is : "+file.getOriginalFilename());
            storageService.store(file);
            // call the python script here : update DB
            // if site found : site, report
            // if site not found : undefined, report
            FileController obj = new FileController();
            //Integer a = obj.getCount();
            System.out.println("before python call");
            obj.runPython();
            System.out.println("after python call");
//            Integer b = obj.getCount();
//            Integer c = b-a;
//            System.out.println("difference : "+c);
            message = "Uploaded the file successfully: " + file.getOriginalFilename();
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
        } catch (Exception e) {
            message = "Could not upload the file: " + file.getOriginalFilename() + "!";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
        }
    }

//    @GetMapping("/files")
//    public ResponseEntity<List<ResponseFile>> getListFiles() {
//        List<ResponseFile> files = storageService.getAllFiles().map(dbFile -> {
//            String fileDownloadUri = ServletUriComponentsBuilder
//                    .fromCurrentContextPath()
//                    .path("/files/")
//                    .path(dbFile.getId())
//                    .toUriString();
//
//            return new ResponseFile(
//                    dbFile.getName(),
//                    fileDownloadUri,
//                    dbFile.getType());
////                    dbFile.getData().length);
//        }).collect(Collectors.toList());
//
//        return ResponseEntity.status(HttpStatus.OK).body(files);
//    }

//    @GetMapping("/files/{id}")
//    public ResponseEntity<String> getFile(@PathVariable String id) {
//        FileDB fileDB = storageService.getFile(id);
//
//        return ResponseEntity.ok()
//                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileDB.getName() + "\"")
//                .body(fileDB.getData());
//    }

}
