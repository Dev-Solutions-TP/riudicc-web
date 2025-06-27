import { AbstractControl, ValidationErrors, ValidatorFn, FormGroup, FormArray } from '@angular/forms';

export const traduccionesValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const traducciones = control as FormArray;

    if (!traducciones || traducciones.length < 2) {
        return { minTraducciones: true };
    }

    const idiomas = new Set<string>();

    for (let group of traducciones.controls) {
        if (!(group instanceof FormGroup)) continue;

        const idioma = group.get('idioma')?.value?.trim();
        const altText = group.get('altText')?.value?.trim();

        if (!idioma || !altText) {
            return { camposIncompletos: true };
        }

        if (idiomas.has(idioma)) {
            return { idiomasDuplicados: true };
        }

        idiomas.add(idioma);
    }

    return null; // ✅ todo correcto
};
