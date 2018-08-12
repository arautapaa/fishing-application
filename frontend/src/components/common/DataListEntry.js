import React, { Component } from 'react';

export default class DataListEntry extends Component {
	render() {
		let value = this.props.value;
		const type = this.props.type;

		if(type != null && type == 'date') {
			value = new Date(value).toString();
		}

		return[
			<dt>{this.props.title}</dt>,
			<dd>{value}</dd>
		]
	}
}