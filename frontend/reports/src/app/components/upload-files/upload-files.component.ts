import { Component, OnInit } from '@angular/core';
import { UploadFilesService } from '../../services/upload-files.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SiteService } from 'src/app/services/site.service';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css']
})
export class UploadFilesComponent implements OnInit {

  selectedFiles: FileList;
  progressInfos = [];
  message = '';
 
  fileInfos: Observable<any>;

  constructor(private uploadService: UploadFilesService, private siteService: SiteService) { }

  selectFiles(event) {
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
  }

  async uploadFiles() {

    
    this.message = '';

    for (let i = 0; i < this.selectedFiles.length; i++) {

      this.upload(i, this.selectedFiles[i]);
    }

    this.message = ''
    // this.siteService.getUndefinedSiteCount().then((response) => {
    //   this.undefinedSite_final = response;
      
    //   console.log('final update: ', this.undefinedSite_inital)
    //   this.message = (this.undefinedSite_final - this.undefinedSite_inital).toString()
    // });



  }
  
  upload(idx, file) {
    this.progressInfos[idx] = { value: 0, fileName: file.name };
  
    this.uploadService.upload(file).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          // this.fileInfos = this.uploadService.getFiles();
          // display the count of files that couldn't be parsed

          
          this.siteService.getUndefinedSiteCount().then((response) => {
            this.undefinedSite_final = response;
            
            console.log('final is: ', this.undefinedSite_final )
            this.message = (this.undefinedSite_final - this.undefinedSite_inital).toString()
          });  
        }
      },
      err => {
        this.progressInfos[idx].value = 0;
        this.message = 'Could not upload the file:' + file.name;
      });
  }

  undefinedSite_inital : number
  undefinedSite_final : number
  ngOnInit() {

    // call a function here that counts the number of undefined
    this.siteService.getUndefinedSiteCount().then((response) => {
      this.undefinedSite_inital = response;
      console.log('inital is: ', this.undefinedSite_inital)
    });

    this.uploadFiles()

    // final still gets the previous value ---------------------
    // this.uploadFiles().then((response) => {
    //   this.siteService.getUndefinedSiteCount().then((response) => {
    //     this.undefinedSite_final = response;
        
    //     console.log('final update: ', this.undefinedSite_final - this.undefinedSite_inital)
    //     this.message = (this.undefinedSite_final - this.undefinedSite_inital).toString()
    //   });  
    // });
        
    // this is new content
    // this.fileInfos = this.uploadService.getFiles();  
  }

}
