import React, { Component } from 'react';
import TypeList from './TypeList';
import TypeInformation from './TypeInformation';

class SelectionAdd extends Component {
  const TYPES = [
    "fish",
    "fisher",
    "gear"
  ];

  const selectedType = {
    name : "fish"
  }

  render() {  
    return (
      <div className="container">
        <h1>Add new selection entry</h1>
        <TypeList types={TYPES} />
        <TypeInformation type={selectedType} />
      </div>
    );
  }
}

export default SelectionAdd;