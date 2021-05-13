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
    document.getElementById('div_upload_message').style.display = 'none'
  }

  uploadFiles() {

    console.log(this.selectedFiles)
    this.message = '';
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
        console.log('loop number: ',i)
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
            document.getElementById('parse_button').style.visibility = 'visible'
          },1500)
        
        }
      },
      err => {
        this.progressInfos[idx].value = 0;
        this.message = 'Could not upload the file:' + file.name;
      });
  }

  parseFiles(){
    this.uploadService.parseFiles().then(
      (response) => {
        console.log('in parse files : ',response)
        if(response === 0){
          this.message = 'site detected for all the files!'
          console.log('site detected for all')
          document.getElementById('div_upload_message').style.display = 'block'
        } 
        else {
          this.message = 'could not detect site for ' + response + ' file(s)'
          console.log('couldn\'t detect for ', response, ' file(s)')
          document.getElementById('div_upload_message').style.display = 'block'
        }
      }
    )
  }
  
  ngOnInit() {}

}
