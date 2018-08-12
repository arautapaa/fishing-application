import React, { Component} from 'react';
import DataListEntry from '../common/DataListEntry';
import WeatherInformation from './WeatherInformation';
import PlaceInformation from './PlaceInformation';
import AdditionalAttributesList from './AdditionalAttributesList';
import { ExtendedGoogleMap } from '../common/CustomGoogleMap';

export default class DraughtInformation extends Component {

	render() {
		const draught = this.props.draught;
		const places = [this.props.draught.place]
		
		return[
			<PlaceInformation place={draught.place} />,
			<dl className="dl-horizontal">
				<DataListEntry title="Fish" value={draught.fish} />
				<DataListEntry title="Gear" value={draught.gear} />
				<DataListEntry title="Fisher" value={draught.fisher} />
				<DataListEntry title="Weight" value={draught.weight} />
				<DataListEntry title="Date" value={draught.catchTime} type="date" />
			</dl>,
			<AdditionalAttributesList additionalAttributes={draught.additionalAttributes} />,
			<WeatherInformation weather={draught.weather} />,
			<ExtendedGoogleMap
          		googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCpgoPa6EbBkJOK1m01CcZLN1nHeFkhuRQ&v=3.exp&libraries=geometry,drawing,places"
	          	loadingElement={<div style={{ height: `100%` }} />}
	          	containerElement={<div style={{ height: `400px` }} />}
	          	mapElement={<div style={{ height: `100%` }} />}
	          	position={{ lat: parseFloat(draught.place.latitude), lng: parseFloat(draught.place.longitude)}}
	          	defaultZoom={13}
	          	places={places} />
		]
	}
}