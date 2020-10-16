import { AbstractControl, FormControl } from '@angular/forms';


export class custmValidators{
    debouncer: any;
    static userService: any;

    constructor() { }
    
    static validpassword(control:AbstractControl):{[key: string]: boolean} | null {
        if(control.value){
        if (control.value != control.parent.controls['password1'].value) {            
            return {invalid: true};
        }
        }
        return null;
        
    }


}