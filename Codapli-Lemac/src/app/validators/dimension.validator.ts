import { FormControl } from '@angular/forms';

export function DimensionValidator (control: FormControl) {
    let email = control.value; 
    if (control.value) {      
      if (control.value.match()) { 
        return { dimension: true }
      }
    }
    return null; 
}