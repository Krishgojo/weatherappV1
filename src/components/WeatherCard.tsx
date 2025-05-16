import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const WeatherCard = ({weather}: {weather: any}) => {
  if (!weather?.current) return null;

  return (
    <View>
      <View style={styles.overallcard}>
        {weather.current.humidity && (
          <TouchableOpacity style={styles.card}>
            <Text style={styles.condition}>Humidity</Text>
            <Text style={styles.temp}>{weather.current.humidity}%</Text>
          </TouchableOpacity>
        )}
        {weather.current.feelslike_c && (
          <TouchableOpacity style={styles.card}>
            <Text style={styles.condition}>Real feel</Text>
            <Text style={styles.temp}>{weather.current.feelslike_c}°C</Text>
          </TouchableOpacity>
        )}
        {weather.current.wind_dir && (
          <TouchableOpacity style={styles.card}>
            <Text style={styles.condition}>Wind</Text>
            <Text style={styles.temp}>{weather.current.wind_dir}</Text>
          </TouchableOpacity>
        )}
        {weather.current.pressure_mb && (
          <TouchableOpacity style={styles.card}>
            <Text style={styles.condition}>Pressure</Text>
            <Text style={styles.temp}>{weather.current.pressure_mb}</Text>
          </TouchableOpacity>
        )}
        {weather.current.wind_dir && (
          <TouchableOpacity style={styles.card}>
            <Text style={styles.condition}>Wind</Text>
            <Text style={styles.temp}>{weather.current.wind_dir}</Text>
          </TouchableOpacity>
        )}
        {weather.current.pressure_mb && (
          <TouchableOpacity style={styles.card}>
            <Text style={styles.condition}>Pressure</Text>
            <Text style={styles.temp}>{weather.current.pressure_mb}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overallcard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    alignSelf: 'center',
  },
  card: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderRadius: 12,
    backgroundColor: '#e3f2fd',
    marginBottom: 10,
    alignSelf: 'flex-start',
    width: '45%',
    marginHorizontal: 5,
  },
  temp: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  condition: {
    fontSize: 16,
    color: '#555',
  },
});

export default WeatherCard;
