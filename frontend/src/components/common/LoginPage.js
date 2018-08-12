import React, { Component } from 'react';
import { isLoggedIn, authenticate, getUser } from '../actions/Authentication';
import GoogleLogin from 'react-google-login';
import { Redirect } from 'react-router-dom';
import * as EnvironmentConfiguration from '../../environment';

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

		authenticate(response.getAuthResponse()['id_token']).then((credentials) => {
			getUser().then((groups) => {
				if(this.props.responseGoogle == null) {
					if(groups.length > 0) {
						self.props.login();
					} else {
						self.setState({
							redirect : true
						});
					}
				} else {
					this.props.responseGoogle();
				}
			}).catch((error) => {
				self.setState({
					redirect : true
				})
			});
		});
	}

	renderRedirect() {
		if(this.state.redirect) {
			return(<Redirect to="/groups" />);
		}
	}

	render() {


		return(
			<div className="container">
				{this.renderRedirect()}
				<GoogleLogin
				    clientId={EnvironmentConfiguration.GOOGLE_CLIENT_ID}
				    buttonText="Login"
				    onSuccess={this.responseGoogle}
				    onFailure={this.responseGoogle}
				/>
			</div>
		)
	}
}