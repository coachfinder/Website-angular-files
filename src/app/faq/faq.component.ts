import { Component, OnInit, HostBinding, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Http } from '@angular/http';
import { PageContentService } from '../../services/page_content_service';
import { Meta, Title } from '@angular/platform-browser'
import { rightswipe } from '../../animations'
import { Router, ActivatedRoute, Params } from '@angular/router'
import { resolve } from 'url';
import {DigitalTracking} from '../../services/digital_tracking';
@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css'],
  animations: [rightswipe]

})
export class FaqComponent implements OnInit {
  noo = false
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'relative';
  public visible = true;
  public path = 'page/faq';

  @ViewChild('chckWidth') chckWidth: ElementRef

  type: any
  private shown: any = [];
  public pageContent = {
    "heading": "",
    "sub_heading": "",
    "title": "",
    "qa": {
      "title": "",
      "question": "",
      "answer": ""
    },
    "section": [{
      "title": "",
      "file": ""
    }]
  }
  public openClicked: boolean = false;
  public faq: any = [];
  public querry: any = [];

  public selectedQ = [];
  public isHide: boolean = false;
  public textValue = 'OPEN ALL';
  public count = 0;
  public queryAbout: any = [];

  constructor(
    private http: Http,
    private digitalTracking: DigitalTracking,
    private pageService: PageContentService, public meta: Meta, public title: Title
    , private router: Router, private route: ActivatedRoute, private rd: Renderer2
  ) {
    title.setTitle('Coach Hire Comparison | Cheap Coach Hire | Coachfinder');
    meta.addTags([
      {
        name: 'description', content: 'Coachfinder offers Affordable Coach Hire and Cheap Coaches, our team compares the market and our network of audited operators to get you the best value coach.'
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
    console.log(this.chckWidth.nativeElement.offsetWidth);
    if (this.chckWidth.nativeElement.offsetWidth < 754) {
      this.visible = false;
    } else {
      this.visible = true;
    }
    var promise = new Promise((resolve, reject) => {
      this.pageService.getPageContent(this.path).subscribe((response: any) => {
        console.log("FAQ Page Content", response.json());
        this.pageContent = response.json();
        console.log(this.pageContent.section)
        this.querry = this.pageContent.section;
        var qaLength = response.json().section.length;
        this.faq = this.querry[0].qa;

        //to get the length of payment option to declare bydefault value false
        var len = this.querry[0].qa.length;
        for (var i = 0; i < len; i++) {
          this.selectedQ[i] = false;

        }
        //used to pres-selected the payment faq
        for (var i = 0; i < qaLength; i++) {
          if (i == 0) {
            this.queryAbout[i] = true
          } else {
            this.queryAbout[i] = false;
          }
        }
        resolve(this.pageContent = response.json())
      });
    })
      .then((res) => {
        this.route.params.
          map((res) => {
            if (res.id == undefined) {
              window.scroll(0, 0);
            }
            else {
              window.scroll(0, 200)
            }
            return parseInt(res.id)
          })
          .subscribe((res: number) => {
            this.type = res
            console.log(this.type);
            parseInt(this.type)
            if (this.type != null) {
              this.faqAbout(this.type)
            }
          })
      })
    this.faqAbout1(0);
  }

  faqAbout1(index) {
    console.log(index);
    setTimeout(function () {
      if (isNaN(index) == false) {
        var elems = document.querySelectorAll(".mainli");
        [].forEach.call(elems, function (el) {
          el.classList.remove("active");
        });
        document.getElementById("li_" + index).className = "col-xs-12 col-sm-3 col-md-3 col-lg-3 mainli active";
      }

    }, 1000);
    // document.getElementById("li_"+index).className = "col-xs-12 col-sm-3 col-md-3 col-lg-3 mainli active";
    // window.scrollTo(0, 200)
    console.log(typeof index)
    // this.shown  
    console.log(this.shown)
    // console.log(this.shown[i])
    this.textValue = "OPEN ALL";
    this.openClicked = false;

    var len = this.pageContent.section.length;
    // console.log(len)
    // console.log("question Length",len)

    for (var i = 0; i < len; i++) {
      this.shown[i] = false;

    }


    for (var i = 0; i < len; i++) {
      console.log(i, index);

      if (i == index) {
        this.shown[i] = true;
      } else {
        this.shown[i] = false;
      }
      // this.shown[index]
      // this.shown[index]=true; 
    }
    console.log("selected option total question", this.shown)

    for (var i = 0; i < len; i++) {

      this.selectedQ[i] = false;
    }
    //problem:- i am getting one extra question than actual
    console.log("selected option total question", this.selectedQ)
    console.log("***", index);
    //to change the class for selected title
    for (var i = 0; i < this.queryAbout.length; i++) {
      if (i === index) {
        this.queryAbout[i] = true;
      } else {
        this.queryAbout[i] = false
      }
    }
    if (index === 0) {
      this.faq = this.querry[0].qa;
    } else if (index === 1) {

      this.faq = this.querry[1].qa;
    } else if (index === 2) {

      this.faq = this.querry[2].qa;
    } else if (index === 3) {

      this.faq = this.querry[3].qa;
    }


  }

  faqAbout(index) {

    console.log(index);
    setTimeout(function () {
      if (isNaN(index) == false) {
        var elems = document.querySelectorAll(".mainli");
        [].forEach.call(elems, function (el) {
          el.classList.remove("active");
        });
        document.getElementById("li_" + index).className = "col-xs-12 col-sm-3 col-md-3 col-lg-3 mainli active";
      }


    }, 1000);

    console.log(typeof index);
    this.selectedQ = [];
    this.textValue = "OPEN ALL";
    this.openClicked = false;
    if (isNaN(index)) {
      index = 0;
    }
    var len = this.querry[index].qa.length;
    console.log("question Length", len)

    for (var i = 0; i < len; i++) {
      this.selectedQ[i] = false;
    }
    //problem:- i am getting one extra question than actual
    console.log("selected option total question", this.selectedQ)
    console.log("***", index);
    //to change the class for selected title
    console.log(this.querry);
    for (var i = 0; i < this.queryAbout.length; i++) {
      if (i === index) {
        this.queryAbout[i] = true;
      } else {
        this.queryAbout[i] = false
      }
    }
    if (index === 0) {
      this.faq = this.querry[0].qa;
    } else if (index === 1) {

      this.faq = this.querry[1].qa;
    } else if (index === 2) {

      this.faq = this.querry[2].qa;
    } else if (index === 3) {

      this.faq = this.querry[3].qa;
    }

  }


  showHide() {
    this.openClicked = !this.openClicked;
    if (this.openClicked) {
      this.textValue = "CLOSE ALL";
      console.log(this.selectedQ);
      for (var i = 0; i < this.selectedQ.length; i++) {
        this.selectedQ[i] = true;
      }
    } else {
      this.textValue = "OPEN ALL"
      for (var i = 0; i < this.selectedQ.length; i++) {
        this.selectedQ[i] = false;

      }
    }
  }

  changeMe(index) {
    this.selectedQ[index] = !this.selectedQ[index];
    var count = 0;
    for (var i = 0; i < this.selectedQ.length; i++) {
      if (this.selectedQ[i] == true) {
        count = count + 1
      }
    }
    if (count == this.selectedQ.length) {
      this.textValue = "CLOSE ALL";
      this.openClicked = true;
      count = 0;
    } else if (count == 0) {
      this.textValue = "OPEN ALL"
      this.openClicked = false
      count = 0;
    }
  }

  returnTitle(str){
    str = str.replace("<br>", "");
    return str.replace("</br>", '');
    // return "Testing ";
  }

}




