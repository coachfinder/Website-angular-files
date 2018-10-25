import { Component, OnInit,HostBinding } from '@angular/core';
import {PageContentService} from '../../services/page_content_service';
import {Meta,Title  } from '@angular/platform-browser'
import { rightswipe } from '../../animations';
import {DigitalTracking} from '../../services/digital_tracking';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
  animations: [ rightswipe ]

})
export class EventsComponent implements OnInit {
   
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'relative';

  public pageContent=[
    { "title":"","heading":"","sub_heading":"","file1":"", "file2":"","content":"","button_text":"","button_link":""}
  ]

  public path='page/events';

  constructor(
    private pageService:PageContentService, public meta : Meta, public title : Title, private digitalTracking:DigitalTracking

  ) {
    title.setTitle('Festival Coach Hire | Party Bus Hire | Coachfinder');
    meta.addTags([
      {
        name : 'description', content : 'Coachfinder offers the perfect solution for Festival Coach Hire, Party Bus Coach Hire or Wedding Coach hire, why not start your event in style.'
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
      console.log("events  page content",response.json());
      this.pageContent=response.json();
    })
  }

}
