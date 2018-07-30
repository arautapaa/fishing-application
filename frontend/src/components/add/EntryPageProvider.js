import React, { Component } from 'react';
import { isLoggedIn, authenticate } from '../actions/Authentication';
import AddEntryProvider from './AddEntryProvider';

import LoginPage from '../common/LoginPage';

export default class EntryPageProvider extends Component {
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
		let componentToShow = <LoginPage login={this.handleLogin}/>

		if(this.state.loggedIn) {
			componentToShow = <AddEntryProvider />
		}

		return(
			<section>	
				{componentToShow}
			</section>
		)
	}
}