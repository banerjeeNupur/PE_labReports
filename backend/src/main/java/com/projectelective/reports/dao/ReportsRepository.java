package com.projectelective.reports.dao;

import com.projectelective.reports.entity.Reports;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;
import java.util.*;

@CrossOrigin("http://localhost:4200")
public interface ReportsRepository extends JpaRepository<Reports, Long> {

    Page<Reports> findAllBySiteContaining(@RequestParam("site") String site, Pageable pageable );
    Page<Reports> findAllByDiagnosisContaining(@RequestParam("Diagnosis") String diagnosis, Pageable pageable );

    @Override
    void deleteById(Long id);

    List<Reports> findAllBySiteEquals(String undefined);

    List<Reports> findAllByDiagnosisEquals(String undefined);
}
