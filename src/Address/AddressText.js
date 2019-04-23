import React, { Component } from 'react';

class AddressText extends Component {

	render() {
		let br = this.props.address.addr_line2 && this.props.address.addr_line2.length > 0 ? (<br/>) : '';
		return (
			<span>
			  { this.props.address.addr_line1 }<br/>
			  { this.props.address.addr_line2 }{br}
			  { this.props.address.addr_city }, { this.props.address.state_code } { this.props.address.addr_zip5 }
			</span>
		);
	}

}

export default AddressText;