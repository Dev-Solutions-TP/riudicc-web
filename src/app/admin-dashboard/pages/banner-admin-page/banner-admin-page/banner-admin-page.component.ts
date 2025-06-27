import { Component, effect, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { BannersService } from '@home/pages/home-page/services/banner.service';
import { map } from 'rxjs';
import { BannerDetailsComponent } from "../banner-details/banner-details.component";

@Component({
  selector: 'app-banner-admin-page',
  imports: [BannerDetailsComponent],
  templateUrl: './banner-admin-page.component.html',
})
export class BannerAdminPageComponent {


  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  bannersService = inject(BannersService);

  bannerId = toSignal(
    this.activatedRoute.params.pipe(map((params: { [x: string]: any; }) => params['id']))
  );


  bannerReosurce = rxResource({
    request: () => ({ id: this.bannerId() }),
    loader: ({ request }) => {
      console.log('Loading banner with ID:', request.id);
      return this.bannersService.getBannerById(request.id);
    },
  });

  redirectEffect = effect(() => {
    if (this.bannerReosurce.error()) {
      this.router.navigate(['/admin/banners']);
    }
  });

}
