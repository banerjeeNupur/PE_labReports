import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Site } from '../common/site';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs';
import { Report } from '../common/report';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DiagnosisService {

  // Variables
  getSiteData: any;
  getSiteListData:any;
  report_input:any;
  site_name:string;
  getRepValue:any;
  pageUrl:any;
  report:Report = new Report();

  constructor(private httpClient : HttpClient,  private router: Router) { }
  private baseUrl = 'http://localhost:8080/api/siteCorpuses';

  // get list of all the sites
  async getSiteList(){
    await this.httpClient.get(this.baseUrl).toPromise()
      .then((response) => {
        this.getSiteListData = response;
      }).catch(
        error => {
          console.log('error message: ',error)
          this.router.navigate(['/error']);
        }
      )
    return this.getSiteListData;
  }

  // redirect to report table
  async getRep() {
    await this.httpClient.get(`http://localhost:8080/api/reportses/search/findAllBySiteContaining?site=${this.site_name}`).toPromise()
    .then((response) => {
        this.getRepValue = response;  
      }).catch(
        error => {
          console.log('error message: ',error)
          this.router.navigate(['/error']);
        }
      );
    
    return this.getRepValue;
  }

  new_rep : Report = new Report()
  updateReport(rep,site){
    
    console.log('in site service update report\n',rep,'\nnew site is\n ',site)

    // updating the report as we'll be updating based on ID
    this.new_rep.site = site
    this.new_rep.id = rep.id
    this.new_rep.report = rep.report

    console.log('updated report will be --------',this.new_rep)
    return this.httpClient.post('http://localhost:8080/updateReportSite',this.new_rep,
    {responseType: 'text' as 'json'})
  }

}
