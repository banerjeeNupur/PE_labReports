package com.projectelective.reports.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name="corpus_biopsy")
@Data
public class BiopsyCorpus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "biopsy")
    private String biopsy;

    public BiopsyCorpus(Long id, String biopsy) {
        this.id = id;
        this.biopsy = biopsy;
    }

    public BiopsyCorpus() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBiopsy() {
        return biopsy;
    }

    public void setBiopsy(String biopsy) {
        this.biopsy = biopsy;
    }
}
