import React, { Component } from 'react';
import DataListEntry from '../common/DataListEntry';

export default class WeatherInformation extends Component {
	render() {
		const weather = this.props.weather;

		if(weather != null) {
			return(
				<dl className="dl-horizontal">
					<DataListEntry title="Temperature" value={weather.temperature} />
					<DataListEntry title="Wind speed" value={weather.windspeed} />
					<DataListEntry title="Wind direction" value={weather.winddirection} />
					<DataListEntry title="Air pressure" value={weather.pressure} />
				</dl>
			)
		}
	}
}