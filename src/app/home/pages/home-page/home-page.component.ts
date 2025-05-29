import { Component, inject } from '@angular/core';
import { PageTitleComponent } from "../../components/page-title/page-title.component";
import { HomeCarouselComponent } from "./components/home-carousel/home-carousel.component";
import { BannersService } from './services/banner.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { NoticiasService } from '@home/pages/noticias-page/services/noticia.service';
import { NoticiaCardComponent } from "../noticias-page/components/noticia-card/noticia-card.component";




@Component({
  selector: 'app-home-page',
  imports: [PageTitleComponent, HomeCarouselComponent, NoticiaCardComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {


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


}
