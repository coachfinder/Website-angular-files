import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from "../environments/environment";



@Injectable()

export class BookingService {
    //private baseUrl: string = "https://api.myjson.com/bins/h1ksz";
    private baseUrl: string = environment.apiurl;
    private newBaseUrl: string = "https://thekingsferry--4cdev.cs88.my.salesforce.com/services";

    private getLeadDetails :string = environment.getLeadDetails;


    constructor(public http: Http) {

    }



    forwardApi(data: any) {
        var Senddata = { 'data': JSON.stringify(data), 'url': this.getLeadDetails+"/services/apexrest/Lead/getLeadDetails", token: localStorage.getItem('access_token') }


        let params = new URLSearchParams;
        for (let key in Senddata) {
            var value = Senddata[key];
            params.append(key, value);
        }
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', 'Access-Control-Allow-Origin': '*' });
        return this.http.post(`${this.baseUrl}/forward/api`, params, { headers: headers });
    }

    getDistance(from, to) {
        var Senddata = { 'from': from, 'to': to }
        let params = new URLSearchParams;
        for (let key in Senddata) {
            var value = Senddata[key];
            params.append(key, value);
        }
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', 'Access-Control-Allow-Origin': '*' });
        return this.http.post(`${this.baseUrl}/forward/distance`, params, { headers: headers });
    }

    // destination page
    getLocationDetails(from, to){
        console.log("FROM",from);
        console.log("To",to);

        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
        return this.http.get(`${this.baseUrl}/forward/getAddressByKey?from=${from}&to=${to}`);
    
    }

    leadDetail(id: any) {
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });

        return this.http.get(`${this.baseUrl}/booking/lead?lead_id=${id}`, { headers: headers });

    }

    getEvent() {
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });

        return this.http.get(`${this.baseUrl}/booking/events`, { headers: headers });

    }


    addEvents(lead_id: string, hotel_room_info: string, ferry_crossing_info: string, event_tickets: any) {

        var Senddata = { lead_id: lead_id, hotel_room_info: hotel_room_info, ferry_crossing_info: ferry_crossing_info, event_tickets: event_tickets };
        let headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(`${this.baseUrl}/booking/eventsadd`, Senddata, { headers: headers });

    }


    getAuthentication() {
        return this.http.get(`${this.baseUrl}/forward/login`);
    }


}

