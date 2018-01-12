import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-left-navbar',
  templateUrl: './left-navbar.component.html',
  styleUrls: ['./left-navbar.component.css']
})
export class LeftNavbarComponent implements OnInit {


  visible:boolean;
  versions = ['develop','master'];

  //set the current active version
  activeVersion:string;

  checkOpts = {}
  numOpts = {}
  textOpts = {}
  
  constructor(private dataService:DataService) { }

  ngOnInit() {
    this.visible = this.dataService.isLeftVisible();
    this.dataService.leftVisibleChange.subscribe( visible => {
      this.visible = visible;
    })

    this.dataService.getVersions().subscribe( data => {
      for(var r in data){
        this.versions.push(data[r]);
      }
      console.log("Versions : "+ this.versions);
    });

    this.activeVersion = localStorage.getItem('version') || 'develop';

    //TODO Get options based on showdown version
    var options = this.dataService.getOptions();
    this.checkOpts = options['checkOpts']
    this.numOpts = options['numOpts']
    this.textOpts = options['textOpts']
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
