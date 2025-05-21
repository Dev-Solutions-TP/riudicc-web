import { Component, computed, inject, input, LOCALE_ID, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ProjectImagePipe } from '../../pipes/instituciones-project-image.pipe';
import { Institucion } from '../../interfaces/aliados.interface';

@Component({
  selector: 'institucion-card',
  imports: [RouterLink, ProjectImagePipe,],
  templateUrl: './institucion-card.component.html',
})
export class InstitucionCardComponent {

  constructor() { }

  currentLocale = signal(inject(LOCALE_ID));

  institucion = input.required<Institucion>();

  // currentLocale = signal('es'); // o 'en', o como quieras gestionar el idioma

  // Obtiene la traducción preferida según idiomaActual, sino la primera
  traduccion = computed(() => {
    const actual = this.institucion().traducciones.find(
      t => t.idioma === this.currentLocale()
    );

    return actual ?? this.institucion().traducciones[0];
  });

  // Obtiene la imagen principal (puedes usar la primera o una que cumpla algún criterio)
  imagenPrincipal = computed(() => {
    // Devuelve el primer objeto de imagen o undefined
    return this.institucion().images?.[0];
  });


  abrirEnlace(url: string) {
    window.open(url, '_blank');
  }

  getCountryCode(pais: string): string {
    const mapping: Record<string, string> = {
      'Ecuador': 'ec',
      'México': 'mx',
      'Dominican Republic': 'do',
      'España': 'es',
    };

    return mapping[pais.trim()]?.toLowerCase() || 'un'; // 'un' fallback = unknown
  }

}
