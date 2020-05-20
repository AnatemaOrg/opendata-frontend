import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
}

export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard'},
  { path: '/fuentes-de-datos', title: 'Fuentes de datos',  icon: 'assignment'},
  /*{ path: '/reports', title: 'Listado',  icon: 'assignment'},
  { path: '/profile', title: 'Perfil',  icon: 'person'},
  { path: '/table-list', title: 'Table List',  icon:'content_paste'},
  { path: '/typography', title: 'Typography',  icon:'library_books'},
  { path: '/icons', title: 'Icons',  icon:'bubble_chart'},
  /*{ path: '/maps', title: 'Maps',  icon:'location_on'},
  { path: '/notifications', title: 'Notifications',  icon:'notifications'},
  { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },*/
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnDestroy {
  mobileQuery: MediaQueryList;

  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);

  fillerContent = Array.from({length: 50}, () =>
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`);

  private _mobileQueryListener: () => void;
  menuItems: RouteInfo[];

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.menuItems = ROUTES.filter(menuItem => menuItem);

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}


/**  Copyright 2019 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
