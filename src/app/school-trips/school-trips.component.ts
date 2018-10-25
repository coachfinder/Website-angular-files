import { Component, OnInit, AfterViewChecked, HostBinding,ViewChild,ElementRef,Renderer2 } from '@angular/core';
import { CommonService } from '../../services/common.service'
import { PageContentService } from '../../services/page_content_service';
import { Meta, Title } from '@angular/platform-browser'
import { rightswipe } from '../../animations'
import { Router } from '@angular/router';
import {DigitalTracking} from '../../services/digital_tracking';
@Component({
  selector: 'app-school-trips',
  templateUrl: './school-trips.component.html',
  styleUrls: ['./school-trips.component.css'],
  animations: [rightswipe]

})
export class SchoolTripsComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'relative';
  @ViewChild('scc') scc : ElementRef

  public pageContent = {
    "title": "",
    "content": "",
    "file1": "",
    "file2": "",
    "file3": "",
    "left_desc": "",
    "right_desc": "",
    "quote_text": "",
    "sub_desc": "",
    "subtitle": "",
    "sections": [{
      "description": "",
      "title": "",
      "file": "",
      "option_1_button": "",
      "option_2_button": "",
      "option_3_button": "",
      "option_4_button": "",
      "option_1_price": "",
      "option_2_price": "",
      "option_3_price": "",
      "option_4_price": "",
    }]

  }

  public planClicked: boolean = false;
  public legolandPlan: boolean = false;
  public path = 'page/service/school_trip';


  constructor(
    private service: CommonService,
    private pageService: PageContentService,
    public meta: Meta, public title: Title,
    private router: Router,
    private rd : Renderer2,
    private digitalTracking: DigitalTracking
  ) {
    title.setTitle('School Coach Hire | Coaches for Schools | Coachfinder');
    meta.addTags([
      {
        name: 'description', content: 'Coachfinder offers safe, reliable coaches with fully audited coach operators and DBS checked drivers with safety and cost at the top of our priority list.'
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
  varr = false;

  ngOnInit() {
    this.pageService.getPageContent(this.path).subscribe((response: any) => {
      console.log("school trip page content", response.json());
      this.pageContent = response.json();
    })

  }



  checkPlans(plan) {
    // if (plan === 'Thorpe') {
    //   this.planClicked = true
    // } else if (plan === 'legoland') {
    //   this.legolandPlan = true
    // }
  }


  closePlan(plan) {
    // if (plan === 'Thorpe') {
    //   this.planClicked = false;
    // } else if (plan === 'legoland') {
    //   this.legolandPlan = false;
    // }
  }
  show(key) {
    console.log(key);
    document.getElementById("thor_more_" + key).style.display = "none";
    document.getElementById("thor_sec_" + key).style.display = "block";
    if(key % 2 === 0  ){
      document.getElementById("check"+key).classList.add('without_after');
    }
    
    
  }
  hide(key) {
    console.log(key);
    document.getElementById("thor_more_" + key).style.display = "block";
    document.getElementById("thor_sec_" + key).style.display = "none";
    // this.rd.removeClass(this.scc.nativeElement,'without_after')
    document.getElementById("check"+key).classList.remove('without_after')
  }

  navigateToHome(address) {
    if (address != '') {
      localStorage.setItem('dest_loc', address);
    }
    this.router.navigate(['/']);
  }

}
