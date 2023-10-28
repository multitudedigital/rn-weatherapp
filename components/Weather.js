import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { weatherConditions } from '../utils/WeatherConditions';

const Weather = ({ weather, temperature, location, description, backgroundImage, searchText }) => {
  temperature = temperature.toFixed(0);
  return (
    <View
      style={[
        styles.weatherContainer,
        [
          { backgroundImage: `url(${backgroundImage})` },
          { backgroundColor: weatherConditions[weather].color }
        ]
      ]}
    >
      <View>
        <Text style={styles.locText}>{location}</Text>
      </View>
      <View style={styles.headerContainer}>
        <MaterialCommunityIcons
          size={82}
          name={weatherConditions[weather].icon}
          color={'#fff'}
        />
        <Text style={styles.tempText}>{temperature}˚</Text>
      </View>
      <View style={styles.windContainer}>
      </View>
      <View style={styles.bodyContainer}>
        <Text style={styles.title}>
          {weatherConditions[weather].title}
        </Text>
        <Text style={styles.subtitle}>
          {description}
        </Text>
      </View>
    </View>
  );
};

Weather.propTypes = {
  temperature: PropTypes.number.isRequired,
  weather: PropTypes.string,
  location: PropTypes.string
};

const styles = StyleSheet.create({
  weatherContainer: {
    flex: 1,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tempText: {
    fontSize: 72,
    color: '#fff',
    marginLeft: '20px'
  },
  locText: {
    textAlign: 'center',
    fontSize: 72,
    color: '#fff'
  },
  bodyContainer: {
    flex: 2,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingLeft: 25,
    marginBottom: 40
  },
  title: {
    fontSize: 60,
    color: '#fff'
  },
  subtitle: {
    fontSize: 24,
    color: '#fff',
    textTransform: 'capitalize'
  },
  windContainer: {
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default Weather;