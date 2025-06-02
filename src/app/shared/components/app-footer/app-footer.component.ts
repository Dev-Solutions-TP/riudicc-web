import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LocaleService } from '@shared/services/locale.service';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './app-footer.component.html',
})
export class AppFooterComponent {


  localeService = inject(LocaleService);

  get locale() {
    return this.localeService.getLocale;
  }


  // Puedes mapear las rutas aquí si quieres cambiar los nombres fácilmente
  get coFoundedImg() {
    return this.locale === 'es'
      ? 'assets/images/eu/co-founded_es.png'
      : 'assets/images/eu/co-founded_en.png';
  }

  get coFoundedVerImg() {
    return this.locale === 'es'
      ? 'assets/images/eu/co-founded_es_ver.png'
      : 'assets/images/eu/co-founded_en_ver.png';
  }
}
