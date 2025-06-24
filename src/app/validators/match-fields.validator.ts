import { AbstractControl, ValidationErrors } from "@angular/forms";


export function matchFields(field1: string, field2: string) {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const control1 = formGroup.get(field1);
    const control2 = formGroup.get(field2);

    if (!control1 || !control2) {
      return null;
    }

    if (control2.errors && !control2.errors['mismatch']) {
      return null;
    }

    if (control1.value !== control2.value) {
      control2.setErrors({ mismatch: true });
      return { mismatch: true };
    } else {
      control2.setErrors(null);
      return null;
    }
  };
}
