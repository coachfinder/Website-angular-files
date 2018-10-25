import { Component, OnInit, Input, ElementRef, NgZone, ViewChild, Renderer2, AfterViewChecked, HostBinding, OnChanges } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';
import { } from 'googlemaps';
import { MapsAPILoader, } from '@agm/core';
import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms'
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { PlatformLocation } from '@angular/common';
import { ValidationService } from '../../services/validation.service';

import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { rightswipe } from '../../animations'
import { BookingService } from '../../services/booking_service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { GrowlModule } from 'primeng/growl';
import { Message } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';


@Component({
  selector: 'app-step-third',
  templateUrl: './step-third.component.html',
  styleUrls: ['./step-third.component.css'],
  animations: [rightswipe]
})
export class StepThirdComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'relative';

  public Auto_Price__c: any
  public Coachfinder_Cheaper_Price__c: any
  public Coachfinder_Downsize_Price__c: any
  public Coachfinder_Upgrade_Price__c: any
  public Coachfinder_Upsize_Price__c: any

  msgs: Message[] = [];
  model: NgbDateStruct;
  model2: NgbDateStruct;
  public is_edit: boolean = true
  showdistance:boolean=  true;

  timeVal = false;
  date: { day: number, month: number, year: number };

  @ViewChild("firstDiv") public firstDiv: ElementRef
  @ViewChild("secDiv") public secDiv: ElementRef;
  @ViewChild("location") public Location: ElementRef;
  @ViewChild("destination") public Destination: ElementRef;

  @ViewChild("location2") public Location2: ElementRef;
  @ViewChild("destination2") public Destination2: ElementRef;

  @ViewChild("passenger") public Passenger: ElementRef

  @ViewChild("openOrder") public openOrder: ElementRef


  public minDate: any;
  public minDateSec: any;

  public oneWayRoute: boolean;
  public twoWayRoute: boolean;
  public withReturn: boolean = false;
  public vehicleToStay:boolean = true;

  public time: any = [];

  public latitude1: number;
  public longitude1: number;
  public latitude2: number;
  public longitude2: number;
  public sourceControl: FormControl;
  public destinationControl: FormControl;
  public leadData: any;
  public leadDetail: any;
  public validVoucher:any;

  displayMonths = 2;
  navigation = 'select';
  showWeekNumbers = false;
  bookingForm: FormGroup;
  bookingFormSec: FormGroup;
  loc: string;
  des: string;
  public userId: string;
  public vehicle: string;
  public vehicleNew: string;
  public request: any;

  public formVal: boolean = true;
  public return_date: string;
  public dept_date: string;
  public distance: any = 0;
  public distanceValue: string;
  public duration: string;
  public new_distance: any;
  public recommentedText: string;
  public showCheaper: boolean = false;
  public recomendMessage:boolean = false;
  public validCoupon:boolean;
  public VoucherCoupon:any;
  public couponValue:any;
  public emptyy:boolean;
  zeroError=[false,false,false,false,false];
  zeroErr=false;
  isIframe=false;
  viewImg=[false,false,false,false,false]

  public channel:any;
  public VehicleStandard = [{ id: 1, name: "Standard Coach" }, { id: 1, name: "Executive Coach" }, { id: 1, name: "VIP Coach" }, {id: 1, name: "Bus"}, {id: 1, name: "Vintage Bus"}];
  public VehicleStandardFrame = [
    {
      id: 1,
      name: "Bus"
    },
    {
      id: 1,
      name: "Vintage Bus"
    },
    {
      id: 1,
      name: "Standard Coach"
    },
    {
      id: 1,
      name: "Executive Coach"
    },

    {
      id: 1,
      name: "VIP Coach"
    }
   
  ];
  public tooltip = {
    'Standard Coach': 'Includes: Reclining seats, reading lights, seat belts, air-con, tinted windows, hot drinks facility, refrigerator, curtains and arm rests.',
    'Executive Coach': 'Includes: Reclining seats, reading lights, seat belts, air-con, tinted windows, hot drinks facility, refrigerator, curtains, arm rests and toilet facilities.',
    'Luxury Coach': 'Includes: Reclining seats, reading lights, seat belts, air-con, tinted windows, hot drinks facility, refrigerator, curtains, arm rests toilet facilities, leather seats, power sockets and kitchen facilities.',
    'Single Decker Bus':'Includes grab rails and sliding windows.',
    'Double Decker Bus':'Includes grab rail, handles and bars, opening windows and upstairs seating.',
    'Vintage Bus':'Includes grab rails, sliding windows and upstairs seating.'
  
  };
  public coachtext = {
    'recommend': 'Executive Coach', 'cheaper': 'Standard Coach',
    'vip': "Luxury Coach", 'smaller': 'Executive Coach', 'upsize': 'Executive Coach'
  };
  public seats = { 'recommend': '', 'smaller': '', 'upsize': '', 'cheaper': '', 'vip': '' };
  public sheetsneed = 0;
  constructor(
    private messageService: MessageService,
    private service: CommonService,
    private router: Router,
    private fb: FormBuilder,
    private mapsAPILoader: MapsAPILoader,
    private activatedRoute: ActivatedRoute,
    private ngZone: NgZone, private http: Http,
    private rd: Renderer2,
    private BookingService: BookingService,
    private spinnerService: Ng4LoadingSpinnerService,
    location: PlatformLocation,

  ) {

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    var dt = new Date(yyyy, mm, dd);
    var nd = new Date(dt.setTime(dt.getTime() + (24 * 60 * 60 * 1000)));
    this.minDate = { year: nd.getFullYear(), month: nd.getMonth(), day: nd.getDate() };

    this.bookingForm = fb.group({
      'sourceControl': [null, Validators.required],
      'destinationControl': [null, Validators.required],
      'passengerControl': [null, [Validators.required, ValidationService.passengerValidator]],
      'pickDateControl': [null, Validators.required],
      'returnDateControl': [null, Validators.required],
      'departureTimeControl': [null, Validators.required],
      'returnTimeControl': [null, Validators.required],
      'vehicleStandradControl': [null, Validators.required],
      'voucher':[''],
    })

    this.bookingFormSec = fb.group({
      'sourceControl': [null, Validators.required],
      'destinationControl': [null, Validators.required],
      'passengerControl': [null, [Validators.required, ValidationService.passengerValidator]],
      'pickDateControl': [null, Validators.required],
      'returnDateControl': [],
      'departureTimeControl': [null, Validators.required],
      'returnTimeControl': [],
      'vehicleStandradControl': [null, Validators.required],
      'voucher':[''],
    })
  }


  ngOnInit() {
    window.scrollTo(0, 0);
    var lastSegment = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);
    if(sessionStorage.getItem('isIframe')=='yes'){
      this.isIframe = true;
      this.channel ='NXBUS'
    }else{
      this.isIframe = false;
      this.channel ='CF'
    }
    if(this.oneWayRoute){
      console.log("oninit DEBUG",this.bookingFormSec)
    }else{
      console.log("oninit DEBUG",this.bookingForm)
    }
   
    this.activatedRoute.params.subscribe((params: Params) => {

      this.userId = params['Id'];
      // console.log("lead id", this.userId);

    });
    this.leadDetail = JSON.parse(localStorage.getItem(this.userId));
     this.checkForZeroPriceMsg();
    this.leadData = JSON.parse(localStorage.getItem(this.userId + "_request"));
 
  
    this.VoucherCoupon = this.leadData.request.request.voucherName;
    this.couponValue=this.leadData.request.request.voucherName;
  
    this.bookingForm.controls['voucher'].setValue(this.couponValue);
    this.bookingFormSec.controls['voucher'].setValue(this.couponValue);
    if(this.leadDetail.Voucher_Amount__c){
      console.log("is coupn",this.leadDetail.Voucher_Amount__c)
      this.validCoupon = true;
      setTimeout(() => {
        this.bookingForm.get('voucher').disable();
        this.bookingFormSec.get('voucher').disable();
      }, 10)
    }else if(this.leadData.request.request.voucherName== null || this.leadData.request.request.voucherName==''){
      this.validCoupon = false;
      this.emptyy = true;
     
      
    }else{
  
      this.validCoupon = false;
      this.emptyy = false
     
    }
    console.log("lead Data",this.leadData);
    this.vehicleToStay = this.leadData.request.request.vehicleToStay;
    console.log("PSSNGR",typeof this.leadData.request.request.passengers);
    console.log("recommended", this.leadDetail.Vehicle_Seats__c);
   this.duration = this.leadData.duration;
    
   if(parseInt(this.leadDetail.Vehicle_Seats__c) < parseInt(this.leadData.request.request.passengers)){
     this.recomendMessage = true;
   }
    // set per person price
    this.Auto_Price__c = (this.leadDetail.Auto_Price__c / this.leadData.request.request.passengers).toFixed(2);
    this.Coachfinder_Cheaper_Price__c = (this.leadDetail.Coachfinder_Cheaper_Price__c / this.leadData.request.request.passengers).toFixed(2);
    this.Coachfinder_Downsize_Price__c = (this.leadDetail.Coachfinder_Downsize_Price__c / this.leadData.request.request.passengers).toFixed(2);
    this.Coachfinder_Upgrade_Price__c = (this.leadDetail.Coachfinder_Upgrade_Price__c / this.leadData.request.request.passengers).toFixed(2);
    this.Coachfinder_Upsize_Price__c = (this.leadDetail.Coachfinder_Upsize_Price__c / this.leadData.request.request.passengers).toFixed(2);
  
    this.assignChanges();

    var selectedVehicles = this.leadData.request.request.vehicle;
    // console.log(selectedVehicles);
    // console.log(this.leadData)
    if (selectedVehicles == "ST") {
      this.vehicle = "Standard Coach";
    } else if (selectedVehicles == "EX") {
      this.vehicle = "Executive Coach";
    } else if(selectedVehicles == "VIP"){
      this.vehicle = "VIP Coach"
    } else if(selectedVehicles == "BUS"){
      this.vehicle = "Bus"
    } else if(selectedVehicles == "VBUS"){
      this.vehicle = "Vintage Bus"
    } 

    this.model = { day: this.leadData.dep_date.day, month: this.leadData.dep_date.month, year: this.leadData.dep_date.year }
    this.model2 = { day: this.leadData.ret_date.day, month: this.leadData.ret_date.month, year: this.leadData.ret_date.year }
    this.distance = this.leadDetail.Distance_miles__c;

    console.log("LEAD DETAIl", this.leadDetail);
    console.log("isVoucherValid",this.leadDetail.Voucher_Amount__c)
    console.log("leadFormData", this.leadData);
  
    // this.bookingForm.value.sourceControl = this.leadData.source_loc;
    // this.bookingForm.value.destinationControl = this.leadData.destination_loc;
    // this.bookingForm.value.passengerControl = this.leadData.request.request.passengers;
    // this.bookingForm.value.pickDateControl = this.leadData.request.request.departureDate;
    // if(!this.oneWayRoute){
    //   this.bookingForm.value.returnDateControl = this.leadData.request.request.returnDate;
    // }
   
    // this.bookingForm.value.departureTimeControl = this.leadData.request.request.departureTime;
    // this.bookingForm.value.returnTimeControl = this.leadData.request.request.returnTime;
    // this.bookingForm.value.vehicleStandradControl = this.vehicle;

    // console.log("bookinFormData", this.bookingForm)

    if (this.leadData.request.request.returnOrSingle == "Single") {
      this.oneWayRoute = true;
      this.twoWayRoute = false;
      this.PassengerBookingType('oneway');
    } else {
      this.twoWayRoute = true;
      this.oneWayRoute = false;
      this.PassengerBookingType('return');
    }
    this.recommentedText = this.bookingForm.value.vehicleStandradControl;
    if (this.leadData.request.request.passengers > 16 && this.leadDetail.Coachfinder_Downsize_Price__c > 0 && this.leadDetail.Coachfinder_Downsize_Lookup__c) {
      this.showCheaper = true;
    }
    this.getQueryData();
    this.onChangeLocation();
  
    if(!this.oneWayRoute){
      this.minDateSec =this.leadData.dep_date;
        }
  }


  PassengerBookingType(option) {
   
    if (option === 'return') {
      this.withReturn = true
      this.oneWayRoute = false;
      this.twoWayRoute = true;
      // console.log(this.firstDiv.nativeElement);
      this.rd.removeClass(this.firstDiv.nativeElement, 'remove');
      this.rd.addClass(this.secDiv.nativeElement, 'remove');
      this.searchPlaceTwoWay(this.Location.nativeElement, this.Destination.nativeElement);
      this.leadData.return_date = '';
    }

    if (option === 'oneway') {
      // console.log('onewayyy', this.Location2.nativeElement)
      this.vehicleToStay = false;
      this.withReturn = false;
      this.oneWayRoute = true;
      this.twoWayRoute = false;
      // console.log(this.secDiv.nativeElement);
      this.rd.removeClass(this.secDiv.nativeElement, 'remove');
      this.rd.addClass(this.firstDiv.nativeElement, 'remove');
      this.searchPlaceTwoWay(this.Location2.nativeElement, this.Destination2.nativeElement)
    }
  }
  getQueryData() {
    this.http.get("assets/time.json").subscribe((res: any) => {
      this.time = JSON.parse(res._body);
      // console.log(this.time);

    })
  }


  searchPlaceTwoWay(loc, dest) {
    // console.log("I am called");

    // load Places Autocomplete For Location for TwoWay Form
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(loc);

      autocomplete.setComponentRestrictions(
        { 'country': ['uk'] });

      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.latitude1 = place.geometry.location.lat();
          this.longitude1 = place.geometry.location.lng();
          this.bookingForm.value.sourceControl = loc.value;
          this.FrombindDataToForm(place);
          this.onChangeLocation();
        });
      });
    });


    // load Places Autocomplete For destination for TWO WAY Form
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(dest);

      autocomplete.setComponentRestrictions(
        { 'country': ['uk'] });

      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude2 = place.geometry.location.lat();
          this.longitude2 = place.geometry.location.lng();
          this.bookingForm.value.destinationControl = dest.value;
          this.TobindDataToForm(place);
          this.onChangeLocation();

        });
      });
    });


  }

  // get information of source place


  FrombindDataToForm(address) {
    var country = address.address_components.filter(function (address_component) {
      return address_component.types.includes("country");

    });
    this.leadData.request.request.pickupCountry = country[0].long_name;
    var SourceState = address.address_components.filter(function (address_component) {
      return address_component.types.includes("administrative_area_level_2");
    });
    if (SourceState.length === 0 || SourceState === '') {
      this.leadData.request.request.pickupCounty = '';
    } else {
      this.leadData.request.request.pickupCounty = SourceState[0].long_name;
    }
    var postcodes = address.address_components.filter(function (address_component) {
      return address_component.types.includes("postal_code");

    });
    if (postcodes.length === 0 || postcodes === '') {
      this.leadData.request.request.pickupPostcode = ''
    } else {
      this.leadData.request.request.pickupPostcode = postcodes[0].long_name;
    }
    var street = address.address_components.filter(function (address_component) {
      return address_component.types.includes("street_number");
    });
    var street_name = address.address_components.filter(function (address_component) {
      return address_component.types.includes("route");
    });
    var street1 = address.address_components.filter(function (address_component) {
      return address_component.types.includes("subpremise");
    })
    var city = address.address_components.filter(function (address_component) {
      return address_component.types.includes("locality");
    })

    if (city == '') {
      city = address.address_components.filter(function (address_component) {
        return address_component.types.includes("postal_town");
      })
    }

    if (city.length === 0 || city == '') {
      this.leadData.request.request.pickupCity = '';
    } else {
      this.leadData.request.request.pickupCity = city[0].long_name;
    }
    var strt1 = ((street.length) && (street_name.length)) ? street[0].long_name + " " + street_name[0].long_name : ((street.length) ? street[0].long_name : ((street_name.length) ? street_name[0].long_name : ''));
    this.leadData.request.request.pickupStreet = (street1.length) ? street1[0].long_name + '/' + strt1 : strt1;
    
  }

  // get information of destination place


  TobindDataToForm(address) {
    var countryy = address.address_components.filter(function (address_component) {
      return address_component.types.includes("country");

    });
    this.leadData.request.request.destinationCountry = countryy[0].long_name;
    var statee = address.address_components.filter(function (address_component) {
      return address_component.types.includes("administrative_area_level_2");
    });

    if (statee.length === 0 || statee === '') {
      this.leadData.request.request.destinationCounty = '';
    } else {
      this.leadData.request.request.destinationCounty = statee[0].long_name;
    }
    var postcodes = address.address_components.filter(function (address_component) {
      return address_component.types.includes("postal_code");

    });
    if (postcodes.length === 0 || postcodes === '') {
      this.leadData.request.request.destinationPostcode = '';
    } else {
      this.leadData.request.request.destinationPostcode = postcodes[0].long_name;
    }

    var streett = address.address_components.filter(function (address_component) {
      return address_component.types.includes("street_number");
    });
    var street_namee = address.address_components.filter(function (address_component) {
      return address_component.types.includes("route");
    });
    var street2 = address.address_components.filter(function (address_component) {
      return address_component.types.includes("subpremise");
    })
    var cityy = address.address_components.filter(function (address_component) {
      return address_component.types.includes("locality");
    })

    if (cityy == '') {
      cityy = address.address_components.filter(function (address_component) {
        return address_component.types.includes("postal_town");
      })
    }
    if (cityy.length === 0 || cityy == '') {
      this.leadData.request.request.destinationCity = '';
    } else {
      this.leadData.request.request.destinationCity = cityy[0].long_name;
    }

    var strt2 = ((streett.length) && (street_namee.length)) ? streett[0].long_namee + " " + street_namee[0].long_name : ((streett.length) ? streett[0].long_name : ((street_namee.length) ? street_namee[0].long_name : ''));
    this.leadData.request.request.destinationStreet = (street2.length) ? streett[0].long_name + '/' + strt2 : strt2;

  }

  selectWay(route) {

    if (route === 'return') {

      this.twoWayRoute = true;
      this.oneWayRoute = false
    } else {

      this.oneWayRoute = true;
      this.twoWayRoute = false
    }

  }
  // go to thank you page
  

  bookNow(data,selection) {
    console.log("** selected vihecle id**", data)
    if(selection==1){
      this.router.navigate(['/events/' + this.userId + '/' + data+ '/'+selection]);
    }else{
      this.router.navigate(['/events/' + this.userId + '/' + data +'/'+ selection]);
    }
  }

  openOrderSum() {
    if (this.openOrder.nativeElement.classList.contains('addClasss')) {
      this.rd.removeClass(this.openOrder.nativeElement, 'addClasss');
    } else {
      this.rd.addClass(this.openOrder.nativeElement, 'addClasss');
    }
  }

  toggle(n, m,distance) {

  }
  toggleSec(n, m,distance) {
    // console.log(this.minDateSec)

  }
  getDepDate(event) {

    this.minDateSec = { "year": event.year, "month": event.month, "day": event.day }
    this.is_edit = false;
    console.log("-------", this.minDateSec)

  }
  editPass(){
   this.showdistance = true;
   if(this.oneWayRoute){
    console.log("DEBUG",this.bookingFormSec)
   }
   console.log("DEBUG",this.bookingForm)
  }

  timesChange() {  

    if (this.bookingForm.value.returnDateControl != null && this.bookingForm.value.pickDateControl != null &&
      this.bookingForm.value.returnDateControl.day == this.bookingForm.value.pickDateControl.day
      && this.bookingForm.value.returnDateControl.month == this.bookingForm.value.pickDateControl.month
      && this.bookingForm.value.returnDateControl.year == this.bookingForm.value.pickDateControl.year
    ) {
      if (this.bookingForm.value.departureTimeControl > this.bookingForm.value.returnTimeControl) {
        alert("Return time can't be less then departure time.");
        this.timeVal = true
      } else {
        this.timeVal = false
      }
    } else {
      this.timeVal = false
    }
  }

  onChangeLocation() {
    // showdistance use to disable amend button untill new distance appear
    this.showdistance=false;
    // console.log("onchange called");
    if (this.twoWayRoute) {
      var from = this.Location.nativeElement.value;
      var to = this.Destination.nativeElement.value;
    } else {
      var from = this.Location2.nativeElement.value;
      var to = this.Destination2.nativeElement.value;
    }

    if (from != '' && to != '') {
      

      this.BookingService.getDistance(from, to).subscribe((response) => {
        var response1 = response.json();
        if (response1.rows[0].elements.status != "NOT_FOUND") {
          var distance = response.json().rows[0].elements[0].distance.text;
          this.distance = parseInt(distance.replace("km", ""));
          this.leadData.request.request.distance = this.distance;
          this.distanceValue = response.json().rows[0].elements[0].distance.value;
          this.leadData.distanceValue = this.distanceValue;
          this.duration = response.json().rows[0].elements[0].duration.text;
          this.leadData.duration = this.duration;
          this.showdistance=true;

        }

      })
    }
  }

  checkFn(event) {
    this.onChangeLocation();
  }


  addPost() {
    this.spinnerService.show();
  

    if (this.twoWayRoute) {
      var day = this.bookingForm.value.pickDateControl.day;
      var month = this.bookingForm.value.pickDateControl.month;
      var year = this.bookingForm.value.pickDateControl.year;

      var day1 = this.bookingForm.value.returnDateControl.day;
      var month1 = this.bookingForm.value.returnDateControl.month;
      var year1 = this.bookingForm.value.returnDateControl.year;

      this.dept_date = day + "/" + month + "/" + year;
      this.return_date = day1 + "/" + month1 + "/" + year1;


      if (this.bookingForm.value.vehicleStandradControl == "Standard Coach") {
        this.vehicleNew = "ST"
      } else if (this.bookingForm.value.vehicleStandradControl == "Executive Coach") {
        this.vehicleNew = "EX"
      } else if (this.bookingForm.value.vehicleStandradControl == "VIP Coach") {
        this.vehicleNew = "VIP"
      }   else if (this.bookingForm.value.vehicleStandradControl == "Bus") {
        this.vehicleNew = "BUS"
      } else if (this.bookingForm.value.vehicleStandradControl == "Vintage Bus") {
        this.vehicleNew = "VBUS"
      } 
      this.request = {
        "request": {
          "Brand":"Coachfinder",
          "LeadId": this.userId,
          "firstName": this.leadData.request.request.firstName,
          "lastName": this.leadData.request.request.lastName,
          "phone": this.leadData.request.request.Phone,
          "email": this.leadData.request.request.email,
          "passengers": this.bookingForm.value.passengerControl,
          'hasOptedOutOfEmail':false,
          "vehicle": this.vehicleNew,
          "returnOrSingle": 'Return',
          "departureDate": this.dept_date,
          "departureTime": this.bookingForm.value.departureTimeControl,
          "returnDate": this.return_date,
          "returnTime": this.bookingForm.value.returnTimeControl,
          "pickupStreet": this.leadData.request.request.pickupStreet,
          "pickupCounty": this.leadData.request.request.pickupCounty,
          "pickupCity": this.leadData.request.request.pickupCity,
          "pickupCountry": this.leadData.request.request.pickupCountry,
          "pickupPostcode": this.leadData.request.request.pickupPostcode,
          "destinationStreet": this.leadData.request.request.destinationStreet,
          "destinationCounty": this.leadData.request.request.destinationCounty,
          "destinationCity": this.leadData.request.request.destinationCity,
          "destinationCountry": this.leadData.request.request.destinationCountry,
          "destinationPostcode": this.leadData.request.request.destinationPostcode,
          "distance": this.distance,
          "vehicleToStay": this.vehicleToStay,
          "voucherName":this.VoucherCoupon,
          "Channel":this.channel,

        }

      }
    } else {
      var day = this.bookingFormSec.value.pickDateControl.day;
      var month = this.bookingFormSec.value.pickDateControl.month;
      var year = this.bookingFormSec.value.pickDateControl.year;
      this.dept_date = day + "/" + month + "/" + year;

      if (this.bookingFormSec.value.vehicleStandradControl == "Standard Coach") {
        this.vehicleNew = "ST"
      } else if (this.bookingFormSec.value.vehicleStandradControl == "Executive Coach") {
        this.vehicleNew = "EX"
      } else if (this.bookingFormSec.value.vehicleStandradControl == "VIP Coach") {
        this.vehicleNew = "VIP"
      }  else if (this.bookingForm.value.vehicleStandradControl == "Bus") {
        this.vehicleNew = "BUS"
      } else if (this.bookingForm.value.vehicleStandradControl == "Vintage Bus") {
        this.vehicleNew = "VBUS"
      } 

      this.request = {
        "request": {
          "Brand":"Coachfinder",
          "LeadId": this.userId,
          "firstName": this.leadData.request.request.firstName,
          "lastName": this.leadData.request.request.lastName,
          "phone": this.leadData.request.request.Phone,
          "email": this.leadData.request.request.email,
          "passengers": this.bookingFormSec.value.passengerControl,
          'hasOptedOutOfEmail':false,
          "vehicle": this.vehicleNew,
          "returnOrSingle": 'Single',
          "departureDate": this.dept_date,
          "departureTime": this.bookingFormSec.value.departureTimeControl,
          "returnDate": '',
          "returnTime": '',
          "pickupStreet": this.leadData.request.request.pickupStreet,
          "pickupCounty": this.leadData.request.request.pickupCounty,
          "pickupCity": this.leadData.request.request.pickupCity,
          "pickupCountry": this.leadData.request.request.pickupCountry,
          "pickupPostcode": this.leadData.request.request.pickupPostcode,
          "destinationStreet": this.leadData.request.request.destinationStreet,
          "destinationCounty": this.leadData.request.request.destinationCounty,
          "destinationCity": this.leadData.request.request.destinationCity,
          "destinationCountry": this.leadData.request.request.destinationCountry,
          "destinationPostcode": this.leadData.request.request.destinationPostcode,
          "distance": this.distance,
          "vehicleToStay": this.vehicleToStay,
          "voucherName":this.VoucherCoupon,
          "Channel":this.channel,

        }

      }
    }
  
    this.BookingService.forwardApi(this.request).subscribe((response) => {
      this.recommentedText = this.bookingForm.value.vehicleStandradControl;
      var data = response.json();
    
      if (data.isSuccess) {
        localStorage.setItem(data.lead.Id, JSON.stringify(data.lead));
        this.leadDetail = data.lead;
        console.log("leadDetail123",this.leadDetail);
        this.checkForZeroPriceMsg();
        if(!this.oneWayRoute){
          this.minDateSec =this.leadData.dep_date;
        }
        
        if(this.leadDetail.Voucher_Amount__c){
          this.validCoupon = true;
          setTimeout(() => {
            this.bookingForm.get('voucher').disable();
            this.bookingFormSec.get('voucher').disable();
          }, 10)
        }else if(this.bookingFormSec.value.voucher== null || this.bookingFormSec.value.voucher==''){
          
          this.validCoupon = false;
          this.emptyy = true;
         
          
        }else{
       
          this.validCoupon = false;
          this.emptyy = false;
         
        }
        
        this.Auto_Price__c = (this.leadDetail.Auto_Price__c / this.leadData.request.request.passengers).toFixed(2);
        this.Coachfinder_Cheaper_Price__c = (this.leadDetail.Coachfinder_Cheaper_Price__c / this.leadData.request.request.passengers).toFixed(2);
        this.Coachfinder_Downsize_Price__c = (this.leadDetail.Coachfinder_Downsize_Price__c / this.leadData.request.request.passengers).toFixed(2);
        this.Coachfinder_Upgrade_Price__c = (this.leadDetail.Coachfinder_Upgrade_Price__c / this.leadData.request.request.passengers).toFixed(2);
        this.Coachfinder_Upsize_Price__c = (this.leadDetail.Coachfinder_Upsize_Price__c / this.leadData.request.request.passengers).toFixed(2);
        this.assignChanges();
       
        this.messageService.add({ severity: 'success', summary: 'Coachfinder', detail: 'Order Summary form updated successfully.' });
        localStorage.setItem(data.lead.Id, JSON.stringify(data.lead));
        var fulldata = { "request": this.request, 'source_loc': this.bookingForm.value.sourceControl, 'destination_loc': this.bookingForm.value.destinationControl, 'dep_date': this.bookingForm.value.pickDateControl, 'ret_date': this.bookingForm.value.returnDateControl, 'distanceValue': this.distanceValue, 'duration': this.duration, 'distance': this.leadDetail.Distance_miles__c };
        localStorage.setItem(data.lead.Id + "_request", JSON.stringify(fulldata));

        if (this.leadData.request.request.passengers > 16 && this.leadDetail.Coachfinder_Downsize_Price__c > 0 && this.leadDetail.Coachfinder_Downsize_Lookup__c) {
          this.showCheaper = true;
        } else {
          this.showCheaper = false;
        }
        if(parseInt(this.leadDetail.Vehicle_Seats__c) < parseInt(this.leadData.request.request.passengers)){
          this.recomendMessage = true;
        }else{
          this.recomendMessage = false;
        }
        this.couponValue=this.VoucherCoupon;
    
      }
    });
  }

  assignChanges() {
    this.coachtext.recommend = this.leadDetail.Vehicle_Type__c;
    this.coachtext.cheaper = this.leadDetail.Coachfinder_Cheaper_Description__c;
    this.coachtext.smaller = this.leadDetail.Coachfinder_Downsize_Description__c;
    this.coachtext.upsize = this.leadDetail.Coachfinder_Upsize_Description__c;
    this.coachtext.vip = this.leadDetail.Coachfinder_Upgrade_Description__c;
    this.seats.recommend = this.leadDetail.Vehicle_Seats__c;
    this.seats.smaller = this.leadDetail.Coachfinder_Downsize_Seats__c;
    this.seats.upsize = this.leadDetail.Coachfinder_Upsize_Seats__c;
    this.seats.cheaper = this.leadDetail.Coachfinder_Cheaper_Seats__c;
    this.seats.vip = this.leadDetail.Coachfinder_Upgrade_Seats__c;
    this.sheetsneed = this.leadData.request.request.passengers;
    this.spinnerService.hide();
  }
  getToolTip(key) {
    return this.tooltip[key];
  }
  needVehicle(){
    this.showdistance=true;
    if(this.withReturn){
      this.vehicleToStay =!this.vehicleToStay;
    }else{
      this.vehicleToStay = false;
    }
   
  }

  // new changes leadDetail.Auto_Price__c==0 || leadDetail.Coachfinder_Cheaper_Price__c ==0 || leadDetail.Coachfinder_Upgrade_Price__c == 0 || leadDetail.Coachfinder_Downsize_Price__c==0 || leadDetail.Coachfinder_Upsize_Price__c ==0
  checkForZeroPriceMsg(){
    this.zeroErr =false;
    if(this.leadDetail.Coachfinder_Cheaper_Lookup__c != undefined && this.leadDetail.Coachfinder_Cheaper_Price__c == 0){
      this.zeroError[0] =true;
    }else{
      this.zeroError[0] =false;

    }
    if(this.leadDetail.Vehicle_Lookup__c != undefined &&  this.leadDetail.Auto_Price__c == 0){
      this.zeroError[1] =true;

    }else{
      this.zeroError[1] =false;
    }
    if(this.leadDetail.Coachfinder_Upgrade_Lookup__c != undefined && this.leadDetail.Coachfinder_Upgrade_Price__c == 0){
      this.zeroError[2] =true;
    }else{
      this.zeroError[2] =false;

    }
    if(this.leadDetail.Coachfinder_Downsize_Lookup__c != undefined && this.leadDetail.Coachfinder_Downsize_Price__c == 0){
      this.zeroError[3] =true;
    }else{
      this.zeroError[3] =false;
    }
    if(this.leadDetail.Coachfinder_Upsize_Lookup__c != undefined && this.leadDetail.Coachfinder_Upsize_Price__c ==0){
      this.zeroError[4] =true;
    }else{
      this.zeroError[4] =false;
    }
    this.finalmsgError();

  }
  finalmsgError(){
    for(var i=0; i<this.zeroError.length;i++){
       if(this.zeroError[i]==true){
         this.zeroErr = true;
       }
    }
  }
  viewImages(index){
    this.viewImg[index]=!this.viewImg[index];
      }
    
}
