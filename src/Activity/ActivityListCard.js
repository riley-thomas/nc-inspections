import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';
import * as moment from 'moment';
import 'moment-timezone';
import { Table } from 'reactstrap';
import ScoreTypes from './scoreTypes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FoldingCard from '../Utils/FoldingCard';
import CounterIcon from '../Utils/CounterIcon';

class ActivityListCard extends Component {

	renderNoticeFlag(activity_id){
		if(this.props.notices){
			let notices = this.props.notices;
			let notice = notices.map((n) => { return 'activity_'+n.activity_id }).indexOf('activity_'+activity_id);
			if(notice === 0){
				return (
					<FontAwesomeIcon icon="flag" className="text-danger" />
					);
			}
			return;
		}
	}

	render() {

	   	const activities = this.props.activities;
		const rows = [].concat(activities)
    	.sort((a, b) => moment(a.activity_date).isBefore(b.activity_date) ? 1 : -1)
    	.map((v,k) =>{
	   		return (
	   			<tr id={'activity_'+v.activity_id} key={v.activity_id}>
	   				<td>
	   					<Link className="btn btn-link" to={'/activity/'+v.activity_id}>
	   						{ v.activity_id }
	   					</Link>
	   				</td>
	               <td><Moment format="M/D/YY">{v.activity_date}</Moment></td>
	               <td>{ v.activity_type_description }</td>
	               <td className={'d-none d-lg-table-cell'}>{ v.status_code }</td>
	               <td className={'d-none d-lg-table-cell'}>{ v[ ScoreTypes[v.activity_score_type].field ] } { this.renderNoticeFlag(v.activity_id) }</td>
	            </tr>
	   		);
	   	});
    	let cardTitle = <CounterIcon icon='clipboard-list' counter={rows.length} text='Activities' />
	   	return (

	   		<FoldingCard cardName="activities" cardTitle={cardTitle} className={this.props.className}>
	   			<Table className='table-bordered table-sm'>
					<thead className="bg-light">
						<tr><th>ID</th><th>Date</th><th>Type</th><th className={'d-none d-lg-table-cell'}>Status</th><th className={'d-none d-lg-table-cell'}>Score</th></tr>
					</thead>
					<tbody>
						{rows}
					</tbody>
				</Table>
			</FoldingCard>

	   	);

	}

}

export default ActivityListCard;