import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { CommonService } from '../../services/common.service';

@Injectable()
export class QuoteGuard implements CanActivate {
 
    constructor(private router: Router, private service:CommonService) { }
 
    canActivate() {
        var isFrame = sessionStorage.getItem('isIframe');
        if(isFrame!='yes'){
            sessionStorage.removeItem('isIframe');
        }
        this.service.editVal(false);
        return true;

    }



}
