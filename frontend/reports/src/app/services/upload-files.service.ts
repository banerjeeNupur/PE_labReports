import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient, private router: Router) { }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  // run the python script
  count:any
  async parseFiles(){
    
    let load = document.getElementById("loader")
    load.style.display = "block"
    console.log('load spinner :',load.style.display)
    await this.http.get('http://localhost:8080/parse').toPromise()
    .then((response) => {
        this.count = response;
        console.log('parsed: ',response)  
        load.style.display = "none"
        console.log('load spinner response:',load.style.display)
      }).catch(
        error => {
          console.log('error message: ',error)
          this.router.navigate(['/error']);
        }
      );

    return this.count
  
  }

}
