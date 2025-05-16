import Toast from 'react-native-simple-toast';
import React, {useEffect, useState} from 'react';
import {fetchNews} from '../services/newsService';
import WeatherCard from '../components/WeatherCard';
import {fetchWeather} from '../services/weatherService';
import LinearGradient from 'react-native-linear-gradient';
import Geolocation from '@react-native-community/geolocation';
import {
  View,
  Text,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Linking,
} from 'react-native';

type WeatherData = {
  location: {
    name: string;
    region: string;
    country: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
  };
};

type Article = {
  title: string;
  description: string;
  url: string;
  source?: {name: string};
};

const HomeScreen = ({navigation}: any) => {
  const [news, setNews] = useState<Article[]>([]);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const locationOptions = {
    enableHighAccuracy: false, 
    timeout: 15000,          
    maximumAge: 10000,       
  };

  const checkLocationServicesAndPermissions = async () => {
    try {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Permission',
              message: 'This app needs access to your location to show weather data',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            return {
              permissionGranted: false,
              errorMessage: 'Location permission denied',
            };
          }
        } catch (err) {
          console.error('Android permission error:', err);
          return {
            permissionGranted: false,
            errorMessage: 'Error requesting location permission',
          };
        }
      } else if (Platform.OS === 'ios') {
        Geolocation.requestAuthorization();
      }
      return { permissionGranted: true };
    } catch (err) {
      console.error('Permission check error:', err);
      return {
        permissionGranted: false,
        errorMessage: 'Error checking location permissions',
      };
    }
  };

  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => resolve(position),
        error => reject(error),
        locationOptions,
      );
    });
  };

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const { permissionGranted, errorMessage } = await checkLocationServicesAndPermissions();
      if (!permissionGranted) {
        setError(errorMessage || 'Location permission denied');
        setLoading(false);
        return;
      }
      try {
        const position = await getCurrentPosition();
        const { latitude, longitude } = position.coords;
        try {
          const weatherData = await fetchWeather(`${latitude},${longitude}`);
          setWeather(weatherData);
          try {
            const rawNews = await fetchNews();
            setNews(rawNews);
          } catch (newsErr) {
            console.error('Error fetching news:', newsErr);
            Toast.show('Could not load news data', Toast.SHORT);
          }
        } catch (weatherErr) {
          console.error('Error fetching weather data:', weatherErr);
          setError('Could not load weather data');
          Toast.show('Error fetching weather data', Toast.LONG);
        }
      } catch (locationError) {
        console.error('Geolocation error:', locationError);
        if (locationError.code === 1) {
          setError('Location permission denied. Please enable location access in app settings.');
        } else if (locationError.code === 2 || 
                  (locationError.message && locationError.message.includes('location provider'))) {
          setError('Location services are disabled. Please enable GPS and network location.');
          showLocationServicesAlert();
        } else if (locationError.code === 3) {
          setError('Location request timed out. Please try again in an area with better GPS signal.');
        } else {
          setError(`Location error: ${locationError.message}`);
        }
        Toast.show(`Error getting location: ${locationError.message}`, Toast.LONG);
      }
    } catch (e) {
      console.error('Unexpected error in loadData:', e);
      setError('An unexpected error occurred');
      Toast.show('An unexpected error occurred', Toast.LONG);
    } finally {
      setLoading(false);
    }
  };

  const showLocationServicesAlert = () => {
    Alert.alert(
      'Location Services Disabled',
      'We can\'t get your current location because location services are disabled. Please enable GPS and network location in your device settings.',
      [
        {
          text: 'Open Settings',
          onPress: openLocationSettings,
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
    );
  };

  const openLocationSettings = () => {
    if (Platform.OS === 'android') {
      try {
        Linking.sendIntent('android.settings.LOCATION_SOURCE_SETTINGS');
      } catch (e) {
        console.error('Could not open location settings:', e);
        Linking.openSettings();
      }
    } else {
      Linking.openSettings();
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const retryLoading = () => {
    setWeather(null);
    setNews([]);
    loadData();
  };

  return (
    <LinearGradient
      colors={['#7F7FD5', '#86A8E7', '#91EAE4']}
      style={{ flex: 1, paddingHorizontal: 16, paddingTop: 10, justifyContent: 'center', alignItems: 'center', }}>
      {loading ? (
        <View style={{alignItems: 'center'}}>
          <ActivityIndicator color={'#fff'} size={35} />
          <Text style={{color: '#fff', marginTop: 10, fontSize: 16}}>
            Loading weather data...
          </Text>
        </View>
      ) : error ? (
        <View style={{alignItems: 'center', padding: 20}}>
          <Text style={{color: '#fff', fontSize: 18, marginBottom: 20, textAlign: 'center'}}>
            {error}
          </Text>
          <TouchableOpacity
            onPress={retryLoading}
            style={{ backgroundColor: 'rgba(255,255,255,0.3)', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 }}>
            <Text style={{color: '#fff', fontSize: 16}}>Retry</Text>
          </TouchableOpacity>
          
          {error.includes('location') && (
            <TouchableOpacity
              onPress={openLocationSettings}
              style={{ backgroundColor: 'rgba(255,255,255,0.5)', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8, marginTop: 10 }}>
              <Text style={{color: '#fff', fontSize: 16}}>Open Location Settings</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <>
          {weather && (
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, paddingBottom: 40 }}>
              <View>
                <Text
                  style={{ fontSize: 18, color: '#fff', fontWeight: 'bold', paddingLeft: 5 }}>
                  {weather?.location?.region || weather?.location?.name}
                </Text>
                <Text style={{fontSize: 70, color: '#fff'}}>
                  {weather?.current?.temp_c}°
                </Text>
                <Text style={{fontSize: 16, color: '#efefef', paddingLeft: 5}}>
                  {weather?.current?.condition?.text}
                </Text>
              </View>
            </View>
          )}
          {weather && <WeatherCard weather={weather} />}
          {weather && (
            <View style={{marginTop: 30, alignItems: 'center'}}>
              <TouchableOpacity onPress={() => navigation.navigate('News', {news})}>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                  🔥 Trending News
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}
    </LinearGradient>
  );
};

export default HomeScreen;