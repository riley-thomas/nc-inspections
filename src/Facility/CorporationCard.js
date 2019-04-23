import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Card, CardHeader, Table } from 'reactstrap';

class CorporationCard extends Component {

	render() {
		return (
			<Card className={this.props.className + ' border-secondary'}>
				<CardHeader tag="h4" className="bg-secondary text-white">Corporation</CardHeader>
				<Table>
					<tbody>
						<tr><th>Corporation Name</th><td>{ this.props.corporation.corp_name }</td></tr>
						<tr><th>Corporation ID</th><td><Link to={'/corporation/'+this.props.corporation.corp_id}>{ this.props.corporation.corp_id }</Link></td></tr>
					</tbody>
				</Table>
			</Card>
		);
	}

}

export default CorporationCard;