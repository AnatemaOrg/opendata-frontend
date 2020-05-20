import { Component, OnInit, ViewChild, AfterViewInit,ChangeDetectorRef,OnDestroy } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy, PopStateEvent } from '@angular/common';
import { filter, map } from 'rxjs/operators';
import { of as observableOf, Observable, throwError, from } from 'rxjs';
import {MediaMatcher} from '@angular/cdk/layout';

//import { NavbarComponent } from '../../components/navbar/navbar.component';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import * as $ from "jquery";

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {
  private lastPoppedUrl: string;
  private yScrollStack: number[] = [];
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor( public location: Location, private router: Router,
    changeDetectorRef: ChangeDetectorRef, media: MediaMatcher
    ) {

        this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    }

  ngOnInit() {
      
  }


}
