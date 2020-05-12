import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HttpClient } from "@angular/common/http";


import { ApplicationLayoutRoutes } from "./application.routing";
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';
import { GlobalService } from 'src/app/services/global.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ApiComponent } from '@app/components/api/api.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ApplicationLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule
    
  ],
  providers: [
   GlobalService
  ],
  declarations: [
    DashboardComponent,
    ApiComponent
  ],
  entryComponents: [
   
  ]
})
export class ApplicationModule {}
