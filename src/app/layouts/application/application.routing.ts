import { Routes } from "@angular/router";

import { DashboardComponent } from "@app/components/dashboard/dashboard.component";
import { ApiComponent } from '@app/components/api/api.component';

export const ApplicationLayoutRoutes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent,
    data: { title: "Dashboard" }
  },
  {
    path: "api",
    component: ApiComponent,
    data: { title: "API" }
  }
];

export class ApplicationRoutingModule {}
