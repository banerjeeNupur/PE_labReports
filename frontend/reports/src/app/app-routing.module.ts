import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SiteDashboardComponent } from './components/site-dashboard/site-dashboard.component';
import { DetailsComponent } from './components/details/details.component';
import { HomeComponent } from './components/home/home.component';
import { UploadFilesComponent } from './components/upload-files/upload-files.component';
import { EditSiteComponent } from './components/edit-site/edit-site.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { DiagDashboardComponent } from './components/diag-dashboard/diag-dashboard.component';


const routes : Routes = [
  {
    path: 'diag-reports/:keyword',
    redirectTo: 'diag-details',
    pathMatch: 'full'
  },
  {
    path: 'site-reports/:keyword',
    redirectTo: 'site-details',
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
    path: 'site-details',
    component: DetailsComponent,
  },
  {
    path: 'diag-details',
    component: DetailsComponent,
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

