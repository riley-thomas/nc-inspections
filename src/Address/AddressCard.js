import React, { Component } from 'react';
import { Card, CardHeader, CardBody } from 'reactstrap';

class AddressCard extends Component {

	render() {
		let address_type = 'Facility';
		switch (parseInt(this.props.address.address_type,10))  {
			case 2:
				address_type = 'Mailing';
				break;
			case 3:
				address_type = 'Billing';
				break;
			case 4:
				address_type = 'Corporation';
				break;
			default:
				//
		}
		let br = this.props.address.addr_line2 ? (<br/>) : '';
		return (
			<Card className={"border-secondary "+this.props.className}>
				<CardHeader tag="h4" className="bg-secondary text-white">{ address_type } Address</CardHeader>
				<CardBody>
					<p className="panel-text">
						{ this.props.address.addr_line1 }<br/>
						{ this.props.address.addr_line2 }{br}
						{ this.props.address.addr_city }, { this.props.address.state_code } { this.props.address.addr_zip5 }
					</p>
					{this.props.map}
				</CardBody>

			</Card>
		);
	}

}

export default AddressCard;