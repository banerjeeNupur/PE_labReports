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

    @Column(name = "report")
    private String report;

    public SiteReports() { }

}
