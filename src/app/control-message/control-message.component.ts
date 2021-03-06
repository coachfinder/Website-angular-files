
import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ValidationService } from '../../services/validation.service';

@Component({
  selector: 'control-messages',
  template: `<div *ngIf="errorMessage !== null" 
  style= "background: #ff0000;
  position: absolute;
  left: 0px;
  top: 0px;
  font-size: 12px;
  color: #ffffff;
  width: 100%;
  padding-top: 48px;
  padding-bottom: 1px;
  text-align: center;" >{{errorMessage}}</div>`
})

export class ControlMessageComponent {
 
  @Input() control: FormControl;
  constructor() { }

  get errorMessage() {
    
  
    for (let propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
        return ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
      }
    }
    
    return null;
  }
}



