import {AbstractControl} from '@angular/forms';

export class ValidationService {
    static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
        let config = {
            'required': 'This Field is Required.',
            'invalidEmailAddress': 'Invalid email address.',
            'invalidPassenger':'atleast 1 passenger required',
            'invalidPhone':'Phone number should be of 11 digits',
            'phonedigit':'Phone Number should be in digits only.',
            'alphaLastName':'Invalid last name.',
            'alphaName1':'Invalid name',
           
        };

        return config[validatorName];
    }

 
static emailValidator(control) {
        // RFC 2822 compliant regex
             if(control.value != null ){
        if (control.value.match(/^[a-z0-9,!#\$%&'\*\+/=\?\^_`\{\|}~-]+(\.[a-z0-9,!#\$%&'\*\+/=\?\^_`\{\|}~-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*\.([a-z]{2,4})$/)) {
            return null;
        } else {
            return { 'invalidEmailAddress': true };
        }
    }
}

    static passengerValidator(control){
        console.log("oneway")
        
        if(control.value >=1){
           
            return null;
        }else{
            return {'invalidPassenger':true}
        }
    }

    static phoneValidator(control){
        console.log("MOBILE VALIDATOR",control.value);
       
        if(control.value != null && control.value.match(/^\d+$/)) {
          
         
          if( control.value.length!==11){
        
              return { 'invalidPhone': true };
          }
          else {
              return null;
          }  
            
      } else if(control.value != null && !control.value.match(/^\d+$/)) {
   
          return { 'phonedigit': true };
      }
      else {
          
          return null;
      }
    }

    static nameValidator(control){
        if(control.value != null){ 
            if( control.value.match(/^[a-z- \xC0-\xFF]+$/i)) {
            
                return null;
            
            }   else if(control.value !='' && !control.value.match(/^[a-z- \xC0-\xFF]+$/i)) {
     
                return { 'alphaName1': true };
            }
           
            
            
            else {
                return null;
            }  
              
      
    
    }
   
}

static lastNameValidator(control){
    if(control.value != null){ 
        if( control.value.match(/^[a-zA-Z .]*$/)) {
        
            return null;
        
        }   else if(control.value !='' && !control.value.match(/^[a-zA-Z .]*$/)) {
 
            return { 'alphaLastName': true };
        }
       
        
        
        else {
            return null;
        }  
          
  

}

}

   
  





  
       
}