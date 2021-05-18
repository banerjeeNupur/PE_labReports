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

  
}
