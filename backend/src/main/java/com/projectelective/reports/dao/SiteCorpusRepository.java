package com.projectelective.reports.dao;

import com.projectelective.reports.entity.SiteCorpus;
import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties;
import org.springframework.data.domain.Page;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.*;

@CrossOrigin("http://localhost:4200")
public interface SiteCorpusRepository extends JpaRepository<SiteCorpus, Long> {


        Page<SiteCorpus> findAllBySiteContaining(@RequestParam("site") String site, Pageable pageable );

        SiteCorpus findBySite(SiteCorpus site);

        boolean existsBySite(String site);

}
