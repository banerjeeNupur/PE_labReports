import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Report } from '../common/report';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private httpClient:HttpClient) { }

  report:Report = new Report();
  new_rep : Report = new Report()
  
  updateReport(rep,site, diag){
    
    console.log('in report service update report\n',rep,'\nnew site is\n ',site,'\nnew diagnosis is\n ',diag)

    // updating the report as we'll be updating based on ID
    this.new_rep.site = site
    this.new_rep.id = rep.id
    this.new_rep.report = rep.report
    if(diag === undefined) this.new_rep.diagnosis = rep.diagnosis 
    else this.new_rep.diagnosis = diag

    console.log('updated report will be --------',this.new_rep)
    
    return this.httpClient.post('http://localhost:8080/updateReport',this.new_rep,
    {responseType: 'text' as 'json'})
  } 


}

