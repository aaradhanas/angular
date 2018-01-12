import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

import 'showdown';

const showdownJs = require('showdown');
const converter = new showdownJs.Converter();

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  text: string;
  cText: string;
  options =  {};
  cOptions = {};

  savedCheckOpts = {};
  savedNumOpts = {};
  savedTextOpts = {};
  
  constructor(private dataService:DataService) { 
    console.log("this.text = "+ this.text);
  }

  ngOnInit() {
    this.getText();
    
    this.options = this.dataService.getOptions(); 

    //Move the options logic to service
    /*if(localStorage.getItem("checkOpts")){
       this.savedCheckOpts = JSON.parse(localStorage.getItem("checkOpts"));
    }

    if(localStorage.getItem("numOpts")){
      this.savedNumOpts = JSON.parse(localStorage.getItem("numOpts"));
    }

    if(localStorage.getItem("textOpts")){
      this.savedTextOpts = JSON.parse(localStorage.getItem("textOpts"));
    }

    for( var opt in this.options){
      if( this.savedCheckOpts.hasOwnProperty(opt)){
        this.options[opt] = this.savedCheckOpts[opt];
      }

      if( this.savedNumOpts.hasOwnProperty(opt)){
        this.options[opt] = this.savedNumOpts[opt];
      }

      if( this.savedTextOpts.hasOwnProperty(opt)){
        this.options[opt] = this.savedTextOpts[opt];
      }
    }*/

    for( var optType in this.options){
      console.log('optType = '+ optType);
      var typeOpts = this.options[optType];
      for( var opt in typeOpts){
        converter.setOption(opt, typeOpts[opt]);
      }
    }
   
    this.dataService.optionsChange.subscribe( opts => {
      for( var opt in opts){
        converter.setOption(opt, opts[opt]);
      }
      this.cText = converter.makeHtml(this.text);
    });
  }

  getText(){
    this.dataService.getHash()
    .subscribe(res => {
      this.text = res.text();
      this.cText = converter.makeHtml(this.text);
    });
  }

  textChanged(){
    console.log("textChanged");
    this.cText = converter.makeHtml(this.text);
  }
}
