import React, { Component } from 'react';
import BasicInputs from './BasicInputs';
import FishFormAdditionalAttributes from './FishFormAdditionalAttributes';

export class FisherTypeForm extends Component {
  render() {  
    return(
    	<form>
    		<BasicInputs type={this.props.type} />
    		<FishFormAdditionalAttributes />
    	</form>
    );
  }
}

export class FishTypeForm extends Component {
  render() {  
    return(
    	<form>
    		<BasicInputs type={this.props.type} />
    	</form>
    );
  }
}

export class GearTypeForm extends Component {
  render() {  
    return(
    	<form>
    		<BasicInputs type={this.props.type} />
    	</form>
    );
  }
}

