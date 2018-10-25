import { Injectable,Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import { environment } from "../environments/environment";
import { DOCUMENT } from '@angular/common';

@Injectable()

export class DigitalTracking {
    

    constructor(
        public http: Http,
        @Inject(DOCUMENT) private document, 
           
    ) {
    }

    digitalTrackingPixel(){
      
        // let body = <HTMLDivElement> document.body;
        // let script = document.createElement('script');
        // script.innerHTML = '';
        // script.src = "//a.tribalfusion.com/pixel/tags/Coachfinder/757203/pixel.js";
        // script.async = true;
        // script.defer = true;
        // body.appendChild(script);

    }

}
