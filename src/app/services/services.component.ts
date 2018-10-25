import { Component, OnInit, OnChanges, SimpleChange, HostBinding, DoCheck, AfterContentInit, AfterViewChecked, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { PageContentService } from '../../services/page_content_service';
import { rightswipe } from '../../animations';
import { Meta, Title } from '@angular/platform-browser';
import {DigitalTracking} from '../../services/digital_tracking';


@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
  animations: [rightswipe]

})
export class ServicesComponent implements OnInit, AfterViewChecked {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'relative';

  public pageContent = { "title": "", "left_desc": "", "right_desc": "", "services": [{ "description": "", "file": "", "title": "" }] }
  public path = 'page/services';

  varr: boolean;

  constructor(
    private router: Router,
    private service: CommonService,
    private pageService: PageContentService,
    public meta: Meta, public title: Title,    
    private digitalTracking: DigitalTracking
  ) { 
    title.setTitle('Cheap Coach Hire | Coach Hire For Events | Coachfinder');
    meta.addTags([
      {
        name: 'description', content: 'Coachfinder offers value coach hire for events and occasions, school trips, sports teams and more.'
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
    window.scrollTo(0, 0);
    this.changeVarFn();
    this.getContent();


    //  this.service.changeVar.subscribe();
  }
  getContent() {
    console.log(this.path)
    this.pageService.getPageContent(this.path).subscribe((response: any) => {
      console.log(response.json());
      this.pageContent = response.json();
      console.log("SERVICE PAGE CONTENT", this.pageContent)

    })
  }

  ngAfterViewChecked() {
    // console.log( window.location.href )

    var lastSegment = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);
    var queryString = window.location.href.substring( window.location.href.indexOf('?') + 1);
    var currentPage= lastSegment.substr(0, lastSegment.indexOf('?')); 

    if (lastSegment === "services" || currentPage==="services") {
      setTimeout(() => {
        this.changeVarFn();
        // console.log(this.varr);
      }, 1)

    } else {

      setTimeout(() => {

        this.varr = false;
        // this.service.editVal( this.varr);
      }, 1)

    }
  }




  changeVarFn() {
    // console.log('run');
    this.varr = true
    // this.service.editVal(this.varr);
    // console.log(this.varr);

  }


  ActiveLink(i) {
    window.scrollTo(0, 0);
    // this.MainService=false;
    console.log('i m at another component')
    this.varr = false;
    this.service.editVal(this.varr);
    debugger;
    if (i == 0) {
      this.router.navigate(['/services/schoolTrip']);
    } else if (i == 1) {
      this.router.navigate(['/services/events']);
    } else if (i == 2) {
      this.router.navigate(['/services/sports']);
    } else if (i == 3) {
      this.router.navigate(['/services/overseas']);
    }
  }
  navigateToHome(address) {
    if (address != '') {
      localStorage.setItem('dest_loc', address);
    }
    this.router.navigate(['/']);
  }

}
