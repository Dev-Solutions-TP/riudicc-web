import { Component, computed, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SociedadEU } from '../../interfaces/sociedad.interface';

@Component({
  selector: 'project-card',
  imports: [RouterLink],
  templateUrl: './project-card.component.html',
})
export class ProjectCardComponent {

  constructor() { }


  proyecto = input.required<SociedadEU>();

  idiomaActual = signal('es'); // o 'en', o como quieras gestionar el idioma

  // Obtiene la traducción preferida según idiomaActual, sino la primera
  traduccion = computed(() => {
    const actual = this.proyecto().traducciones.find(
      t => t.idioma === this.idiomaActual()
    );
    return actual ?? this.proyecto().traducciones[0];
  });

  // Obtiene la imagen principal (puedes usar la primera o una que cumpla algún criterio)
  imagenPrincipal = computed(() => {
    // Devuelve el primer objeto de imagen o undefined
    return this.proyecto().images?.[0];
  });

}
