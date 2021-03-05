export interface Weather {
    name?: string;
    tempC: number;
    icon: string;
    forecast: string;
    tempHighC: number;
    tempLowC: number;
    date?: string;
}

export interface DetailWeather {
name: string;
fiveDayForecast: Weather[];
}

export interface FiveDayForecast {
city: City;
cnt: number;
code: number;
list: WeatherFromAPI[];
}

export interface City {
name: string;
coord: Coord;
country: string;
id: number;
}

export interface Coord {
lat: number;
lon: number;
}

export interface WeatherFromAPI {
base: string;
clouds: {
  all: string;
};
cod: number;
coord: {
  lat: number;
  lon: number;
};
dt: number;
id: number;
main: Main;
name: string;
sys: {
  country: string;
  id: number;
  message: number;
  sunrise: number;
  sunset: number;
};
visibility: number;
weather: Weather[];
wind: {
  deg: number;
  speed: number;
};
}

export interface Main {
humidity: number;
pressure: number;
temp: number;
temp_max: number;
temp_min: number;
}