import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Subscription } from 'rxjs';
import { StateService } from 'src/app/services/state.service';
import { UtilService } from 'src/app/services/util.service';
import { Weather } from 'src/app/model/weather.interface';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  cities: Weather[];
  initZipcodes: number[];
  subscription: Subscription;

  constructor(public httpService: HttpService,
              public utilService: UtilService,
              private stateService: StateService) { }

  ngOnInit() {
    this.cities = [];
    this.initZipcodes = [94016, 10001, 60642];
    this.getInitCityWeather();
  }

  getInitCityWeather() {

    this.subscription = this.httpService.getInitialWeather(this.initZipcodes).subscribe( responses => {
      responses.map((data, i) => {
        const citydata = this.utilService.formatCityWeatherObject(data, this.initZipcodes[i]);
        this.cities.push(citydata);      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}