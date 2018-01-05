import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { DataService } from '../../services/data.service';
import { IConverterOptionsChangeable } from 'ngx-showdown';

@Component({
  selector: 'app-left-navbar',
  templateUrl: './left-navbar.component.html',
  styleUrls: ['./left-navbar.component.css']
})
export class LeftNavbarComponent implements OnInit {


  checked:boolean = false;
  versions:string[] = [];
  options: IConverterOptionsChangeable = {};

  //set the current active version
  activeVersion:string = "1.8.5";
  
  constructor(private dataService:DataService) { }

  ngOnInit() {
    this.dataService.getVersions().subscribe( data => {
      this.versions = data;
      console.log("Versions : "+ this.versions);
    });
  
    this.options = this.dataService.getOptions();
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

  updateOptions(event, key){
    console.log("Updated options = "+key);

    this.options[key] = event;
    console.log("Updated options 1 = "+this.options[key]);
    this.dataService.updateOptions(key, event);

  }

}
