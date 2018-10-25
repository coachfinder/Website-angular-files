import { Component, OnInit, HostBinding } from '@angular/core';
import { rightswipe } from '../../animations'
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {DigitalTracking} from '../../services/digital_tracking';
@Component({
  selector: 'app-quote-summary',
  templateUrl: './quote-summary.component.html',
  styleUrls: ['./quote-summary.component.css'],
  animations: [rightswipe]

})
export class QuoteSummaryComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'relative';

  public oppid: string = '';
  public leadid: string = '';
  public quotedata: any;
  public isloaded: boolean = false;
  public isChecked: boolean = false;

  constructor( 
     private activatedRoute: ActivatedRoute,
     private c_service: CommonService,
     private spinnerService: Ng4LoadingSpinnerService,
     private router: Router,
     private digitalTracking:DigitalTracking
    ) {
      // this.digitalTracking.digitalTrackingPixel();
      let body = <HTMLDivElement> document.body;
      let script = document.createElement('script');
      script.innerHTML = '';
      script.src = "//a.tribalfusion.com/pixel/tags/Coachfinder/757203/pixel.js";
      script.async = true;
      script.defer = true;
      body.appendChild(script);

    this.activatedRoute.params.subscribe((params: Params) => {
      this.oppid = params['oppid'];
      this.leadid = params['leadid'];
      console.log("oppid QSum",this.oppid);
      console.log("leadid Qsum",this.leadid);
      this.popoulate_details();
    });
  }

  public popoulate_details() {
    this.spinnerService.show();
    var request = { "privateHireId": this.oppid };
    this.c_service.forwardApi(request, 'services/apexrest/GetQuoteSummary').subscribe((response: any) => {
      console.log("response quote summary",response)
      var data = response.json();
      if (data.isSuccess) {
        this.quotedata = data;
      } else {
        alert("Error Occured while getting quote details.");
      }
      this.isloaded = true;
      this.spinnerService.hide();
      // debugger;
    });
  }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

  public go_to_payment(percenatge){
    var amount_to_be_paid = (parseFloat(this.quotedata.movements[0].Private_Hire_Vehicles__r.records[0].Total__c)*parseFloat(percenatge))/100;
    var payment =  {
      total : this.quotedata.movements[0].Private_Hire_Vehicles__r.records[0].Total__c,
      amount_to_paid : amount_to_be_paid,
      oppId : this.oppid
    }
    localStorage.setItem('price_'+this.leadid, JSON.stringify(payment));
    this.router.navigate(['/payment/'+this.leadid]);
  }

}
