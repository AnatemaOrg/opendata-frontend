import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {first, map} from 'rxjs/operators';


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

  // [0].main
  // getWeatherState
  //
  // getCurrentTemp
  // Math.round(Number(weather.main.temp))
  //
  //
  // getCurrentHum
  // weather.main.humidity
  //
  //
  // getCurrentWind
  // Math.round(Math.round(weather.wind.speed))


}
