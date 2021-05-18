package com.projectelective.reports.controller;

import com.projectelective.reports.dao.ReportsRepository;
import com.projectelective.reports.message.ResponseMessage;
import com.projectelective.reports.service.FileStorageService;
import com.projectelective.reports.service.SiteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


@Controller
@CrossOrigin("http://localhost:4200")
public class FileController {

    @Autowired
    private FileStorageService storageService;
    @Autowired
    private ReportsRepository reportsRepository;
    @Autowired
    private SiteService siteService;

    public void runPython(){

        System.out.println("running python");
        try{
            Runtime.getRuntime().exec("/usr/bin/python3"+" "+"/home/nupur/Desktop/PE/code/util/findsite.py").waitFor();
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
        Integer count_initial = siteService.getUndefinedSites();
        System.out.println("initial count : "+count_initial);
        FileController obj = new FileController();
        System.out.println("before python call");
        obj.runPython();
        System.out.println("after python call");
        Integer count_final = siteService.getUndefinedSites();
        System.out.println("count : "+count_final);
        Integer diff = count_final - count_initial;
        return new ResponseEntity<>(diff,HttpStatus.OK);
    }
}
