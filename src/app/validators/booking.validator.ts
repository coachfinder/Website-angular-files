import { AbstractControl } from '@angular/forms';

export function PassengerValidater(control: AbstractControl) {
    console.log("i am called",control.value);
if(control.value <=0){
    return { validPassenger: false };
}
 
}