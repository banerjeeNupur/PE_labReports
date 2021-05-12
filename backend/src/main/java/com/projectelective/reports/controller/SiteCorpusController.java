package com.projectelective.reports.controller;

import com.projectelective.reports.entity.SiteCorpus;
import com.projectelective.reports.entity.SiteReports;
import com.projectelective.reports.service.AnnotateService;
import com.projectelective.reports.service.SiteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;
@RestController
@CrossOrigin("http://localhost:4200")
public class SiteCorpusController {

    @Autowired
    private SiteService siteService;

    @Autowired
    private AnnotateService annotateService;


    // update corpus_site and repos
    @PostMapping("/addReport")
    public SiteReports addReport(@RequestBody SiteReports reports){
        System.out.println("controller : add report\n"+reports);
        System.out.println("site is: \n"+reports.getSite());
        System.out.println("report is: \n"+reports.getReport());
        siteService.saveSite(reports.getSite());
        return  siteService.saveReport(reports);
    }

    @PostMapping("/annotateReport")
    public SiteReports annotateReport(@RequestBody SiteReports reports){
        System.out.println("controller : add report\n"+reports);
        System.out.println("site is: \n"+reports.getSite());
        System.out.println("report is: \n"+reports.getReport());
        System.out.println("report ID is: \n"+reports.getId());
        // remove the entry from annotate
//        int item = annotateService.deleteRep(reports.getReport());
        int item = annotateService.deleteRep(reports.getId());
        System.out.println("items removed : "+item);

        siteService.saveSite(reports.getSite());
        return  siteService.saveReport(reports);
    }

    @PostMapping("/updateReportSite")
    public SiteReports updateReportSite(@RequestBody SiteReports reports){
        System.out.println("report received : "+reports);

        // delete the current report
        siteService.deleteReport(reports.getId());

        // save the new report
        addReport(reports);

        return reports;
    }

    @GetMapping("/getUndefined")
    public ResponseEntity<Integer> getUndefinedSites(){
        Integer count = siteService.getUndefinedSites();
        System.out.println("count : "+count);
        return new ResponseEntity<>(count, HttpStatus.OK);
    }

}
