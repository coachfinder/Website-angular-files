import { Component, OnInit,HostBinding } from '@angular/core';
import {PageContentService} from '../../services/page_content_service';
import {Meta,Title  } from '@angular/platform-browser'
import { rightswipe } from '../../animations'
import {DigitalTracking} from '../../services/digital_tracking'
@Component({
  selector: 'app-sports',
  templateUrl: './sports.component.html',
  styleUrls: ['./sports.component.css'],
  animations: [ rightswipe ]

})
export class SportsComponent implements OnInit {
   
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'relative';

  public pageContent={
    "title":"",
    "content":"",
    "file1":"",
    "file2":"",
    "file3":"",
    "left_desc":"",
    "right_desc":"",
    "quote_text":"",
    "sub_desc":"",
    "subtitle":"",
  
  }
  public path='page/service/sports_team';

  constructor(
    private pageService:PageContentService, public meta : Meta, public title : Title, private digitalTracking:DigitalTracking
  ) { 
    title.setTitle('Sports Coach Hire | Coaches for Teams | Coachfinder');
    meta.addTags([
      {
        name : 'description', content : 'Arrive in style with Coachfinder, with executive to luxury coaches your team will stand out from the crowd.'
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
    this.pageService.getPageContent(this.path).subscribe((response:any)=>{
      console.log("sports team page content",response.json());
      this.pageContent=response.json();
    })
  }

}
