import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DetailsSiteComponent } from './components/details-site/details-site.component';
import { HomeComponent } from './components/home/home.component';
import { UploadFilesComponent } from './components/upload-files/upload-files.component';
import { EditSiteComponent } from './components/edit-site/edit-site.component';



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
    path: 'dashboard',
    component: DashboardComponent,
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

