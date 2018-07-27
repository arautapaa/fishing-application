import React, { Component } from 'react';

export class AdditionalAttributes extends Component {
	constructor(props) {
		super(props);

		this.state = {
			attributes : []
		}

		console.log(props);

		this.onClick = this.onClick.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
	}
	handleInputChange(index, name, value) {
		console.log(index + ", " + name + ", " + value)
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
			name : 'Test',
			value : 'Value'
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
			<div>
				{elements}
				<button className="btn btn-primary" onClick={this.onClick}>
					Add new
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

		console.log(props);
	}

	handleChange(event) {
		const index = this.props.index;
		this.setState({
			[event.target.name] : event.target.value 
		})
		this.props.handleInputChange(index, event.target.name, event.target.value);
	}

	render() {
		return(
			<div className="input-group">
				<label>
					Name
				</label>
				{this.props.index}
				<input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
				<label>
					Value
				</label>
				<input type="text" name="value" value={this.state.value} onChange={this.handleChange} />
			</div>
		)
	}
}