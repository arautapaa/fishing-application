import React, { Component } from 'react';
import { BasicSelection, PlaceSelection, WeightSelection, DateSelection } from './Selections';

class AddEntry extends Component {
	constructor(props) {
		super(props);

		this.selected = {
		  	fish : null,
		  	gear : null,
		  	fisher : null,
		  	weight : null,
		  	catchTime : null
		}
	}


  render() {
    return(
    	<div className="container">
    		<BasicSelection title="Fish" items={this.props.selections.fish} />
    		<PlaceSelection places={this.props.places} />
    		<BasicSelection title="Fisher" items={this.props.selections.fisher} />
    		<BasicSelection title="Gear" items={this.props.selections.gear} />
    		<WeightSelection fish={this.selected.fish} />
    		<DateSelection />
    	</div>
    );
  }
}

export default AddEntry;