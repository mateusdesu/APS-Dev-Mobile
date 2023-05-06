import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Image } from 'react-native';
import axios from 'axios';
import unidecode from 'unidecode';
import ArrowUp from 'react-native-vector-icons/AntDesign';
import ArrowDown from 'react-native-vector-icons/AntDesign';
import CountryFlag from 'react-native-country-flag';

const API_KEY = '7ff8656d755a92e88498f4360d8ced74';

const removeAccents = (text) => {
  return unidecode(text);
};

const App = () => {
  const [city, setCity] = useState('');
  const [temperature, setTemperature] = useState('');
  const [icon, setIcon] = useState('');
  const [tempMin, setTempMin] = useState('');
  const [tempMax, setTempMax] = useState('');
  const [country, setCountry] = useState('');

  const getWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${removeAccents(
          city
        )}&appid=${API_KEY}&units=metric`
      );
      setTemperature(response.data.main.temp);
      setTempMax(response.data.main.temp_max);
      setTempMin(response.data.main.temp_min);
      setIcon(response.data.weather[0].icon);
      setCountry(response.data.sys.country);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f0f0'}}>
      <Text style={{ fontSize: 40, fontWeight: 'bold', marginBottom: 20 }}>
        Weather App
      </Text>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: 'gray',
          borderRadius: 8,
          padding: 10,
          width: '80%',
          marginBottom: 12,
          fontSize: 20,
        }}
        placeholder="Insira o nome da cidade"
        value={city}
        onChangeText={(text) => setCity(text)}
      />
      <Pressable title="Buscar" onPress={getWeatherData} style={{borderRadius: 10, width: '80%', alignItems:'center', backgroundColor: '#2D3047', padding: 10, width: '80%'}} >
        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', fontFamily: 'Roboto' }}> Buscar</Text>
      </Pressable>
      {temperature && icon ? (
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Image
            source={{ uri: `https://openweathermap.org/img/w/${icon}.png` }}
            style={{ width: 80, height: 80 }}
          />
          <Text style={{ fontSize: 26, fontWeight: 'bold' }}>
            {temperature.toFixed(0)}°C
          </Text>
          <View style={{ flexDirection: 'row', padding: 10, justifyContent: 'space-between', alignItems: 'center' }}>
            <ArrowDown name='arrowdown' color={'red'} size={20}/>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
              Min: {tempMin.toFixed(0)}°C
            </Text>
            <Text>   </Text>
            <ArrowUp name='arrowup' color={'blue'} size={20}/>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
              Max: {tempMax.toFixed(0)}°C
            </Text>
            
          </View>
          <View style={{flexDirection: 'row', padding: 10, justifyContent: 'space-between', alignItems: 'center' }}>
            <CountryFlag isoCode={country} size={30} />
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default App;
