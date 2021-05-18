package com.projectelective.reports.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name="repos")
@Data
public class Reports {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "site")
    private String site;

    @Column(name = "report")
    private String report;

    @Column(name = "other_diagnosis")
    private String other_diagnosis;

    @Column(name= "final_diagnosis")
    private String final_diagnosis;

    public String getOther_diagnosis() {
        return other_diagnosis;
    }

    public void setOther_diagnosis(String other_diagnosis) {
        this.other_diagnosis = other_diagnosis;
    }

    public String getFinal_diagnosis() {
        return final_diagnosis;
    }

    public void setFinal_diagnosis(String final_diagnosis) {
        this.final_diagnosis = final_diagnosis;
    }

    public Reports(Long id, String site, String report, String other_diagnosis, String final_diagnosis) {
        this.id = id;
        this.site = site;
        this.report = report;
        this.other_diagnosis = other_diagnosis;
        this.final_diagnosis = final_diagnosis;
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

    public Reports() { }

}
