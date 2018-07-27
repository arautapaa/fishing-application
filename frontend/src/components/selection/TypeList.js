import React, { Component } from 'react';

class TypeList extends Component {
  render() {
  	const rows = [];

  	this.props.types.forEach((type) => {
  		rows.push(<li>{type}</li>);
  	});

    return(
    	<ul>
    		${rows}
    	</ul>
    );
  }
}

export default TypeList;