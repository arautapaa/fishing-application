import React, { Component } from 'react';
import AuthenticationAPI from '../../api/authentication';
import GoogleLogin from 'react-google-login';
import { Redirect } from 'react-router-dom';
import * as EnvironmentConfiguration from '../../environment';

class LoginPage extends Component {
	constructor(props) {

		super(props);

		this.state = {
			redirect : false
		}

		this.responseGoogle = this.responseGoogle.bind(this);
	}

	responseGoogle(response) {
		const self = this;

		AuthenticationAPI.authenticate(response.getAuthResponse()['id_token']).then((credentials) => {
			self.setState({
				redirect : true
			})
		});
	}

	renderRedirect() {
		if(this.state.redirect) {
			return(<Redirect to="/" />);
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

// export the connected class
function mapStateToProps(state) {
  return {
    authenticated: state.authenticated || {},
  };
}
export default connect(mapStateToProps)(LoginPage);
