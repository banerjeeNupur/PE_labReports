import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Report } from '../common/report';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private httpClient:HttpClient) { }

  public uploadReport(report){
    return this.httpClient.post('http://localhost:8080/addReport',report,
    {responseType: 'text' as 'json'});
  }

  report:Report = new Report();
  update_report(){
    console.log('updating report!')
  }

  new_rep : Report = new Report()
  updateReport(rep,site, diag){
    
    console.log('in report service update report\n',rep,'\nnew site is\n ',site,'\nnew diagnosis is\n ',diag)

    // updating the report as we'll be updating based on ID
    this.new_rep.site = site
    this.new_rep.id = rep.id
    this.new_rep.report = rep.report
    if(diag === undefined) this.new_rep.final_diagnosis = rep.final_diagnosis 
    else this.new_rep.final_diagnosis = diag

    console.log('updated report will be --------',this.new_rep)
    return this.httpClient.post('http://localhost:8080/updateReportSite',this.new_rep,
    {responseType: 'text' as 'json'})
  }


}

