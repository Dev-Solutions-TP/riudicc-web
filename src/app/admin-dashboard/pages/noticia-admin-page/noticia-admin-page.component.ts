import { Component, effect, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { NoticiaDetailsComponent } from './product-details/noticia-details.component';
import { NoticiasService } from '@home/pages/noticias-page/services/noticia.service';




@Component({
  selector: 'app-product-admin-page',
  imports: [NoticiaDetailsComponent],
  templateUrl: './noticia-admin-page.component.html',
})
export class ProductAdminPageComponent {
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  noticiasService = inject(NoticiasService);

  productId = toSignal(
    this.activatedRoute.params.pipe(map((params) => params['id']))
  );

  productResource = rxResource({
    request: () => ({ id: this.productId() }),
    loader: ({ request }) => {
      return this.noticiasService.getNoticiaById(request.id);
    },
  });

  redirectEffect = effect(() => {
    if (this.productResource.error()) {
      this.router.navigate(['/admin/products']);
    }
  });
}
