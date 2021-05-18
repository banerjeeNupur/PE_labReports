import { Component, OnInit } from '@angular/core';
import { DiagnosisService } from 'src/app/services/diagnosis.service';
import { Site } from '../../common/site';
import {Router} from '@angular/router';

import { NgbPaginationEllipsis } from '@ng-bootstrap/ng-bootstrap';
import { Diagnosis } from 'src/app/common/diagnosis';
declare var $: any;

@Component({
  selector: 'app-diag-dashboard',
  templateUrl: './diag-dashboard.component.html',
  styleUrls: ['./diag-dashboard.component.css']
})
export class DiagDashboardComponent implements OnInit { 
 
  constructor(private diagnosisService : DiagnosisService,private route: Router) { }
  diag_input:any;
  diagnosis:Diagnosis[];
  
  // pagination - default page number
  p:number = 1;

  // used for filtering
  input_diag:any;

  ngOnInit(){
    this.listSites()
  }

  // fetch all the sites
  async listSites(){
    const response = await this.diagnosisService.getDiagList();
    this.diagnosis = await response._embedded.diagnosisCorpuses;
    console.log('site length is: ',this.diagnosis.length)
  }
 
  // filter based on user input
  search(){
    if(this.input_diag==""){
      this.ngOnInit();
    }
    else{
      this.diagnosis = this.diagnosis.filter(res => { 
        this.p = 1;
        return res.diagnosis.toLocaleLowerCase().match(this.input_diag.toLocaleLowerCase());
      });
    }
  } 
   
  

  // entry point for site details
  
  searchRep(search_diag){
 
    this.diagnosisService.diag_name = search_diag;
    this.route.navigate(['/diag-details']);
   
   }
 
}
