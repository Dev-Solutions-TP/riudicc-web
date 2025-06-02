import { Component, computed, inject, LOCALE_ID, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { InstitucionesService } from '@home/pages/instituciones/services/instituciones.service';
import { getImagenPrincipal } from '@home/pages/instituciones/utils/institucion.utils';
import { InstitucionPageViewComponent } from './components/institucion-page-view/institucion-page-view.component';
import { PageTitleComponent } from "../../../../components/page-title/page-title.component";

@Component({
  selector: 'app-institucion',
  imports: [InstitucionPageViewComponent, PageTitleComponent],
  templateUrl: './institucion-page.component.html',
})
export class InstitucionPageComponent {

  private institucionesService = inject(InstitucionesService);
  currentLocale = signal(inject(LOCALE_ID));




  activatedRoute = inject(ActivatedRoute);
  param = this.activatedRoute.snapshot.paramMap.get('idSlug') ?? '';

  institucionIdslug = signal(this.param);

  institucionResource = rxResource({
    request: () => ({ idSlug: this.institucionIdslug }),
    loader: ({ request }) => {
      console.log('Cargando institución para:', request.idSlug());
      return this.institucionesService.getInstitucionByIdSlug(request.idSlug());
    }
  });


  sociosTitleText: Record<'es' | 'en' | 'fr', string> = {
    es: 'Socio',
    en: 'Partner',
    fr: 'Partenaire',
  };

  titulo = computed(() => {
    const locale = this.currentLocale() as 'es' | 'en' | 'fr';
    return this.sociosTitleText[locale] ?? 'News';
  });


}
