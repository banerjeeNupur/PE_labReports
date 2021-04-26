package com.projectelective.reports.controller;

import com.projectelective.reports.entity.SiteCorpus;
import com.projectelective.reports.entity.SiteReports;
import com.projectelective.reports.service.AnnotateService;
import com.projectelective.reports.service.SiteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("http://localhost:4200")
public class SiteCorpusController {

    @Autowired
    private SiteService siteService;

    @Autowired
    private AnnotateService annotateService;

//    @PostMapping("/addSite")
//    public SiteCorpus addSite(@RequestBody  SiteCorpus site){
//        System.out.println("start controller\n"+ site);
//        return siteService.saveSite(site);
//
//    }

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
}
