import React, { Component } from 'react';
import Calendar from 'react-calendar';
import TimePicker from 'react-times';
import 'react-times/css/material/default.css';

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
      selectedValue : value
    });
  }

  render() { 
    const items = this.props.items.map((item) => {
      let selector = "btn btn-dark";

      if(item.name == this.state.selectedValue) {
        selector += " active";
      }
      return (<button className={selector} key={item.name} onClick={() => this.onClick(item.name)}>
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
  }

  onClick(value) {
    this.setState({
      selectedValue : value
    });
  }

  render() {
    const items = this.props.places.map((item) => {
      let selector = "btn btn-dark";

      if(item.id == this.state.selectedValue) {
        selector += " active";
      }
      return (<button className={selector} key={item.id} onClick={() => this.onClick(item.id)}>
        {item.name}
      </button>);
    });

    return(
      <div className="row">
        <h3>Place</h3>
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

  changeKilograms(event){
         this.setState({kg: event.target.value});
  }

  changeGrams(event){
         this.setState({g: event.target.value});
  }

  getTotal() {
    return (this.state.kg * 1000) + parseInt(this.state.g);
  }

  render() {  
    return(
    	<div className="row">
        <strong>kg</strong>
        <input type="range" step="1" min="0" max="10" value={this.state.kg} onChange={this.changeKilograms}/>

        <strong>g</strong>
        <input type="range" step="50" min="0" max="999" value={this.state.g} onChange={this.changeGrams} />

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
    })
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