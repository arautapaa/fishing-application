import React, { Component } from 'react';
import { isLoggedIn, authenticate, getUser } from '../actions/Authentication';
import GoogleLogin from 'react-google-login';
import { Redirect } from 'react-router-dom'

export default class LoginPage extends Component {
	constructor(props) {

		super(props);

		this.state = {
			redirect : false
		}

		this.responseGoogle = this.responseGoogle.bind(this);
	}

	responseGoogle(response) {
		const self = this;

		if(self.props.responseGoogle != null) {
			authenticate(response.getAuthResponse()['id_token']).then((credentials) => {
				getUser().then((groups) => {
					if(groups.length > 0) {
						self.props.login();
					} else {
						self.setState({
							redirect : true
						});
					}
				});
			});
		} else {
			self.props.responseGoogle(response);
		}
	}

	renderRedirect() {
		if(this.state.redirect) {
			return(<Redirect to="/groups" />);
		}
	}

	render() {


		return(
			<div>
				{this.renderRedirect()}
				<GoogleLogin
				    clientId="635028903783-nh5o48irv1r78kubchg8rhpa690oa1ne.apps.googleusercontent.com"
				    buttonText="Login"
				    onSuccess={this.responseGoogle}
				    onFailure={this.responseGoogle}
				/>
			</div>
		)
	}
}