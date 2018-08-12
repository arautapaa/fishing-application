import React, {Component} from 'react';
import { fetchEntryData } from '../actions/DraughtServices';
import AddEntry from './AddEntry';

export default class AddEntryProvider extends Component {
	constructor(props) {
		super(props);
	
		this.state = {
			places : [],
			selections : [],
			loaded : false
		}
	}

	componentDidMount() {
		const self = this;

		fetchEntryData().then((data) => {
			data.places.sort((a, b) => {
				if(a.name < b.name) {
					return -1;
				} else {
					return 1;
				}
			});

			data.places.forEach((item) => {
				item.latitude = parseFloat(item.latitude);
				item.longitude = parseFloat(item.longitude);
			})

			self.setState({
				places : data.places,
				selections : data.selections,
				loaded : true
			})
		});
	}

	render() {
		let componentToPrint = <span>Loading...</span>

		if(this.state.loaded) {
			componentToPrint = <AddEntry places={this.state.places} selections={this.state.selections} />
		}

		return(componentToPrint);
	}
}