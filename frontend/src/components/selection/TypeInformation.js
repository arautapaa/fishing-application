import React, { Component } from 'react';
import { FishTypeForm, GearTypeForm, FisherTypeForm } from './TypedForms';

class TypeInformation extends Component {
  getTypedForm(type) {
  	switch(type) {
  		case "fish":
  			return <FishTypeForm type={type}/>
  		case "gear":
  			return <GearTypeForm type={type}/>
  		case "fisher":
  			return <FisherTypeForm type={type}/>
  	}
  }

  render() {
  	const type = this.props.type.name;

    return(
    	<div>
    		<h2>{type}</h2>
    		{this.getTypedForm(type)}
    	</div>

    );
  }
}

export default TypeInformation;