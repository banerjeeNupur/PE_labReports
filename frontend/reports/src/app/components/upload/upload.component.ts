import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';
import {Router} from '@angular/router';
import { Report } from 'src/app/common/report';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  constructor(private reportService : ReportService ,private route: Router) { }

  ngOnInit(): void {}

  input_site:any;
  input_report:any;
  rep : Report = new Report();
  message:any;

  upload(){
    
    this.rep.site = this.input_site;
    this.rep.report = this.input_report;
    console.log(this.rep.site,'  ',this.rep.report)
    let resp = this.reportService.uploadReport(this.rep)
    resp.subscribe((data)=>this.message=data)

  }

}
 