import React, { Component } from 'react';
import { GoogleMap, Marker, withGoogleMap,withScriptjs, InfoWindow } from 'react-google-maps';

export const ExtendedGoogleMap = withScriptjs(withGoogleMap(props => {
  return <GoogleMap {...props} defaultZoom={props.defaultZoom} defaultCenter={props.position}>
    {props.places.map((marker, index)=> {
      	return (
        	<Marker
          	position={{ lat :  marker.latitude , lng : marker.longitude }}
          	title="Click to zoom"
          	key={index}
          	index={index}
          	onClick={() => props.markerClick(index)}
        	>
        		{marker.selected &&
              		<InfoWindow>
                		<div>
                  			{marker.name}
                	</div>
             		</InfoWindow>}
        	</Marker>
      	)
    })}
    </GoogleMap>
}));