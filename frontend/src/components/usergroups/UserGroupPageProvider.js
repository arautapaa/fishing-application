import React, { Component } from 'react';
import { sendRequest } from '../actions/DraughtServices';
import { Redirect } from 'react-router-dom';

export default class UserGroupPageProvider extends Component {

	constructor(props) {
		super(props);

		this.state = {
			diaryName : "",
			redirect : false
		}
		this.handleInputChange = this.handleInputChange.bind(this);
		this.addUserGroup = this.addUserGroup.bind(this);
	}

	handleInputChange(event) {
		this.setState({
			diaryName : event.target.value
		});
	}

	addUserGroup() {
		const self = this;

		sendRequest('/user/groups/', 'POST', {
			name : this.state.diaryName
		}).then(() => {
			self.setState({
				redirect : true
			})
		});
	}

	renderRedirect() {
		if(this.state.redirect) {
			return(
				<Redirect to="/groups/places" />
			)
		}
	}

	render() {
		return(
			<div className="container">
				{this.renderRedirect()}
				<h1>Welcome to use Fishing Diary Application</h1>
				<p>First of all, we want you to create diary with a name.</p>
				<p>You can create multiple diaries for etc. different places like salmon fishing in Lapland or summer cottage fishing in the middle of nowhere etc.</p>
				<p>You can also invite your friends also to the diary so you can share your fishing places and even compete against each other!</p>
				<div className="form-group">
					<label>
						Set diary name
					</label>
					<input type="text" className="form-control" value={this.state.diaryName} onChange={this.handleInputChange}/>
					<button className="btn btn-primary" onClick={this.addUserGroup}>
						Add new diary
					</button>
				</div>
			</div>
		)
	}
}