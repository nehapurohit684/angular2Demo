import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Weather, FiveDayForecast, WeatherFromAPI} from '../model/weather.interface';
import { forkJoin, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  BASE_URL: string = `https://api.openweathermap.org/data/2.5/weather?zip=`;
  FORECAST_URL: string = `https://api.openweathermap.org/data/2.5/forecast?zip=`;
  weatherAppKey: string = `b46b6f73920f827d7bcc206ecdbd504e`;

  constructor(private http: HttpClient) {  }

  getWeather(zip){
    this.http.get
    const url = `${this.BASE_URL}${zip},us&appid=${this.weatherAppKey}`;
    return this.http.get<{payload: Weather}>(url);
  }

  getForecast(zip): Observable<FiveDayForecast> {
    const url = `${this.FORECAST_URL}${zip},us&appid=${this.weatherAppKey}`;

    return this.http.get<FiveDayForecast>(url);
  }

  getInitialWeather(zips): Observable<WeatherFromAPI[]> {
    const responses: any[] = [];
    let urlstring = '';
    zips.map(zip => {
      urlstring =  `${this.BASE_URL}${zip},us&appid=${this.weatherAppKey}`;
      responses.push(this.http.get(urlstring));
    });
    return forkJoin<WeatherFromAPI>(responses);
  }

  handleError(error) {
    const errMsg: string = error.statusText;
    if (error.status) {alert('Could not locate city by that zip, ' + errMsg); }
    return errMsg;
  }
}
