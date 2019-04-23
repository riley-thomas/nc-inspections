import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import { Container, Card, CardHeader, Table, Row, Col } from 'reactstrap';
import DataFetcher from '../DataFetcher';
import Dexify from '../Dexify';
import BlueDiv from '../Utils/BlueDiv';

class CorporationListPage extends Component {

	constructor(props) {
		super(props);
		this.state = {  working: true, corporations : null, sorting: 'corp_name', asc: true, corp_name: '' };
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	componentWillMount(){
		this.getSort();
	}
	componentWillReceiveProps(props) {

	}
	getSort(){
		Dexify.get({table: 'settings', filter : {name : 'corpsort'}}).then((record) => {
			return record === null ? {sorting: 'corp_name', asc: true} : record;
		})		
		.then((corpsort) => {
			this.setState({ sorting: corpsort.sorting, asc : corpsort.asc })
		}).then(()=>{ this.getFilter() });
	}

	getFilter(){
		Dexify.get({table: 'settings', filter : {name : 'corpfilter'}}).then((record) => {
			return record === null ? {corpname: ''} : record;
		})		
		.then((corpfilter) => {
			this.setState({ corp_name : corpfilter.corpname || '' })
		}).then(()=>{ this.fetchCorporations() });	
	}
	savefilter(){
		Dexify.put({table: 'settings', data : { name : 'corpfilter', value : {corpname: this.state.corp_name} }});
	}

	fetchCorporations() {
		if(this.props.appstate.online) {
			this.setState({working : true}, ()=> {
				DataFetcher({type: 'corporations'}).then( (corporations) => {
					this.setState({corporations: corporations, working: false})
				}).catch((e) => {});			
			});
		} else {
			this.setState({working: false});
		}
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		this.setState({[name]: value},()=>{	this.savefilter() });
	}

	saveSort(o){
		Dexify.put({table: 'settings', data : { name : 'corpsort', value : o }});
	}

	handleSort(o){
		this.setState({sorting: o.sorting, asc: o.asc}, ()=> { this.saveSort(o)});
	}

	renderRows(){

			let sorting = this.state.sorting;
			let asc = this.state.asc ? 1 : -1;
			let corp_name = this.state.corp_name || '';
			let regex = corp_name !== '' && corp_name !== null ? new RegExp(corp_name.toLowerCase()) : null;
			
			const rows = this.state.corporations.sort((a, b) => {	
				switch(sorting) {
					case 'fac_count':
						let x = a[sorting]+' '+a.fac_name;
						let y = b[sorting]+' '+b.fac_name;
						return (x.localeCompare(y,{numeric: true, ignorePunctuation: true}) * asc);
						//return ((a[sorting] > b[sorting] ? 1 : -1) * asc);
					default: 
						return (a[sorting].localeCompare(b[sorting]) * asc);
				}
			}).map((v,k) =>{
				if(regex) {
					if(! regex.test(v.corp_name.toLowerCase(), 'i')){
						return null;
					}
				}
				let link =  <Link to={'/corporation/'+v.corp_id}>{v.corp_name}</Link>;
				return (
				    <tr key={v.corp_id}>
				       <td>{link}</td>
				       <td className='text-center d-none d-lg-table-cell'>{ v.active_fac_count }</td>
				       <td className='text-center d-none d-lg-table-cell'>{ v.fac_count - v.active_fac_count }</td>
				       <td className='text-center d-none d-lg-table-cell'>{ v.fac_count }</td>
				    </tr>
				);
			});
			return rows;

	}

	sortButton(sorting,asc){
		let icon = asc ? "\u25b2" : "\u25BC";
		// eslint-disable-next-line
		let link = (this.state.sorting === sorting && this.state.asc === asc) ? <span className='text-danger'>{icon}</span> : <a className='cursor-default' onClick={() => { this.handleSort({sorting: sorting, asc: asc})}}>{icon}</a>;
		return <span className={asc ? 'float-left' : 'float-right'}>{link}</span>
	}
	filterName(){
		return <input name='corp_name' type='text' value={this.state.corp_name} onChange={this.handleInputChange} className='input-xs' placeholder='find...' />
	}

	renderPage(){
		if(!this.state.working && this.props.appstate.online) {
			return (
			  <Container>
			  	<Row>
			  		<Col>
					  	<Card className="border-secondary">
							<CardHeader tag="h4" className="bg-secondary text-white">Corporations</CardHeader>
							<Table className='table-bordered'>
								<thead>
									<tr>
										<th className='text-center'>{this.sortButton('corp_name', true)}Name {this.filterName()}{this.sortButton('corp_name', false)}</th>
										<th className={'d-none d-lg-table-cell'}>Active Facilities</th>
										<th className={'d-none d-lg-table-cell'}>Inactive Facilities</th>
										<th className='text-center d-none d-lg-table-cell'>{this.sortButton('fac_count', true)}Total Facilities{this.sortButton('fac_count', false)}</th>
									</tr>
								</thead>
								<tbody>{this.renderRows()}</tbody>
							</Table>
						</Card>
					</Col>
				</Row>
			  </Container>
			);
		}
		if(!this.props.appstate.online) {
			return (<div><h3>You are offline</h3></div>)
		}
	}

	render() {
		return (
			<div>
				<Helmet>
					<title>Corporations</title>
				</Helmet>
				<BlueDiv fluid={true} />
				{this.renderPage()}
			</div>
		);
	}

}

export default CorporationListPage;