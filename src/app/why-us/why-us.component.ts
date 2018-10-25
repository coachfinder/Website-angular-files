import { Component, OnInit,Output,EventEmitter,HostBinding } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {HeaderComponent} from '../header/header.component';
import {PageContentService} from '../../services/page_content_service';
import {Meta,Title  } from '@angular/platform-browser';
import { rightswipe } from '../../animations';
import {DigitalTracking} from '../../services/digital_tracking';
@Component({
  selector: 'app-why-us',
  templateUrl: './why-us.component.html',
  styleUrls: ['./why-us.component.css'],
  animations: [ rightswipe ]
})
export class WhyUsComponent implements OnInit {
  
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'relative';

  public path='page/why_us';

  public pageContent={
    "left_desc":"",
    "right_desc":"",
    "title":"",
    "section":[{
        "title":"",
        "file":"",
        "description":""
    }]
   
  
  }
  constructor(
    private router:Router,   
    private pageService:PageContentService,
     public meta : Meta, public title : Title,
     public digitalTracking: DigitalTracking
  ) {
    title.setTitle('Private Coach Hire | Affordable Coach Hire  | Coachfinder');
    meta.addTags([
      {
        name : 'description', content : 'At Coachfinder all our coaches are fully licenced and checked to the highest safety standards, you will be assigned a dedicated account manager so you can sit back and relax.'
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
      console.log("why us Page Content",response.json());
      this.pageContent =response.json();
    })
 
  }


  NavigationTo(tab){
    window.scrollTo(0,0);
    if(tab==='services'){
      this.router.navigate(['/services'])
    }else{
      this.router.navigate(['/attraction/0'])
    }

  }

}
