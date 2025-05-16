import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, Routes } from '@angular/router';
import homeRoutes from '../../home.routes';

import { extractRoutes } from '../../utils/extract-routes.util';
@Component({
  selector: 'home-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './home-navbar.component.html',
})
export class HomeNavbarComponent {


  homeRoutes = extractRoutes(homeRoutes);

}

