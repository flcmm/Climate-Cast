import { FC } from 'react'
import Link from 'next/link'
// import { reqWeatherApi } from './api/weatherApi'
import { log } from 'console'

interface Props {
  data: Data
}

interface Data {
  feelslike_c: number,
  region: string,
  country: string,
  temp_c: string,
  temp_f: string,
  wind_kph: string,
  uv: string,
  humidity: string,
  city?: string,
  location: string
  name: string
}

export async function reqWeatherApi(): Promise<Data> {
  const weatherApiKey = process.env.NEXT_PUBLIC_WEATHERAPI_KEY
  const currWeatherParams = '/current.json'
  const searchAutoComp = '/search.json'
  const futureForecast = '/future.json'
  const formattedData = ''
  const weatherApiQueryURl = `http://api.weatherapi.com/v1${currWeatherParams}?key=${weatherApiKey}&q=Caloocan`
  const fetchData = await fetch(weatherApiQueryURl)
  const data = await fetchData.json()
  
  if (!fetchData.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  return data
}

export default async function Welcome () {
  const weather = await reqWeatherApi()
  return (
    <div className='flex flex-col w-full h-screen'>
      <div className='w-full flex flex-row p-3 justify-between items-center'>
        <svg className='w-[5%]' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g>
            <path d="M5 17H13M5 12H19M11 7H19" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </g>
        </svg>
        <h1 className='font-bold text-2xl'>{weather.location.name + ' ' + weather.location.region + ', ' + weather.location.country}</h1>
        <Link className='w-[5%]' href={'/saved-locations'}>
          <svg className='w-full' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="Navigation / Building_03">
              <path id="Vector" d="M2 20H4M4 20H15M4 20V14.3682C4 13.8428 4 13.58 4.063 13.335C4.11883 13.1178 4.21073 12.9118 4.33496 12.7252C4.47505 12.5147 4.67114 12.3384 5.06152 11.9877L7.3631 9.91997C8.11784 9.24192 8.49549 8.90264 8.92249 8.77393C9.29894 8.66045 9.7007 8.66045 10.0771 8.77393C10.5045 8.90275 10.8827 9.2422 11.6387 9.92139L13.9387 11.9877C14.3295 12.3388 14.5245 12.5146 14.6647 12.7252C14.7889 12.9118 14.8807 13.1178 14.9365 13.335C14.9995 13.58 15 13.8428 15 14.3682V20M15 20H20M20 20H22M20 20V7.19691C20 6.07899 20 5.5192 19.7822 5.0918C19.5905 4.71547 19.2837 4.40973 18.9074 4.21799C18.4796 4 17.9203 4 16.8002 4H10.2002C9.08009 4 8.51962 4 8.0918 4.21799C7.71547 4.40973 7.40973 4.71547 7.21799 5.0918C7 5.51962 7 6.08009 7 7.2002V10.0002" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
          </svg>
        </Link>
      </div>

      <div className='w-full flex items-center justify-center'>
        <p className='px-3 py-2 bg-black rounded-3xl text-white font-semibold'>Tuesday - April 25</p>
      </div>

      <div className='grid place-content-center'>
        <h1 className='text-black font-bold'>Sunny</h1>
      </div>

      <div className='grid place-content-center'>
        <h1 className='font-bold text-9xl'>{weather.current.temp_c} C</h1>
      </div>

      <div className='w-full flex justify-center items-center'>
        <div className='bg-black w-3/4 p-3 flex flex-row justify-around rounded-lg'>
          <div className='flex w-1/4 gap-5 justify-center items-center flex-col'>
            <svg className='w-1/2' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M7 5C7 2.79086 8.79086 1 11 1C13.2091 1 15 2.79086 15 5C15 7.20914 13.2091 9 11 9H3C2.44772 9 2 8.55228 2 8C2 7.44772 2.44772 7 3 7H11C12.1046 7 13 6.10457 13 5C13 3.89543 12.1046 3 11 3C9.89543 3 9 3.89543 9 5V5.1C9 5.65228 8.55228 6.1 8 6.1C7.44772 6.1 7 5.65228 7 5.1V5ZM16.9 6C16.9 5.44772 17.3477 5 17.9 5H18C20.2091 5 22 6.79086 22 9C22 11.2091 20.2091 13 18 13H5C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11H18C19.1046 11 20 10.1046 20 9C20 7.89543 19.1046 7 18 7H17.9C17.3477 7 16.9 6.55228 16.9 6ZM0 12C0 11.4477 0.447715 11 1 11H2C2.55228 11 3 11.4477 3 12C3 12.5523 2.55228 13 2 13H1C0.447715 13 0 12.5523 0 12ZM4 16C4 15.4477 4.44772 15 5 15H6C6.55228 15 7 15.4477 7 16C7 16.5523 6.55228 17 6 17H5C4.44772 17 4 16.5523 4 16ZM8 16C8 15.4477 8.44772 15 9 15H13C15.2091 15 17 16.7909 17 19C17 21.2091 15.2091 23 13 23C10.7909 23 9 21.2091 9 19V18.9C9 18.3477 9.44771 17.9 10 17.9C10.5523 17.9 11 18.3477 11 18.9V19C11 20.1046 11.8954 21 13 21C14.1046 21 15 20.1046 15 19C15 17.8954 14.1046 17 13 17H9C8.44772 17 8 16.5523 8 16Z" fill="#FFFFFF"/>
            </svg>
            <div className='flex flex-col justify-center items-center'>
              <p className='text-white'>20kph</p>
              <h1 className='text-white'>Wind</h1>
            </div>
          </div>
          <div className='flex w-1/4 justify-center items-center flex-col'>
            <svg className='w-1/2' fill="#FFFFFF" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12,22c2.579,0,4-1.35,4-3.8,0-3.243-3.237-5.871-3.375-5.981a1,1,0,0,0-1.25,0C11.237,12.329,8,14.957,8,18.2,8,20.65,9.421,22,12,22Zm0-7.639A6.153,6.153,0,0,1,14,18.2c0,1.112-.335,1.8-2,1.8s-2-.688-2-1.8A6.153,6.153,0,0,1,12,14.361ZM6.625,2.219a1,1,0,0,0-1.25,0C5.237,2.329,2,4.957,2,8.2,2,10.65,3.421,12,6,12s4-1.35,4-3.8C10,4.957,6.763,2.329,6.625,2.219ZM6,10c-1.665,0-2-.688-2-1.8A6.153,6.153,0,0,1,6,4.361,6.153,6.153,0,0,1,8,8.2C8,9.312,7.665,10,6,10ZM18.625,2.219a1,1,0,0,0-1.25,0C17.237,2.329,14,4.957,14,8.2c0,2.45,1.421,3.8,4,3.8s4-1.35,4-3.8C22,4.957,18.763,2.329,18.625,2.219ZM18,10c-1.665,0-2-.688-2-1.8a6.153,6.153,0,0,1,2-3.839A6.153,6.153,0,0,1,20,8.2C20,9.312,19.665,10,18,10Z"/>
            </svg>
            <div className='flex flex-col justify-center items-center'>
            
            <h1 className='text-white'>Humidity</h1>
            </div>
            <div className='flex w-1/4 justify-center items-center  flex-col'>
              <svg className='w-1/2' fill="#FFFFFF" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <path d="M26,30H22a2.0059,2.0059,0,0,1-2-2V21a2.0059,2.0059,0,0,1-2-2V13a2.9465,2.9465,0,0,1,3-3h6a2.9465,2.9465,0,0,1,3,3v6a2.0059,2.0059,0,0,1-2,2v7A2.0059,2.0059,0,0,1,26,30ZM21,12a.9448.9448,0,0,0-1,1v6h2v9h4V19h2V13a.9448.9448,0,0,0-1-1Z" transform="translate(0 0)"/>
                <path d="M24,9a4,4,0,1,1,4-4h0A4.0118,4.0118,0,0,1,24,9Zm0-6a2,2,0,1,0,2,2h0a2.0059,2.0059,0,0,0-2-2Z" transform="translate(0 0)"/>
                <path d="M10,20.1839V12H8v8.1839a3,3,0,1,0,2,0Z" transform="translate(0 0)"/>
                <path d="M9,30A6.9931,6.9931,0,0,1,4,18.1108V7A5,5,0,0,1,14,7V18.1108A6.9931,6.9931,0,0,1,9,30ZM9,4A3.0033,3.0033,0,0,0,6,7V18.9834l-.332.2983a5,5,0,1,0,6.664,0L12,18.9834V7A3.0033,3.0033,0,0,0,9,4Z" transform="translate(0 0)"/>
                <rect id="_Transparent_Rectangle_" fill='none' width="32" height="32"/>
              </svg>
              <h1 className='text-white'>UV</h1>
            </div> 
          </div>
        </div>
      </div>
    </div>
  )
}
