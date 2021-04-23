package com.projectelective.reports.service;

import com.projectelective.reports.dao.SiteCorpusRepository;
import com.projectelective.reports.dao.SiteReportsRepository;
import com.projectelective.reports.entity.SiteCorpus;
import com.projectelective.reports.entity.SiteReports;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

@Service
public class SiteService {

    @Autowired
    private  SiteCorpusRepository siteCorpusRepository;

    @Autowired
    private SiteReportsRepository siteReportsRepository;

    // SiteCorpus site : edit to the function parameter

    // save site to corpus_site if it isn't already present
    public SiteCorpus saveSite(  String site){

        System.out.println("start service");
        SiteCorpus s = new SiteCorpus();
        s.setSite(site);

        // !siteCorpusRepository.existsBySite(site.getSite())
        if(!siteCorpusRepository.existsBySite(site)){
            System.out.println("not found");
            return siteCorpusRepository.save(s);
        }
        else return s;
    }

    // save report to repos
    public SiteReports saveReport(SiteReports reports){
        System.out.println("start site report service");
        return siteReportsRepository.save(reports);
    }
}
