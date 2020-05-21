import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { retry, catchError, map, timeout, first } from 'rxjs/operators';
import { environment } from '@environments/environment';


@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  private readonly baseURL = 'https://api.openweathermap.org/data/2.5/weather?q=';
  private readonly forcastURL = 'https://api.openweathermap.org/data/2.5/forecast?q=';
  private readonly appID = '55899b9ea53834f2736b65a3582b734b';

  constructor(public http: HttpClient) {
  }


  getWeather(city: string, metric: 'metric' | 'imperial' = 'metric'): Observable<any> {
    return this.http.get(
      `${this.baseURL}${city}&units=${metric}&APPID=${this.appID}&lang=ES`).pipe();
  }

  getForecast(city: string, metric: 'metric' | 'imperial' = 'metric'): Observable<any> {
    return this.http.get(
      `${this.forcastURL}${city}&units=${metric}&APPID=${this.appID}`)
      .pipe(first(), map((weather) => weather['list']));
  }

  getTotals(): Observable<any> {
    return this.http.get(
      `${environment.productionAPI}/catalogs/totals`)
      .pipe(
        map(response =>{
          return response;
        }),
        catchError(this.errorHandl)
      )
  }

  getInstitutionCatalog(): Observable<any> {
    return this.http.get(
      `${environment.productionAPI}/catalogs/institutions`)
      .pipe(
        map(response =>{
          return response;
        }),
        catchError(this.errorHandl)
      )
  }

  getRequestsTotalsByInstitution(id:string): Observable<any> {
    return this.http.get(
      `${environment.productionAPI}/catalogs/inforequests_history?institution=${id}`)
      .pipe(
        map(response =>{
          return response;
        }),
        catchError(this.errorHandl)
      )
  }

  getComplaintsTotalsByInstitution(id:string): Observable<any> {
    return this.http.get(
      `${environment.productionAPI}/catalogs/infocomplains_history?institution=${id}`)
      .pipe(
        map(response =>{
          return response;
        }),
        catchError(this.errorHandl)
      )
  }


  getInstitutions(): Observable<any> {
    return this.http.get(
      `${environment.productionAPI}/institutions?per_page=1000`)
      .pipe(
        map(response =>{
          return response;
        }),
        catchError(this.errorHandl)
      )
  }

  getInfoRequestsByInstitution(id: string, page:string = "1", per_page: string = "20") {
  return this.http
    .get<any>(`${environment.productionAPI}/inforequests/search?institution=${id}&per_page=${per_page}&page=${page}`)
    .pipe(
      map(response => {
        return response;
      }),
      catchError(this.errorHandl)
    );  
  }

  getInfoRequests(page:string = "1", per_page: string = "20") {
    return this.http
      .get<any>(`${environment.productionAPI}/inforequests?per_page=${per_page}`)
      .pipe(
        map(response => {
          return response;
        }),
        catchError(this.errorHandl)
      );  
    }
  errorHandl(error) {
    let errorMessage = "";
    if (error.error) {
      // Get client-side error
      errorMessage = error.error;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(error);
  }


}
