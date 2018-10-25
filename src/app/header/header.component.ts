import { Component, ElementRef, NgZone, ViewChild, OnInit, OnChanges, AfterViewInit, Renderer2, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PlatformLocation } from '@angular/common';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { ValidationService } from '../../services/validation.service';
import { Observable } from 'rxjs/Rx';
import { } from 'googlemaps';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { MapsAPILoader, } from '@agm/core';
import { PageContentService } from '../../services/page_content_service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { BookingService } from '../../services/booking_service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { CommonService } from '../../services/common.service';
import {DigitalTracking} from '../../services/digital_tracking'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  implements OnInit {

  public path = 'page/attraction_nav';

  public pageContent = [
    { "id": "", "title": "" }
  ];

  public time: any = [];

  @ViewChild("mobServ") public mobServe: ElementRef;
  public minDate: any;
  public minDateSec: any;

  @ViewChild("firstDiv") public firstDiv: ElementRef
  @ViewChild("secDiv") public secDiv: ElementRef;

  @ViewChild("location2") public Location2: ElementRef;
  @ViewChild("destination2") public Destination2: ElementRef;

  @ViewChild("location") public Location: ElementRef;
  @ViewChild("destination") public Destination: ElementRef;
  @ViewChild("passenger") public Passenger: ElementRef;
  @ViewChild("showQuote") public ShowQuote: ElementRef;
  @ViewChild("showModels") public showModeles: ElementRef;
  @ViewChild("g") public G: ElementRef;
  @ViewChild("n") public N: ElementRef;
  @ViewChild('chckWidth') chckWidth: ElementRef;
  close = false
  displayMonths: any;
  navigation: any;
  showWeekNumberss: any;
  showWeekNumbers: any;

  currentURL = '';
  selectedUrl = '';
  public serviceList: boolean = false;
  public destinationList: boolean = false;
  public attractionList: boolean = false;
  public isCollapsed = false;
  public showQuote: boolean = false;
  public showModels: boolean = false;
  bookingFormSec: FormGroup;
  bookingForm: FormGroup;
  rform: FormGroup;
  public showQuoteButton: boolean = false;
  loc: string;
  des: string;

  public modal: boolean = false;

  public withReturn: boolean = true;
  public vehicleToStay:boolean = true;


  public bothWay: boolean = true;
  public oneWay: boolean = false;


  public latitude1: number;
  public longitude1: number;
  public latitude2: number;
  public longitude2: number;


  public latitude3: number;
  public longitude3: number;
  public latitude4: number;
  public longitude4: number;


  // from place
  public postcode: any
  public country: any;
  public city: any;
  public finalCity: any;
  public state: any;
  public finalState: any;
  public street: any;
  public street_name: any;
  public street1: any;
  public finalStreet1: any;

  public dept_date: string;

  // to place

  public postcodee: any
  public countryy: any;
  public cityy: any;
  public finalCityy: any;
  public finalStatee: any
  public statee: any;
  public streett: any;
  public street_namee: any;
  public street2: any;
  public finalStreet2: any;
  public return_date: string;

  public distanceValue: string;
  public duration: string;
  public distance: any;

  public vehicle: string;
  public showQote: boolean = false;
  public is_edit: boolean = true;
  gdrp:boolean=false;
  isDesClicked:boolean = false;
  isIframe=false;
  public channel ='CF';

  public VehicleStandard = [
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
    },
    {
      id: 1,
      name: "Bus"
    },
    {
      id: 1,
      name: "Vintage Bus"
    }
  ]



  constructor(
    private router: Router,
    location: PlatformLocation,
    private fb: FormBuilder,
    private rd: Renderer2,
    private ngZone: NgZone,
    private mapsAPILoader: MapsAPILoader,
    private pageService: PageContentService,
    private http: Http,
    private BookingService: BookingService,
    private spinnerService: Ng4LoadingSpinnerService,
    private service: CommonService,
    private digitalTracking:DigitalTracking,
  ) {
   

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    var dt = new Date(yyyy, mm, dd);

    var nd = new Date(dt.setTime(dt.getTime() + (24 * 60 * 60 * 1000)));
    this.minDate = { year: nd.getFullYear(), month: nd.getMonth(), day: nd.getDate() };

    this.rform = fb.group({
      'firstName': [null, [Validators.required, ValidationService.nameValidator]],
      'lastName': [null, [ValidationService.lastNameValidator]],
      'phoneNumber': [null, [Validators.required, ValidationService.phoneValidator]],
      'email': [null, [Validators.required, ValidationService.emailValidator]],
      'voucher':[null],
      'HasOptedOutOfEmail':[null]

    })

    this.bookingForm = fb.group({
      'sourceControl': [null, Validators.required],
      'destinationControl': [null, Validators.required],
      'passengerControl': [null, [Validators.required, ValidationService.passengerValidator]],
      'pickDateControl': [null, Validators.required],
      'returnDateControl': [null, Validators.required],
      'departureTimeControl': [null, Validators.required],
      'returnTimeControl': [null, Validators.required],
      'vehicleStandradControl': [null, Validators.required]
    })

    location.onPopState(() => {
      // console.log('pressed back!');
      this.currentURL = window.location.href;
      // console.log("showQuote", this.showQote);

      // if(this.currentURL!=='http://localhost:4200/#/' && this.currentURL!= 'http://localhost:4200/' ){
      if (this.showQote || this.showQote == null) {

        this.rd.addClass(this.ShowQuote.nativeElement, 'remove');

      } else {

        this.rd.removeClass(this.ShowQuote.nativeElement, 'remove');

      }
    });
  }

  ngOnInit() {
    if(localStorage.getItem('isIframe')=='yes'){
      this.isIframe =true;
    }else{
      this.isIframe= false;
    }
    
    this.service.changeValue.subscribe((response) => {
      this.showQote = response;
      if (this.showQote || this.showQote == null) {
        this.rd.removeClass(this.ShowQuote.nativeElement, 'remove');
        this.rd.addClass(this.showModeles.nativeElement, 'remove');
      } else {
        this.rd.addClass(this.ShowQuote.nativeElement, 'remove');
        this.rd.addClass(this.showModeles.nativeElement, 'remove');

      }
    })
    this.pageService.getPageContent(this.path).subscribe((response) => {
      this.pageContent = response.json();
    })

    this.currentURL = window.location.href;


    this.getQueryData();
    this.PassengerBookingType('null');
    this.searchPlaceTwoWay(this.Location.nativeElement, this.Destination.nativeElement);

  }

  getQueryData() {
    this.http.get("assets/time.json").subscribe((res: any) => {
      this.time = JSON.parse(res._body);
    })
  }

  openModal(route) {

    this.modal = true;
    window.scrollTo(0, 100)
    this.BookingService.getDistance(this.loc, this.des).subscribe((response) => {
      var distance = response.json().rows[0].elements[0].distance.text;
      this.distance = parseInt(distance.replace("km", ""));
      this.distanceValue = response.json().rows[0].elements[0].distance.value;
      this.duration = response.json().rows[0].elements[0].duration.text;
    })
    this.bookingForm.value.sourceControl = this.loc;
    this.bookingForm.value.destinationControl = this.des;
    var day = this.bookingForm.value.pickDateControl.day;
    var month = this.bookingForm.value.pickDateControl.month;
    var year = this.bookingForm.value.pickDateControl.year;
    if (this.withReturn) {
      var day1 = this.bookingForm.value.returnDateControl.day;
      var month1 = this.bookingForm.value.returnDateControl.month;
      var year1 = this.bookingForm.value.returnDateControl.year;
      this.return_date = day1 + "/" + month1 + "/" + year1;
    }
    this.dept_date = day + "/" + month + "/" + year;
 
  }


  closeModal() {
    this.modal = false;

  }


  PassengerBookingType(option) {
    if (option === 'return') {
      this.withReturn = true;
      this.bookingForm.get('returnDateControl').setValidators([Validators.required]);
      this.bookingForm.get('returnTimeControl').setValidators([Validators.required]);
    }

    if (option === 'oneway') {
      this.withReturn = false;
      this.vehicleToStay=false;
      this.bookingForm.get('returnDateControl').setValidators(null);
      this.bookingForm.get('returnTimeControl').setValidators(null);

    }
    this.bookingForm.get('returnDateControl').updateValueAndValidity();
    this.bookingForm.get('returnTimeControl').updateValueAndValidity();
  }

  showQuotess() { }

  searchPlaceTwoWay(loc, dest) {
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
          //set latitude, longitude 
          this.latitude1 = place.geometry.location.lat();
          this.longitude1 = place.geometry.location.lng();
          this.loc = loc.value;


          this.FrombindDataToForm(place);
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
          this.des = dest.value;
         
          this.TobindDataToForm(place);

        });
      });
    });
  }
  // get information of source place


  FrombindDataToForm(address) {
    this.country = address.address_components.filter(function (address_component) {
      return address_component.types.includes("country");

    });
    this.state = address.address_components.filter(function (address_component) {
      return address_component.types.includes("administrative_area_level_2");
    });
    if (this.state.length === 0 || this.state === '') {
      this.finalState = '';
    } else {
      this.finalState = this.state[0].long_name;
    }
    var postcodes = address.address_components.filter(function (address_component) {
      return address_component.types.includes("postal_code");

    });
    if (postcodes.length === 0 || postcodes === '') {
      this.postcode = ''
    } else {
      this.postcode = postcodes[0].long_name;
    }
    this.street = address.address_components.filter(function (address_component) {
      return address_component.types.includes("street_number");
    });
    this.street_name = address.address_components.filter(function (address_component) {
      return address_component.types.includes("route");
    });
    this.street1 = address.address_components.filter(function (address_component) {
      return address_component.types.includes("subpremise");
    })
    this.city = address.address_components.filter(function (address_component) {
      return address_component.types.includes("locality");
    })
    if (this.city == '') {
      this.city = address.address_components.filter(function (address_component) {
        return address_component.types.includes("postal_town");
      })
    }
    if (this.city.length === 0 || this.city == '') {
      this.finalCity = '';
    } else {
      this.finalCity = this.city[0].long_name;
    }


    var strt1 = ((this.street.length) && (this.street_name.length)) ? this.street[0].long_name + " " + this.street_name[0].long_name : ((this.street.length) ? this.street[0].long_name : ((this.street_name.length) ? this.street_name[0].long_name : ''));
    this.finalStreet1 = (this.street1.length) ? this.street1[0].long_name + '/' + strt1 : strt1;
    
  }

  // get information of destination place


  TobindDataToForm(address) {
    this.countryy = address.address_components.filter(function (address_component) {
      return address_component.types.includes("country");

    });
    this.statee = address.address_components.filter(function (address_component) {
      return address_component.types.includes("administrative_area_level_2");
    });

    if (this.statee.length === 0 || this.statee === '') {
      this.finalStatee = '';
    } else {
      this.finalStatee = this.statee[0].long_name;
    }
    var postcodes = address.address_components.filter(function (address_component) {
      return address_component.types.includes("postal_code");

    });
    if (postcodes.length === 0 || postcodes === '') {
      this.postcodee = '';
    } else {
      this.postcodee = postcodes[0].long_name;
    }

    this.streett = address.address_components.filter(function (address_component) {
      return address_component.types.includes("street_number");
    });
    this.street_namee = address.address_components.filter(function (address_component) {
      return address_component.types.includes("route");
    });
    this.street2 = address.address_components.filter(function (address_component) {
      return address_component.types.includes("subpremise");
    })
    this.cityy = address.address_components.filter(function (address_component) {
      return address_component.types.includes("locality");
    })
    if (this.cityy == '') {
      this.cityy = address.address_components.filter(function (address_component) {
        return address_component.types.includes("postal_town");
      })
    }
    if (this.cityy.length === 0 || this.cityy == '') {
      this.finalCityy = '';
    } else {
      this.finalCityy = this.cityy[0].long_name;
    }

    var strt2 = ((this.streett.length) && (this.street_namee.length)) ? this.streett[0].long_namee + " " + this.street_namee[0].long_name : ((this.streett.length) ? this.streett[0].long_name : ((this.street_namee.length) ? this.street_namee[0].long_name : ''));
    this.finalStreet2 = (this.street2.length) ? this.streett[0].long_name + '/' + strt2 : strt2;

    
  }

  showModel() {
 
    window.scrollTo(0, 0)
    if (this.showModeles.nativeElement.className == 'container-fulid form-block-main remove') {
      this.rd.removeClass(this.showModeles.nativeElement, 'remove');
      this.rd.removeClass(this.firstDiv.nativeElement, 'remove');
  
    } else {
      this.rd.addClass(this.showModeles.nativeElement, 'remove');
      this.rd.addClass(this.firstDiv.nativeElement, 'remove');
    }
    if (this.chckWidth.nativeElement.offsetWidth < 754) {
      this.service.popouter(true);
   }
  }

  mouseEnterDestination(data) {
    if (data === 'service') {
      this.serviceList = true;
      this.destinationList = false;
      this.attractionList = false;
    } else if (data === 'destination') {
      this.destinationList = true;
      this.serviceList = false;
      this.attractionList = false;
    } else if (data === 'attraction') {
      this.destinationList = false;
      this.serviceList = false;
      this.attractionList = true;
    }



  }
  mouseLeaveDestination() {
    this.serviceList = false;
    this.destinationList = false
    this.attractionList = false
  }


  hideModel() {

    this.rd.addClass(this.showModeles.nativeElement, 'remove');
    this.rd.removeClass(this.ShowQuote.nativeElement, 'remove');
    window.scrollTo(0, 0);


  }
  hideModelSec() {
    this.showModels = false;
    this.showQuote = false;
  }

  showQuotes() {
    window.scrollTo(0, 0);
    this.rd.removeClass(this.ShowQuote.nativeElement, 'remove');
    this.rd.addClass(this.showModeles.nativeElement, 'remove');
    this.showQuote = true;
    this.showModels = false;
    this.isCollapsed = !this.isCollapsed;

  }


  hideQuote() {
    this.showQuote = false;
    this.isDesClicked = true;
    this.rd.addClass(this.ShowQuote.nativeElement, 'remove');
    this.rd.addClass(this.showModeles.nativeElement, 'remove');
    this.service.destinationClick.subscribe((res)=>{
      console.log("des click res",res);
      this.isDesClicked = res;
    })
    if (this.chckWidth.nativeElement.offsetWidth < 754  && this.isDesClicked ) {
    
      window.location.reload();
    }

  }

  destinationPlace(id) {
    this.router.navigate(['destination/London', id])
  }

  childNavigation(id) {
    // console.log(" Attraction id", id);
    this.router.navigate(['attraction/', id])
  }
  gotohome() {
    localStorage.setItem('open_form', 'yes');
    // alert("HAHA");
    this.router.navigate(['/']);
  }


  // submit lead here
  addPost() {
    this.spinnerService.show();
    if (this.bookingForm.value.vehicleStandradControl == "Standard Coach") {
      this.vehicle = "ST"
    } else if (this.bookingForm.value.vehicleStandradControl == "Executive Coach") {
      this.vehicle = "EX"
    } else if (this.bookingForm.value.vehicleStandradControl == "VIP Coach") {
      this.vehicle = "VIP"
    }  else if (this.bookingForm.value.vehicleStandradControl == "Bus") {
      this.vehicle = "BUS"
    } else if (this.bookingForm.value.vehicleStandradControl == "Vintage Bus") {
      this.vehicle = "VBUS"
    } 

    var request = {
      "request": {
        "Brand":"Coachfinder",
        "firstName": this.rform.value.firstName,
        "lastName": this.rform.value.lastName,
        "phone": this.rform.value.phoneNumber,
        "email": this.rform.value.email,
        "passengers": this.bookingForm.value.passengerControl,
        "voucherName":this.rform.value.voucher,
        "vehicle": this.vehicle,
        "vehicleToStay":this.vehicleToStay,
        'hasOptedOutOfEmail':this.gdrp,
        "returnOrSingle": this.withReturn ? 'Return' : 'Single',
        "departureDate": this.dept_date,
        "departureTime": this.bookingForm.value.departureTimeControl,
        "returnDate": this.withReturn ? this.return_date : '',
        "returnTime": this.withReturn ? this.bookingForm.value.returnTimeControl : '',
        "pickupStreet": this.finalStreet1,
        "pickupCounty": this.finalState,
        "pickupCity": this.finalCity,
        "pickupCountry": this.country[0].long_name,
        "pickupPostcode": this.postcode,
        "destinationStreet": this.finalStreet2,
        "destinationCounty": this.finalStatee,
        "destinationCity": this.finalCityy,
        "destinationCountry": this.countryy[0].long_name,
        "destinationPostcode": this.postcodee,
        "distance": this.distance,
        "Channel":this.channel

      }
    }
    this.BookingService.forwardApi(request).subscribe((response) => {
      var data = response.json();
      if (data.isSuccess) {
      
        this.rd.addClass(this.showModeles.nativeElement, 'remove');
        this.rd.removeClass(this.ShowQuote.nativeElement, 'remove');
        this.modal = false;
        this.spinnerService.hide();

        localStorage.setItem(data.lead.Id, JSON.stringify(data.lead));
        var fulldata = { "request": request, 'source_loc': this.loc, 'destination_loc': this.des, 'dep_date': this.bookingForm.value.pickDateControl, 'ret_date': this.withReturn ? this.bookingForm.value.returnDateControl : '', 'distanceValue': this.distanceValue, 'duration': this.duration };
        localStorage.setItem(data.lead.Id + "_request", JSON.stringify(fulldata));

        this.router.navigate(['/stepThird/' + data.lead.Id,]);
      } else {
        this.spinnerService.hide();
      }
    });



  }
  toggle(n, m) {




  }
  toggleSec(n, m) {
    // console.log(this.minDateSec)

  }

  getDepDate(event) {

    this.minDateSec = { "year": event.year, "month": event.month, "day": event.day }
    this.is_edit = false;
  }


  facebookLink() {
    window.open("https://www.facebook.com/CoachfinderUK/")
  }
  twitterLink() {
    window.open("https://twitter.com/coachfinder_uk")
  }
  instaLink() {
    window.open("https://www.instagram.com/coachfinder_uk/?hl=en")
  }

  mobServ(data) {
 
    if (data === 'service') {
      this.serviceList = true;
      this.destinationList = false;
      this.attractionList = false;
    } else if (data === 'attraction') {
      this.attractionList = true;
      this.destinationList = false;
      this.serviceList = false;

      this.router.navigate(['/attraction/0'])

    }
  }

  mobServee() {
    alert('fdds');
  }
  needVehicle(){
    if(this.withReturn){
      this.vehicleToStay =!this.vehicleToStay;
    }else{
      this.vehicleToStay = false;
    }
   
  }



}
