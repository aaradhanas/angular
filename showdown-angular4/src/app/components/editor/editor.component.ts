import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

import { IConverterOptionsChangeable } from 'ngx-showdown';
import { ShowdownConverter } from 'ngx-showdown';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  text: string;
  options: IConverterOptionsChangeable;
  
  constructor(private dataService:DataService, private showdownConverter:ShowdownConverter) { 
  }

  ngOnInit() {
    this.getText();
    
    this.options = this.dataService.getOptions();
  /*   this.options = showdown.getDefaultOptions();
    console.log("headerLevelStart = "+this.options['headerLevelStart']);*/
    this.showdownConverter.setOptions(this.options); 

    this.dataService.optionsChange.subscribe( option => {
      //console.log("headerLevelStart = "+this.options['headerLevelStart']);
      this.showdownConverter.setOption(JSON.parse(option).key, JSON.parse(option).value);
    });
  }

  getText(){
    this.dataService.getHash()
    .subscribe(res => {
      this.text = res.text();
    });
  }


}
