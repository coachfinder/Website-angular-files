import { Component, OnInit, ViewChild, ElementRef, HostBinding, Renderer2, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';
import { PageContentService } from '../../services/page_content_service';
import { Meta, Title } from '@angular/platform-browser'
import { rightswipe } from '../../animations'
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { resolve } from 'url';
import {DigitalTracking} from '../../services/digital_tracking';

@Component({
  selector: 'app-attraction',
  templateUrl: './attraction.component.html',
  styleUrls: ['./attraction.component.css'],
  animations: [rightswipe]

})
export class AttractionComponent implements OnInit, AfterViewInit {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'relative';

  public path = 'page/attractions';
  newName: any = [];
  // @ViewChild('2') divContent : ElementRef;
  public planClicked: boolean = false;
  public legolandPlan: boolean = false;
  public sectionClick: any = [];
  public pageContent = {
    "description": "",
    "file": "",
    "option_1_button": "",
    "option_1_price": "",
    "option_1_title": "",
    "option_2_button": "",
    "option_2_price": "",
    "option_2_title": "",
    "option_3_button": "",
    "option_3_price": "",
    "option_3_title": "",
    "option_4_button": "",
    "option_4_price": "",
    "option_4_title": "",
    "title": "",
    "section": ""
  }

  constructor(
    private router: Router,
    private digitalTracking: DigitalTracking,
    private pageService: PageContentService,
    private activatedRoute: ActivatedRoute ,
     public meta: Meta, public title: Title,
    public el: ElementRef,
    public rd: Renderer2, private spinnerService: Ng4LoadingSpinnerService,

  ) {
    title.setTitle('Coach Travel To Attractions | Coach Hire | Coachfinder');
    meta.addTags([
      {
        name: 'description', content: 'Why not Book A Coach with Coachfinder to take you and your group to your favorite attractions.'
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

  ngAfterViewInit() {

    var promise = new Promise((resolve, reject) => {
      this.spinnerService.show();
      this.pageService.getPageContent(this.path).subscribe((response: any) => {
        console.log("Attraction page content here", response.json());
        this.pageContent = response.json();
        this.spinnerService.hide();
        var total = response.json().section.length;
        for (var i = 0; i < total; i++) {
          this.sectionClick[i] = false;
        }
        // console.log("CLICK ARRAY", this.sectionClick);
        resolve(this.pageContent = response.json());
      })
    })  
      .then((res) => {
        this.activatedRoute.params.subscribe((params: Params) => {
          var userId = params['id'];
          // console.log("scroll id",userId);
          setTimeout(() => {
            if (document.getElementById(userId)) {
              // document.getElementById(userId).scrollIntoView(true);
              var postion = this.getPosition(document.getElementById(userId));
              console.log(postion);
              window.scrollTo(0,postion.y -80 );
              // debugger;
            }

          }, 100);
          // 
        });
      })
      .catch((err) => {
        console.log('error occured');
      })


  }


  ngOnInit() {
    // this.spinnerService.show();
    window.scrollTo(0, 0);
    //getting params
  }

  checkPlans(index) {
    this.sectionClick[index] = !this.sectionClick[index];

  }

  NavigationTo(tab) {
    window.scrollTo(0, 0);
    if (tab === 'service') {
      this.router.navigate(['/services'])
    } else {
      this.router.navigate(['/destination'])
    }

  }
  navigateToHome(address) {
    console.log(address)
    if (address != '') {
      localStorage.setItem('dest_loc', address);
    }
    this.router.navigate(['/']);
  }

  getPosition(el) {
      var xPos = 0;
      var yPos = 0;

      while (el) {
          if (el.tagName == "BODY") {
              // deal with browser quirks with body/window/document and page scroll
              var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
              var yScroll = el.scrollTop || document.documentElement.scrollTop;

              xPos += (el.offsetLeft - xScroll + el.clientLeft);
              yPos += (el.offsetTop - yScroll + el.clientTop);
          } else {
              // for all other non-BODY elements
              xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
              yPos += (el.offsetTop - el.scrollTop + el.clientTop);
          }

          el = el.offsetParent;
      }
      return {
          x: xPos,
          y: yPos
      };
  }

}
