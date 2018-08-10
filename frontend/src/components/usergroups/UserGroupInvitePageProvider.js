import React, { Component } from 'react';
import { getUser } from '../actions/Authentication';
import { sendRequest } from '../actions/DraughtServices';
import EmailInvitationInput from './EmailInvitationInput';
import { Redirect } from 'react-router-dom';

export default class UserGroupInvitePageProvider extends Component {
	constructor(props) {
		super(props);

		this.state = {
			inputs : [],
			selectedGroup : null,
			redirect : false
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleAdd = this.handleAdd.bind(this);
		this.save = this.save.bind(this);
	}

	componentDidMount() {
		getUser().then((groups) => {
			this.setState({
				selectedGroup : groups[0].groupId
			})
		});
	}

	save() {
		const items = this.state.inputs.filter((item) => {
			if(item.trim().length > 0) {
				return true;
			}
		});

		sendRequest('/user/groups/' + this.state.selectedGroup + '/invitations', 'POST', { emails : items }).then((response) => {
			this.setState({
				redirect : true
			})
		}).catch((error) => {

		});


	}

	renderRedirect() {
		if(this.state.redirect) {
			return(
				<Redirect to="/" />
			)
		}
	}

	handleInputChange(index, value) {
		const inputs = this.state.inputs.slice(); 

		inputs[index] = value;

		this.setState({
			inputs : inputs
		});
	}

	handleAdd(event) {
		const inputs = this.state.inputs.slice();

		inputs.push('');

		this.setState({
			inputs : inputs
		})
	}

	render() {
		const inputs = this.state.inputs.map((item, index) => {
			return <EmailInvitationInput key={index} index={index} email={item} handleInputChange={this.handleInputChange} />
		});

		const selectedGroupComponent = <span>{this.state.selectedGroup}</span>

		return(
			<div className="container">
				{this.renderRedirect()}
				<h1>Invite your friends</h1>
				<div className="row">
					<div className="col-xs-12">
						{selectedGroupComponent}	
					</div>
				</div>				
				<div className="row">
					<div className="col-xs-12">			
						{inputs}
					</div>
				</div>
				<div className="row">
					<div className="col-xs-12">
						<button className="btn btn-primary" onClick={this.handleAdd}>
							Add new email
						</button>
						<button className="btn btn-danger" onClick={this.save}>
							Continue
						</button>
					</div>
				</div>
			</div>
		) 
	}
}