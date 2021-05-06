import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { SiteService } from './services/site.service';

import { Routes, RouterModule, Router } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DetailsSiteComponent } from './components/details-site/details-site.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { UploadComponent } from './components/upload/upload.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgxPaginationModule} from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReportService } from './services/report.service';

import { EditSiteComponent } from './components/edit-site/edit-site.component';
import { UploadFilesComponent } from './components/upload-files/upload-files.component';
import { UploadFilesService } from './services/upload-files.service';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DetailsSiteComponent,
    NavbarComponent,
    HomeComponent,
    UploadComponent,
    EditSiteComponent,
    UploadFilesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    Ng2SearchPipeModule,
    OrderModule,
    NgxPaginationModule,
    FormsModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule
  ],
  providers: [SiteService,ReportService, UploadFilesService],
  bootstrap: [AppComponent]
})
export class AppModule { }