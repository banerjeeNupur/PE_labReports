package com.projectelective.reports.service;

import com.projectelective.reports.dao.ReportsRepository;
import com.projectelective.reports.entity.Reports;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReportService {

    @Autowired
    private ReportsRepository reportsRepository;

    @Autowired
    private SiteService siteService;

    // delete report
    public void deleteReport(Long id){
        reportsRepository.deleteById(id);
    }


    // save report to repos
    public Reports saveReport(Reports reports){
        System.out.println("start site report service");
        siteService.saveSite(reports.getSite());
        siteService.saveDiag(reports.getFinal_diagnosis());
        System.out.println("save site and diag done");
        return reportsRepository.save(reports);
    }

}
