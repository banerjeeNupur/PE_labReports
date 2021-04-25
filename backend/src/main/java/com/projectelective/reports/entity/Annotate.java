package com.projectelective.reports.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name="annotate")
@Data
public class Annotate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "report")
    private String report;
}
