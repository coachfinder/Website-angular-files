import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, Event as NavigationEvent } from '@angular/router';
import { NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateFRParserFormatter } from "./ngb-date-fr-parser-formatter"


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [{ provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter }]
})
export class AppComponent implements OnInit {
  isIframe=false;


  constructor(private router: Router) {

  }
  ngOnInit() {
    var isIframe = sessionStorage.getItem('isIframe');
    var lastSegment = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);
    
    if(lastSegment=='Nxbus.html' || lastSegment=='nxbus' || isIframe == 'yes'){  
      sessionStorage.setItem('isIframe','yes');
      this.isIframe =true;
    }else{
      this.isIframe= false;
      sessionStorage.removeItem('isIframe');
    }
    
   
    this.router.events.forEach((event: NavigationEvent) => {
    
      //After Navigation
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          var url = event.url;
          if (url === '/' || url.indexOf('/stepThird') >= 0 || url.indexOf('/events') >= 0 || event.url.indexOf('/quoteSummary') >= 0
            || event.url.indexOf('/payments') >= 0
          ) {
          
            if (document.getElementById('quickmobile')) {
              document.getElementById('quickmobile').style.display = "none";
            }

          } else {

            if (document.getElementById('quickmobile')) {
              var element = document.getElementById('quickmobile');
              document.getElementById('quickmobile').style.display = "block";
              element.className = element.className.replace(/\bremove\b/g, "");

            }
        
          }

        }, 1000);

      }
    });
  }

}
