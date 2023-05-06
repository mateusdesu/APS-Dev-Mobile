import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image } from 'react-native';
import axios from 'axios';
import unidecode from 'unidecode';

const API_KEY = '7ff8656d755a92e88498f4360d8ced74';

const removeAccents = (text) => {
  return unidecode(text);
};

const App = () => {
  const [city, setCity] = useState('');
  const [temperature, setTemperature] = useState('');
  const [icon, setIcon] = useState('');

  const getWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${removeAccents(
          city
        )}&appid=${API_KEY}&units=metric`
      );
      setTemperature(response.data.main.temp);
      setIcon(response.data.weather[0].icon);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f4f4f4'}}>
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
        }}
        placeholder="Insira o nome da cidade"
        value={city}
        onChangeText={(text) => setCity(text)}
      />
      <Button title="Buscar" onPress={getWeatherData} style={{borderRadius: 10, width: '80%'}} />
      {temperature && icon ? (
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Image
            source={{ uri: `https://openweathermap.org/img/w/${icon}.png` }}
            style={{ width: 100, height: 100 }}
          />
          <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
            {temperature.toFixed(0)} °C
          </Text>
        </View>
      ) : null}
    </View>
  );
};

export default App;
