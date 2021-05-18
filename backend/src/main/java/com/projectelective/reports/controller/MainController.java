package com.projectelective.reports.controller;

import com.projectelective.reports.entity.Reports;
import com.projectelective.reports.service.ReportService;
import com.projectelective.reports.service.SiteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:4200")
public class MainController {

    @Autowired
    private SiteService siteService;

    @Autowired
    private ReportService reportService;


    // update corpus_site and repos
    @PostMapping("/addReport")
    public Reports addReport(@RequestBody Reports reports){
        System.out.println("controller : add report\n"+reports);
        System.out.println("site is: \n"+reports.getSite());
        System.out.println("report is: \n"+reports.getReport());
        siteService.saveSite(reports.getSite());
        return  siteService.saveReport(reports);
    }

    @PostMapping("/updateReport")
    public Reports updateReport(@RequestBody Reports reports){
        System.out.println("controller: updating report");
        reportService.deleteReport(reports.getId());
        reportService.saveReport(reports);
        return reports;
    }

}
