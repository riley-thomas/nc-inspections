import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Card, CardHeader, Table } from 'reactstrap';
import AddressText from '../Address/AddressText';
import Dexify from '../Dexify';
import Util from '../Utils/Util';

class CorporationFacList extends Component {

	constructor(props) {
		super(props);
		this.state = { activeonly : false, working : true };
		this.handleInputChange = this.handleInputChange.bind(this);
	}
	componentWillMount(){
		this.getFilter()
	}
	getFilter(){
		Dexify.get({table: 'settings', filter : {name : 'corpfacfilter'}}).then((record) => {
			return record === null ? { onlyactive :  false} : record;
		}).then((f) => {
			this.setState({ activeonly: f.activeonly, working: false })
		});
	}
	savefilter(val){
		Dexify.put({table: 'settings', data : { name : 'corpfacfilter', value : {activeonly: val} }});
	}
	handleInputChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		this.setState({[name]: value},()=>{	this.savefilter(value) });
	}
	renderRows(){
		if(!this.state.working) {
			const facilities = this.props.corporation.facs;
			const rows = facilities.sort((a,b) =>{
				let x = Util.bets_id(a.county_id,a.fac_type,a.fac_id_number);
				let y = Util.bets_id(b.county_id,b.fac_type,b.fac_id_number);
				return x.localeCompare(y);
			}).map((v,k) =>{
				if(this.state.activeonly && /^(D|E|F|G|H|J|Z)$/.test(v.status_code)){
					return null;
				}
				let link =  <Link to={'/facility/'+v.fac_id}>{Util.bets_id(v.county_id,v.fac_type,v.fac_id_number)}</Link>;
				let address = <AddressText address={v} />;
				return (
					<tr key={v.fac_id}>
						<td>{link}</td>
						<td className={'d-none d-lg-table-cell'}>{ v.fac_name }<br/>{address}</td>
						<td>{ v.status_code }</td>
					</tr>
				);
			});
			let a = rows.filter((r) => r !== null);
			if(a.length === 0){
				let b = this.state.activeonly && rows.length > 0 ? '. Uncheck \'show active only\' to see more' : '';
				return <tr><td colSpan="2">No Facilities{b}</td></tr>
			}
			return rows;
		}
	}



	renderActiveOnlyCheckbox(){
		if(!this.state.working){
			let css = this.state.activeonly ? 'is-valid': '';
			return (
				<div className={'d-inline form-check '+css}>
					<input id='activeonly' name='activeonly' type='checkbox' onChange={this.handleInputChange} checked={this.state.activeonly || false} className={'form-check-input '+css} /> 
			 		<label className={'form-check-label '+css} htmlFor='activeonly'>Show Active Only</label>	
			 	</div>
			)
		}
	}
	render(){

		return (
			<Card className="border-secondary mt-2">
				<CardHeader tag="h4" className="bg-secondary text-white">Corporation Facilities</CardHeader>
				<Table>
						<thead>
							<tr>
								<th>Establishment ID</th>
								<th className={'d-none d-lg-table-cell'}>Name</th>
								<th>{this.renderActiveOnlyCheckbox()}<br/>Status
								</th>
							</tr>
						</thead>
					<tbody>{this.renderRows()}</tbody>
				</Table>
			</Card>
		);
	}

}

export default CorporationFacList;