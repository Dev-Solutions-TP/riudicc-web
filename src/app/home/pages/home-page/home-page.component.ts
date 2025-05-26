import { Component, inject } from '@angular/core';
import { PageTitleComponent } from "../../components/page-title/page-title.component";
import { HomeCarouselComponent } from "./components/home-carousel/home-carousel.component";
import { BannersService } from './services/banner.service';
import { rxResource } from '@angular/core/rxjs-interop';




@Component({
  selector: 'app-home-page',
  imports: [PageTitleComponent, HomeCarouselComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {




  private bannersService = inject(BannersService);

  bannersResponse = rxResource({
    request: () => ({}),
    loader: ({ request }) => {
      return this.bannersService.getBanners({});
    }
  });


}
