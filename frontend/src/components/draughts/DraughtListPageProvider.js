import React, { Component } from 'react';

import { isLoggedIn } from '../actions/Authentication';
import LoginPage from '../common/LoginPage';
import DraughtListProvider from './DraughtListProvider';

export default class DraughtListPageProvider extends Component{
	constructor(props) {
		super(props);
	
		this.state = {
			loggedIn : isLoggedIn()
		}

		this.handleLogin = this.handleLogin.bind(this);
	}

	handleLogin() {
		this.setState({
			loggedIn : true
		})
	}

	render() {
		let componentToShow = <LoginPage login={this.handleLogin} />

		if(this.state.loggedIn) {
			componentToShow = <DraughtListProvider />
		}

		return(
			<section>	
				{componentToShow}
			</section>
		)
	}
}