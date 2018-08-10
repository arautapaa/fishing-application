import React, { Component } from 'react';

export default class EmailInvitationInput extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			index : props.index,
			email : props.email
		};

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.props.handleInputChange(this.props.index, event.target.value);

		this.setState({
			email : event.target.value
		})
	}


	render() {
		return(
			<div className="form-group">
				<label>
					Email
				</label>
				<input type="text" value={this.state.email} onChange={this.handleChange} className="form-control" />
			</div>
		)
	}
}