import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http'; 
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs';

@Injectable()
export class DataService {

  constructor(private http: Http) { }

  getVersions(): Observable<string[]>{
    return this.http
      .get("https://api.github.com/repos/showdownjs/showdown/releases")
      .map( res => {
        return res.json().map( item => { 
          return item.tag_name;
        });
      })
      //TODO compare versions greater than 1.0.0
  }

  getHash(){
    return this.http.get('assets/md/text.md');
  }
}
