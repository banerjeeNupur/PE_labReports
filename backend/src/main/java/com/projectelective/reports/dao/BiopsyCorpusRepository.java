package com.projectelective.reports.dao;

import com.projectelective.reports.entity.BiopsyCorpus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BiopsyCorpusRepository extends JpaRepository<BiopsyCorpus, Long> {

    boolean existsByBiopsy(String biopsy);
}
