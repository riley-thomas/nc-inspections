import React, { Component } from 'react';
import StatusCodes from '../data/statuscodes.json';

class StatusCodeDesc extends Component {

	getStatus(){
		if(this.props.status){
			let status = StatusCodes.find( status => this.props.status === status.status_code);
			return status.status_description ? status.status_description : null;
		}
		return;
	}
	render() {
		return (
			<span>
				{ this.getStatus() }
			</span>
		);
	}

}

export default StatusCodeDesc;