import React, { Component } from 'react';
import DataListEntry from '../common/DataListEntry';
import { ExtendedGoogleMap } from '../common/CustomGoogleMap';

export default class PlaceInformation extends Component {
	render() {
		const place = this.props.place;

		const places = [place];

		return[
			<dl className="dl-horizontal">
				<DataListEntry title="Latitude" value={place.latitude} />
				<DataListEntry title="Longitude" value={place.longitude} />
				<DataListEntry title="Name" value={place.name} />
				<DataListEntry title="Location" value={place.location} /> 
			</dl>
		]
	} 
}