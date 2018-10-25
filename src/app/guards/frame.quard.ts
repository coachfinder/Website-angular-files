import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { CommonService } from '../../services/common.service';

@Injectable()
export class FrameGuard implements CanActivate {
 
    constructor(private router: Router, private service:CommonService) { }
 
    canActivate() {
         
     this.service.editVal(false);
     sessionStorage.setItem('isIframe','yes');
    return true;

    }



}
