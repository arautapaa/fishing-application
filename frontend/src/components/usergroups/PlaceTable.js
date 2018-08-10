import React, { Component } from 'react';

export default class PlaceTable extends Component {
	constructor(props) {
		super(props);
		
	}



	render() {
		const places = this.props.places.map((item, index) => {
			const activeClass = item.selected ? "bg-primary" : null;

			return(
				<tr className={activeClass} onClick={() => this.props.handleRowClick(index)}>
					<td>{item.name}</td>
					<td>{item.latitude}</td>
					<td>{item.longitude}</td>
				</tr>
			)
		});

		return(
			<table className="table">
				<thead>
					<tr>
						<th>Name</th>
						<th>Latitude</th>
						<th>Longitude</th>
					</tr>
				</thead>
				<tbody>
					{places}
				</tbody>
			</table>
		)
	}
}