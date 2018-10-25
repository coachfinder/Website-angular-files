import { Component, OnInit ,HostBinding} from '@angular/core';
import {PageContentService} from '../../services/page_content_service';
import {Meta,Title  } from '@angular/platform-browser'
import { rightswipe } from '../../animations'
import {DigitalTracking} from '../../services/digital_tracking';
@Component({
  selector: 'app-overseas',
  templateUrl: './overseas.component.html',
  styleUrls: ['./overseas.component.css'],
  animations: [ rightswipe ]

})
export class OverseasComponent implements OnInit {

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
  public path='page/service/over_trip';

  constructor(
    private pageService:PageContentService
    , public meta : Meta, public title : Title,
    private digitalTracking: DigitalTracking
  ) {
     title.setTitle('European Coach Hire | Coach Trips | Coachfinder');
    meta.addTags([
      {
        name : 'description', content : 'Coachfinder offers European Coach Hire and Coach Hire for trips overseas, travelling by coach is the best way to take in the sights.'
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
      console.log("overseas  page content",response.json());
      this.pageContent=response.json();
    })
  }

}
