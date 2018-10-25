import { Component, OnInit ,HostBinding} from '@angular/core';
import {PageContentService} from '../../services/page_content_service';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms'
import {Meta,Title  } from '@angular/platform-browser';
import { rightswipe } from '../../animations';
import { CommonService } from '../../services/common.service';
import { ValidationService } from '../../services/validation.service';
import { Router } from '@angular/router'
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { timeInterval } from 'rxjs/operator/timeInterval';
import { Message } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  animations: [ rightswipe ]

})
export class SignUpComponent implements OnInit {
   
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
   
     private fb: FormBuilder,
     private router:Router,
     public title : Title,
     public commonService :CommonService,
     private spinnerService: Ng4LoadingSpinnerService,
     private messageService: MessageService,
  )
  { 
    title.setTitle('sign_up');
   

    this.rform = fb.group({
      'Name': [null, [Validators.required, ValidationService.nameValidator]],
      'email': [null, [Validators.required, ValidationService.emailValidator]],
    })
  }

  ngOnInit() {
   
  }

 
contactUs(){
  console.log(this.rform.value);
  this.spinnerService.show();


  this.commonService.signup(this.rform.value).subscribe((response:any) => {
    this.spinnerService.hide();
    console.log((response));
    

    if(response.status == true){
      this.messageService.add({ severity: 'success', summary: 'Coachfinder', detail: 'Thank you for joining us. We will be in touch with you.' });
      this.rform.reset();
    }else{
      this.messageService.add({ severity: 'success', summary: 'Coachfinder', detail: 'Failed' });

    }
  })
}

}
