import React, { Component } from 'react';
import Moment from 'react-moment';
import * as moment from 'moment';
import 'moment-timezone';
import { Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FoldingCard from '../Utils/FoldingCard';
import CounterIcon from '../Utils/CounterIcon';

class PaymentListCard extends Component {


	render() {

		const payments = this.props.payments;
		const rows = [].concat(payments)
		.sort((a, b) => moment(a.pmt_added_dt).isBefore(b.pmt_added_dt) ? 1 : -1)
    	.map((v,k) =>{
    		let refund_date = v.pmt_refund_dt ? moment(v.pmt_refund_dt).format('M/D/YY') : null;
    		let late_icon = v.pmt_late_ind === "1" ? <span title="Late"><FontAwesomeIcon icon="clock" className="text-dark" /></span> : null;
			return (
				<tr id={'v_'+v.payment_id} key={v.payment_id}>
					<td  className={'d-none d-lg-table-cell'}>{ v.payment_id }</td>
					<td><Moment format="M/D/YY">{v.pmt_deposit_dt}</Moment> {late_icon}</td>
					<td>{ v.pmt_fiscal_yr }</td>
					<td>{ v.pmt_amount }</td>
					<td className={'d-none d-lg-table-cell'}>{ v.pmt_source }</td>
					<td className={'d-none d-lg-table-cell'}>{ refund_date }</td>
				</tr>
			);
		});

    	//let cardTitle = (<span><span className="badge badge-pill badge-light">{rows.length}</span> Payments</span>)
		let cardTitle = <CounterIcon icon='money-bill-alt' counter={rows.length} text='Payments' />
	   	return (

	   		<FoldingCard cardName="bills" cardTitle={cardTitle} className="mt-3">
	   			<Table>
					<thead className="bg-light">
						<tr><th className={'d-none d-lg-table-cell'}>ID</th><th>Deposit Date</th><th>FY</th><th>Amount</th><th className={'d-none d-lg-table-cell'}>Source</th><th className={'d-none d-lg-table-cell'}>Refund</th></tr>
					</thead>
					<tbody>
						{rows}
					</tbody>
				</Table>
			</FoldingCard>

	   	);

	}

}

export default PaymentListCard;