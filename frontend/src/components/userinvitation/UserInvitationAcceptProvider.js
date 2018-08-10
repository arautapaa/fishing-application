import React, { Component } from 'react';
import { isLoggedIn } from '../actions/Authentication';
import LoginPage from '../common/LoginPage';
import { sendRequest } from '../actions/DraughtServices';

export default class UserInvitationAcceptProvider extends Component {
	constructor(props) {
		super(props)

		this.state = {
			logged : isLoggedIn(),
			error : false
		}

		this.login = this.login.bind(this);
	}

	login() {
		console.log("Authenticated!");
	}

	componentDidMount() {
		const id = this.props.match.params.id;

		sendRequest('/user/groups/invitation/' + id, 'PUT', {}).then((response) => {

		}).catch((error) => {
			console.log(error);

			
			this.setState({
				error : true
			})
		})
	}

	render() {
		const element = this.state.logged ? <span>Logged</span> : <LoginPage responseGoogle={this.login}/> 
		const errorMessage = this.state.error ? <span>Something went really wrong</span> : <span></span>

		return(
			<div className="container">
				{element}
				{errorMessage}
			</div>
		)
	}
}