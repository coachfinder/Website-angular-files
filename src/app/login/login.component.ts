import { Component, OnInit ,HostBinding} from '@angular/core';
import { rightswipe } from '../../animations'
import {DigitalTracking} from '../../services/digital_tracking';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [ rightswipe ]

})
export class LoginComponent implements OnInit {
  
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'relative';

  constructor(private digitalTracking: DigitalTracking) {
    // this.digitalTracking.digitalTrackingPixel();
 
   }

  ngOnInit() {
  }

}
