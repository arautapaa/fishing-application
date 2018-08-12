import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';
import { logout, isLoggedIn } from '../actions/Authentication';
import * as ENV from '../../environment';

export default class Header extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loggedIn : isLoggedIn()
		}

		this.logout = this.logout.bind(this);
		this.checkLogin = this.checkLogin.bind(this);

		setInterval(this.checkLogin, 1000);
	}

	checkLogin() {
		this.setState({
			loggedIn : isLoggedIn()
		})
	}

	logout() {
		logout().then(() => {
			window.location.href = "/"
		});
	}

	printLogout() {
		if(this.state.loggedIn) {
			return(
				<li>
					<a onClick={this.logout}>
						Logout
					</a>
				</li>
			)
		}
	}

	render() {
		return(
			<nav className="navbar">
				<div className="container">
					<ul className="nav navbar-nav">
						<li><Link to='/'>Home</Link></li>
			        	<li><Link to='/add'>New entry</Link></li>
			        	<li><Link to="/groups/places">Places</Link></li>
			        	{this.printLogout()}
					</ul>
				</div>
			</nav>
		);
	}
}