import { Component, computed, inject, LOCALE_ID, signal } from '@angular/core';
import { PageTitleComponent } from "../../components/page-title/page-title.component";
import { HomeCarouselComponent } from "./components/home-carousel/home-carousel.component";
import { BannersService } from './services/banner.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { NoticiasService } from '@home/pages/noticias-page/services/noticia.service';
import { NoticiaCardComponent } from "../noticias-page/components/noticia-card/noticia-card.component";
import { RouterLink } from '@angular/router';




@Component({
  selector: 'app-home-page',
  imports: [RouterLink, HomeCarouselComponent, NoticiaCardComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {

  private currentLocale = signal(inject(LOCALE_ID));

  private bannersService = inject(BannersService);
  private noticiasService = inject(NoticiasService);

  bannersResponse = rxResource({
    request: () => ({}),
    loader: ({ request }) => {
      return this.bannersService.getBanners({});
    }
  });


  noticiasResponse = rxResource({
    request: () => ({ limit: 3, offset: 0 }),
    loader: ({ request }) => this.noticiasService.getNoticias(request),
  });



  titulosNoticiaPage: Record<'es' | 'en' | 'fr', string> = {
    es: 'Nosotros',
    en: 'About Us',
    fr: 'À propos de nous',
  };

  about = computed(() => {
    const locale = this.currentLocale() as 'es' | 'en' | 'fr';
    return this.titulosNoticiaPage[locale] ?? 'News';
  });


  aboutContenidoText: Record<'es' | 'en' | 'fr', string> = {
    es: 'RIUDICC es la Red Internacional de Universidades para el Desarrollo Inclusivo y el Intercambio Científico y Cultural, una iniciativa cofinanciada por la Unión Europea, conformada por diez Instituciones de Educación Superior provenientes de Europa, América Latina y el Caribe.',
    en: 'RIUDICC is the International Network of Universities for Inclusive Development and Scientific and Cultural Exchange, an initiative co-financed by the European Union, made up of ten Higher Education Institutions from Europe, Latin America and the Caribbean.',
    fr: 'RIUDICC est le Réseau international des universités pour le développement inclusif et l\'échange scientifique et culturel, une initiative cofinancée par l\'Union européenne, composée de dix établissements d\'enseignement supérieur provenant d\'Europe, d\'Amérique latine et des Caraïbes.',
  };

  aboutContenido = computed(() => {
    const locale = this.currentLocale() as 'es' | 'en' | 'fr';
    return this.aboutContenidoText[locale] ?? 'News';
  });



  noticiasTitulo: Record<'es' | 'en' | 'fr', string> = {
    es: 'Noticias',
    en: 'News',
    fr: 'Actualités',
  };

  noticias = computed(() => {
    const locale = this.currentLocale() as 'es' | 'en' | 'fr';
    return this.noticiasTitulo[locale] ?? 'News';
  });


}
