
import { Component, computed, inject, LOCALE_ID, signal } from '@angular/core';
import { PageTitleComponent } from "../../components/page-title/page-title.component";
import { InstitucionesService } from './services/instituciones.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { InstitucionCardComponent } from "./components/project-card/institucion-card.component";

@Component({
  selector: 'app-aliados',
  imports: [PageTitleComponent, InstitucionCardComponent],
  templateUrl: './instituciones-page.component.html',
})
export class InstitucionesPageComponent {
  private currentLocale = signal(inject(LOCALE_ID));


  private institucionesServer = inject(InstitucionesService);



  institucionesResponse = rxResource({
    request: () => ({}),
    loader: ({ request }) => {

      return this.institucionesServer.getInstituciones({});
    }
  });



  sociosTitleText: Record<'es' | 'en' | 'fr', string> = {
    es: 'Socios',
    en: 'Strategic',
    fr: 'Partenaires',
  };

  firstWord = computed(() => {
    const locale = this.currentLocale() as 'es' | 'en' | 'fr';
    return this.sociosTitleText[locale] ?? 'News';
  });



  estrategicosTitleText: Record<'es' | 'en' | 'fr', string> = {
    es: 'Estratégicos',
    en: 'Partners',
    fr: 'Stratégiques',
  };

  secondWord = computed(() => {
    const locale = this.currentLocale() as 'es' | 'en' | 'fr';
    return this.estrategicosTitleText[locale] ?? 'News';
  });

}


