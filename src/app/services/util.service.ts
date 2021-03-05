import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  formatForcastObject(FiveDayForecast, zip) {
    const formatedForcast = [];
    for (let i = 4; i < FiveDayForecast.length; i += 7) {
        const tempObj = this.formatCityWeatherObject(FiveDayForecast[i], zip);
        formatedForcast.push(tempObj);
    }

    return formatedForcast;
  }

   // creates city weather object
   formatCityWeatherObject(data, zip) {
     let date = '';
    if (data.hasOwnProperty('dt_txt')) {
        date = data.dt_txt.split(' ')[0].slice(5);
    }
    const citydata = {
      zip,
      name: data['name'],
      tempF: this.kelvinUnitTransform('f', data['main']['temp']),
      tempC: this.kelvinUnitTransform('c', data['main']['temp']),
      icon: data['weather'][0]['main'],
      forecast: data['weather'][0]['description'],
      tempHighF: this.kelvinUnitTransform('f', data['main']['temp_max']),
      tempHighC: this.kelvinUnitTransform('c', data['main']['temp_max']),
      tempLowF: this.kelvinUnitTransform('f', data['main']['temp_min']),
      tempLowC: this.kelvinUnitTransform('c', data['main']['temp_min']),
      humidity: data['main']['humidity'],
      date: date
    };
    return citydata;
  }

  //  translates Kelvin to Fahrenheit or Celsius
  kelvinUnitTransform(type: string, kelvin: number) {
    const temp = type === 'f' ? Math.round( (kelvin - 273.15) * 9 / 5 + 32 ) : Math.round( kelvin - 273.15 );
    return temp;
  }
}