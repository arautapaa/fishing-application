import React, { Component } from 'react';

import DraughtInformation from './DraughtInformation';
import { fetchData, sendRequest } from '../actions/DraughtServices';
import { Redirect } from 'react-router-dom';

export default class DraughtPageProvider extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			draught : null,
			redirect : false
		}

		this.deleteEntry = this.deleteEntry.bind(this);
	}

	componentDidMount() {
		const id = this.props.match.params.id;
	
		fetchData("/draughts/" + id).then((draught) => {
			fetchData("/places/" + draught.placeId).then((place) => {
				draught.place = place;
				
				this.setState({
					draught : draught
				});
			})
		})
	}

	deleteEntry() {
		if(this.state.sure) {
			sendRequest("/draughts/" + this.state.draught.id, "DELETE", {}).
			then(() => {
				this.setState({
					redirect : true
				});
			}).catch(() => {

			});
		} else {
			this.setState({
				sure : true
			})
		}
	}
 
	printRedirect() {
		if(this.state.redirect) {
			return <Redirect to="/" />
		}
	}

	render() {
		let presentation = <span>Loading...</span>

		const draught = this.state.draught;
		const buttonText = this.state.sure ? "Are you sure?" : "Delete entry";

		if(draught != null) {
			presentation = [
				<DraughtInformation draught={draught} />,
		        <button className="btn btn-danger" onClick={this.deleteEntry}>
	        		{buttonText}
		        </button>
			];
		}

		return(
			<div className="container">
				{this.printRedirect()}
				{presentation}

			</div>
		)
	}
}  