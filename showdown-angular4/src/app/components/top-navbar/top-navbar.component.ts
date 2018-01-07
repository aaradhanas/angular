import { Component, OnInit } from '@angular/core';

import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.css']
})
export class TopNavbarComponent implements OnInit {

  showModal:boolean = false;
  version:string;
  text: string;
  hashText: string;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.version = localStorage.getItem("version") || 'develop';
    this.dataService.versionChange.subscribe( version => {
      //this.version = version;
      this.version = localStorage.getItem("version") || 'develop';
    })
  }

  getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
  }

  getHash(){
    this.dataService.getHash()
    .subscribe(res => {
      this.text = res.text();
      this.hashText = document.location.origin + document.location.pathname + '#/' + encodeURIComponent(this.text);
      this.showModal = true;
    });
  }

}
