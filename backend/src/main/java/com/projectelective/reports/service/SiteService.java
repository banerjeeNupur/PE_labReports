package com.projectelective.reports.service;

import com.projectelective.reports.dao.DiagnosisCorpusRepository;
import com.projectelective.reports.dao.ReportsRepository;
import com.projectelective.reports.dao.SiteCorpusRepository;

import com.projectelective.reports.entity.DiagnosisCorpus;
import com.projectelective.reports.entity.Reports;
import com.projectelective.reports.entity.SiteCorpus;

import jdk.jshell.Diag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import java.util.*;
@Service
public class SiteService {

    @Autowired
    private  SiteCorpusRepository siteCorpusRepository;

    @Autowired
    private ReportsRepository reportsRepository;

    @Autowired
    private DiagnosisCorpusRepository diagnosisCorpusRepository;

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

    // save diagnosis to corpus_diag if it isn't already present
    public DiagnosisCorpus saveDiag(  String diagnosis){

        System.out.println("start service");
        DiagnosisCorpus d = new DiagnosisCorpus();
        d.setDiagnosis(diagnosis);
        if(!diagnosisCorpusRepository.existsByDiagnosis(diagnosis)){
            System.out.println("not found");
            return diagnosisCorpusRepository.save(d);
        }
        else return d;
    }



    // save report to repos
    public Reports saveReport(Reports reports){
        System.out.println("start site report service");
        return reportsRepository.save(reports);
    }

    // delete report
    public void deleteReport(Long id){
        reportsRepository.deleteById(id);
    }

    public Integer getUndefinedSites(){
        Integer c =  reportsRepository.findAllBySiteEquals("undefined").size();
        return c;
    }
}
