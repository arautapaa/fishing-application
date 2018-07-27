import React, { Component } from 'react';
import { BasicSelection, PlaceSelection, WeightSelection, DateSelection } from './Selections';
import { AdditionalAttributes } from './AdditionalAttributes';

class AddEntry extends Component {
	constructor(props) {
		super(props);

		this.state = {
		  	selected : {
		  		fish : null,
			  	gear : null,
			  	fisher : null,
			  	weight : null,
			  	catchTime : null,
			  	additionalAttributes : null
			}
		}

		this.handleFishChange = this.handleFishChange.bind(this);
		this.handlePlaceChange = this.handlePlaceChange.bind(this);
		this.handleGearChange = this.handleGearChange.bind(this);
		this.handleFisherChange = this.handleFisherChange.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleWeightChange = this.handleWeightChange.bind(this);
		this.handleAttributeChange = this.handleAttributeChange.bind(this);
		this.handleTimeChange = this.handleTimeChange.bind(this);
		this.save = this.save.bind(this);

	}


	handleFishChange(fish) {
		this.handleChange('fish', fish);
	}

	handleChange(name, value) {
		const selected = this.state.selected;

		selected[name] = value;

		this.setState({
			selected : selected
		});
	}

	handleFisherChange(fisher) {
		this.handleChange('fisher', fisher); 
	}

	handleGearChange(gear) {
		this.handleChange('gear', gear); 
	}

	handlePlaceChange(place) {
		this.handleChange('place', place);
	}

	handleWeightChange(weight) {
		this.handleChange('weight', weight);
	}
	handleTimeChange(date) {
		this.handleChange('catchTime', date);
	}
	handleAttributeChange(attributes) {
		this.handleChange('additionalAttributes', attributes);
	}

	save() {
		console.log(this.state.selected);
		const draught = this.state.selected;

		console.log({
			fish : draught.fish.name,
			gear : draught.gear.name,
			fisher : draught.fisher.name,
			placeId : draught.place.id,
			weight : draught.weight,
			catchTime : draught.catchTime.getISOString(),
			additionalAttributes : draught.additionalAttributes
		})
	}
  render() {
    return(
    	<div className="container">
    		<BasicSelection title="Fish" items={this.props.selections.fish} 
    			onSelectionChange={this.handleFishChange}
    		/>
    		<PlaceSelection places={this.props.places} 
    			onSelectionChange={this.handlePlaceChange}
    		/>
    		<BasicSelection title="Fisher" items={this.props.selections.fisher} 
    			onSelectionChange={this.handleFisherChange}
    		/>
    		<BasicSelection title="Gear" items={this.props.selections.gear} 
    			onSelectionChange={this.handleGearChange}
    		/>
    		<WeightSelection fish={this.state.selected.fish} 
    			handleChange={this.handleWeightChange}
    		/>
    		<DateSelection 
    			handleTimeChange={this.handleTimeChange}
    		/>
    		<AdditionalAttributes handleChange={this.handleAttributeChange} />
    		{JSON.stringify(this.state.selected)}

    		<button className="btn btn-danger" onClick={this.save}>
    			Save
    		</button>
    	</div>
    );
  }
}

export default AddEntry;