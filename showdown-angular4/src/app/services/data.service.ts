import { Injectable,Output, EventEmitter } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http'; 
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs';


var showdownJs = require('showdown');

@Injectable()
export class DataService {

  leftVisible:boolean = true;

  @Output()
  versionChange: EventEmitter<String> = new EventEmitter();
  optionsChange: EventEmitter<String> = new EventEmitter();
  leftVisibleChange: EventEmitter<boolean> = new EventEmitter();

  options = {
    'checkOpts' : {
      'omitExtraWLInCodeBlocks': true,
      'noHeaderId': false,
      'parseImgDimensions': true,
      'simplifiedAutoLink': true,
      'literalMidWordUnderscores': true,
      'strikethrough': true,
      'tables': true,
      'tablesHeaderId': false,
      'ghCodeBlocks': true,
      'tasklists': true,
      'smoothLivePreview': true,
      'prefixHeaderId': false,
      'disableForced4SpacesIndentedSublists': false,
      'ghCompatibleHeaderId': true,
      'smartIndentationFix': false
    },
    'numOpts' : {
      'headerLevelStart': 3
    },
    'textOpts' : {
      'prefixHeaderId' : ''
    }
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
   var defaultOptions = showdownJs.getDefaultOptions(false);

   var savedCheckOpts;
   var savedNumOpts;
   var savedTextOpts;

   for( var opt in defaultOptions){
    if (defaultOptions.hasOwnProperty(opt)) {
      var nOpt = (defaultOptions[opt].hasOwnProperty('defaultValue')) ? defaultOptions[opt].defaultValue : true;
      if (defaultOptions[opt].type === 'boolean') {
        if (!this.options.checkOpts.hasOwnProperty(opt)) {
          this.options.checkOpts[opt] = nOpt;
        }
      } else if (defaultOptions[opt].type === 'integer') {
        if (!this.options.numOpts.hasOwnProperty(opt)) {
          this.options.numOpts[opt] = nOpt;
        }
      }
      else{
        if (!this.options.textOpts.hasOwnProperty(opt)) {
          // fix bug in showdown's older version that specifies 'ghCompatibleHeaderId' as a string instead of boolean
          if (opt === 'ghCompatibleHeaderId') {
            continue;
          }
          if (!nOpt) {
            nOpt = '';
          }
          this.options.textOpts[opt] = nOpt;
        }
      }
    }
  }
  if(localStorage.getItem("checkOpts")){
    savedCheckOpts = JSON.parse(localStorage.getItem("checkOpts"));
  }

  if(localStorage.getItem("numOpts")){
    savedNumOpts = JSON.parse(localStorage.getItem("numOpts"));
  }

  if(localStorage.getItem("textOpts")){
    savedTextOpts = JSON.parse(localStorage.getItem("textOpts"));
  }

  for( var opt in this.options.checkOpts){
   for( var savedOpt in savedCheckOpts){
     if(opt === savedOpt){
       this.options.checkOpts[opt] = savedCheckOpts[savedOpt];
     }
   }
  }

  for( var opt in this.options.numOpts){
    for( var savedOpt in savedNumOpts){
      if(opt === savedOpt){
        this.options.numOpts[opt] = savedNumOpts[savedOpt];
      }
    }
   }

  for( var opt in this.options.textOpts){
    for( var savedOpt in savedTextOpts){
      if(opt === savedOpt){
        this.options.textOpts[opt] = savedTextOpts[savedOpt];
      }
    }
   }
   
   return this.options;
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