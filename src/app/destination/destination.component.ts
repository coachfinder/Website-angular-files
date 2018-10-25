import { Component, OnInit, ViewChild,ElementRef,AfterViewChecked ,HostBinding,PipeTransform, Pipe, HostListener,NgZone} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CommonService } from '../../services/common.service'
import { FormControl } from '@angular/forms';
import {FormBuilder,FormGroup, Validators,} from '@angular/forms'
import { ValidationService } from '../../services/validation.service';
import {PageContentService} from '../../services/page_content_service';
import {Meta,Title  } from '@angular/platform-browser'
import { rightswipe } from '../../animations' 
import { BookingService } from '../../services/booking_service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Message } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { style } from '@angular/animations';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.css'],
  animations: [ rightswipe ]

})


export class DestinationComponent implements OnInit , AfterViewChecked  {
  mobHeight: any;
 mobWidth: any;
 sliderValue:any=8;

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'relative';
  @ViewChild('chckWidth') chckWidth: ElementRef
  @ViewChild('slide') slide: ElementRef
 
  public visible = true;

  public minDate: any;
  public minDateSec: any;
  london:any=[];
  public pageContent:any=
    {
       "title":"",
     "left_desc":"",
     "right_desc":"",
     "coachs":[{"name":"","seats":""}],
     "price_table":{}
     }
  public cities:any=['London','Manchester','Birmingham','Edinburgh','Bristol','Liverpool','Blackpool','Glasgow','Cardiff','Newcastle'];
  public path='page/destinations';
  public price_table:any = {};
  public hoverCoach :any = 'mini';

 public destination=true;
 public show= true;
 public completeDetail: boolean =false;
 rform:FormGroup;
 sform:FormGroup;

 displayMonths = 1;
  navigation = 'select';
  showWeekNumbers = false;
  public is_edit: boolean = true
  public distance: any;
  public distanceValue: string;
  public duration: string;

  public fromLocation: string;
  public toLocation: string;

  public pickupCountry:string;
  public pickupCity:string;
  public pickupPostcode:string;
  public pickupStreet:string;

  public destinationCountry:string;
  public destinationCity:string;
  public destinationPostcode:string;
  public destinationStreet:string;
  public dept_date: string;
  public   return_date : string;
  cityoptions : any =[];
  public vehicle: string="ST";
  public selectedCity: string;
  public currentWidth:any;
  public indexe:any;
  public ide:any;
  gdrp:boolean=false;
  public dept_time: string;
  public ret_time: string;

  constructor(
    private ngZone:NgZone,
     private router: Router,
     private service : CommonService, 
     private fb: FormBuilder,
     private messageService: MessageService,
     private spinnerService: Ng4LoadingSpinnerService,
     private BookingService: BookingService,
     private pageService:PageContentService
     , public meta : Meta, public title : Title) { 
      window.onresize = (e) =>
      {
          //ngZone.run will help to run change detection
          this.ngZone.run(() => {
        
              console.log("Width: " + window.innerWidth);
              console.log("Height: " + window.innerHeight);
              this.currentWidth = window.innerWidth;
              if(this.indexe!=undefined){
                this.mouseEnterList(this.indexe,this.ide);
              }
       
              if(window.innerWidth < 765){
                this.visible = false;
                this.selectCity()
              }else{
                this.visible = true;
              
              }
          });
      };
     
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth(); //January is 0!
      var yyyy = today.getFullYear();
      var dt = new Date(yyyy,mm,dd);
  
      var nd= new Date(dt.setTime(dt.getTime() + (24 * 60 * 60 * 1000)));
      this.minDate = { year: nd.getFullYear(), month: nd.getMonth()+1, day: nd.getDate() };

      title.setTitle('Coach Hire | Coach Tours | Coach Rental | Coachfinder');
      meta.addTags([
        {
          name : 'description', content : 'Coachfinder offers a wide variety of Coach Hire, Coach Tours and Coach Rental solution for all your coaching needs, see our destinations page for more details.'
        }
      ]);
     
    this.rform = fb.group({
      'firstName': [null, [Validators.required, ValidationService.nameValidator]],
      'lastName': [null, [ValidationService.lastNameValidator]],
      'phoneNumber':[null, [Validators.required,ValidationService.phoneValidator]],
      'email':[null, [Validators.required,ValidationService.emailValidator]],
      'voucher':[null],
      'HasOptedOutOfEmail':[null],
      'departureDate':[null, Validators.required],
      'returnDate':[null, Validators.required],
      'passengers':[null, [Validators.required,ValidationService.passengerValidator]]
    })
    this.sform = fb.group({
      'select':[null]
    })

  }
  mouseups(){
    console.log("val",this.slide.nativeElement.value);
   
    var range = this.slide.nativeElement.value;
    console.log();
   
   if(range <=20){
    this.hoverCoach='mini';
    this.vehicle = "ST";
 
    setTimeout(()=>{
      this.slide.nativeElement.value = 8.5;

    },100)
    
   }else if(range>=21 && range<=40){
    this.hoverCoach='standard';
    this.vehicle = "ST";
    setTimeout(()=>{
      this.slide.nativeElement.value =29;

    },100)
   
   }else if(range>=41 && range<=60){
    this.hoverCoach='executive48';
    this.vehicle = "EX";
    setTimeout(()=>{
      this.slide.nativeElement.value = 50;
    },100)
   
  
   
   }else if(range>=61 && range<=80){
    this.hoverCoach='executive74';
    this.vehicle = "EX"
    setTimeout(()=>{
      this.slide.nativeElement.value = 71;
    },100)
   
   
   }else if(range>=81 && range<=100){
 
    this.hoverCoach='vip35';
    this.vehicle = "VIP"
    setTimeout(()=>{
      this.slide.nativeElement.value = 92; 
    },100)

    
   }
   

  }
  mousedowns(){
    console.log("val",this.slide.nativeElement.value);
    var range = this.slide.nativeElement.value;
  }
  ngOnInit() {
    window.scrollTo(0,0);
    console.log("width*****************", this.chckWidth.nativeElement.offsetWidth);
          if (this.chckWidth.nativeElement.offsetWidth < 754) {
               this.visible = false;
             } else {
               this.visible = true;
            }

    this.service.searchFormValue.subscribe((res)=>{
     
      console.log("dest",res);
    });
    
    this.pageService.getPageContent(this.path).subscribe((response)=>{
      console.log("destination page content",response.json());
      this.pageContent = response.json();
      console.log(this.pageContent.price_table.london[0]);
          this.cities.forEach(city => {
              var na:any = [];
              for(var i=0;i<this.cities.length;i++){
                  na.push(this.pageContent.price_table[city.toLowerCase()][i]);
              }
              this.price_table[city.toLowerCase()] = na;
          });
          console.log("PRICE TABLE",this.price_table);
      
    })

  }

  ngAfterViewChecked() {
    // console.log( window.location.href )
    var lastSegment = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);
    var queryString = window.location.href.substring( window.location.href.indexOf('?') + 1);
    if (lastSegment === "destination" || queryString.includes("=")) {
      setTimeout(() => {
        this.changeVarFn();
        // console.log(this.varr);
      }, 1)

    } else {

      setTimeout(() => {

        this.destination = false;
        // this.service.editVal( this.varr);
      }, 1)

    }
  }


  changeVarFn() {
    this.destination = true;
  }
 


  addPost(){
    this.spinnerService.show();

    var day = this.rform.value.departureDate.day;
    var month = this.rform.value.departureDate.month;
    var year = this.rform.value.departureDate.year;
    this.dept_date = day + "/" + month + "/" + year;
    console.log("DEPature DATE",this.dept_date);

    var day1 = this.rform.value.returnDate.day;
      var month1 = this.rform.value.returnDate.month;
      var year1 = this.rform.value.returnDate.year;
      this.return_date = day1 + "/" + month1 + "/" + year1;
      console.log("RETURN DATE",this.return_date);

    var request = {
      "request": {
         "firstName": this.rform.value.firstName,
         "lastName": this.rform.value.lastName,
         "Phone": this.rform.value.phoneNumber,
         "email": this.rform.value.email,
         "passengers": this.rform.value.passengers,
         "voucherName":this.rform.value.voucher,
         'HasOptedOutOfEmail':this.gdrp,
         "vehicle": this.vehicle,
         "returnOrSingle": 'Return',
         "departureDate": this.dept_date,
         "departureTime": this.dept_time,
         "returnDate":  this.return_date,
         "returnTime": this.ret_time,
        "pickupStreet": this.pickupStreet,
        "pickupCounty": "",
        "pickupCity": this.pickupCity,
        "pickupCountry": this.pickupCountry,
        "pickupPostcode": this.pickupPostcode,
        "destinationStreet": this.destinationStreet,
        "destinationCounty": "",
        "destinationCity": this.destinationCity,
        "destinationCountry": this.destinationCountry,
        "destinationPostcode": this.destinationPostcode,
         "distance": this.distance,
         "vehicleToStay":true
    }

   }
   console.log("RESQUST",request);
   this.BookingService.forwardApi(request).subscribe((response) => {
    console.log("FORWARD API RESPONSE", response.json());
    var data = response.json();
    console.log();
    if (data.isSuccess) {
      this.spinnerService.hide();
      localStorage.setItem(data.lead.Id, JSON.stringify(data.lead));
      var fulldata = {
        "request": request, 'source_loc': this.fromLocation, 'destination_loc': this.toLocation,
        'dep_date': this.rform.value.departureDate,
        'ret_date':  this.rform.value.returnDate ,
        'distanceValue': this.distanceValue, 'duration': this.duration
      };
      localStorage.setItem(data.lead.Id + "_request", JSON.stringify(fulldata));

      this.router.navigate(['/stepThird/' + data.lead.Id,]);
    } else {
      this.spinnerService.hide();
    }
  });

  
  }
  toggle(){
  
//  this.d.nativeElement.toggle();
  }
  mouseEnter(){
  //alert("HOVER")
 
   
  }
  mouseLeave(){
  //alert("HOVER LEAVE");
  }

  getForm(from:any,to:any,depTime:any,retTime:any){
    console.log("dTIME", depTime)
    this.dept_time = depTime;
    this.ret_time = retTime;
  
    this.spinnerService.show();
    
    console.log("Source",from);
    console.log("Destination",to);

    
  var promise = new Promise((resolve, reject)=>{

    this.BookingService.getLocationDetails(to,from).subscribe((response : any) => {
      console.log("Location API RESPONSE", response.json());
      console.log("FROM FULL ADDRESS", JSON.parse(response._body).from);
      console.log("To FULL ADDRESS", JSON.parse(response._body).to)

      var location = JSON.parse(response._body).from;
       this.fromLocation =JSON.parse(location).address;

       console.log("FROM FULL LOC",this.fromLocation);

      var location2 = JSON.parse(response._body).to;
       this.toLocation = JSON.parse(location2).address;
      console.log("To Full LOC",this.toLocation);

            //Pickup address details

      this.pickupStreet = JSON.parse(location).street;
      this.pickupCity = JSON.parse(location).city;
      this.pickupCountry= JSON.parse(location).country;
      this.pickupPostcode = JSON.parse(location).postal_code;

      //destination address details
      
      this.destinationStreet = JSON.parse(location2).street;
      this.destinationCity = JSON.parse(location2).city;
      this.destinationCountry= JSON.parse(location2).country;
      this.destinationPostcode = JSON.parse(location2).postal_code;
      
      resolve();
    })

  }).then(()=>{
  // get distance api
    this.BookingService.getDistance( this.fromLocation,this.toLocation).subscribe((response:any) => {
      console.log("DISTANCE API", response.json());

      if(response.json().status ==="OK"){
        var distance = response.json().rows[0].elements[0].distance.text;
        this.distance = parseInt(distance.replace("km", ""));
       console.log("DISTANCE", this.distance)
         this.distanceValue = response.json().rows[0].elements[0].distance.value;
         this.duration = response.json().rows[0].elements[0].duration.text;
         console.log("duration", this.duration);
         console.log("distanceValue", this.distanceValue);
         this.spinnerService.hide();
        this.completeDetail=true;
      }else{
        this.spinnerService.hide();
        this.messageService.add({ severity: 'success', summary: 'Coachfinder', detail: 'Error accured! Please try again.' });

      }
    
    })
  })
   
  
  }

  closeForm(){
    this.completeDetail=false;
    this.rform.reset();
  }


  getDepDate(event) {

    console.log(event)

    // var dt = new Date(event.year,event.month-1,event.day);
    // var nt = new Date(dt.setTime(dt.getTime() + (24 * 60 * 60 * 1000)));
    this.minDateSec = { "year": event.year, "month": event.month, "day": event.day }
    console.log("selected date", this.minDateSec);
    this.is_edit = false;
    console.log("-------", this.minDateSec)


  }

//   priceList(index){
//     console.log(index);
//     switch(index){
//       case 0:
//         this.hoverCoach='mini';
//         this.vehicle = "ST"
//         break;
        
//         case 1:
//         this.hoverCoach='standard';
//         this.vehicle = "ST"
//         break; 
//         case 2:
//         this.hoverCoach='executive48';
//         this.vehicle = "EX"
//         break;
//         case 3:
//         this.hoverCoach='executive74';
//         this.vehicle = "EX"
//         break;
//         case 4:
//         this.hoverCoach='vip24';
//         this.vehicle = "VIP"
//         break;
//         case 5:
//         this.hoverCoach='vip35';
//         this.vehicle = "VIP"
//         break;
//         default:
//         alert("Wrong");
//   }
// }

selectCity(){
  if(this.sform.value.select!=null && this.sform.value.select!='' ){
    this.selectedCity = this.sform.value.select.toLowerCase();
    console.log(document.getElementById('idd'+this.sform.value.select));
    for(var i=0;i<this.cities.length;i++){
      if(this.cities[i]==this.sform.value.select){
        console.log("**",this.cities[i]);
        document.getElementById('idd'+this.sform.value.select).style.display="block";
      }else{
        document.getElementById('idd'+this.cities[i]).style.display="none";
  
      }
    }
  }
  
  
}

mouseEnterList(index,id){
//   // window.scrollTo(0,350)
//   this.ide=id;
//   this.indexe=index;
//   console.log("index",index);
//   console.log("id",id)
//   switch(index){
//     case 0:
//       this.hoverCoach='mini';
//       this.vehicle = "ST"
//       break;
      
//       case 1:
//       this.hoverCoach='standard';
//       this.vehicle = "ST"
//       break; 
//       case 2:
//       this.hoverCoach='executive48';
//       this.vehicle = "EX"
//       break;
//       case 3:
//       this.hoverCoach='executive74';
//       this.vehicle = "EX"
//       break;
//       case 4:
//       this.hoverCoach='vip35';
//       this.vehicle = "VIP"
//       break;
//       // case 5:
//       // this.hoverCoach='vip24';
//       // this.vehicle = "VIP"
//       // break;
//       default:
//       console.log("Wrong");
// }
//   console.log(id);
 
//     var width  = document.getElementById(id).offsetLeft;

  
//   console.log(document.getElementById('magic-line1'));
//   if(this.currentWidth <880){
//     var wid=164;
//     var width  = document.getElementById(id).offsetLeft;
//     // document.getElementById('magic-line1').style.width =wid.toString()+'px';

//   }else if(this.currentWidth < 991 && this.currentWidth >880){
//     document.getElementById('magic-line1').style.width =(wid-20).toString()+'px';
//   }
//   else {
//     var width  = document.getElementById(id).offsetLeft;
//   }
//   document.getElementById('magic-line1').style.marginLeft = width.toString()+'px';
//   //Magic line 
//   document.getElementById('magic-line1').style.transition = '0.45s';
  
}

navigateToCity(city){
var navCity = city.toLowerCase();
var id;
switch(city){
case 'London':{
  id=1;
  break;
}
case 'Manchester':{
  id=2;
  break;
}
case 'Birmingham':{
  id=4;
  break;
}
case 'Edinburgh':{
  id=5;
  break;
}
case 'Bristol':{
  id=6;
  break;
}
case 'Liverpool':{
  id=7;
  break;
}
case 'Blackpool':{
  id=8;
  break;
}
case 'Glasgow':{
  id=9;
  break;
}
case 'Cardiff':{
  id=10;
  break;
}
case 'Newcastle':{
  id=11;
  break;
}
}
this.router.navigate(['destination/'+navCity+'/'+id])


}





}
