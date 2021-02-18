import React, { Component } from 'react';
import Form from './Form';
import Result from './Result';
import './App.css';

// Klucz do API
const APIKey = 'efa2ef11f117f7485b2fca8e87a3a2f5'

class App extends Component {

  state = {
    value: '',
    date: '',
    city: '',
    clouds:'',
    humidity:'',
    sunrise: '',
    sunset: '',
    temp: '',
    pressure: '',
    wind: '',
    err: false,
  }

  handleInputChange = e => {
    this.setState({
      value: e.target.value
    })
  }


//Jesli wrzucimy to poprzez componentDidUpdate osiągamy efekt zapytania do bazy po każdej zmianie w inpucie - czyli jak już zaczynamy pisać on sprawdza po każdej literze 
  componentDidUpdate(prevProps, prevState) { //mimo że nei używamy wpisujemy props: tutaj prevProps
    // console.log("poprzedia wartość " + prevState.value);
    // console.log("aktualna wartość " + this.state.value);

    if (this.state.value.length === 0) return // tzn. jeśli mniej niż jedna litera wpisana w input nie wysyłaj zapytania
    if (prevState.value !== this.state.value) { //ten warunek aby uniknąć nieksończonej pętli 
      const API = `https://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&APPID=${APIKey}&units=metric`;

      fetch(API)
        .then(response => {
          if (response.ok) {
            return response
          }
          throw Error("Nie udało się")
        })
        .then(response => response.json())
        .then(data => {
          const time = new Date().toLocaleString()
          this.setState(state => ({
            err: false,
            date: time,
            sunrise: data.sys.sunrise,
            sunset: data.sys.sunset,
            temp: data.main.temp,
            pressure: data.main.pressure,
            humidity: data.main.humidity,
            wind: data.wind.speed,
            clouds: data.clouds.all,
            city: state.value
          }))
        })
        .catch(err => {
          console.log(err);
          this.setState(prevState => ({
            err: true,
            city: prevState.value
          }))
        })

    }

  }

  render() {
    return (     
        <div className="App">
          <Form
            value={this.state.value}
            change={this.handleInputChange}
          />
          <Result weather={this.state} />
        </div>
          );
       }
}

export default App;