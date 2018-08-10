import React, { Component } from 'react';
import { fetchData } from '../actions/DraughtServices';

export default class DraughtListProvider extends Component {

	constructor(props) {
		super(props);

		this.state = {
			draughts : [],
			places : []
		}
	}

	getPlace(placeId) {
		const filtered = this.state.places.filter((item) => { return item.id == placeId})

		return filtered[0];
	}

	componentDidMount() {
		Promise.all([fetchData('/draughts'), fetchData('/places')]).then((response) => {
			let draughts = response[0];

			draughts.sort((a, b) => {
				if(b.catchTime > a.catchTime) {
					return 1;
				} else {
					return -1;
				}
			})

			this.setState({
				draughts : draughts,
				places : response[1]
			});
		}).catch((error) => {

		})		
	}


	render() {
		const items = this.state.draughts.map((item) => {

      		const temperature = item.weather ? item.weather.temperature : null;

      		return(<tr>
      			<td>{item.id}</td>
      			<td>{item.fish}</td>
      			<td>{item.fisher}</td>
      			<td>{item.gear}</td>
      			<td>{temperature}</td>
      			<td>{item.weight}</td>
      			<td>{item.catchTime}</td>
      			<td>{this.getPlace(item.placeId).name}</td>
      		</tr>);
    	});

		return(
			<table className="table">
				<thead>
					<tr>
						<th>ID</th>
						<th>Fish</th>
						<th>Fisher</th>
						<th>Gear</th>
						<th>Temperature</th>
						<th>Weight</th>
						<th>CatchDate</th>
						<th>Place</th>
					</tr>
				</thead>
				<tbody>
					{items}
				</tbody>
			</table>
		);

	}
}