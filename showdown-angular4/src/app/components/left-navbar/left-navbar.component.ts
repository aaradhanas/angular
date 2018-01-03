import { Component, OnInit } from '@angular/core';

import { DataService } from '../../services/data.service';
import { IConverterOptionsChangeable } from 'ngx-showdown';

@Component({
  selector: 'app-left-navbar',
  templateUrl: './left-navbar.component.html',
  styleUrls: ['./left-navbar.component.css']
})
export class LeftNavbarComponent implements OnInit {

  checkOpts : IConverterOptionsChangeable = {
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
    prefixHeaderId: false,
    disableForced4SpacesIndentedSublists: false,
    ghCompatibleHeaderId: true,
    smartIndentationFix: false
  }

  numOpts : IConverterOptionsChangeable = {
    headerLevelStart: 1
  }

  textOpts : IConverterOptionsChangeable = {
    ghMentionsLink: 'https://github.com/{u}',
    prefixHeaderId: ''
  }

  checked:boolean = false;
  versions:string[] = [];

  //set the current active version
  activeVersion:string = "1.8.5";

  constructor(private dataService:DataService) { }

  

  ngOnInit() {
    this.dataService.getVersions().subscribe( data => {
      this.versions = data;
      console.log("Versions : "+ this.versions);
    });
  }

  onVersionChange(){
    console.log("Changed version = "+ this.activeVersion);
  }

  keys(obj: Object) {
    return Object.keys(obj);
}

}
