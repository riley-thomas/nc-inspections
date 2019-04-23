import React, { Component } from 'react';
import { Card, CardHeader, Table } from 'reactstrap';

class CorporationInfoCard extends Component {

	render() {
		return (
			<Card className="border-secondary">
				<CardHeader tag="h4" className="bg-secondary text-white">Corporation Information</CardHeader>
				<Table>
					<tbody>
						<tr><th>Name</th><td>{this.props.corporation.corp_name}</td></tr>
						<tr><th>Facilities</th><td>{this.props.corporation.facs.length}</td></tr>
					</tbody>
				</Table>
			</Card>
		);
	}

}

export default CorporationInfoCard;