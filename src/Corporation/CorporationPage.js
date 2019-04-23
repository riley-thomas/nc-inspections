import React, { Component } from 'react';
import {Helmet} from 'react-helmet';
import { Container, Row, Col } from 'reactstrap';
import DataFetcher from '../DataFetcher';
import BlueDiv from '../Utils/BlueDiv';
import BackNav from '../Utils/BackNav';
import AddressCard from '../Address/AddressCard';
import CorporationInfoCard from './CorporationInfoCard';
import CorporationFacList from './CorporationFacList';
import NotFoundBox from '../Errors/NotFoundBox';

class CorporationPage extends Component {

	constructor(props) {
		super(props);
		this.state = { id : this.props.route.match.params.id, working: true, corporation : null };
	}

	componentWillMount(){
		this.fetchCorporation();
	}
	componentWillReceiveProps(props) {

	}
	fetchCorporation() {
		if(this.props.appstate.online) {
			this.setState({working : true}, ()=> {
				DataFetcher({type: 'corporation', id: this.state.id}).then( (corporation) => {
					this.setState({corporation: corporation, working: false})
				}).catch((e) => {
					this.setState({corporation: null, working: false})
				});			
			});
		} else {
			this.setState({working: false});
		}
	}

	renderPage(){
		if(!this.state.working && this.props.appstate.online) {
			if(this.state.corporation) {
				let a = this.state.corporation.address ? <AddressCard address={this.state.corporation.address} className='mt-2 mt-sm-0' /> : '';
				return (
				  <div>
				  	<Row>
				  		<Col><CorporationInfoCard corporation={this.state.corporation} /></Col>
						<Col>{a}</Col>
					</Row>
					<CorporationFacList corporation={this.state.corporation} />
				  </div>
				);
			}
			return (<NotFoundBox message="Corporation not found" />)
		}
		if(!this.props.appstate.online) {
			return (<div><h3>You are offline</h3></div>)
		}
	}

	render() {
		return (
			<div>
				<Helmet><title>Corporations</title></Helmet>
				<BlueDiv fluid={true}><BackNav route={this.props.route} /></BlueDiv>
				<Container>{this.renderPage()}</Container>
			</div>
		);
	}

}

export default CorporationPage;