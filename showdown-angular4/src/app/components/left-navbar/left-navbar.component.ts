import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-left-navbar',
  templateUrl: './left-navbar.component.html',
  styleUrls: ['./left-navbar.component.css']
})
export class LeftNavbarComponent implements OnInit {


  checked:boolean = false;
  versions:string[] = [];

  //set the current active version
  activeVersion:string = "1.8.5";

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
      this.versions = data;
      console.log("Versions : "+ this.versions);
    });
  }

  onVersionChange(){
    console.log("Updated version = "+ this.activeVersion);
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
    console.log("checkValueChanged = "+ this.dataService.updateOptions(this.checkOpts));
  }

  numValueChanged(){
    console.log("numValueChanged = "+ this.dataService.updateOptions(this.numOpts));
  }

  textValueChanged(){
    console.log("textValueChanged = "+ this.dataService.updateOptions(this.textOpts));
  }

}
