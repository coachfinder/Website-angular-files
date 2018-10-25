import { Component, OnInit,HostBinding } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute, ParamMap,Params } from '@angular/router';
import { empty } from 'rxjs/observable/empty';
import {CommonService} from '../../services/common.service';
import { rightswipe } from '../../animations'
import {DigitalTracking} from '../../services/digital_tracking';
@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['../why-us/why-us.component.css'],
  animations: [ rightswipe ]

})
export class ThankyouComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'relative';

  constructor(private http:Http,
    private activatedRoute: ActivatedRoute,
    private router:Router,
    private c_service : CommonService,
    private digitalTracking:  DigitalTracking
  ) { 
    // this.digitalTracking.digitalTrackingPixel();
    let body = <HTMLDivElement> document.body;
    let script = document.createElement('script');
    script.innerHTML = '';
    script.src = "//a.tribalfusion.com/pixel/tags/Coachfinder/757203/pixel.js";
    script.async = true;
    script.defer = true;
    body.appendChild(script);
  }
    public lead_id:string = '';
    public vehicle_id:string = '';
  ngOnInit() {
    /** 
    window.scrollTo(0,0);
    this.activatedRoute.params.subscribe((params: Params) => {
    
      this.lead_id = params['leadid'];
      this.vehicle_id = params['vid'];
var request = {
  "request":{'LeadId' : this.lead_id, 'chosenVehicleId' : this.vehicle_id}
};

      this.c_service.forwardApi(request  
      ,'services/apexrest/Lead/convertLead').subscribe((response: any) => {
        console.log("Token Response", response.json());
 
      })
   });
   */
  }

}
