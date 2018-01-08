import { Injectable,Output, EventEmitter } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http'; 
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs';

import 'showdown';

const showdownJs = require('showdown');
const converter = new showdownJs.Converter();

@Injectable()
export class DataService {

  leftVisible:boolean = true;

  @Output()
  versionChange: EventEmitter<String> = new EventEmitter();
  optionsChange: EventEmitter<String> = new EventEmitter();
  leftVisibleChange: EventEmitter<boolean> = new EventEmitter();

  options = {
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
   var options = showdownJs.getDefaultOptions(false);
   console.log(options);
   return options;
  }

  updateOptions(opts){
    //TODO
    this.optionsChange.emit(opts);
  }

  //This method is used for transmitting the current active version from left navbar to top navbar
  updateVersion(version){
    this.versionChange.emit(version);
  }

  isLeftVisible(){
    return this.leftVisible;
  }

  setLeftVisible(isVisible){
    this.leftVisible = isVisible;
    this.leftVisibleChange.emit(this.leftVisible);
  }
}