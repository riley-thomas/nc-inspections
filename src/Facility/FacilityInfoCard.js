import React, { Component } from 'react';
import { Card, CardHeader, Table } from 'reactstrap';
import StatusCodeDesc from './StatusCodeDesc';
import Config from '../Config';

class FacilityInfoCard extends Component {

	render() {
		let permittee = this.props.facility.fac_permittee ? <tr><th>Permittee</th><td>{this.props.facility.fac_permittee}</td></tr> : null;
		let vendor_link = null;
		if(this.props.facility.facility_vendor){
			if(this.props.facility.facility_vendor === 'CDP') {
				let params = 'ESTTST_CTY='+this.props.facility.county_id+'&PREMISE_NAME='+encodeURIComponent(this.props.facility.fac_name)+'&PREMISE_ZIP='+this.props.facility.current_facility_address.addr_zip5;
				let link = Config.cdp_fac_page(params);
				vendor_link = <tr><th>Vendor</th><td><a href={link} target='new_window'>CDP</a></td></tr>;
			}
			if(this.props.facility.facility_vendor === 'DIGITAL') {
				let link = Config.digital_fac_page(this.props.facility.county_name);
				vendor_link = <tr><th>Vendor</th><td><a href={link} target='new_window'>DHD</a></td></tr>;
			}
			if(this.props.facility.facility_vendor === 'PITT') {
				let link = Config.pitt_fac_page;
				vendor_link = <tr><th>Vendor</th><td><a href={link} target='new_window'>PITT</a></td></tr>;
			}
		}
		return (
			<Card className="border-secondary">
				<CardHeader tag="h4" className="bg-secondary text-white">Facility Info</CardHeader>
				<Table>
				  <tbody>
					<tr>
						<th>Establishment Type</th><td>{ this.props.facility.facility_type_description }</td>
					</tr>
					<tr>
						<th>Establishment ID</th><td>{ this.props.facility.establishment_id }</td>
					</tr>
					<tr>
						<th>Status Code</th><td>{ this.props.facility.status_code }</td>
					</tr>
					<tr>
						<th>Status</th><td><StatusCodeDesc status={ this.props.facility.status_code } /></td>
					</tr>
					<tr>
						<th>Lastest Score</th><td>{ this.props.facility.latest_score }</td>
					</tr>
					<tr>
						<th>BETS ID</th><td>{ this.props.facility.fac_id }</td>
					</tr>
					{permittee}
					{vendor_link}
				  </tbody>
				</Table>
			</Card>
		);
	}

}

export default FacilityInfoCard;