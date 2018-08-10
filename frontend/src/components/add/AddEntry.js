import React, { Component } from 'react';
import { BasicSelection, PlaceSelection, WeightSelection, DateSelection } from './Selections';
import { AdditionalAttributes } from './AdditionalAttributes';
import { sendRequest } from '../actions/DraughtServices';

class AddEntry extends Component {
	constructor(props) {
		super(props);

		console.log(props);

		this.state = {
		  	selected : {
		  		fish : null,
			  	gear : null,
			  	fisher : null,
			  	weight : null,
			  	catchTime : new Date(),
			  	additionalAttributes : []
			},
			saved : false,
			errorMessage : null
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

	getForm() {
		return(<div className="container">  
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

	getSaveNotification() {
		return(<div className="container">
			<span>Saved successfully</span>
		</div>)
	}

	validateForm(draught) {
		let message = "";

		Object.keys(draught).forEach((key) => {
			if(draught[key] == null) {
				message += key + " cant be invalid<br/>";
			}
		});

		return message;
	}

	save() {
		const draught = this.state.selected;
		const self = this;

		const errorMessage = this.validateForm(draught)

		if(errorMessage.length == 0) {
			sendRequest('/draughts', 'POST',{
				fish : draught.fish.name,
				gear : draught.gear.name,
				fisher : draught.fisher.name,
				placeId : draught.place.id,
				weight : draught.weight,
				catchTime : draught.catchTime.toISOString(),
				additionalAttributes : draught.additionalAttributes
			}).then((response) => {
				this.setState({
					saved : true
				});
			})
		} else {
			this.setState({
				errorMessage : errorMessage
			})
		}
	}
  render() {
  	let containerToPrint = this.getForm();

  	if(this.state.saved) {
  		containerToPrint = this.getSaveNotification();
  	}

    return(
    	<section>
    		<strong>{this.state.errorMessage}</strong>
    		{containerToPrint}
    	</section>
    );
  }
}

export default AddEntry;