import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function phoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null; // No se valida si no hay valor (esto se maneja con Validators.required)
    }

    const isValidPhone = /^\d{10}$/.test(value); 

    return !isValidPhone ? { phoneInvalid: true } : null;
  };
}
