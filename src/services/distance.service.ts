import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()

export class DistanceService {
  
    constructor(public http: Http) {
        
    }


    getDistance():Observable<any> {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
          console.log("***************", this.http.get("https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=Washington,DC&destinations=New+York+City,NY&key=AIzaSyDlCfL6mqtVo7h1f_q81Q6xfyoFmmrBh7Y")
        )
        return this.http.get("https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=Washington,DC&destinations=New+York+City,NY&key=AIzaSyDlCfL6mqtVo7h1f_q81Q6xfyoFmmrBh7Y")

    }
    createAuthorizationHeader(headers: Headers) {
        headers.append('Content-Type', 'application/json:charset=UTF-8'); 
        headers.append('Access-Control-Allow-Origin', '*');
       
       
        return headers;
    }



   

}
 

