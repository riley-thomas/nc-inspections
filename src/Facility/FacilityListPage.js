import React, { Component } from 'react';
import {Helmet} from 'react-helmet';
import SelectCounty from '../Utils/selectCounty';
import SelectFacType from '../Utils/selectFacType';
import SelectStatusCode from '../Utils/selectStatus';
import InputSearch from '../Utils/inputSearch';
import { Container, Row, Col } from 'reactstrap';
import FacilityFetcher from './FacilityFetcher';
import Dexify from '../Dexify';
import Config from '../Config';
import SecondNav from '../Navigation/SecondNav';
import FacilityListCard from '../Facility/FacilityListCard';
import FacPaginator from '../Facility/FacPaginator';
import Working from '../Utils/Working';
import Callout from '../Utils/Callout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class FacilityListPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
	        online : navigator.onLine,
	        page : this.props.route.match.params.page,
	        working : true,
	        pages : 0,
	        pagesize: 50,
	        offset : 0,
	        county : '001',
	        factype : '',
	        statuscode : '',
	        searchstring: '',
	        facilities : [],
	        totalFacilities : 0,
    	}
	}

	componentWillMount(){
		this.getRows()
	}

	componentWillReceiveProps(nextProps){
		if(this.props.page !== nextProps.page) {
			this.setState({page: nextProps.page}, ()=> this.getRows());
		}
	}

	getRows(){
		Dexify.get({table: 'settings', filter : {name : 'first'}}).then((record) => {
			return record === null ? Config.default_settings.first : record;
		})		
		.then((record) => {
			this.setState({ county: record.county, factype: record.factype, statuscode: record.statuscode, searchstring: record.searchstring })
		}).then(()=>{this.getPage(this.state.page)}).catch((e) => { console.log(e) });
	}

	/**
	 *  Facility Filters Handlers
	 */
	handleCountyChanged(e) {
	  this.setState({county: e.target.value , page: 1, facilities: [], totalFacilities : 0},
	    () => { this.saveLastFilters()}
	  );
	}
	handleFacTypeChanged(e) {
	  this.setState({factype: e.target.value , page: 1, facilities: [], totalFacilities : 0},
	    () => { this.saveLastFilters()}
	  );
	}
	handleStatusCodeChanged(e) {
	  this.setState({statuscode: e.target.value , page: 1, facilities: [], totalFacilities : 0},
	    () => { this.saveLastFilters()}
	  );
	}
	handleSearchChanged(s) {
	  this.setState({searchstring: s , page: 1, facilities: [], totalFacilities : 0},
	    () => { this.saveLastFilters()}
	  );
	}
	saveLastFilters(){
		Dexify.put({table: 'settings', data : {
	  	  	  name : 'first', 
	  	  	  value : {county : this.state.county, factype : this.state.factype, statuscode: this.state.statuscode, searchstring : this.state.searchstring}
			}
		}).then(()=>{
			this.props.route.history.push('/facilities/'+this.state.page);
			this.getPage()
		});
	}

	/**
	* Misc
	*/
	getPage() {
		this.setState( {working: true}, () => {
			FacilityFetcher.list(this.state, this.props.appstate).then((data) =>{
	  			if(data){
	    			this.setState({facilities : data.facilities, totalFacilities: data.count, pages: data.pages, working: false})
	  			}
			}).catch((e) => {console.error(e)})
		});
	}

	/**
	* Renderers
	*/
	renderFilters() {
			return (
			<Row className='d-print-none'>
				<Col md="6" lg="3"><SelectFacType handleChange={(e) => this.handleFacTypeChanged(e)} value={ this.state.factype } /></Col>
				<Col md="6" lg="3"><SelectCounty handleChange={(e) => this.handleCountyChanged(e)} value={ this.state.county } /></Col>
				<Col md="6" lg="3"><SelectStatusCode handleChange={(e) => this.handleStatusCodeChanged(e)} value={ this.state.statuscode } /></Col>
				<Col md="6" lg="3" className={(!this.props.appstate.online ? 'd-none' : '')}><InputSearch handleChange={(e) => this.handleSearchChanged(e)} placeholder="Search for..." value={ this.state.searchstring }/></Col>
			</Row>
		)
	}
	renderHelpText() {
		if(this.state.facilities.length < 1) {
			let text = this.state.online ? '.' : ' and make sure you have downloaded the facilities.'
			return (
				<Callout type="info">
					<FontAwesomeIcon icon="question-circle" /> No Facilities Found. Try adjusting your filters{text}
				</Callout>
			)
		}
	}
	renderList() {
		if(!this.state.working) {
			let paginator = (this.state.pages > 1) ? <FacPaginator pagecount={this.state.pages} currentpage={this.state.page} location={this.props.location} /> : null;
			return (
				<div>
					{this.renderHelpText()}
					{this.renderFilters()}
					<h3>{ this.state.totalFacilities } Facilities Found</h3>
					<FacilityListCard facilities={ this.state.facilities } factype={this.state.factype} location={this.props.location } />
					<div className="mt-1">{paginator}</div>
				</div>
			)
		}
	}
	renderPage() {
		let unique = this.state.page+' '+this.state.factype+' '+this.state.county+' '+this.state.statuscode+' '+this.state.searchstring+' '+this.state.online;
		return (
			<Container>
				{this.renderList()}
				<Working working={(this.state.working && this.state.online)} unique={unique} />
			</Container>
		)
	}

	render() {
		return (
			<div>
				<Helmet><title>Facility List</title></Helmet>
				<SecondNav navigation={[]} />
				<Container>{ this.renderPage() }</Container>
			</div>
		);
	}
}

export default FacilityListPage;