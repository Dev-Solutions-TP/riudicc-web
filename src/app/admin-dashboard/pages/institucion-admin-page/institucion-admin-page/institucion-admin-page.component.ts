// Archivo: institucion-admin-page.component.ts
import { Component, effect, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { InstitucionesService } from '@home/pages/instituciones/services/instituciones.service';
import { map } from 'rxjs';
import { InstitucionDetailsComponent } from '../institucion-details/institucion-details.component';

@Component({
  selector: 'institucion-admin-page',
  standalone: true,
  imports: [InstitucionDetailsComponent],
  templateUrl: './institucion-admin-page.component.html',
})
export class InstitucionAdminPageComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private instService = inject(InstitucionesService);

  institucionId = toSignal(
    this.route.params.pipe(map((params: { [x: string]: any; }) => params['id']))
  );

  institucionResource = rxResource({
    request: () => ({ id: this.institucionId() }),
    loader: ({ request }) => {
      return this.instService.getInstitucionByIdSlugUser(request.id);
    },
  });

  redirectEffect = effect(() => {
    if (this.institucionResource.error()) {
      this.router.navigate(['/admin/universidades']);
    }
  });
}
