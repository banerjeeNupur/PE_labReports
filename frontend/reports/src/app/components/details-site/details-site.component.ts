import { Component, OnInit } from '@angular/core';
import { Site } from 'src/app/common/site';
import { SiteService } from 'src/app/services/site.service';
import { ActivatedRoute, RouterOutlet, Router } from '@angular/router'; 

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import * as XLSX from 'xlsx'; 

pdfMake.vfs = pdfFonts.pdfMake.vfs;


import { NgbPaginationEllipsis } from '@ng-bootstrap/ng-bootstrap';

import { Report } from 'src/app/common/report';
import { ReportService } from 'src/app/services/report.service';
declare var $: any;
 
@Component({
  selector: 'app-details-site',
  templateUrl: './details-site.component.html',
  styleUrls: ['./details-site.component.css']
})
export class DetailsSiteComponent implements OnInit {

  constructor(private siteService : SiteService,
              private activatedRoute: ActivatedRoute,
              private route: Router,
              private reportService : ReportService  ) {}

  site: Site[];
  site_data:any;
  edit_rep:Report = new Report();

  ngOnInit(): void {
    this.starter()
  }

  async starter(){
    let response = await this.siteService.getRep();
    console.log(response._embedded,"data isnkasjdh");
    this.site = response._embedded.reportses;
    console.log('check this: ',this.site)
    this.site_data = this.Middleware(this.site);  
  }

  
  Middleware(data){
    let array =[]
    let temp:any;  
    data.forEach(element => {
      // temp stores the element id (primary key)
      temp = element._links.self.href
      temp = temp.split('http://localhost:8080/api/reportses/')[1]
      //console.log('element is : ',element)
      array.push([element.site,element.final_diagnosis,element.report,temp]);
      
    });
    return array;
  }

  download_report(s){

    // 'NAME:\nCharlie Brown' + 'PATIENT ID:\n1234' + 'GENDER:\nMale' + 'AGE:\n20'
    const reportDef = { content: 'NAME:\nCharlie Brown\n\n' + 'PATIENT ID:\n1234\n\n' + 'GENDER:\nMale\n\n' + 'AGE:\n20\n\n' 
                                  + 'SITE:\n'+s[0] + '\n\n' + 'REPORT:\n'+ s[1]};
    pdfMake.createPdf(reportDef).download();
  }

  view_report(s){
    const reportDef = { content: 'NAME:\nCharlie Brown\n\n' + 'PATIENT ID:\n1234\n\n' + 'GENDER:\nMale\n\n' + 'AGE:\n20\n\n' 
                                 + 'SITE:\n'+s[0] + '\n\n' + 'REPORT:\n'+ s[1]};
    pdfMake.createPdf(reportDef).open();
  }

  // download all the reports
  
  download_all(rep){
    rep.forEach(element => {
   
      // this.download_report(element);
      let temp = element.splice(-1,1)
    });

     
    console.log('download all: ',rep)
    let fileName= 'ExcelSheet.xlsx';
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(rep);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "test");

    XLSX.writeFile(wb, fileName); 
  }

  // pagination things
  p:number = 1;
  rep : Report = new Report()
  edit_report(r){
      this.siteService.report.id = r[2];
      this.siteService.report.report = r[1];
      this.siteService.report.site = r[0];

      this.reportService.report.site = r[0];
      this.reportService.report.final_diagnosis = r[1];
      this.reportService.report.report = r[2];
      this.reportService.report.id = r[3];
      
      this.route.navigate(['/edit-site']);
      console.log('in details component : ',r[0],r[1],r[2])
    }
  }
  

