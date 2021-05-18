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
  
  getDiagListData:any;
  
  diag_name:string;
  getRepValue:any;
  pageUrl:any;
  report:Report = new Report();

  constructor(private httpClient : HttpClient,  private router: Router) { }
  private baseUrl = 'http://localhost:8080/api/diagnosisCorpuses';

  // get list of all the sites
  async getDiagList(){
    await this.httpClient.get(this.baseUrl).toPromise()
      .then((response) => {
        // console.log('corpus list: ',response)
        this.getDiagListData = response;
      }).catch(
        error => {
          console.log('error message: ',error)
          this.router.navigate(['/error']);
        }
      )
    return this.getDiagListData;
  }

  // redirect to report table
  async getRep() {
    await this.httpClient.get(`http://localhost:8080/api/reportses/search/findAllByFinal_diagnosisContaining?diagnosis=${this.diag_name}`).toPromise()
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
  updateReport(rep,diag){
    
    console.log('in site service update report\n',rep,'\nnew diag is\n ',diag)

    // updating the report as we'll be updating based on ID
    this.new_rep.site = diag
    this.new_rep.id = rep.id
    this.new_rep.report = rep.report

    console.log('updated report will be --------',this.new_rep)
    return this.httpClient.post('http://localhost:8080/updateReportSite',this.new_rep,
    {responseType: 'text' as 'json'})
  }

}
