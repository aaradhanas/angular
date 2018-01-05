import { Injectable,Output, EventEmitter } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http'; 
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs';

import { IConverterOptionsChangeable } from 'ngx-showdown';

@Injectable()
export class DataService {


  @Output()
  versionChange: EventEmitter<String> = new EventEmitter();
  optionsChange: EventEmitter<String> = new EventEmitter();

  options : IConverterOptionsChangeable = {
    omitExtraWLInCodeBlocks: true,
    noHeaderId: false,
    parseImgDimensions: true,
    simplifiedAutoLink: true,
    literalMidWordUnderscores: true,
    strikethrough: true,
    tables: true,
    tablesHeaderId: false,
    ghCodeBlocks: true,
    tasklists: true,
    smoothLivePreview: true,
    disableForced4SpacesIndentedSublists: false,
    ghCompatibleHeaderId: true,
    smartIndentationFix: false,
    headerLevelStart: 3,
    prefixHeaderId: 'hId'
  }

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

  getOptions(){
    return this.options;
  }

  updateOptions(key,event){
    //TODO
    console.log("Updated options 2 = "+event);
    this.optionsChange.emit( JSON.stringify({"key": key, "value" : event }));
  }

  //This method is used for transmitting the current active version from left navbar to top navbar
  updateVersion(version){
    this.versionChange.emit(version);
  }
}
