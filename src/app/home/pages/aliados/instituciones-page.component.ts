
import { Component, inject } from '@angular/core';
import { PageTitleComponent } from "../../components/page-title/page-title.component";
import { InstitucionesService } from './services/instituciones.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { InstitucionCardComponent } from "./components/project-card/institucion-card.component";

@Component({
  selector: 'app-aliados',
  imports: [PageTitleComponent, InstitucionCardComponent],
  templateUrl: './instituciones-page.component.html',
})
export class AliadosPageComponent {


  private institucionesServer = inject(InstitucionesService);



  institucionesResponse = rxResource({
    request: () => ({}),
    loader: ({ request }) => {

      return this.institucionesServer.getInstituciones({});
    }
  });


}
