import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'echarts/theme/shine.js';
import 'echarts/theme/vintage.js';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';

@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      timeOut: 1500,
      extendedTimeOut: 1500,
      closeButton: false,
      progressBar: true,
      progressAnimation: 'increasing',
      tapToDismiss: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
