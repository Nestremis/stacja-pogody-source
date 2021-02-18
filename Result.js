import React from 'react';
import './Result.css'

const Result = props => {

  const { date, clouds, city, humidity, sunrise, sunset, temp, pressure, wind, err } = props.weather;

  let content = null;

  if (!err && city) {
    const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString();
    const sunsetTime = new Date(sunset * 1000).toLocaleTimeString();

    content = (
      <>
        <h3> { city.toUpperCase()} aktualnie : </h3>
        <h4>Temperatura  {temp} &#176;C</h4>
        <h4> Wiatr  { wind} m/s</h4>
        <h4>Zachmurzenie  { clouds} % </h4>
        <h4>Ciśnienie  { pressure} hPa</h4>
        <h4>Wilgotność { humidity} % </h4>
        <h4>Wschód i zachód :  { sunriseTime} - { sunsetTime}</h4>
        <>Dane dla dnia i godziny  { date}</>
      </>
    )

  }

  return (
    <div className="result">
      {err ? `Nie mamy w bazie ${city}` : content}
    </div>
  );
}

export default Result;