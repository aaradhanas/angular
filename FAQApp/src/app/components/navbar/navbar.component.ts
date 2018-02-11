import { Component, OnInit } from '@angular/core';

import { KeycloakService } from '../../keycloak/keycloak.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private keycloakService: KeycloakService) { }

  ngOnInit() {
  }

  logout() {
    this.keycloakService.logout();
  }

}
