import React, { Component } from 'react';
import { ExtendedGoogleMap } from '../common/CustomGoogleMap';
import CommonInputField from '../common/CommonInputField';
import PlaceTable from './PlaceTable';
import { Redirect } from 'react-router-dom';
import { sendRequest } from '../actions/DraughtServices';

export default class UserGroupPlacePageProvider extends Component {
	constructor(props) {
		super(props);

		this.state = {
			latitude : 62.095732,
			longitude : 28.318493,
			places : [],
			redirect : false,
			initial : true
		}

		this.addNewPlace = this.addNewPlace.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.markerClick = this.markerClick.bind(this);
		this.handleFocus = this.handleFocus.bind(this);
		this.save = this.save.bind(this);
	}

	componentDidMount() {
		console.log("Get places");

		sendRequest('/places', 'GET', {}).then((places) => {
			places.forEach((item) => {
				item.latitude = parseFloat(item.latitude);
				item.longitude = parseFloat(item.longitude);
			});

			this.setState({
				places : places
			});

			if(places.length > 0) {
				this.setState({
					initial : false
				})
			}
		});
	}

	handleFocus(index) {
		this.markerClick(index);
	}

	addNewPlace(event) {
		const places = this.state.places.slice();

		const place = {
			latitude : event.latLng.lat(),
			longitude : event.latLng.lng(),
			name : ''
		}

		if(places.length > 0 && places[places.length - 1].name == "") {
			places[places.length - 1] = place;
		} else {
			places.push(place);
		}

		places.forEach((item, index) => {
			item.selected = index == (places.length - 1);
		});

		this.setState({
			places : places
		});
	}

	markerClick(index) {
		const places = this.state.places.slice();
		
		places.forEach((place, i) => {
			place.selected = (i == index);
		});

		this.setState({
			places : places
		});
	}

	handleInputChange(value, index) {
		const places = this.state.places.slice();

		places[index].name = value;

		this.setState({
			places : places
		});
	}

	getSelectedPlace() {

		let selectedIndex = null;

		const items = this.state.places.filter((place, index) => {
			if(place.selected) {
				selectedIndex = index;
			}
			return place.selected;
		});

		if(items.length > 0) {
			const place = items[0];

			return(
      			<div>
      				<CommonInputField index={selectedIndex} selected={place.selected} value={place.name} title="Place" handleInputChange={this.handleInputChange} onInputFocus={this.handleFocus} />
      				<dl>
      					<dt>Latitude</dt><dd>{place.latitude}</dd>
      					<dt>Longitude</dt><dd>{place.longitude}</dd>
      				</dl>
      			</div>
      		)
		} else {
			return null;
		}
	}

	save() {
		const placesToSave = this.state.places.filter((item) => {
			return item.id == null;
		});

		sendRequest('/places', 'POST', placesToSave).then((response) => {
			this.setState({
				redirect : true
			})
		}).catch((error) => {

		})
	}

	printRedirect() {
		if(this.state.redirect) {
			if(this.state.initial) {
				return(
					<Redirect to="/groups/invite" />
				)
			} else {
				window.scrollTo({
					top : 0,
					behaviour : 'smooth'
				});

				return(
					<h3>Saved successfully</h3>
				)
			}
		}
	}

	render() {
		const map = <ExtendedGoogleMap
	        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCpgoPa6EbBkJOK1m01CcZLN1nHeFkhuRQ&v=3.exp&libraries=geometry,drawing,places"
	        loadingElement={<div style={{ height: `100%` }} />}
	        containerElement={<div style={{ height: `400px` }} />}
	        mapElement={<div style={{ height: `100%` }} />}
	        position={{ lat: this.state.latitude, lng: this.state.longitude }}
	        defaultZoom={16}
	        onRightClick={this.addNewPlace}
	        onClick={this.addNewPlace}
	        places={this.state.places}
	        markerClick={this.markerClick}
      	/>

		return(
			<div className="container">
				{this.printRedirect()}
				<h1>Add your favourite fishing places here</h1>
				{map}
				{this.getSelectedPlace()}
				<PlaceTable places={this.state.places} handleRowClick={this.markerClick} />
				<button className="btn btn-primary" onClick={this.save}>
					Save
				</button>
			</div>
		)
	}
} 