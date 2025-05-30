import { Component, computed, inject, input, LOCALE_ID, signal } from '@angular/core';
import { InstitucionEntity } from '../../interfaces/aliados.interface';
import { RouterLink } from '@angular/router';
import { InstitcionImagePipe } from "../../pipes/instituciones-project-image.pipe";

@Component({
  selector: 'institucion-card-short',
  imports: [RouterLink, InstitcionImagePipe],
  templateUrl: './institucion-card-short.component.html',
})
export class InstitucionCardShortComponent {
  readonly institucion = input.required<InstitucionEntity>();

  private locale = signal(inject(LOCALE_ID));

  readonly traduccion = computed(() => {
    const idioma = this.locale();
    const inst = this.institucion();
    return inst?.traducciones.find(t => t.idioma === idioma) ?? inst?.traducciones[0];
  });
}

