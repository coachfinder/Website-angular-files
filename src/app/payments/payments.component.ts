import { Component, OnInit, HostBinding } from '@angular/core';
import { rightswipe } from '../../animations'
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';
import {DigitalTracking} from '../../services/digital_tracking';
declare let paypal: any;

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css'],
  animations: [rightswipe]

})
export class PaymentsComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'relative';
  public didPaypalScriptLoad: boolean = false;
  public leadid: string = '';
  public price_data = { total: 0, amount_to_be_paid: 0, oppId : "" };

  constructor(
     private activatedRoute: ActivatedRoute,
     private router: Router,
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
      
    this.activatedRoute.params.subscribe((params: Params) => {
      this.leadid = params['leadid'];
      var pricedata = JSON.parse(localStorage.getItem("price_" + this.leadid));
      this.price_data.total = pricedata.total;
      this.price_data.amount_to_be_paid = pricedata.amount_to_paid;
      this.price_data.oppId = pricedata.oppId;
    });
  }

  public paypalConfig: any = {
    env: 'sandbox',
    client: {
      sandbox: 'AWlMGZwpQbS0dq_r2Dt0ejp1TxDm72JD7Pt4Uc2mYlihAE3FU5axxS9wr4HcnVc13gB7TcbYDVLp9Vne',
      production: 'xxxxxxxxxx'
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            { amount: { total: this.price_data.amount_to_be_paid, currency: 'GBP' } }
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {
      console.log(data);
      console.log(actions);
      debugger;
      // show success page
    }
  };
  public ngAfterViewChecked(): void {
    if (!this.didPaypalScriptLoad) {
      this.loadPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, '#paypal-button');
      });
    }
  }

  public loadPaypalScript(): Promise<any> {
    this.didPaypalScriptLoad = true;
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scriptElement.onload = resolve;
      document.body.appendChild(scriptElement);
    });
  } Î
  ngOnInit() {
    window.scrollTo(0, 0)
  }
  back() {
    this.router.navigate(['/quote_summary/' + this.price_data.oppId+ "/"+this.leadid]);
  }


}
