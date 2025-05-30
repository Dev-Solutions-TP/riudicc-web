import { Component, computed, inject, LOCALE_ID, signal } from '@angular/core';
import { NoticiasService } from '../../services/noticia.service';
import { ActivatedRoute } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { NoticiaPageViewComponent } from "../../components/noticia-page-view/noticia-page-view.component";
import { NoticiaCardComponent } from "../../components/noticia-card/noticia-card.component";
import { PageTitleComponent } from "../../../../components/page-title/page-title.component";

@Component({
  selector: 'app-noticia-page',
  imports: [NoticiaPageViewComponent, NoticiaCardComponent, PageTitleComponent],
  templateUrl: './noticia-page.component.html',
})
export class NoticiaPageComponent {

  private noticiasService = inject(NoticiasService);
  currentLocale = signal(inject(LOCALE_ID));
  activatedRoute = inject(ActivatedRoute);

  noticiaIdSlug = signal(this.activatedRoute.snapshot.paramMap.get('idSlug') ?? '');

  noticiaResource = rxResource({
    request: () => ({ idSlug: this.noticiaIdSlug }),
    loader: ({ request }) => this.noticiasService.getNoticiaByIdSlug(request.idSlug()),
  });

  titulosNoticiaPage: Record<'es' | 'en' | 'fr', string> = {
    es: 'Noticia',
    en: 'News',
    fr: 'Actualité',
  };

  titulo = computed(() => {
    const locale = this.currentLocale() as 'es' | 'en' | 'fr';
    return this.titulosNoticiaPage[locale] ?? 'News';
  });


}
