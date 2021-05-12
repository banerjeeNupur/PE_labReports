import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet, Router } from '@angular/router'; 
import { SiteService } from 'src/app/services/site.service';
import { Report } from 'src/app/common/report';


@Component({
  selector: 'app-edit-site',
  templateUrl: './edit-site.component.html',
  styleUrls: ['./edit-site.component.css']
})
export class EditSiteComponent implements OnInit {


  constructor(
              private siteService : SiteService, 
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.new_report.report = this.siteService.report.report
    this.new_report.site = this.siteService.report.site
    this.new_report.id = this.siteService.report.id
  }

  report:any;
  id: any;
  site:any;
  new_report: Report = new Report()
  

  input_site:any;
  

  message:any;
  annotate(){
    
      console.log('in annotate-report-----\n',this.new_report,'------\n',this.input_site)
      let resp = this.siteService.updateReport(this.new_report,this.input_site)
      resp.subscribe((data)=>{
        this.message='site updated!'
        document.getElementById("div_message").style.display = "block"
        console.log(this.message)
      },
      (error) => {
        console.log('error')
        this.router.navigate(['/error']);
      })
     
  }

}
 