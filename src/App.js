import React, { Component } from 'react';
import Display from './components/Display';
import Input from './components/Input';
import './stylesheet.css';

class App extends Component {
  componentDidMount() {
    this.getTimeOfDay();
  }
  
  state = {
    distance:"",
    zip1lat: 0,
    zip1lon: 0,
    zip2lat: 0,
    zip2lon: 0,
    err: "",
    unit: "miles",
    radius: 3963,
    timeOfDay: "morning"
  }

  getTimeOfDay = () => {
    let d = new Date();
    var time = d.getHours();
    if(time<12) {
      this.setState({timeOfDay: "morning"});
    } else if(time>12&&time<16) {
      this.setState({timeOfDay:"afternoon"});
    } else if(time>16) {
      this.setState({timeOfDay:"evening"});
    }
  }

  setZipCodesLatLon = (zipObj1, zipObj2) => {
    this.setState({zip1lat: zipObj1.Lat, zip1lon: zipObj1.Long, zip2lat: zipObj2.Lat, zip2lon: zipObj2.Long}, this.calculateDistance);
  }
  
  sendErr = (err) => {
    this.setState({err, distance:""});
  }

  handleUnitChange = e => {
    if (e.target.value === "miles") {
      this.setState({unit: e.target.value, radius: 3963}, this.calculateDistance);
    } else {
      this.setState({unit: e.target.value, radius: 6371}, this.calculateDistance);
    }
  }

  calculateDistance = () => {
    // 180 / pi to convert to radians constant
    const toRad = x => x * (Math.PI / 180);

    // radius of earth
    const R = this.state.radius;

    // converting all lats/lons to radians for Haversine formula
    let latitude1 = toRad(this.state.zip1lat);
    let latitude2 = toRad(this.state.zip2lat);
    let longitude1 = toRad(this.state.zip1lon);
    let longitude2 = toRad(this.state.zip2lon);

    let dLat = latitude2 - latitude1;
    let dLon = longitude2 - longitude1;

    // Haversine formula
    let a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(latitude1) * Math.cos(latitude2) * Math.sin(dLon/2) * Math.sin(dLon/2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    let distance = R * c;

    // set distance in state to Haversine formula outcome
    this.setState({distance: distance.toFixed(2), err:""});
  }

  render() {
    return (
      <div>
        <h1 id="greeting">Good {this.state.timeOfDay}, Mediazact!</h1>
        <div className="App">
          <Input sendErr={this.sendErr} setZipCodes={this.setZipCodesLatLon.bind(this)} handleUnitChange={this.handleUnitChange.bind(this)}/>
          <Display distance={this.state.distance} zip1={this.state.zip1} zip2={this.state.zip2} error={this.state.err} unit={this.state.unit}/>
        </div>        
      </div>
    );
  }
}


export default App;


