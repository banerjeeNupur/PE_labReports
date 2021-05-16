import { Component, OnInit } from '@angular/core';
import { DiagnosisService } from 'src/app/services/diagnosis.service';
import { Site } from '../../common/site';
import {Router} from '@angular/router';

import { NgbPaginationEllipsis } from '@ng-bootstrap/ng-bootstrap';
declare var $: any;

@Component({
  selector: 'app-diag-dashboard',
  templateUrl: './diag-dashboard.component.html',
  styleUrls: ['./diag-dashboard.component.css']
})
export class DiagDashboardComponent implements OnInit { 
 
  constructor(private diagnosisService : DiagnosisService,private route: Router) { }
  site_input:any;
  site:Site[];
  
  // pagination - default page number
  p:number = 1;

  // used for filtering
  input_site:any;

  // used for sorting based on site
  key = 'site'
  reverse: boolean = false;

  ngOnInit(){
    this.listSites()
  }

  // fetch all the sites
  async listSites(){
    const response = await this.diagnosisService.getSiteList();
    this.site = await response._embedded.siteCorpuses;
    console.log('site length is: ',this.site.length)
  }
 
  // filter based on user input
  search(){
    if(this.input_site==""){
      this.ngOnInit();
    }
    else{
      this.site = this.site.filter(res => {
       
        this.p = 1;
        return res.site.toLocaleLowerCase().match(this.input_site.toLocaleLowerCase());
      });
    }
  } 
   
  // sort based on site 
  sort(){
    this.reverse = !this.reverse;
  }

  // entry point for site details
  report_input:any;
  searchRep(search_site){
 
    this.diagnosisService.site_name = search_site;
    this.route.navigate(['/details']);
   
   }
 
}
