import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgModule } from '@angular/core';
import { NgbModule, NgbDatepickerModule, NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import {SignUpComponent} from './sign_up/sign-up.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BodyComponent } from './body/body.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { WhyUsComponent } from './why-us/why-us.component';
import { ServicesComponent } from './services/services.component';
import { DestinationComponent } from './destination/destination.component';
import { AttractionComponent } from './attraction/attraction.component';
import { FaqComponent } from './faq/faq.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HttpModule } from '@angular/http';
import { SchoolTripsComponent } from './school-trips/school-trips.component';
import { EventsComponent } from './events/events.component';
import { SportsComponent } from './sports/sports.component';
import { OverseasComponent } from './overseas/overseas.component';
import { CommonService } from '../services/common.service';
import { BookingService } from '../services/booking_service';
import { PageContentService } from '../services/page_content_service';
import {DigitalTracking} from '../services/digital_tracking'
import { PrivacyComponent } from './privacy/privacy.component';
import { TermsComponent } from './termsAcondition/terms.component';
import { DistanceService } from '../services/distance.service';
import { PopoverModule } from "ngx-popover";
import { StepThirdComponent } from './step-third/step-third.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { Pipe, PipeTransform } from '@angular/core';

import { ReplaceLineBreaks } from './filter.pipe';

import { StepFourthComponent } from './step-fourth/step-fourth.component';
import { QuoteSummaryComponent } from './quote-summary/quote-summary.component';
import { PaymentsComponent } from './payments/payments.component';
import { ControlMessageComponent } from './control-message/control-message.component';
import { ControlMessagesComponent } from './control-message/control-messages.component';
import { ControlMsgComponent } from './control-message/control-msg.component';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

import { AgmCoreModule } from '@agm/core';
import { CityComponent } from './city/city.component';
// import {ScrollToModule} from 'ng2-scroll-to';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import {ScrollToModule} from 'ng2-scroll-to';
import { GrowlModule } from 'primeng/growl';
import { MessageService } from 'primeng/components/common/messageservice';
import { QuoteGuard, ContactQuoteGuard, FrameGuard } from './guards/index';

import { environment } from "../environments/environment";
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UniqueComponent } from './unique/unique.component';
import { FrameBodyComponent } from './frame-body/frame-body.component';


const appRoutes: Routes = [


  { path: "", component: BodyComponent,canActivate: [QuoteGuard] },
  { path: "nxbus", component: FrameBodyComponent,canActivate: [QuoteGuard] },
  {path:'home',component:BodyComponent,canActivate:[QuoteGuard]},
  { path: "login", component:LoginComponent},
  { path: "register", component:RegisterComponent},
  { path: "whyus", component:WhyUsComponent},
  { path:"privacy", component:PrivacyComponent},
  { path:"termsConditions",component:TermsComponent},
  { path:"stepThird/:Id", component:StepThirdComponent,canActivate: [QuoteGuard] },
  { path:"events/:leadid/:vid/:msg", component:StepFourthComponent },
  { path:"quote_summary/:oppid/:leadid", component:QuoteSummaryComponent},
  { path:"payment/:leadid", component:PaymentsComponent},
  { path:"contact",component:ContactUsComponent, canActivate: [ContactQuoteGuard]},
  {path : 'thankyou', component : ThankyouComponent},
  {path : 'thank-you', component : UniqueComponent},
  { path: "services", component:ServicesComponent,
    children:[
      { path:'schoolTrip', component:SchoolTripsComponent},
      { path:'events', component:EventsComponent},
      { path:'sports', component:SportsComponent},
      { path:'overseas', component:OverseasComponent}
    ]

  },
  {
    path: "destination", component: DestinationComponent,
    children: [

      { path: ':place/:id', component: CityComponent },
    ]
  },
  // { path:'sign_up', component:SignUpComponent},

  { path: "attraction/:id", component: AttractionComponent },
  { path: "faq", component: FaqComponent },
  { path: '**', redirectTo: '' }
]
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BodyComponent,
    LoginComponent,
    RegisterComponent,
    WhyUsComponent,
    ServicesComponent,
    SignUpComponent,
    DestinationComponent,
    AttractionComponent,
    FaqComponent,
    ContactUsComponent,
    SchoolTripsComponent,
    EventsComponent,
    SportsComponent,
    PrivacyComponent,
    TermsComponent,
    OverseasComponent,
    StepThirdComponent,
    StepFourthComponent,
    QuoteSummaryComponent,
    PaymentsComponent,
    ControlMessageComponent,
    ControlMessagesComponent,
    ControlMsgComponent,
    CityComponent,
    ThankyouComponent,
    ReplaceLineBreaks,
    UniqueComponent,
    FrameBodyComponent,
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: environment.apiKey,
      libraries: ["places"]
    }),
    BrowserModule.withServerTransition({ appId: 'my-app' }),
    GrowlModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(appRoutes, { useHash: environment.hash}),
    PopoverModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDropdownModule,
    // ScrollToModule.forRoot(),
    Ng4LoadingSpinnerModule.forRoot(),
    NgbDatepickerModule.forRoot(),
    TransferHttpCacheModule,
    NgbTooltipModule.forRoot()
  ],
  providers: [CommonService,ReplaceLineBreaks,DistanceService,BookingService,PageContentService,MessageService,FrameGuard,QuoteGuard,ContactQuoteGuard,DigitalTracking],
  bootstrap: [AppComponent],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
