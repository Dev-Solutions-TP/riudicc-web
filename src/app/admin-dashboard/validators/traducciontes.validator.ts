import { AbstractControl, ValidationErrors, ValidatorFn, FormGroup, FormArray } from '@angular/forms';

export const traduccionesValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    if (!control || !(control instanceof FormArray)) return null;

    const formArray = control as FormArray;

    // Contar traducciones válidas
    const validCount = formArray.controls.filter(ctrl => ctrl.valid).length;

    // Solo devolver error si fue tocado y no cumple la condición
    if ((formArray.touched || formArray.dirty) && validCount < 2) {
        return { minTraducciones: true };
    }

    return null;

};