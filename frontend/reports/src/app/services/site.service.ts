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
export class SiteService {
    
  // Variables
  getSiteData: any;
  getSiteListData:any;
  report_input:any;
  site_name:string;
  diag_name:string;
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


  temp : any
  // redirect to report table
  async getRep() {
    if(this.temp === 'site'){
      await this.httpClient.get(`http://localhost:8080/api/reportses/search/findAllBySiteContaining?site=${this.site_name}`).toPromise()
      .then((response) => {
        this.getRepValue = response;  
        console.log('response object: ',response)
      }).catch(
        error => {
          console.log('error message: ',error)
          this.router.navigate(['/error']);
        }
      );
    }
    else if(this.temp === 'diag'){
      await this.httpClient.get(`http://localhost:8080/api/reportses/search/findAllByDiagnosisContaining?diagnosis=${this.diag_name}`).toPromise()
    .then((response) => {
        this.getRepValue = response;  
        console.log('response object: ',response)
        
      }).catch(
        error => {
          console.log('error message: ',error)
          this.router.navigate(['/error']);
        }
      );
    
    }
    
    return this.getRepValue;
  }   
}



