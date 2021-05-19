import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet, Router } from '@angular/router'; 
import { SiteService } from 'src/app/services/site.service';
import { Report } from 'src/app/common/report';
import { ReportService } from 'src/app/services/report.service';


@Component({
  selector: 'app-edit-site',
  templateUrl: './edit-site.component.html',
  styleUrls: ['./edit-site.component.css']
})
export class EditSiteComponent implements OnInit {


  constructor(
              private siteService : SiteService, 
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private reportService: ReportService) { }

  ngOnInit(): void {
    this.new_report.report = this.reportService.report.report
    this.new_report.site = this.reportService.report.site
    this.new_report.id = this.reportService.report.id
    this.new_report.diagnosis = this.reportService.report.diagnosis

    console.log('edit site init() ', this.new_report)
  }

  report:any;
  id: any;
  site:any;
  new_report: Report = new Report()
  

  input_site:any;
  input_diagnosis:any;

  message:any;
  edit(){
    
      console.log('in annotate-report-----\n',this.new_report,'------\n',this.input_site,'------\n',this.input_diagnosis)
      let resp = this.reportService.updateReport(this.new_report,this.input_site,this.input_diagnosis)
      resp.subscribe((data)=>{
        this.message='report updated!'
        document.getElementById("div_message").style.display = "block"
        console.log(this.message)
      },
      (error) => {
        console.log('error')
        this.router.navigate(['/error']);
      })
     
  }

}
 