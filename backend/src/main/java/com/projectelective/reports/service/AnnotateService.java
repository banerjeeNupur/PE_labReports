package com.projectelective.reports.service;

import com.projectelective.reports.dao.AnnotateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AnnotateService {

    @Autowired
    private AnnotateRepository annotateRepository;

    public int deleteRep(String rep){
        System.out.println("attempting to delete record from annotate ");
        return annotateRepository.deleteAllByReport(rep);
    }
}
