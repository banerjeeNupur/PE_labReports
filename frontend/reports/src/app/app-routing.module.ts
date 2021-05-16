import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SiteDashboardComponent } from './components/site-dashboard/site-dashboard.component';
import { DetailsSiteComponent } from './components/details-site/details-site.component';
import { HomeComponent } from './components/home/home.component';
import { UploadFilesComponent } from './components/upload-files/upload-files.component';
import { EditSiteComponent } from './components/edit-site/edit-site.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { DiagDashboardComponent } from './components/diag-dashboard/diag-dashboard.component';


const routes : Routes = [
  {
    path: 'reports/:keyword',
    redirectTo: 'details',
    pathMatch: 'full'
  },
  {
    path: 'annotate/:keyword',
    redirectTo: 'edit-site',
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'upload',
    component: UploadFilesComponent,
  },
  
  {
    path: 'edit-site',
    component: EditSiteComponent
  },
  {
    path: 'details',
    component: DetailsSiteComponent,
  },
  {
    path: 'home',
    component: HomeComponent
  }, 
  {
    path: 'app-site-dashboard',
    component: SiteDashboardComponent,
  },
  {
    path: 'app-diag-dashboard',
    component: DiagDashboardComponent,
  },
  {
    path: 'error',
    component: ErrorPageComponent
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
  
  
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})

export class AppRoutingModule { 
  
}

