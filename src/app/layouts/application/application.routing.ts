import { Routes } from "@angular/router";

import { DashboardComponent } from "@app/components/dashboard/dashboard.component";
import { ApiComponent } from '@app/components/api/api.component';
import { InstitutionsComparisonComponent } from '@app/components/institutions_comparison/institutions_comparison.component';

export const ApplicationLayoutRoutes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent,
    data: { title: "Dashboard" }
  },
  {
    path: "fuentes-de-datos",
    component: ApiComponent,
    data: { title: "API" }
  },
  {
    path: "comparacion",
    component: InstitutionsComparisonComponent,
    data: { title: "Comparacion de instituciones" }
  }
];

export class ApplicationRoutingModule {}
