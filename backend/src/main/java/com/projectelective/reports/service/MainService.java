package com.projectelective.reports.service;

import com.projectelective.reports.dao.BiopsyCorpusRepository;
import com.projectelective.reports.dao.DiagnosisCorpusRepository;
import com.projectelective.reports.dao.ReportsRepository;
import com.projectelective.reports.dao.SiteCorpusRepository;
import com.projectelective.reports.entity.BiopsyCorpus;
import com.projectelective.reports.entity.DiagnosisCorpus;
import com.projectelective.reports.entity.SiteCorpus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MainService {

    @Autowired
    private  SiteCorpusRepository siteCorpusRepository;
    @Autowired
    private ReportsRepository reportsRepository;
    @Autowired
    private BiopsyCorpusRepository biopsyCorpusRepository;
    @Autowired
    private DiagnosisCorpusRepository diagnosisCorpusRepository;


    // save site to corpus_site if it isn't already present
    public SiteCorpus saveSite(  String site){
        System.out.println("start service");
        SiteCorpus s = new SiteCorpus();
        s.setSite(site);
        if(!siteCorpusRepository.existsBySite(site)){
            System.out.println("site not found. added: "+s);
            return siteCorpusRepository.save(s);
        }
        else return s;
    }

    // save site to corpus_site if it isn't already present
    public BiopsyCorpus saveBiopsy(String biopsy){
        if(biopsyCorpusRepository.existsByBiopsy(biopsy)) return null;
        BiopsyCorpus b = new BiopsyCorpus();
        b.setBiopsy(biopsy);
        biopsyCorpusRepository.save(b);
        System.out.println("biopsy not found: added "+b);
        return b;
    }

    // save diagnosis to corpus_diag if it isn't already present
    public DiagnosisCorpus saveDiag(  String diagnosis){
        System.out.println("start service");
        DiagnosisCorpus d = new DiagnosisCorpus();
        d.setDiagnosis(diagnosis);
        if(!diagnosisCorpusRepository.existsByDiagnosis(diagnosis)){
            System.out.println("diag not found. added: "+d);
            return diagnosisCorpusRepository.save(d);
        }
        else return d;
    }

    public Integer getUndefinedSites(){
        Integer c =  reportsRepository.findAllBySiteEquals("undefined").size();
        return c;
    }
    public Integer getUndefinedDiag(){
        Integer c =  reportsRepository.findAllByDiagnosisEquals("undefined").size();
        return c;
    }


}
