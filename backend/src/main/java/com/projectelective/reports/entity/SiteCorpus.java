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


    public SiteCorpus() {}

    public SiteCorpus(Long id, String site) {
        this.id = id;
        this.site = site;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSite() {
        return site;
    }

    public void setSite(String site) {
        this.site = site;
    }
}
