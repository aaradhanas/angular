import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

import { IConverterOptionsChangeable } from 'ngx-showdown';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  text: string;
  
  constructor(private dataService:DataService) { }

  ngOnInit() {
    this.getText();
  }

  getText(){
    this.dataService.getHash()
    .subscribe(res => {
      this.text = res.text();
      console.log("text = "+ this.text);
    });
  }


}
