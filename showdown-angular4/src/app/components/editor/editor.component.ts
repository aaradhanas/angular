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

  constructor(private dataService:DataService) { 
    console.log("this.text = "+ this.text);
  }

  ngOnInit() {
    this.getText();
    
    this.options = this.dataService.getOptions(); 

    for( var optType in this.options){
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
