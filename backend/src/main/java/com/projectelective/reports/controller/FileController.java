package com.projectelective.reports.controller;

import com.projectelective.reports.message.ResponseMessage;
import com.projectelective.reports.service.FileStorageService;
import com.projectelective.reports.service.MainService;
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
    private MainService mainService;


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
    public ResponseEntity<Integer[]> parseFiles(){
        Integer count_initial = mainService.getUndefinedSites();
        Integer diag_initial = mainService.getUndefinedDiag();

        System.out.println("site, diag initial --------- : "+count_initial+"=="+diag_initial);
        FileController obj = new FileController();
        System.out.println("before python call");
        obj.runPython();
        System.out.println("after python call");
        Integer count_final = mainService.getUndefinedSites();
        Integer diag_final = mainService.getUndefinedDiag();

        System.out.println("site, diag final -------- : "+count_final+"=="+diag_final);
        Integer diff_site = count_final - count_initial;
        Integer diff_diag = diag_final - diag_initial;
        return new ResponseEntity<>(new Integer[]{diff_site,diff_diag},HttpStatus.OK);
    }
}
