import { Component, OnInit,HostBinding } from '@angular/core';
import {PageContentService} from '../../services/page_content_service';
import {Meta,Title  } from '@angular/platform-browser'
import { rightswipe } from '../../animations'
import { a9 } from '../../services/object';
import {DigitalTracking} from '../../services/digital_tracking'
@Component({
  selector: 'app-unique',
  templateUrl: './unique.component.html',
  styleUrls: ['./unique.component.css'],
  animations: [ rightswipe ]

})
export class UniqueComponent implements OnInit {

  a99 : any;
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
    "quote_link":"",
  
  }
  public path='page/thank';

  constructor(
    private pageService:PageContentService,
    private digitalTracking: DigitalTracking,
    public meta : Meta, 
     title : Title
  ) { 

    title.setTitle('Thank you | Coachfinder');
    meta.addTags([
      {
        name : 'description', content : 'Access the largest UK Coach Network to get the best service and value for your coach travel with Coachfinder.'
      }
    ]);
    //this.a99= new a9("Coachfinder",757203,"visitor",0,"allpages");
    // console.log(this.a99)

    let promise = new Promise((resolve,reject) => {
    this.a99 = new a9("Coachfinder",757203,"conversion",1,"thankupage");
    resolve(this.a99)
    })
    .then((res)=> {
      // this.digitalTracking.digitalTrackingPixel();
      let body = <HTMLDivElement> document.body;
      let script = document.createElement('script');
      script.innerHTML = '';
      script.src = "//a.tribalfusion.com/pixel/tags/Coachfinder/757203/pixel.js";
      script.async = true;
      script.defer = true;
      body.appendChild(script);
    })
  }

  ngOnInit() {
    this.pageService.getPageContent(this.path).subscribe((response:any)=>{
      console.log("Unique  page content",response.json());
      this.pageContent=response.json();
    })
  }

}
