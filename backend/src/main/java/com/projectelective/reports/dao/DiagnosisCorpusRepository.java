package com.projectelective.reports.dao;

import com.projectelective.reports.entity.DiagnosisCorpus;
import com.projectelective.reports.entity.SiteCorpus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

@CrossOrigin("http://localhost:4200")
public interface DiagnosisCorpusRepository  extends JpaRepository<DiagnosisCorpus, Long> {

    Page<SiteCorpus> findAllByDiagnosisContaining(@RequestParam("diagnosis") String diagnosis, Pageable pageable );

    boolean existsByDiagnosis(String diagnosis);

    boolean existsByFinal_diagnosis(String diagnosis);
}
