import { Component, OnInit ,HostBinding} from '@angular/core';
import { rightswipe } from '../../animations'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [ rightswipe ]

})
export class RegisterComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'relative';

  constructor() { }

  ngOnInit() {
  }

}
