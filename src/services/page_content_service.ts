import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from "../environments/environment";



@Injectable()

export class PageContentService {

    private baseUrl: string = environment.apiurl;
    public pageIdVal: string;
    constructor(public http: Http) {
        //look at local storage to check if user is loged in
    }

    getPageContent(path: string) {
        console.log("PATh", path, )
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });

        return this.http.get(`${this.baseUrl}/${path}`, { headers: headers });
    }






}

