package com.projectelective.reports.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name="repos")
@Data
public class SiteReports {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "site")
    private String site;

    public SiteReports(Long id, String site, String report) {
        this.id = id;
        this.site = site;
        this.report = report;
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

    public String getReport() {
        return report;
    }

    public void setReport(String report) {
        this.report = report;
    }

    @Column(name = "report")
    private String report;

    public SiteReports() { }

}
