package com.projectelective.reports.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name="corpus_site")
@Data
public class SiteCorpus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "site")
    private String site;


    public SiteCorpus() { }
}
