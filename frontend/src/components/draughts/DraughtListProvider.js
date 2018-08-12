import React, { Component } from 'react';
import { fetchData } from '../actions/DraughtServices';
import { Redirect} from 'react-router-dom';

export default class DraughtListProvider extends Component {

	constructor(props) {
		super(props);

		this.state = {
			draughts : [],
			places : []
		}

		this.goTo = this.goTo.bind(this);
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

	goTo(id) {
		this.setState({
			redirectId : id
		})
	}

	getRedirect() {
		if(this.state.redirectId) {
			const id = "/draughts/" + this.state.redirectId;

			return <Redirect to={id} />
		}
	}




	render() {
		const redirect = this.getRedirect(); 

		const items = this.state.draughts.map((item) => {

      		const temperature = item.weather ? item.weather.temperature : null;

      		return(<tr onClick={() => {this.goTo(item.id)}}>
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
			<div className="container">
				<div className="row col-xs-12">
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
					{redirect}
				</div>
			</div>
		)

	}
}