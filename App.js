import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

import { API_KEY } from './utils/WeatherAPIKey';

import Weather from './components/Weather';

import { UnsplashKeys } from './utils/UnsplashAPIKey';


export default class App extends React.Component {
  state = {
    isLoading: true,
    temperature: 0,
    location: null,
    weatherCondition: null,
    error: null,
    backgroundImage: null,
    searchText: null
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.fetchWeather(position.coords.latitude, position.coords.longitude);
      },
      error => {
        this.setState({
          error: `${error}: Error Getting Weather Condtions`
        });
      }
    );
  }

  async fetchBackground(weatherCondition) {

    let unsplashAPIUrl = `https://api.unsplash.com/photos/random/?client_id=${UnsplashKeys.accessKey}&query=${weatherCondition}`;

    fetch(
      unsplashAPIUrl
    )
    .then(res => res.json())
    .then(json => {
      this.setState({
        backgroundImage: json.urls.regular
      })
    })
  }

  async fetchLocation(location) {

    fetch(
      `https://nominatim.openstreetmap.org/?q=${location}&format=json&addressdetails=1&limit=1`
    )
      .then(res => res.json())
      .then(json => {
        console.log(location);
        this.fetchWeather(json[0].lat, json[0].lon);
      })
}

  async fetchWeather(lat, lon) {

    let weatherDataUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`;

    fetch(
      weatherDataUrl
    )
      .then(res => res.json())
      .then(json => {
        console.log(json);
        this.setState({
          temperature: json.main.temp,
          location: json.name+', '+json.sys.country,
          weatherCondition: json.weather[0].main,
          description: json.weather[0].description,
          isLoading: false
        });
        //this.fetchBackground(json.weather[0].main);
      });
  }


  render() {
    const { isLoading, weatherCondition, temperature, location, description, backgroundImage, searchText} = this.state;
    return (
      <View style={styles.container}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Fetching Weather Data Please Wait...</Text>
          </View>
        ) : (
          <View>
            <Weather weather={weatherCondition} temperature={temperature} location={location} description={description} backgroundImage={backgroundImage} />
            <TextInput value={searchText} on></TextInput>
            <Button onPress={() => this.fetchLocation({searchText})} title="Update Location"></Button>
          </View>
        )}
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E2E2E2'
  },
  loadingText: {
    fontSize: 20
  }
});