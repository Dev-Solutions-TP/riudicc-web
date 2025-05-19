import { Component, inject } from '@angular/core';
import { PageTitleComponent } from '@home/components/page-title/page-title.component';
import { ProjectCardComponent } from './components/project-card/project-card.component';
import { SociedadEuService } from './services/sociedad.service';

import { rxResource } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-socieda-eu-page',
  imports: [ProjectCardComponent, PageTitleComponent],
  templateUrl: './sociedad-eu-page.component.html',
})
export class SociedaEuPageComponent {

  private sociedadService = inject(SociedadEuService);



  sociedadResponse = rxResource({
    request: () => ({}),
    loader: ({ request }) => {
      return this.sociedadService.getSociedad({});
    }
  });




}


