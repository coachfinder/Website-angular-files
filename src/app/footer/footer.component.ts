import { Component, OnInit,HostBinding } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {PageContentService} from '../../services/page_content_service';
import {DigitalTracking} from '../../services/digital_tracking';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],

})
export class FooterComponent implements OnInit {
  public path='page/contact_us';
  public pageContent={
    "address":"",
    "email":"",
    "heading":"",
    "phone":"",
    "right_heading":"",
    "sub_heading":"",
  
  }
  public pathContact='page/contact_us';

  public pageContentFooter={
    "address":"",
    "phone":"",
    "email" : ''

  }
  constructor(private router: Router,   private pageService:PageContentService, private digitalTracking: DigitalTracking) { 
    // this.digitalTracking.digitalTrackingPixel();
    // let body = <HTMLDivElement> document.body;
    // let script = document.createElement('script');
    // script.innerHTML = '';
    // script.src = "//a.tribalfusion.com/pixel/tags/Coachfinder/757203/pixel.js";
    // script.async = true;
    // script.defer = true;
    // body.appendChild(script);
  }
   
  ngOnInit() {
  
    this.pageService.getPageContent(this.path).subscribe((response:any)=>{
      console.log("FOOTER page content",response.json());
      this.pageContent=response.json();
    })
    this.pageService.getPageContent(this.pathContact).subscribe((response:any)=>{
      console.log("footer address here",response.json());
      this.pageContentFooter=response.json();
    })
  }

  NavigationFooter(tab){
    window.scrollTo(0,0);
    if(tab==="whyus"){
     
      this.router.navigate(['/whyus']);
    }else if(tab ==="faq"){
  
      this.router.navigate(['/faq']);
    }else if(tab==="services"){
        
      this.router.navigate(['/services']);
    }else if(tab==='destination'){
      this.router.navigate(['/destination']);
    } else if(tab==='attraction'){
      this.router.navigate(['/attraction/0']);

    } else if(tab=="contact"){
      this.router.navigate(['/contactUS']);
    }

  }
  facebookLink(){
    window.open("https://www.facebook.com/CoachfinderUK/")
  }
  twitterLink(){
    window.open("https://twitter.com/coachfinder_uk")

  }
  instaLink(){
    window.open("https://www.instagram.com/coachfinder_uk/?hl=en")
  }
  adamsUk(){
    window.open("https://www.adams.uk.com/");
  }

}
