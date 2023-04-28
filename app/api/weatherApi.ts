import React from 'react'

interface Data {
  feelslike_c: number,
  region: string,
  country: string,
  temp_c: string,
  temp_f: string,
  wind_kph: string,
  uv: string,
  humidity: string,
  city: string,
}

export async function reqWeatherApi(): Promise<Data> {
  const weatherApiKey = process.env.WEATHERAPI_KEY
  const currWeatherParams = '/current.json'
  const searchAutoComp = '/search.json'
  const futureForecast = '/future.json'
  const formattedData = ''
  const weatherApiQueryURl = `http://api.weatherapi.com/v1${currWeatherParams}?${weatherApiKey}&/q=48.8567,2.3508`
  const fetchData = await fetch(weatherApiQueryURl)
  const data = await fetchData.json()
  console.log(weatherApiQueryURl)
  console.log(data);
  
  return data
}