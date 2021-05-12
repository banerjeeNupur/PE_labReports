package com.projectelective.reports.dao;

import com.projectelective.reports.entity.SiteCorpus;
import com.projectelective.reports.entity.SiteReports;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;
import java.util.*;

@CrossOrigin("http://localhost:4200")
public interface SiteReportsRepository extends JpaRepository<SiteReports, Long> {

    Page<SiteReports> findAllBySiteContaining(@RequestParam("site") String site, Pageable pageable );

    @Override
    void deleteById(Long id);

    List<SiteReports> findAllBySiteEquals(String undefined);
}
