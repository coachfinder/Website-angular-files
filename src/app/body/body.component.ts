import { ElementRef, NgZone, Component, OnInit, ViewChild, Renderer2, HostBinding,Inject } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms'
import { CommonService } from '../../services/common.service';
import { } from 'googlemaps';
import { MapsAPILoader, } from '@agm/core';
import { FormControl } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable, Subscriber } from 'rxjs/Rx';
import { DistanceService } from '../../services/distance.service';
import { BookingService } from '../../services/booking_service';
import { PageContentService } from '../../services/page_content_service';
import { ValidationService } from '../../services/validation.service';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Meta, Title } from '@angular/platform-browser'
import { rightswipe } from '../../animations';
import {DigitalTracking} from '../../services/digital_tracking';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
  animations: [rightswipe]

})
export class BodyComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'relative';
  @ViewChild('chckWidth') chckWidth: ElementRef
  timeVal = false
  public path = 'page/home';

  public minDate: any;
  public minDateSec: any;

  public pageContent = { "title": "", "description": "", "sub_title": "", "block": [{ "description": "", "file": "", "title": "" }], "section": [{ "button_text": "", "description": "", "file": "", "sub_description": "", "title": "" }] }
  public time: any = [];

  public latitude1: number;
  public longitude1: number;
  public latitude2: number;
  public longitude2: number;
  showWeekNumberss: any;
  retTime: string

  public sourceControl: FormControl;
  public destinationControl: FormControl;

  displayMonths = 1;
  navigation = 'select';
  showWeekNumbers = false;
  isclick:boolean = false;

  rform: FormGroup;
  bookingFormSec: FormGroup;
  bookingForm: FormGroup;
  firstName: string = '';
  lastName: string = '';
  phoneNumber = '';
  email: string = '';
  loc: string;
  des: string;
  gdrp:boolean=false;

  public is_edit: boolean = true

  public withReturn: boolean = true;
  public vehicleToStay:boolean = true;

  public bothWay: boolean = true;
  public oneWay: boolean = false;
  public modal: boolean = false;
  public commentsUrl: any
  public distance: any;
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
  a99 : any
  public dept_date: string;

  // to place
  show = false;
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
  quate_from = false;
  //SALES FORCE 
  public tokenRequestData: any;
  public distanceValue: string;
  public duration: any;

  public vehicle: string;
  public channel:any;

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
  ];
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


  public classtypes = [
    ['section-safe-reliable', 'safe-reliable-text', '', 'img-reliable'],
    ['section-top-attractions section-book-travel1', 'st-attractions-content st-attractions-content1', 'st-attractions-img', 'img-responsive'],
    ['section-book-travel', 'section-book-content', 'favourite-festival', '3_img'],
    ['section-top-attractions', 'st-attractions-content', 'st-attractions-img', 'img-responsive'],
    ['section-safe-reliable section-safe-reliable_1', 'safe-reliable-text', '', 'img-reliable img-reliable_1']
  ];
  public currentWidth:any
  isIframe=false;
  isGetIframeDetail = false

  @ViewChild("location") public Location: ElementRef;
  @ViewChild("destination") public Destination: ElementRef;
  @ViewChild("passenger") public Passenger: ElementRef

  @ViewChild("firstDiv") public firstDiv: ElementRef


  @ViewChild("location2") public Location2: ElementRef;
  @ViewChild("destination2") public Destination2: ElementRef;

  @ViewChild("mobId") public mobId: ElementRef;
  @ViewChild("openDiv") public openDiv: ElementRef;

  @ViewChild("formClass") public formClass: ElementRef;


  constructor(
    private router: Router,
    private fb: FormBuilder,
    private service: CommonService,
    private BookingService: BookingService,
    private digitalTracking: DigitalTracking,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    public distanceService: DistanceService,
    private http: Http,
    private rd: Renderer2,
    private spinnerService: Ng4LoadingSpinnerService,
    private pageService: PageContentService,
    public meta: Meta, public title: Title,
    public route: ActivatedRoute,
    @Inject(DOCUMENT) private document, 
    private elementRef:ElementRef
  ) {


  //  this.digitalTracking.digitalTrackingPixel();
  let body = <HTMLDivElement> document.body;
  let script = document.createElement('script');
  script.innerHTML = '';
  script.src = "//a.tribalfusion.com/pixel/tags/Coachfinder/757203/pixel.js";
  script.async = true;
  script.defer = true;
  body.appendChild(script);
   window.onresize = (e) =>
   {
       //ngZone.run will help to run change detection
       this.ngZone.run(() => {
     
           console.log("Width: " + window.innerWidth);
           console.log("Height: " + window.innerHeight);
           this.currentWidth = window.innerWidth;
          
           if(window.innerWidth > 765){
             this.openDivs()
             this.service.popouter(false);
           }else{
             this.service.popouter(true);
           }
       });
   };


    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth(); //January is 0!
    var yyyy = today.getFullYear();
    var dt = new Date(yyyy, mm, dd);

    var nd = new Date(dt.setTime(dt.getTime() + (24 * 60 * 60 * 1000)));
    this.minDate = { year: nd.getFullYear(), month: nd.getMonth() + 1, day: nd.getDate() };
    title.setTitle('Private Coach Hire | Book A Coach | Coachfinder');
    meta.addTags([
      {
        name: 'description', content: 'Access the largest UK Coach Network to get the best service and value for your coach travel with Coachfinder.'
      }
    ]);

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


  }

  getClass(type, key) {
    type = parseInt(type);
    type = type - 1;
    if (typeof this.classtypes[type] !== "undefined") {
      return this.classtypes[type][key];
    }
    return '';
  }

  ngOnInit() {
    if(sessionStorage.getItem('isIframe') == 'yes'){
      this.isGetIframeDetail = true;
      this.isIframe = true;
      this.channel = 'NXBUS'
    }else{
      this.isGetIframeDetail = true;
      this.isIframe = false;
      this.channel ='CF'
    }

    window.scrollTo(0, 0);
    if (this.chckWidth.nativeElement.offsetWidth < 754) {
    this.service.popouter(true);
    }
    this.service.quickPopouter.subscribe((res)=>{
      console.log("----",res);
      this.isclick = res;
    })
    this.searchPlaceTwoWay(this.Location.nativeElement, this.Destination.nativeElement);

    this.mobForm();
    this.pageService.getPageContent(this.path).subscribe((response: any) => {
      console.log("content response body ", response.json());
      this.pageContent = response.json();
    })
    let params: any = this.route.snapshot.params;
    // console.log(params.id);
    // debugger;
    this.tokenRequestData = {
      "grant_type": "password",
      "client_id": "3MVG9lcxCTdG2Vbsc8aMGgg8aRfcxgEEfWB5Zsx2uI4qwp7qSrSXNquWKwWlaOnRsv1hXC6meXRC150MsjT00",
      "client_secret": "6422018981572215177",
      "username": "cloudsocius@thekingsferry.com",
      "password": "2n6QXUlQKyoz1UTmWH77uxdy5vpdkntqfjQcz"
    }

    this.BookingService.getAuthentication().subscribe((response: any) => {
      console.log("Token Response", response.json());
      localStorage.setItem('access_token', response.json().access_token);
      // console.log(localStorage.getItem('access_token'));
    })

    sessionStorage.removeItem('hotel');
    this.service.searchFormValue.subscribe();
    this.getQueryData();

    this.route.params.subscribe((res) => {
      // console.log("ATTRACTION LOCATION ADDRESS", res.loc)
    });
    if (localStorage.getItem('dest_loc') != null && localStorage.getItem('dest_loc') != 'null' && localStorage.getItem('dest_loc') != '') {
      var location = localStorage.getItem('dest_loc');
      // console.log(location)
      this.service.get_address(location).subscribe((res: any) => {
        var body = res._body;
        var res1 = JSON.parse(body);
        // console.log(res1);
        if (res1.status == 200) {
          this.bookingForm.controls['destinationControl'].setValue(res1.address);
          this.latitude2 = res1.lat;
          this.longitude2 = res1.lng;
          this.des = res1.address;
          this.postcodee = res1.postal_code;
          this.countryy = res1.country;
          this.cityy = res1.city;
          this.finalCityy = res1.street;
        } else {
          this.bookingForm.controls['destinationControl'].setValue(location);
        }
        localStorage.removeItem('dest_loc');
      });
    }



  }




  mobForm() {
    setTimeout(() => {
      var openform = localStorage.getItem('open_form');
      if (this.openDiv.nativeElement.offsetWidth >= 677 || openform == 'yes') {
        localStorage.removeItem('open_form')
        this.quate_from = false;
        this.rd.addClass(this.openDiv.nativeElement, 'showClass');

      } else {

        this.quate_from = true
        this.rd.addClass(this.openDiv.nativeElement, 'remove');
      }
    }, 1)
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
    } else if (this.bookingForm.value.vehicleStandradControl == "Bus") {
      this.vehicle = "BUS"
    } else if (this.bookingForm.value.vehicleStandradControl == "Vintage Bus") {
      this.vehicle = "VBUS"
    }


    
    var request ={
      "request":{
        "Brand":"Coachfinder",
      "firstName":this.rform.value.firstName,
      "lastName": this.rform.value.lastName,
      "phone":this.rform.value.phoneNumber,
      "email":this.rform.value.email,
      "passengers":this.bookingForm.value.passengerControl,
      "vehicle":  this.vehicle, 
      "returnOrSingle":this.withReturn ? 'Return' : 'Single',
      "departureDate": this.dept_date,
      "departureTime": this.bookingForm.value.departureTimeControl,
      "returnDate":  this.withReturn ? this.return_date : '',
      "returnTime": this.withReturn ? this.bookingForm.value.returnTimeControl : '',
      "pickupStreet": this.finalStreet1,
      "pickupCounty": this.finalState,
      "pickupCity": this.finalCity,
      "pickupCountry":this.country[0].long_name,
      "pickupPostcode":this.postcode,
      "destinationStreet":  this.finalStreet2,
      "destinationCounty":this.finalStatee,
      "destinationCity": this.finalCityy,
      "destinationCountry":this.countryy[0].long_name,
      "destinationPostcode": this.postcodee,
      "distance": this.distance,
      "hasOptedOutOfEmail": this.gdrp,
      "vehicleToStay": this.vehicleToStay,
      "voucherName":this.rform.value.voucher,
      "Channel":this.channel
      }
      }
    // console.log(request);
    this.BookingService.forwardApi(request).subscribe((response) => {
      console.log("FORWARD API RESPONSE", response.json());
      var data = response.json();
      // console.log();
      if (data.isSuccess) {
        // console.log("Sucess");
        this.spinnerService.hide();
        localStorage.setItem(data.lead.Id, JSON.stringify(data.lead));
        var fulldata = {
          "request": request, 'source_loc': this.loc, 'destination_loc': this.des,
          'dep_date': this.bookingForm.value.pickDateControl,
          'ret_date': this.withReturn ? this.bookingForm.value.returnDateControl : '',
          'distanceValue': this.distanceValue, 'duration': this.duration
        };
        localStorage.setItem(data.lead.Id + "_request", JSON.stringify(fulldata));



        this.router.navigate(['/stepThird/' + data.lead.Id,]);
      } else {
        this.spinnerService.hide();
      }
    });



  }

  getQueryData() {
    this.http.get("assets/time.json").subscribe((res: any) => {
      this.time = JSON.parse(res._body);
    })

  }

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
          // console.log("source full location", this.loc);


          // console.log("lat", this.latitude1);
          // console.log("lon", this.longitude1)
          // console.log("place *****", place.address_components);
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
          // console.log(" destination full location", this.des);
          // console.log("lat", this.latitude2);
          // console.log("lon", this.longitude2)
          // console.log("place *****", place.address_components);
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

    // console.log(this.city);
    if (this.city.length === 0 || this.city == '') {
      this.finalCity = '';
    } else {
      this.finalCity = this.city[0].long_name;
    }
    var strt1 = ((this.street.length) && (this.street_name.length)) ? this.street[0].long_name + " " + this.street_name[0].long_name : ((this.street.length) ? this.street[0].long_name : ((this.street_name.length) ? this.street_name[0].long_name : ''));
    this.finalStreet1 = (this.street1.length) ? this.street1[0].long_name + '/' + strt1 : strt1;
    // console.log("ssttrreett from", this.finalStreet1);



    // console.log("country", this.country)

    // console.log("state", this.state)

    // console.log("postcode", this.postcode)

    // console.log("street", this.street)

    // console.log("street_name", this.street_name)

    // console.log("street1", this.street1);
    // console.log("city from Api", this.city)
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
    });

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
    // debugger;
    var strt2 = ((this.streett.length) && (this.street_namee.length)) ? this.streett[0].long_namee + " " + this.street_namee[0].long_name : ((this.streett.length) ? this.streett[0].long_name : ((this.street_namee.length) ? this.street_namee[0].long_name : ''));
    this.finalStreet2 = (this.street2.length) ? this.streett[0].long_name + '/' + strt2 : strt2;

    // console.log("ssttrreett to", this.finalStreet2);

    // console.log("country", this.countryy)

    // console.log("state", this.statee)

    // console.log("postcode", this.postcodee)

    // console.log("street", this.streett)

    // console.log("street_name", this.street_namee)

    // console.log("street2", this.street2);
    // console.log("cityy from API", this.cityy);

    // console.log("cityy", this.finalCityy);
  }



  ScrollToTop() {
    window.scrollTo(0, 0);
  }

  openModal(route) {
    
    
    this.spinnerService.show();
    this.BookingService.getDistance(this.loc, this.des).subscribe((response) => {
      //this.modal = true;
      // console.log("DISTANCE API", response.json());
      var distance = response.json().rows[0].elements[0].distance.text;
      this.distance = parseInt(distance.replace("km", ""));
      // console.log("DISTANCE", this.distance)
      this.distanceValue = response.json().rows[0].elements[0].distance.value;
      this.duration = response.json().rows[0].elements[0].duration.text;
      this.spinnerService.hide();
      if (this.withReturn) {
        var isValidJourney = this.checkIfjourneyIsVaild(response.json().rows[0].elements[0].duration.value / 60);
        if (isValidJourney) {
          this.modal = true;
          window.scrollTo(0, 300);
        }
      } else {
        this.modal = true;
        window.scrollTo(0, 300);
      }



    })
    if (route === 'return') {
      // console.log("RETURN FORM DATA", this.bookingForm.value);
    } else {
      // console.log("ONE WAY FORM DATA", this.bookingFormSec.value);
    }
    this.bookingForm.value.sourceControl = this.loc;
    this.bookingForm.value.destinationControl = this.des;
    var day = this.bookingForm.value.pickDateControl.day;
    var month = this.bookingForm.value.pickDateControl.month;
    var year = this.bookingForm.value.pickDateControl.year;
    this.dept_date = day + "/" + month + "/" + year;

    if (this.withReturn) {
      var day1 = this.bookingForm.value.returnDateControl.day;
      var month1 = this.bookingForm.value.returnDateControl.month;
      var year1 = this.bookingForm.value.returnDateControl.year;
      this.return_date = day1 + "/" + month1 + "/" + year1;
    }
    // console.log("DATE FORMAT two way departure", this.dept_date);
    // console.log("DATE FORMAT two way return", this.return_date);
    // console.log("from location", this.bookingForm.value.sourceControl);
  }
  closeModal() {
    window.scrollTo(0, 0);

    this.modal = false;

  }

  goToAttraction() {
    window.scrollTo(0, 0);
    this.router.navigate(['/attraction/0'])
  }

  PassengerBookingType(option) {
   
    if (option === 'return') {
      this.withReturn = true;
      this.bookingForm.get('returnDateControl').setValidators([Validators.required]);
      this.bookingForm.get('returnTimeControl').setValidators([Validators.required]);
    }

    if (option === 'oneway') {
      this.withReturn = false;
      this.vehicleToStay = false;
      this.bookingForm.get('returnDateControl').setValidators(null);
      this.bookingForm.get('returnTimeControl').setValidators(null);

    }

    this.bookingForm.get('returnDateControl').updateValueAndValidity();
    this.bookingForm.get('returnTimeControl').updateValueAndValidity();
  }
  toggle(n, m) {

  }
  toggleSec(n, m) {
    // console.log(this.minDateSec)

  }
  getDepDate(event) {

    // console.log(event)

    // var dt = new Date(event.year,event.month-1,event.day);
    // var nt = new Date(dt.setTime(dt.getTime() + (24 * 60 * 60 * 1000)));
    this.minDateSec = { "year": event.year, "month": event.month, "day": event.day }
    // console.log("selected date", this.minDateSec);
    this.is_edit = false;
    // console.log("-------", this.minDateSec)


  }


  openDivs() {

    // this.service.popouter(true);
    
    this.service.quickPopouter.subscribe((res)=>{
      console.log("----",res);
      this.isclick = res;
    })
    // this.isclick = true;
    this.rd.addClass(this.openDiv.nativeElement, 'showClass');
    this.quate_from = false;
    this.rd.addClass(this.formClass.nativeElement, 'heightBox');
    
    this.service.desClicked(true);
  
  }

  timesChange(event) {
    // console.log(event)
    // console.log(this.bookingForm.value.returnDateControl);
    // console.log(this.bookingForm.value.pickDateControl);
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
    }
    else {
      this.timeVal = false

    }
    // this.checkIfjourneyIsVaild();
  }

  checkIfjourneyIsVaild(durationMin) {
    if (this.bookingForm.value.returnDateControl != null && this.bookingForm.value.pickDateControl != null) {
      var fromDate: any = new Date(this.bookingForm.value.pickDateControl.year + "-" + this.bookingForm.value.pickDateControl.month + "-" + this.bookingForm.value.pickDateControl.day + " " + this.bookingForm.value.departureTimeControl + ":00 ");
      var toDate: any = new Date(this.bookingForm.value.returnDateControl.year + "-" + this.bookingForm.value.returnDateControl.month + "-" + this.bookingForm.value.returnDateControl.day + " " + this.bookingForm.value.returnTimeControl + ":00 ");
      var diffMs = (toDate - fromDate); // milliseconds between now & Christmas
      var mins = diffMs / 1000 / 60;
      if (durationMin > mins) {
        this.bookingForm.reset();
        alert("There is an invalid request. Please try again.");

        return false;
      }
      return true;
    }
  }
  needVehicle(){
    if(this.withReturn){
      this.vehicleToStay = !this.vehicleToStay;
    }else{
      this.vehicleToStay = false;
    }
   
  }
 
 
}
