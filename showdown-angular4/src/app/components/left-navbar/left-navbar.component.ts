import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-left-navbar',
  templateUrl: './left-navbar.component.html',
  styleUrls: ['./left-navbar.component.css']
})
export class LeftNavbarComponent implements OnInit {


  checked:boolean = false;
  versions = ['develop','master'];

  //set the current active version
  activeVersion:string;

  checkOpts = {
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
  };
  
  numOpts = {
    'headerLevelStart': 3
  };

  textOpts = {
    'prefixHeaderId' : ''
  };
  
  constructor(private dataService:DataService) { }

  ngOnInit() {
    this.dataService.getVersions().subscribe( data => {
      for(var r in data){
        this.versions.push(data[r]);
      }
      console.log("Versions : "+ this.versions);
    });

    this.activeVersion = localStorage.getItem('version') || 'develop';

    //TODO Get options based on showdown version
    var options = this.dataService.getOptions();
    for( var opt in options){
      if (options.hasOwnProperty(opt)) {
        var nOpt = (options[opt].hasOwnProperty('defaultValue')) ? options[opt].defaultValue : true;
        if (options[opt].type === 'boolean') {
          if (!this.checkOpts.hasOwnProperty(opt)) {
            this.checkOpts[opt] = nOpt;
          }
        } else if (options[opt].type === 'integer') {
          if (!this.numOpts.hasOwnProperty(opt)) {
            this.numOpts[opt] = nOpt;
          }
        }
        else{
          if (!this.textOpts.hasOwnProperty(opt)) {
            // fix bug in showdown's older version that specifies 'ghCompatibleHeaderId' as a string instead of boolean
            if (opt === 'ghCompatibleHeaderId') {
              continue;
            }
            if (!nOpt) {
              nOpt = '';
            }
            this.textOpts[opt] = nOpt;
          }
        }
      }
    }

    var savedCheckOpts;
    var savedNumOpts;
    var savedTextOpts;

    if(localStorage.getItem("checkOpts")){
      savedCheckOpts = JSON.parse(localStorage.getItem("checkOpts"));
    }

    if(localStorage.getItem("numOpts")){
      savedNumOpts = JSON.parse(localStorage.getItem("numOpts"));
    }

    if(localStorage.getItem("textOpts")){
      savedTextOpts = JSON.parse(localStorage.getItem("textOpts"));
    }

    for( var opt in this.checkOpts){
     for( var savedOpt in savedCheckOpts){
       if(opt === savedOpt){
         this.checkOpts[opt] = savedCheckOpts[savedOpt];
       }
     }
    }

    for( var opt in this.numOpts){
      for( var savedOpt in savedNumOpts){
        if(opt === savedOpt){
          this.numOpts[opt] = savedNumOpts[savedOpt];
        }
      }
     }

    for( var opt in this.textOpts){
      for( var savedOpt in savedTextOpts){
        if(opt === savedOpt){
          this.textOpts[opt] = savedTextOpts[savedOpt];
        }
      }
     }
  }

  onVersionChange(){
    console.log("Updated version = "+ this.activeVersion);
    localStorage.setItem("version", this.activeVersion);
    this.dataService.updateVersion(this.activeVersion);
  }

  keys(obj: Object) {
    return Object.keys(obj);
  }

  isType( value:any, type:string){
    //console.log("value = "+ value+ ", type = "+type);
    return typeof value === type;
  }

  checkValueChanged(){
    localStorage.setItem("checkOpts",JSON.stringify(this.checkOpts));
    console.log("checkValueChanged = "+ JSON.stringify(this.checkOpts));
    this.dataService.updateOptions(this.checkOpts)
  }

  numValueChanged(){
    localStorage.setItem("numOpts",JSON.stringify(this.numOpts));
    console.log("numValueChanged = "+ JSON.stringify(this.numOpts));
    this.dataService.updateOptions(this.numOpts)
  }

  textValueChanged(){
    localStorage.setItem("textOpts",JSON.stringify(this.textOpts));
    console.log("textValueChanged = "+ JSON.stringify(this.textOpts));
    this.dataService.updateOptions(this.textOpts)
  }

}
