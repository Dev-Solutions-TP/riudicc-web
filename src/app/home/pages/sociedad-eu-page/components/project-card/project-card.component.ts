import { Component, computed, inject, input, LOCALE_ID, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SociedadEU } from '../../interfaces/sociedad.interface';
import { ProjectImagePipe } from '../../pipes/project-image.pipe';

@Component({
  selector: 'project-card',
  imports: [RouterLink, ProjectImagePipe],
  templateUrl: './project-card.component.html',
})
export class ProjectCardComponent {

  constructor() { }

  currentLocale = signal(inject(LOCALE_ID));

  proyecto = input.required<SociedadEU>();

  // currentLocale = signal('es'); // o 'en', o como quieras gestionar el idioma

  // Obtiene la traducción preferida según idiomaActual, sino la primera
  traduccion = computed(() => {
    const actual = this.proyecto().traducciones.find(
      t => t.idioma === this.currentLocale()
    );
    return actual ?? this.proyecto().traducciones[0];
  });

  // Obtiene la imagen principal (puedes usar la primera o una que cumpla algún criterio)
  imagenPrincipal = computed(() => {
    // Devuelve el primer objeto de imagen o undefined
    return this.proyecto().images?.[0];
  });

}
