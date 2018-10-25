import { Component, OnInit,HostBinding } from '@angular/core';
import { rightswipe } from '../../animations';
import {PageContentService} from '../../services/page_content_service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {DigitalTracking} from '../../services/digital_tracking';
import { Meta, Title } from '@angular/platform-browser';
@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['../why-us/why-us.component.css'],
  animations: [ rightswipe ]

})
export class TermsComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'relative';

  public path='page/terms_and_conditions';

  public pageContent={
   title:"",
   description:""
  }

  constructor( private pageService:PageContentService,  
      private router:Router,  
      private digitalTracking:DigitalTracking,
      public meta: Meta, public title: Title,   
  ) { 
    title.setTitle('Terms and Conditions | Coachfinder');
    meta.addTags([
      {
        name: 'description', content: 'Contact Coachfinder today to find out how we can help you Hire A Coach with our professional Coach Hire Services. See our Terms and Conditions for more details.'
      }
    ]);
    // this.digitalTracking.digitalTrackingPixel();
    let body = <HTMLDivElement> document.body;
    let script = document.createElement('script');
    script.innerHTML = '';
    script.src = "//a.tribalfusion.com/pixel/tags/Coachfinder/757203/pixel.js";
    script.async = true;
    script.defer = true;
    body.appendChild(script);
   }

  ngOnInit() {
    window.scrollTo(0,0);
    this.pageService.getPageContent(this.path).subscribe((response:any)=>{
      console.log("terms and condition Page Content",response.json());
      this.pageContent =response.json();
      console.log(this.pageContent.description)
    })
  }

}
