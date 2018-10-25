import { Component, OnInit ,HostBinding} from '@angular/core';
import {PageContentService} from '../../services/page_content_service';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms'
import {Meta,Title  } from '@angular/platform-browser'
import { rightswipe } from '../../animations';
import { CommonService } from '../../services/common.service';
import { ValidationService } from '../../services/validation.service';
import { Router } from '@angular/router'
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { timeInterval } from 'rxjs/operator/timeInterval';
import { Message } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';
import {DigitalTracking} from '../../services/digital_tracking';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
  animations: [ rightswipe ]

})
export class ContactUsComponent implements OnInit {
   
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'relative';
  rform: FormGroup;
  msgs: Message[] = [];

  public path='page/contact_us';
  public pageContent={
    "address":"",
    "email":"",
    "heading":"",
    "phone":"",
    "right_heading":"",
    "sub_heading":""
  
  }

  constructor(
     private pageService:PageContentService,
     private fb: FormBuilder,
     private router:Router,
     public meta : Meta,  
     public title : Title,
     public commonService :CommonService,
     private spinnerService: Ng4LoadingSpinnerService,
     private messageService: MessageService,
     private digitalTracking: DigitalTracking
  )
  { 
    title.setTitle('Hire A Coach | Coach Hire Services | Coachfinder');
    meta.addTags([
      {
        name : 'description', content : 'Contact Coachfinder today to find out how we can help you Hire A Coach with our professional Coach Hire Services you’ll soon be on your way.'
      }
    ])
// this.digitalTracking.digitalTrackingPixel();
let body = <HTMLDivElement> document.body;
let script = document.createElement('script');
script.innerHTML = '';
script.src = "//a.tribalfusion.com/pixel/tags/Coachfinder/757203/pixel.js";
script.async = true;
script.defer = true;
body.appendChild(script);

    this.rform = fb.group({
      'Name': [null, [Validators.required, ValidationService.nameValidator]],
      'message': [null, [Validators.required]],
      'phnumber': [null, [Validators.required, ValidationService.phoneValidator]],
      'email': [null, [Validators.required, ValidationService.emailValidator]],
    })
  }

  ngOnInit() {
    this.pageService.getPageContent(this.path).subscribe((response:any)=>{
      console.log("contact Us page content",response.json());
      this.pageContent=response.json();
    })
  }

  navigateToFaq(index){
  this.router.navigate(['/faq',{id:index}]);
  }
contactUs(){
  this.spinnerService.show();

  console.log(this.rform.value);

  this.commonService.contactUs(this.rform.value).subscribe((response:any) => {
    this.spinnerService.hide();
    console.log((response));
    

    if(response.status == true){
      this.messageService.add({ severity: 'success', summary: 'Coachfinder', detail: 'Query has been submitted successfully.' });
      this.rform.reset();
    }else{
      this.messageService.add({ severity: 'success', summary: 'Coachfinder', detail: 'Failed' });

    }
  })
}

}
