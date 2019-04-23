import React, { Component } from 'react';
import Callout from '../Utils/Callout';
import Config from '../Config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class MapDiv extends Component {

	getGoogleMapKey() {
		return Config.google_map_key;
	}
	getGoogleMapUrl(type) {
		let url = '//maps.googleapis.com/maps/api/staticmap?&zoom=13&size=350x200&maptype='+type+'&markers=color:blue%7C';
		if(this.props.facility.facility_geocode) {
			url += (this.props.facility.facility_geocode.lat + ','+ this.props.facility.facility_geocode.lng);
		} else {
			url += encodeURIComponent(this.props.facility.current_facility_address.addr_line1 + ' '+ this.props.facility.current_facility_address.addr_city+' '+this.props.facility.current_facility_address.state_code);
		}
		url += ('&key=' + this.getGoogleMapKey());
		return (url);
	}

	renderGoogleMap(type) {
		let link = '//maps.google.com/?q=' 
			+ this.props.facility.fac_name
			+ ' ' + this.props.facility.current_facility_address.addr_line1
			+ ' ' + this.props.facility.current_facility_address.addr_city 
			+ ' ' + this.props.facility.current_facility_address.state_code 
			+ ' ' + this.props.facility.current_facility_address.addr_zip5;
		return (
			<a href={link} target="new_window" title="Open Map in new window">
				<img src={ this.getGoogleMapUrl(type) } title="Open Map In New Window" alt="Map of Facility" />
			</a>
		);
	}

	renderCallout() {
		if(this.props.facility.facility_geocode) {
			return (
				<Callout type='info'>
					<FontAwesomeIcon icon="location-arrow" />
				 	 { this.props.facility.facility_geocode.lat }, { this.props.facility.facility_geocode.lng }
				</Callout>
			);
		}
	}
	render() {
		return (
			<div>
				{this.renderCallout()}
				<div style={{'overflowX' : 'hidden'}}>
					{ this.renderGoogleMap('roadmap') }
				</div>
			</div>
		);
	}

}

export default MapDiv;