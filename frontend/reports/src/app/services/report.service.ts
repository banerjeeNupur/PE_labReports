import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http:HttpClient) { }

  public uploadReport(report){
  
    return this.http.post('http://localhost:8080/addReport',report,
    {responseType: 'text' as 'json'});
  }



}

