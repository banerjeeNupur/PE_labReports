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
    private MainService mainService;

    // delete report
    public void deleteReport(Long id){
        reportsRepository.deleteById(id);
    }


    // save report to repos
    public Reports saveReport(Reports reports){
        System.out.println("start site report service");

        // check if the new site has the term biopsy.
        // if it does, check whether corpus_biopsy has it or not.
        if(reports.getSite().contains("biopsy")){
            mainService.saveBiopsy(reports.getSite());
        }

        // save it to corpus_site
        mainService.saveSite(reports.getSite());

        // save the input diag
        mainService.saveDiag(reports.getDiagnosis());
        System.out.println("save site and diag done");
        return reportsRepository.save(reports);
    }

}
