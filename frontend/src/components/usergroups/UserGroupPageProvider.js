import React, { Component } from 'react';
import { updateData } from '../actions/DraughtServices';
import { Redirect } from 'react-router-dom';

export default class UserGroupPageProvider extends Component {

	constructor(props) {
		super(props);

		this.state = {
			userGroupId : "",
			redirect : false
		}
		this.handleInputChange = this.handleInputChange.bind(this);
		this.addUserGroup = this.addUserGroup.bind(this);
	}

	handleInputChange(event) {
		this.setState({
			userGroupId : event.target.value
		});
	}

	addUserGroup() {
		const self = this;

		updateData('/user/groups/' + this.state.userGroupId, 'PUT', {}).then(() => {
			self.setState({
				redirect : true
			})
		});
	}

	renderRedirect() {
		if(this.state.redirect) {
			return(
				<Redirect to="/" />
			)
		}
	}

	render() {
		return(
			<div className="container">
				{this.renderRedirect()}
				<div className="form-group">
					<label>
						Set user group id
					</label>
					<input type="text" className="form-control" value={this.state.userGroupId} onChange={this.handleInputChange}/>
					<button className="btn btn-primary" onClick={this.addUserGroup}>
						Add user to user group
					</button>
				</div>
			</div>
		)
	}
}