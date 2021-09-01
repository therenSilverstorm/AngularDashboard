import {NgModule, APP_INITIALIZER} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HttpClientModule} from "@angular/common/http";
import {PlatformModule} from '@angular/cdk/platform';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon'
import {MatButtonModule} from '@angular/material/button'
import {DashboardService} from "./services/dashboard.service";
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {ClientListComponent} from "./clients/client-list/client-list.component";
import {LocalStorageService} from "ngx-webstorage";
import {TestListComponent} from './test/test-list/test-list.component';
import {clientReducer} from "../app/clients/reducer/clients.reducer"
import {MatTableModule} from "@angular/material/table";
import {StompConfig, StompService} from "@stomp/ng2-stompjs";
import {socketProvider} from "./test/test-list/StompConfig";
import * as statusReducer from "../app/store/status/status.reducer"



//ng2-stompjs config
const stompConfig: StompConfig = {
  // Which server?
  url: socketProvider,

  // Headers
  // Typical keys: login, passcode, host
  headers: {
    login: 'guest',
    passcode: 'guest'
  },

  // How often to heartbeat?
  // Interval in milliseconds, set to 0 to disable
  heartbeat_in: 0, // Typical value 0 - disabled
  heartbeat_out: 20000, // Typical value 20000 - every 20 seconds

  // Wait in milliseconds before attempting auto reconnect
  // Set to 0 to disable
  // Typical value 5000 (5 seconds)
  reconnect_delay: 5000,

  // Will log diagnostics on console
  debug: true
};

//Initialization function
export function initializeApp1(dashboardService: DashboardService) {
  return () => dashboardService.getDashboard()
}


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ClientListComponent,
    TestListComponent
  ],

  imports: [
    BrowserModule,
    HttpClientModule,
    PlatformModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    StoreModule.forRoot({clients: clientReducer, status : statusReducer.reducer }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    MatTableModule,
  ],
  providers: [
    StompService,
    {
      provide: StompConfig,
      useValue: stompConfig
    },
    DashboardService,
    {provide: APP_INITIALIZER, useFactory: initializeApp1, deps: [DashboardService], multi: true},
    LocalStorageService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

