package com.projectelective.reports.controller;

import com.projectelective.reports.entity.Reports;
import com.projectelective.reports.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:4200")
public class MainController {


    @Autowired
    private ReportService reportService;


    @PostMapping("/updateReport")
    public Reports updateReport(@RequestBody Reports reports){
        System.out.println("controller: updating report");
        reportService.deleteReport(reports.getId());
        reportService.saveReport(reports);
        return reports;
    }

}
