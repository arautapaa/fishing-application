import React, { Component } from 'react';

export class AdditionalAttributes extends Component {
	constructor(props) {
		super(props);

		this.state = {
			attributes : []
		}

		this.onClick = this.onClick.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
	}
	handleInputChange(index, name, value) {

		const attributes = this.state.attributes.slice();
		attributes[index][name] = value;
		this.setState({
			attributes : attributes
		});

		this.props.handleChange(attributes);
	}

	onClick() {
		const attributes = this.state.attributes;

		attributes.push({
			name : '',
			value : ''
		});

		this.setState({
			attributes : attributes
		});
	}

	render() {
		const elements = this.state.attributes.map((attribute, index) => {
			return <AdditionalAttribute name={attribute.name} value={attribute.value} key={index} index={index} handleInputChange={this.handleInputChange} />;
		});

		return(
			<div className="row">
				{elements}
				<button className="btn btn-primary" onClick={this.onClick}>
					Add new additional attribute
				</button>
			</div>
		)
	}
};

class AdditionalAttribute extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name : props.name,
			value : props.value
		}

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		const index = this.props.index;
		this.setState({
			[event.target.name] : event.target.value 
		})
		this.props.handleInputChange(index, event.target.name, event.target.value);
	}

	render() {
		return[
			<h3>Additional attribute: {this.state.name}</h3>,
			<div className="input-group">
				<label>
					Name for additional attribute
				</label>
				<input className="form-control" type="text" name="name" value={this.state.name} placeholder="Additional attribute name" onChange={this.handleChange} />
			</div>,
			<div className="input-group">
				<label>
					Value for additional attribute
				</label>
				<input className="form-control" type="text" name="value" value={this.state.value} placeholder="Additional attribute value" onChange={this.handleChange} />
			</div>
		]
	}
}