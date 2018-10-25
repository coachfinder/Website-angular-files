import { Component, OnInit,HostBinding } from '@angular/core';
import {PageContentService} from '../../services/page_content_service';
import { Router, ActivatedRoute, ParamMap,Params } from '@angular/router';
import { rightswipe } from '../../animations'
import {DigitalTracking} from '../../services/digital_tracking';
@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['../destination/destination.component.css'],
  animations: [ rightswipe ]

})
export class CityComponent implements OnInit {
  
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'relative';
  
  public path:any='';
  public pageContent={
    "file":"",
    "left_side":"",
    "title":"",
    "section":[{
      "id":"",
      "section_file":"",
      "section_title":"",
      "images":[{"section_id":"","link":"","image_name":"","image_file":""}],
    }],
    "others":[{
      "data":"",
      "section_title":"",
      "id":"",
      "title":"",
      "images":[{"section_id":"","link":"","image_name":"","image_file":"","title":""}],
    }]
   
  }

  constructor(
    private pageService:PageContentService,
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private digitalTracking: DigitalTracking
  ) {
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

    this.activatedRoute.params.subscribe((params: Params) => {
      var userId = params['id'];
      console.log(userId);
      this.path ="page/destination/"+userId;
      console.log("PATH",this.path);
      this.pageService.getPageContent(this.path).subscribe((response)=>{
        console.log("current page content",response.json());
        this.pageContent = response.json();
      })
    });
  }
  cityNavigate(city,id){
    window.scrollTo(0,0);
    var navCity  = city.toLowerCase();
    this.router.navigate(['destination/'+navCity+'/'+id])
  }
  }


