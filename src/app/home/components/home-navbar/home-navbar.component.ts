import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, Routes } from '@angular/router';
import homeRoutes from '../../home.routes';

import { extractRoutes } from '../../utils/extract-routes.util';
import { LocaleService } from '@shared/services/locale.service';
import { UpperCasePipe } from '@angular/common';
import { ROUTE_TITLES } from 'src/app/constants/route-titles';



@Component({
  selector: 'home-navbar',
  imports: [RouterLink, RouterLinkActive, UpperCasePipe],
  templateUrl: './home-navbar.component.html',
})
export class HomeNavbarComponent {


  homeRoutes = extractRoutes(homeRoutes);

  // Inyecta el servicio
  localeService = inject(LocaleService);

  toggleLocale() {
    this.localeService.changeLocale(
      this.localeService.getLocale === 'es' ? 'en' : 'es'
    );
  }

  // Obtiene el título traducido según el key y el idioma actual
  getTitle(key: string) {
    const locale = this.localeService.getLocale;
    return ROUTE_TITLES[key]?.[locale] ?? key;
  }
}

