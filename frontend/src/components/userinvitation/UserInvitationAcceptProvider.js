import React, { Component } from 'react';
import { isLoggedIn, getUser } from '../actions/Authentication';
import LoginPage from '../common/LoginPage';
import { sendRequest } from '../actions/DraughtServices';
import { Redirect } from 'react-router-dom';

export default class UserInvitationAcceptProvider extends Component {
	constructor(props) {
		super(props)

		this.state = {
			logged : isLoggedIn(),
			error : false,
			redirect : false
		}

		this.login = this.login.bind(this);
	}

	login() {
		setTimeout(function() {
			this.sendInvitationRequest();
		}, 1000);
	}

	sendInvitationRequest() {
		const id = this.props.match.params.id;
		const self = this;

		if(this.state.logged) {
			sendRequest('/user/groups/invitation/' + id, 'PUT', {}).then((response) => {

			}).catch((error) => {
				console.log(error);
				
				this.setState({
					error : true
				})
			});

			setTimeout(function() {
				getUser().then((groups) => {
					if(groups.length > 0) {
						self.setState({
							redirect : true
						})
					}
				});
			}, 1000);
		}
	}

	componentDidMount() {
		this.sendInvitationRequest();
	}

	getRedirect() {
		if(this.state.redirect) {
			return (<Redirect to="/" />);
		}

		return null;
	}



	render() {
		const element = this.state.logged ? <span>Logged</span> : <LoginPage responseGoogle={this.login}/> 

		return(
			<div className="container">
				{this.getRedirect()}
				{element}
			</div>
		)
	}
}