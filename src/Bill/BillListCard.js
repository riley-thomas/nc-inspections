import React, { Component } from 'react';
import Moment from 'react-moment';
import * as moment from 'moment';
import 'moment-timezone';
import { Table } from 'reactstrap';
import FoldingCard from '../Utils/FoldingCard';
import CounterIcon from '../Utils/CounterIcon';

class BillListCard extends Component {


	render() {

		const bills = this.props.bills;
		const rows = [].concat(bills)
		.sort((a, b) => moment(a.bill_date).isBefore(b.bill_date) ? 1 : -1)
    	.map((v,k) =>{
			return (
				<tr id={'bill_'+v.bill_id} key={v.bill_id}>
					<td  className={'d-none d-lg-table-cell'}>{ v.bill_id }</td>
					<td><Moment format="M/D/YY">{v.bill_date}</Moment></td>
					<td>{ v.bill_fiscal_yr }</td>
					<td>{ v.bill_amount }</td>
					<td className={'d-none d-lg-table-cell'}>{ v.bill_source }</td>
					<td className={'d-none d-lg-table-cell'}>{ v.bill_original_id }</td>
				</tr>
			);
		});

		let cardTitle = <CounterIcon icon='file-alt' counter={rows.length} text='Bills' />
	   	return (

	   		<FoldingCard cardName="bills" cardTitle={cardTitle} className={this.props.className}>
	   			<Table>
					<thead className="bg-light">
						<tr><th className={'d-none d-lg-table-cell'}>ID</th><th>Date</th><th>FY</th><th>Amount</th><th className={'d-none d-lg-table-cell'}>Source</th><th className={'d-none d-lg-table-cell'}>Original ID</th></tr>
					</thead>
					<tbody>
						{rows}
					</tbody>
				</Table>
			</FoldingCard>

	   	);

	}

}

export default BillListCard;