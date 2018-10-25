import { Component, OnInit, HostBinding } from '@angular/core';
import { BookingService } from '../../services/booking_service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';
import { empty } from 'rxjs/observable/empty';
import { CommonService } from '../../services/common.service';
import { rightswipe } from '../../animations'
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Location } from '@angular/common';
import { environment } from "../../environments/environment";
import { Message } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';
import {DigitalTracking} from '../../services/digital_tracking';
@Component({
  selector: 'app-step-fourth',
  templateUrl: './step-fourth.component.html',
  styleUrls: ['./step-fourth.component.css'],
  animations: [rightswipe],
})

export class StepFourthComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'relative';
  public msgs: Message[] = [];
  public openMod: boolean = false;
  public openModSec: boolean = false;
  public openModThrd: boolean = false;
  public hotel: any = false;
  public assist: boolean = false;
  public events: any
  public Id: any;
  public hotel_room_info: string;
  public ferry_crossing_info: string;
  public event_tickets: any = [];
  public FinalEvents: any = [];
  public digitError: boolean = false;
  public sessionHotel: string;
  public sessionAssist: string;
  newName: any = [];
  SelectedId: any = [];
  SelectedIdFinal: any = [];
  public privateHireId: string;
  public momentid: string;
  public extraValues: any = [];
  public values=[];
  isIframe=false;


  public payment_url = environment.payment_url;

  constructor(public services: BookingService,
    private http: Http,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private c_service: CommonService,
    private spinnerService: Ng4LoadingSpinnerService,
    private location: Location,
    private messageService: MessageService,
    private digitalTracking: DigitalTracking,

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
  public lead_id: string = '';
  public vehicle_id: string = '';
  public message:any
  ngOnInit() {
    window.scrollTo(0, 0);
    if(sessionStorage.getItem('isIframe') == 'yes'){
      this.isIframe = true;
    }else{
      this.isIframe = false;
    }

    this.spinnerService.show();
    var LeadProcessed = localStorage.getItem('isProcessed');
    console.log("LEAD PROCESS STATUS", LeadProcessed);


    this.activatedRoute.params.subscribe((params: Params) => {

      this.lead_id = params['leadid'];
      this.vehicle_id = params['vid'];
      this.message = params['msg'];
      console.log("message",this.message)
      

      var request = {
        "request": { 'LeadId': this.lead_id, 'chosenVehicleId': this.vehicle_id }
      };
      if (localStorage.getItem(this.lead_id + 'isProcessed') != 'true') {
        this.c_service.forwardApi(request,'services/apexrest/Lead/convertLead').subscribe((response: any) => {
            this.spinnerService.hide();

            if(this.message == 0){
              this.messageService.add({severity: 'success', summary: 'Coachfinder',  detail:"We have emailed your quote, please add any extras to add to this order."});
             }

            console.log("Token Response", response.json());
            var data = response.json();
            if (data.isSuccess) {
              localStorage.setItem(this.lead_id + 'isProcessed', 'true');
              this.privateHireId = data.privateHire.Id;
              this.momentid = data.privateHire.Movements__r.records[0].Id;
              console.log(this.privateHireId);
              console.log(this.momentid);
              this.events = data.extras;
              console.log("EVENTS",this.events)
              localStorage.setItem('oppid', this.privateHireId);
            } else {
              alert("Error occured! please try after some time.");
              this.location.back();
              console.log("Failure")
            }


          })
      } else {
        this.spinnerService.hide();
        if(!this.isIframe){
          this.router.navigate(['/']);
        }else{
          this.router.navigate(['/frame'])
        }
  
      }

    });
  }
  openModal() {
    this.openMod = !this.openMod
    this.openModSec = false;
    this.openModThrd = false;
    if (this.hotel) {
      this.hotel_room_info = "1";
    } else {
      this.hotel_room_info = "0";
    }
  }
  openModalSecond() {
    this.openModSec = !this.openModSec;
    this.openMod = false;
    this.openModThrd = false;
    if (this.assist) {
      this.ferry_crossing_info = "1";
    } else {
      this.ferry_crossing_info = "0";
    }
  }
  openModalThird() {
    //this.SelectedId = [];
    //this.newName = [];
    this.FinalEvents = [];
    this.openModThrd = !this.openModThrd;
    this.openMod = false;
    this.openModSec = false;
    console.log("FINAL SLECTION", this.SelectedId)
  }
  closeModalThird() {

    this.openModThrd = !this.openModThrd;
    this.openMod = false;
    this.openModSec = false;

  }




  setHotel(checked) {
    if (checked === "yes") {
      this.hotel = true;
    

    } else {
      this.hotel = false;


    }
  }

  assistance(checked) {
    if (checked == "yes") {
      this.assist = true;
      console.log("assist checked");
    } else {
      this.assist = false;
      console.log("assist Unchecked");

    }
  }

  attraction(id,i) {
  
    if (this.SelectedId[id] == undefined || this.SelectedId[id] == empty || this.SelectedId[id] == false) {
      this.SelectedId[id] = true;
      this.SelectedIdFinal[i]=true;
    } else {
      // alert("i am called")
      this.SelectedId[id] = false;
      this.extraValues[id] = '';
      this.SelectedIdFinal[i]=false;

    }
  
    console.log("***selectedId data", this.SelectedId);
    console.log("sected id" + id, this.SelectedId[id]);
    console.log("checked",this.SelectedIdFinal)


  }

  newFun(id,i) {
    console.log("get value", this.newName[id]);
    this.extraValues[id] = this.newName[id];
    console.log(this.extraValues);
    this.values[i]=this.newName[id];
  }

  keyUp(id, e) {
    console.log("keyup", e);

  }

  completeBooking() {
    this.spinnerService.show();

    var extras = [];
    for (var i = 0; i < this.events.length; i++) {
      console.log(this.events[i].Id);
      if (this.SelectedId[this.events[i].Id] != undefined) {
        if (this.extraValues[this.events[i].Id] != undefined && this.extraValues[this.events[i].Id] != '' && this.extraValues[this.events[i].Id] != '0') {
          var selected = { "extraId": this.events[i].Id, "extraQuantity": this.extraValues[this.events[i].Id] };
          extras.push(selected);
          console.log("extra",extras)
        }


      }


    }
    console.log(extras);

    // console.log('valuesss',this.FinalEvents);

    var request = {
      "request":
      {
        "movementId": this.momentid,
        "privateHireId": this.privateHireId,
        "hotelRoom": this.hotel,
        "ferryCrossing": this.assist,
        "Extras": extras
      }
    };
    console.log(extras.length);
    var messageNeeded = false;
    if (this.hotel == true || this.assist == true || extras.length > 0) {
      messageNeeded = true;
    }

    this.c_service.forwardApi(request, 'services/apexrest/Movement/addExtras').subscribe((response: any) => {
      console.log("Token Response", response.json());
      var data = response.json();
      if (data.isSuccess) {
        this.spinnerService.hide();
        if (messageNeeded) {
          this.messageService.add({ severity: 'success', summary: 'Coachfinder', detail: 'Extras added successfully.' });
          var ___this = this;
          setTimeout(function () {
           
            window.location.href = ___this.payment_url + ___this.privateHireId;
            // this.router.navigate(['/quote_summary/'+ this.privateHireId +'/'+this.lead_id])
            
          }, 2000);

        } else {
      
          window.location.href = this.payment_url + this.privateHireId;
          // this.router.navigate(['/quote_summary/'+ this.privateHireId +'/'+this.lead_id])

        }
      } else {
        this.spinnerService.hide();
        alert("Failure. Please try after some time.")
      }


    })


  }


}
