import React, { Component } from 'react';
import Calendar from 'react-calendar';
import TimePicker from 'react-times';
import 'react-times/css/material/default.css';
import { getLocation } from '../actions/Geolocator';
import { ExtendedGoogleMap } from '../common/CustomGoogleMap';
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
      let selector = "btn btn-primary";

      if(item.name == this.state.selectedValue) {
        selector = "btn btn-danger";
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

    let latitude = null;
    let longitude = null;

    if(props.places != null && props.places.length > 0) {
        latitude = props.places[0].latitude;
        longitude = props.places[0].longitude;
    }

    this.state = {
      selectedValue : null,
      latitude : latitude,
      longitude : longitude
    }

    this.onClick = this.onClick.bind(this);
    this.findMe = this.findMe.bind(this);
    this.markerClick = this.markerClick.bind(this);
  }

  componentDidUpdate(prevProps) {
      console.log(prevProps);

    if(prevProps.places.length == 0 && this.props.places.length > 0) {
        this.setState({
            latitude : this.props.places[0].latitude,
            longitude : this.props.places[0].longitude
        })

    }
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

  markerClick(index) {
    const places = this.props.places.slice();
    const item = places[index];
    
    places.forEach((place, i) => {
      place.selected = (i == index);
    });

    this.setState({
      places : places,
      selectedValue : item.id
    });

    this.props.onSelectionChange(item);
  }

  onClick(index) {
    this.markerClick(index);
  }

  render() {
    const items = this.props.places.map((item, index) => {
      let selector = "btn btn-primary";

      if(item.id == this.state.selectedValue) {
        selector = "btn btn-danger";
      }
      return (<button className={selector} key={item.id} onClick={() => this.onClick(index)}>
        {item.name}
      </button>);
    });

    let map = <span>Map placeholder</span>;

    if(this.state.latitude && this.state.longitude) {
      map = <ExtendedGoogleMap
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCpgoPa6EbBkJOK1m01CcZLN1nHeFkhuRQ&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          position={{ lat: this.state.latitude, lng: this.state.longitude }}
          defaultZoom={16}
          places={this.props.places}
          markerClick={this.markerClick}
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
    console.log(value);

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

  getKilogramButtons() {
    if(this.props.fish != null) {
      const buttons = [];



      for(let i = this.props.fish.additionalAttributes.weight.range.min; i <= this.props.fish.additionalAttributes.weight.range.max; i++) {
        let buttonClass = "btn btn-primary";

        if(i == this.state.kg) {
            buttonClass = "btn btn-danger";
        }

          buttons.push(<button className={buttonClass} onClick={() => this.changeKilograms(i)}>{i}</button>)
      }

      return buttons;
    }
  }


  getGramButtons() {
    if(this.props.fish != null) {
      const buttons = [];

      for(let i = 0; i < 1000; i = i + this.props.fish.additionalAttributes.weight.range.steps) {
        let buttonClass = "btn btn-primary";

        if(i == this.state.g) {
            buttonClass = "btn btn-danger";
        }
        buttons.push(<button className={buttonClass} onClick={() => this.changeGrams(i)}>{i}</button>);
      }

      return buttons;
    }
  }

  render() {  
    return(
      <div>
        <div className="row">
          <strong>Total weight</strong>
          {this.getTotal()}
        </div>
      	<div className="row">
          <strong>kg</strong>
          {this.getKilogramButtons()}
        </div>
        <div className="row">
          <strong>g</strong>
          {this.getGramButtons()}
        </div>
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