import React, { Component } from 'react';

export default class CommonInputField extends Component {
	constructor(props) {
		super(props);

		this.state = {
			value : props.value
		};
		
		this.handleInputChange = this.handleInputChange.bind(this);
		this.onInputFocus = this.onInputFocus.bind(this);
	}

	onInputFocus(event) {
		this.props.onInputFocus(this.props.index)
	}

	componentDidUpdate(prevProps) {
		if(prevProps.value != this.props.value) {
			this.setState({
				value : this.props.value
			});
		}
	}

	handleInputChange(event) {
		this.props.handleInputChange(event.target.value, this.props.index);

		this.setState({
			value : event.target.value
		});
	}


	render() {
		return(
			<div className="form-group">
				<label>
					{this.props.title}
				</label>
				<input autoFocus={true} type="text" value={this.state.value} onFocus={this.onInputFocus} onChange={this.handleInputChange} className="form-control" />
			</div>
		)
	}
}