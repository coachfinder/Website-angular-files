import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import { environment } from "../environments/environment";


@Injectable()

export class CommonService {
    public quickPopouter = new BehaviorSubject<boolean>(null)
    public destinationClick = new BehaviorSubject<boolean>(null)

    public changeVar = new BehaviorSubject<boolean>(null)
    public searchFormValue = new BehaviorSubject<any>(null)
    public leadData = new BehaviorSubject<any>(null);
    changeValue = this.changeVar.asObservable()
    // Search = this.changeVar.asObservable()

    constructor(public http: Http) {
    }
    private baseUrl: string = environment.apiurl;;

    editVal(newVal) {
        console.log("COMMON SERVICE newValue", newVal)
        this.changeVar.next(newVal);
    }
    popouter(bol) {
        console.log("COMMON SERVICE newValue", bol)
        this.quickPopouter.next(bol);
    }
    desClicked(clicks){
        console.log("destination clicked",clicks);
        this.destinationClick.next(clicks)

    }


    searchForm(data) {
        console.log("person info from common service", data);
        this.searchFormValue.next(data);

    }

    leadDataService(leaddata) {
        this.leadData.next(leaddata);
    }


    forwardApi(data: any, uri) {
        if (typeof uri === 'undefined') {
            uri = "services/apexrest/Lead/getLeadDetails/convertLead";
        }
        console.log("***",JSON.stringify(data));

        var Senddata = { 'data': JSON.stringify(data), 'url': "https://thekingsferry.my.salesforce.com/" + uri, token: localStorage.getItem('access_token') }
        let params = new URLSearchParams;
        for (let key in Senddata) {
            var value = Senddata[key];
            params.append(key, value);
        }
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', 'Access-Control-Allow-Origin': '*' });
        return this.http.post(`${this.baseUrl}/forward/api`, params, { headers: headers });
    }

    contactUs(data) {
        let SendData = { 'name': data.Name, 'email': data.email, 'phone': data.phnumber, 'message': data.message }
        let headers = new Headers({ 'Content-Type': 'application/json; charset=UTF-8', 'Access-Control-Allow-Origin': '*' });

        return this.http.post(`${this.baseUrl}/page/contact_us`, SendData, { headers: headers })
            .map((res: any) => {
                return JSON.parse(res._body)
            })
    }
    signup(data){
        let SendData ={'name':data.Name,'email':data.email};
        // let headers = new Headers({'Content-Type':'application/json; charset=UTF-8','Access-control-Allow-Origin':'*'});
        return this.http.post(`${this.baseUrl}/page/signup`,SendData)
        .map((res:any)=>{
            return JSON.parse(res._body);
        })
    }

    get_address(location) {
        return this.http.get(`${this.baseUrl}/forward/addressvalues?location=` + location);
    }

}
