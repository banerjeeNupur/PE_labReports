package com.projectelective.reports.dao;

import com.projectelective.reports.entity.Annotate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")
public interface AnnotateRepository extends JpaRepository<Annotate, Long> {

    @Transactional
//    int deleteAllByReport(String rep);
    int deleteAllById(Long id);
}
