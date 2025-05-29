import { Component, computed, inject, input, LOCALE_ID, signal } from '@angular/core';
import { NoticiaEntity } from '../../interfaces/noticia.interface';
import { NoticiaImagePipe } from '../../pipes/noticia-project-image.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'noticia-card',
  imports: [RouterLink, NoticiaImagePipe],
  templateUrl: './noticia-card.component.html',
})
export class NoticiaCardComponent {


  private locale = signal(inject(LOCALE_ID));
  noticia = input.required<NoticiaEntity>();
  horizontal = input(false); // true = imagen izquierda, false = imagen abajo

  traduccion = computed(() => {
    const lang = this.locale();
    const t = this.noticia().traducciones.find(trad => trad.idioma === lang);
    return t ?? this.noticia().traducciones[0];
  });

  imagenPrincipal = computed(() => this.noticia().images?.[0]);



}
