import { Component, computed, inject, input, LOCALE_ID, signal } from '@angular/core';
import { InstitucionEntity } from '@home/pages/instituciones/interfaces/aliados.interface';
import { InstitcionImagePipe } from '@home/pages/instituciones/pipes/instituciones-project-image.pipe';
import { abrirEnlace, getCountryCode, getImagenPrincipal, getTraduccion } from '@home/pages/instituciones/utils/institucion.utils';


@Component({
  selector: 'institucion-page-view',
  imports: [InstitcionImagePipe],
  templateUrl: './institucion-page-view.component.html',
})
export class InstitucionPageViewComponent {



  constructor() { }
  institucion = input.required<InstitucionEntity>();
  currentLocale = signal(inject(LOCALE_ID));

  traduccion = getTraduccion(this.institucion, this.currentLocale);

  imagenPrincipal =
    getImagenPrincipal(this.institucion);

  abrirEnlace = abrirEnlace;
  getCountryCode = getCountryCode;


}
