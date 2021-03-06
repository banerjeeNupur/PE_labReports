import { Component, OnInit } from '@angular/core';
import { SiteService } from 'src/app/services/site.service';
import { Site } from '../../common/site';
import {Router} from '@angular/router';

import { NgbPaginationEllipsis } from '@ng-bootstrap/ng-bootstrap';
declare var $: any;

@Component({
  selector: 'app-site-dashboard',
  templateUrl: './site-dashboard.component.html',
  styleUrls: ['./site-dashboard.component.css']
})
export class SiteDashboardComponent implements OnInit { 
 
  constructor(private siteService : SiteService,private route: Router) { }
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
    document.getElementById('site-loader').style.display = 'block'
    const response = await this.siteService.getSiteList();
    this.site = await response._embedded.siteCorpuses;
    console.log('site length is: ',this.site.length)
    document.getElementById('site-loader').style.display = 'none'
    document.getElementById('site-list').style.display = 'block'
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
    this.siteService.site_name = search_site;
    this.siteService.temp = 'site'
    this.route.navigate(['/site-details']);
   
   }
 
}
