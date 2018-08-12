import React, { Component } from 'react';

import DataListEntry from '../common/DataListEntry';

export default class AdditionalAttributesList extends Component {
	render() {
		const items = this.props.additionalAttributes.map((item) => {
			return <DataListEntry title={item.name} value={item.value} />
		});

		return(
			<dl className="dl-horizontal">
				{items}
			</dl>
		)
	}	
};