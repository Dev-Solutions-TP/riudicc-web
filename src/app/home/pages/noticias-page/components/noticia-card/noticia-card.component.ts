import { Component, computed, inject, input, LOCALE_ID, signal } from '@angular/core';
import { NoticiaEntity } from '../../interfaces/noticia.interface';
import { NoticiaImagePipe } from '../../pipes/noticia-project-image.pipe';
import { RouterLink } from '@angular/router';

import { LocalizationService } from '@shared/services/localization.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'noticia-card',
  imports: [RouterLink, NoticiaImagePipe, DatePipe],
  templateUrl: './noticia-card.component.html',
})
export class NoticiaCardComponent {


  //constructor
  constructor() {

  }

  private locale = signal(inject(LOCALE_ID));
  private lang = inject(LocalizationService);


  noticia = input.required<NoticiaEntity>();
  horizontal = input(false); // true = imagen izquierda, false = imagen abajo

  traduccion = computed(() => {
    const lang = this.locale();
    const t = this.noticia().traducciones.find(trad => trad.idioma === lang);
    return t ?? this.noticia().traducciones[0];
  });

  imagenPrincipal = computed(() => {

    console.log('NoticiaCardComponent.slug', this.noticia().slug);
    console.log('NoticiaCardComponent notiicias', this.noticia().images);

    console.log('NoticiaCardComponent.imagenPrincipal', this.noticia().images?.[0]);


    return this.noticia().images?.[0];
  });

  viewMoreText = this.lang.viewMoreText;



}
