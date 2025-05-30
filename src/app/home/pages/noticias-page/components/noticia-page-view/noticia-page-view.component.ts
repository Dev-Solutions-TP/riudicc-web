import { Component, computed, inject, input, InputSignal, LOCALE_ID, signal, WritableSignal } from '@angular/core';
import { getTraduccionNoticia } from '../../utils/noticia.utils';
import { NoticiaEntity } from '../../interfaces/noticia.interface';
import { NoticiaImagePipe } from "../../pipes/noticia-project-image.pipe";
import { NoticiaCarouselComponent } from "../noticia-carousel/noticia-carousel.component";
import { InstitcionImagePipe } from "../../../instituciones/pipes/instituciones-project-image.pipe";
import { ImageNamePipe } from '@shared/pipes/image.pipe';
import { RouterLink } from '@angular/router';
import { Institucion } from '@home/pages/instituciones/interfaces/aliados.interface';
import { DatePipe } from '@angular/common';
import { EnlaceIconPipe } from "../../../../../shared/pipes/icon.pipe";

@Component({
  selector: 'noticia-page-view',
  imports: [RouterLink, NoticiaCarouselComponent, ImageNamePipe, DatePipe, EnlaceIconPipe],
  templateUrl: './noticia-page-view.component.html',
})
export class NoticiaPageViewComponent {


  noticia = input.required<NoticiaEntity>();
  currentLocale = signal(inject(LOCALE_ID));


  traduccion = getTraduccionNoticia(this.noticia, this.currentLocale);

  imagenPrincipal = computed(() => this.noticia().images?.[0]);

  getTraduccionInstitucion(inst: Institucion) {
    const lang = this.currentLocale();
    return inst.traducciones.find(t => t.idioma === lang) ?? inst.traducciones[0];
  }


}


