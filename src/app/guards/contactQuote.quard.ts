import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { CommonService } from '../../services/common.service';

@Injectable()
export class ContactQuoteGuard implements CanActivate {
 
    constructor(private router: Router, private service:CommonService) { }
 
    canActivate() {
         
     this.service.editVal(true);
     return true;

    }



}
