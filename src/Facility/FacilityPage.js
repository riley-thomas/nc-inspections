import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {Helmet} from 'react-helmet';
import { Container, Row, Col } from 'reactstrap';
import AddressCard from '../Address/AddressCard';
import MapDiv from './MapDiv';
import FacilityInfoCard from './FacilityInfoCard';
import ActivityListCard from '../Activity/ActivityListCard';
import BillListCard from '../Bill/BillListCard';
import PaymentListCard from '../Payment/PaymentListCard';
import CorporationCard from './CorporationCard';
import YelpCard from '../Yelp/YelpCard';
import FacilityFetcher from './FacilityFetcher';
import BlueDiv from '../Utils/BlueDiv';
import BackNav from '../Utils/BackNav';
import NotFoundBox from '../Errors/NotFoundBox'; //

class FacilityPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			id : this.props.route.match.params.id,
			working : true,
			facility : null,
			yelp: null,
		};
	}

	componentWillReceiveProps(nextProps){
		if(this.state.id !== nextProps.id) {
			this.setState({id: nextProps.id}, ()=> this.getFacility());
		}
	}
	componentWillMount(){
		this.getFacility()
	}

	getFacility() {
		this.setState( {working: true}, () => {
			FacilityFetcher.get(this.state.id, this.props.appstate).then((data) => {
				if(data.facility) {
					this.setState({facility: data.facility, working: false}, () => {
						//let color = data.source === 'server' ? 'green' : 'orange';
						//console.info('Facility retrieved from %c'+data.source,'font-weight:bolder;color:'+color);
					});   
				} else {
					//console.error('Facility failed to be retrieved from %c'+data.source,'font-weight:bolder;color:red');
					this.setState({facility: null, working: false})
				}
			}).catch((e) => { this.setState({facility: null, working: false })})
		});
	}


	renderFacilityAddressCard() {
		if(this.state.facility.current_facility_address) {
			let map= this.renderFacilityMapCard();
			return <div><AddressCard address={ this.state.facility.current_facility_address } map={map} /></div>;
		}
		return null;
	}
	renderFacilityMapCard() {
		if((this.state.facility.facility_geocode || this.state.facility.current_facility_address) && this.props.appstate.online) {
			 return <div><MapDiv facility={ this.state.facility } /></div>;
		}
		return null;
	}
	renderFacilityInfoCard() {
		if(this.state.facility) {
			 return <div className='mt-3 mt-sm-0'><FacilityInfoCard facility={ this.state.facility } /></div>;
		}
		return null;
	}
	renderActivityListCard() {
		if(this.state.facility.activities) {
			if(this.state.facility.activities.length > 0) {
				return (
					<ActivityListCard className="mt-3" activities={ this.state.facility.activities } notices={ this.state.facility.notices } activityClicked={(e) => this.handleActivityClicked(e)}/>
			 	)
			}
		}
		return null;
	}
	renderBillListCard() {
		if(this.state.facility.bills) {
			if(this.state.facility.bills.length > 0) {
				return 	<BillListCard bills={this.state.facility.bills} className='mt-3' />
			}
		}
	}
	renderPaymentListCard() {
		if(this.state.facility.payments) {
			if(this.state.facility.payments.length > 0) {
				return <PaymentListCard payments={this.state.facility.payments} className="mt-3" />
			}
		}
	}
	renderCorporationCard() {
		if(this.state.facility.corporation) {
			return <CorporationCard corporation={ this.state.facility.corporation } className="mt-3" />;
		}
		return null;
	}
	renderYelpCard() {
		if(this.state.facility) {
			if( /^(A|B|C|D|E|I|K|L|M|S|T|U|W|X)$/.test(this.state.facility.status_code) ) {
				return <YelpCard facility={ this.state.facility }  appstate={this.props.appstate} className="mt-3" />;
			}
		}
		return null;
	}

	renderFacilityView() {
		
			return (
				 <div>
				 	<Helmet>
						<title>{this.state.facility.fac_name}</title>
					</Helmet>
					<h1 className="display-4 text-primary text-center facility-title">{ this.state.facility.fac_name }</h1>
					<Row>
						<Col sm="6">
							{ this.renderFacilityAddressCard() }
							{ this.renderYelpCard() }
						</Col>
						<Col sm="6">
							{ this.renderFacilityInfoCard() }
							{ this.renderCorporationCard() }
						</Col>
					</Row>
					<Row><Col>{ this.renderActivityListCard() }</Col></Row>
					<Row><Col>{ this.renderBillListCard() }</Col></Row>
					<Row><Col>{ this.renderPaymentListCard() }</Col></Row>
				 </div>
			);
		
	}

	renderPage() {
		if(!this.state.working) {
			if(this.state.facility){
				return this.renderFacilityView();
			}
			let text = this.props.appstate.online ? 'Error Getting Facility' : 'This facility is not availble offline';
			return (<NotFoundBox message={text} />)
		}
	}

	render() {
		return (
			<div>
				{this.props.navbar}
				<BlueDiv fluid="true"><BackNav route={this.props.route} /></BlueDiv>
				<Container>{ this.renderPage() }</Container>
			</div>
		);
	}
}

export default withRouter(FacilityPage);