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
  
  constructor(private dataService:DataService) { 
  }

  ngOnInit() {
    this.getText();
    
    this.options = this.dataService.getOptions();

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
}
