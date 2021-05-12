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
  undefinedSite_inital : number
  undefinedSite_final : number
  fileInfos: Observable<any>;

  constructor(private uploadService: UploadFilesService, private siteService: SiteService) { }

  selectFiles(event) {
    this.undefinedSite_inital = 0
    console.log('inital : ',this.undefinedSite_inital)
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
  }

  uploadFiles() {
    
    this.siteService.getUndefinedSiteCount().then((response) => {
      this.undefinedSite_inital = response;
      console.log('inital is: ', this.undefinedSite_inital)
    });

    console.log(this.selectedFiles)
    this.message = '';
      for (let i = 0; i < this.selectedFiles.length; i++) {
          setTimeout(() => {
            this.upload(i, this.selectedFiles[i]);
            console.log('loop number: ',i)
          },3000)
      }
    this.message = ''
  }
  
  upload(idx, file) {
    
    this.progressInfos[idx] = { value: 0, fileName: file.name };
    this.uploadService.upload(file).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
          
        } else if (event instanceof HttpResponse) {
                 
          setTimeout(() => { 
            
            this.siteService.getUndefinedSiteCount().then((response) => {
            this.undefinedSite_final = response;            
            console.log('final is: ', this.undefinedSite_final )
            this.message = (this.undefinedSite_final - this.undefinedSite_inital).toString() + ' files didn\'t have site mentioned'
            document.getElementById('div_upload').style.display = "block"
          }); }, 1000);
        }
      },
      err => {
        this.progressInfos[idx].value = 0;
        this.message = 'Could not upload the file:' + file.name;
      });
  }

  parseFiles(){
    this.uploadService.parseFiles()
  }
  
  ngOnInit() {}

}
