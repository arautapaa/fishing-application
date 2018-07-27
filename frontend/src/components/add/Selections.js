import React, { Component } from 'react';
import Calendar from 'react-calendar';
import TimePicker from 'react-times';
import 'react-times/css/material/default.css';
import { getLocation } from '../actions/Geolocator';
import { GoogleMap, Marker, withGoogleMap,withScriptjs } from 'react-google-maps';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

export class BasicSelection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedValue : null
    }

    this.onClick = this.onClick.bind(this);
  }

  onClick(value) {
    this.setState({
      selectedValue : value.name
    });

    this.onSelectionChange(value); 
  }

  onSelectionChange(item) {
    this.props.onSelectionChange(item);
  }

  render() { 
    const items = this.props.items.map((item) => {
      let selector = "btn btn-dark";

      if(item.name == this.state.selectedValue) {
        selector += " active";
      }
      return (<button className={selector} key={item.name} onClick={() => this.onClick(item)}>
        {item.name}
      </button>);
    });

    return(
      <div className="row">
        <h3>{this.props.title}</h3>
        <strong>Selected: {this.state.selectedValue}</strong>
        <div className="row">
          <div className="col-xs-12">
            {items}
          </div>
        </div>
      </div>
    );
  }
}

export class PlaceSelection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedValue : null
    }

    this.onClick = this.onClick.bind(this);
    this.findMe = this.findMe.bind(this);
  }

  findMe() {
    console.log("Found");

    getLocation().then((location) => {
      this.setState({
        latitude : location.latitude,
        longitude : location.longitude,
        locationError : false
      })
    }).catch((error) => {
      this.setState({
        locationError : true
      });
    });
  }

  onClick(item) {
    this.setState({
      selectedValue : item.id,
      latitude : item.latitude,
      longitude : item.longitude
    });

    this.props.onSelectionChange(item);
  }

  render() {
    const items = this.props.places.map((item) => {
      let selector = "btn btn-dark";

      if(item.id == this.state.selectedValue) {
        selector += " active";
      }
      return (<button className={selector} key={item.id} onClick={() => this.onClick(item)}>
        {item.name}
      </button>);
    });

    let map = <span>Map placeholder</span>;

    if(this.state.latitude && this.state.longitude) {
      map = <MyMapComponent
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        position={{ lat: this.state.latitude, lng: this.state.longitude }}
        defaultZoom={8}
      />
    }


    return(
      <div className="row">
        <h3>Place</h3>
        <strong>Selected: {this.state.selectedValue}</strong>
        <div className="row">
          <div className="col-xs-12">
            {items}
          </div>
        </div>
        <span>Latitude: {this.state.latitude}</span>
        <span>Longitude: {this.state.longitude}</span>
        {map}
        <div className="row">
          <div className="col-xs-12">
            <button className="btn btn-primary" onClick={() => this.findMe()}>Find me!</button>
          </div>
        </div>
      </div>
    );
  }
}

const MyMapComponent = withScriptjs(withGoogleMap(props => {
  return <GoogleMap defaultZoom={props.defaultZoom} defaultCenter={props.position}><Marker position={props.position}/></GoogleMap>
}))

export class WeightSelection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      kg : 0,
      g : 0
    }

    this.changeKilograms = this.changeKilograms.bind(this);
    this.changeGrams = this.changeGrams.bind(this);
  }

  changeKilograms(value){
    this.setState({kg: value});

    this.props.handleChange(this.getTotal());
  }

  changeGrams(value){
    this.setState({g: value});
    this.props.handleChange(this.getTotal());
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if ((prevProps.fish == null || this.props.fish.name != prevProps.fish.name) && this.props.fish != null) {
        this.setState({
          kg : parseInt((this.props.fish.additionalAttributes.weight.default) / 1000),
          g : this.props.fish.additionalAttributes.weight.default - (parseInt((this.props.fish.additionalAttributes.weight.default) / 1000) * 1000)
        })
    }
  }



  getTotal() {
    return (this.state.kg * 1000) + parseInt(this.state.g);
  }

  render() {  
    return(
    	<div className="row">
        <strong>kg</strong>
        <InputRange step={1} minValue={0} maxValue={10} value={this.state.kg} onChange={this.changeKilograms} />

        <strong>g</strong>
        <InputRange step={50} minValue={0} maxValue={999} value={this.state.g} onChange={this.changeGrams} />

        <strong>Total weight: {this.getTotal()}</strong>
      </div>
    );
  }
}

export class DateSelection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date : new Date(),
      hour : '20',
      minute : '00'
    }

    this.onChange = this.onChange.bind(this)
    this.onTimeChange = this.onTimeChange.bind(this)
  }

  onChange(date) {
    const hour = this.state.hour;
    const minute = this.state.minute;

    date.setHours(hour);
    date.setMinutes(minute);


    this.setState({
      date : date
    });

    this.props.handleTimeChange(date);
  }

  onTimeChange(time) {
    const date = this.state.date;
    date.setHours(time.hour);
    date.setMinutes(time.minute);

    this.setState({
      hour : time.hour,
      minute : time.minute,
      date : date
    })

    this.props.handleTimeChange(date);
  }

  getTime() {
    return this.state.hour + ":" + this.state.minute;
  }

	render() {
		return(
      <div className="row">
        <strong>{this.state.date.toLocaleString()}</strong>
        <Calendar 
          value={this.state.date} 
          onChange={this.onChange}
          />
        <TimePicker onTimeChange={this.onTimeChange} time={this.getTime()} />
        <strong>{this.state.hour}:{this.state.minute}</strong>
      </div>
		);
	}
}