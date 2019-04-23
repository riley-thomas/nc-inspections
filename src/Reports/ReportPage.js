import React, { Component } from 'react';
import {Helmet} from 'react-helmet';
import axios from 'axios';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, Container } from 'reactstrap';
import Config from '../Config.js';
import NcMapReport from './NcMapReport';
import BlueDiv from '../Utils/BlueDiv';

class ReportPage extends Component {

	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this);
		this.state = { working: true, data : null, activeTab: '1' };
	}

	componentWillMount(){
		this.fetchReportData();
	}
	componentWillReceiveProps(props) {

	}
	fetchReportData() {
		if(this.props.appstate.online) {
			this.setState({working : true});
			let url = Config.report_endpoint;
			axios.get(url).then((response) => {
				this.setState({data : response.data},() =>{ this.setState({working: false}) })
			}).catch((error) => { console.log(error)});
		} else {
			this.setState({working: false})
		}
	}

	toggle(tab) {
		if (this.state.activeTab !== tab) {
			this.setState({activeTab: tab});
		}
	}

	getMap(reportname) {
		if(this.state.data) {
			return (
				<NcMapReport report={reportname} svgWidth="1200" svgHeight="500" features={this.state.data.features} />
			);
		}
	}

	renderPage(){
		if(!this.state.working && this.props.appstate.online) {
			return (
				<div className="text-center mt-5">
					<Nav tabs justified={true} fill={true} className='d-print-none'>
						<NavItem>
							<NavLink className={ this.state.activeTab === '1' ? 'active' : '' } onClick={() => { this.toggle('1'); }} >
								County Vendors
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink className={this.state.activeTab === '2' ? 'active' : ''} onClick={() => { this.toggle('2'); }} >
								Average Restaurant Score (2015-2016)
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink className={this.state.activeTab === '3' ? 'active' : ''} onClick={() => { this.toggle('3'); }} >
								Notices Issued 2015 -2017 <small>(Deduplicated)</small>
							</NavLink>
						</NavItem>
					</Nav>
					<TabContent activeTab={this.state.activeTab} className="mt-5">
						<TabPane tabId="1">
							<Row>
								<Col sm="12">
									<h4>County Vendors</h4>
									{this.getMap('vendor')}
								</Col>
							</Row>
						</TabPane>
						<TabPane tabId="2">
							<Row>
								<Col>
									<h4>Average Restaurant Score (2015-2016)</h4>
									{this.getMap('average_type1_score_1517')}
								</Col>
							</Row>
						</TabPane>
						<TabPane tabId="3">
							<Row>
								<Col>
									<h4>Notices Issued 2015 -2017 <small>(Deduplicated)</small></h4>
									{this.getMap('notice_count')}
								</Col>
							</Row>
						</TabPane>
					</TabContent>
				</div>
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
					<title>Reports</title>
				</Helmet>
				<BlueDiv fluid={true} />
				<Container fluid={true}>{this.renderPage()}</Container>
			</div>
		);
	}

}

export default ReportPage;