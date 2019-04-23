import React, { Component } from 'react';
import {Helmet} from 'react-helmet';
import { Container, Row, Col, Button } from 'reactstrap';
import DataFetcher from '../DataFetcher';
import Dexify from '../Dexify';
import Config from '../Config';
import SelectCounty from '../Utils/selectCounty';
import * as moment from 'moment';
import CheckNetwork from '../Utils/CheckNetwork';
import BlueDiv from '../Utils/BlueDiv';

class DownloaderPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			error: false,
			working: true,
			table : 'facility',
			county: (this.props.county ? this.props.county : '001'),
			records : [],
			inserted : 0,
			status : 'Checking network'
		};
	}
	
	componentWillMount(){
		this.checkOffline();
	}
	componentWillReceiveProps(props) {

	}

	checkOffline(){
		if(this.props.appstate.online && navigator.onLine){
			CheckNetwork().then((net) => {
				this.setState({online : true, status: 'Ready for download', working: false });
			}).catch((e) => {
				this.setState({online : false, status: 'Network not available'});
			})
		} else {
			this.setState({status: 'You are offline'});
		}
	}

	handleTableChanged(event) {
		this.setState({table: event.target.value});
	}
	handleCountyChanged(e) {
		console.info('Download County changed to %c'+e.target.value, 'color:red');
		this.setState({county: e.target.value , records: []});
	}

	getCountyFacilities() {
		this.setState( {working: true, records :[], inserted: 0}, () => {
			DataFetcher({type:'custom', url: Config.download_facilities_endpoint(this.state.county) })
			  .then( (data) => {
					if(data.data) {
						this.setState({records: data.data, status: 'Preparing to upsert '+data.data.length+' facilities.'}, () => {
							this.getFacilityFromServer(0);
						});
					}
			  })
		});
	}

	getFacilityFromServer(i) {
		let id = this.state.records[i];	
		DataFetcher({type:'facility_download', id: id}).then( (facility) => {
			if(facility) {
				Dexify.put({table: 'facilities', data : {
				    id : facility.fac_id,
				    county_id: facility.county_id,
				    fac_type: facility.fac_type,
				    status_code: facility.status_code,
				    expires: moment().add(Config.db_cache_max_days,'d').unix(),
				    value: facility
				  } 
				}).then(() => {
					this.setState({inserted : this.state.inserted + 1}, ()=> {
						this.setState({status : 'Saved '+ this.state.inserted + ' of '+this.state.records.length}, () => {
							this.getFacilityActivitiesFromServer(id);
						})
					})
				}).then(() => {
					if(this.state.inserted === this.state.records.length) {
						this.setState({working: false});
					} else {
						let next = i + 1;
						this.getFacilityFromServer(next);
					}
				})
			} else {
				console.error('Error fetching facility');
			}    
		}).catch((e) => {
			this.setState({ error: true });
		});
	}

	getFacilityActivitiesFromServer(id) {
		DataFetcher({type:'custom', url: Config.download_activities_endpoint(id)}).then( (response) => {
			if(response.data.activities) {
				let activities = response.data.activities;
				for (var i = activities.length - 1; i >= 0; i--) {
					Dexify.put({table: 'activities', data : {
						id : activities[i].activity_id,
						fac_id: activities[i].fac_id,
						expires: moment().add(Config.db_cache_max_days,'d').unix(),
						value: activities[i]
						} 
					})
				}
			} else {
				console.error('Error fetching actvities for facility '+ id);
			}    
		}).catch((e) => {
			this.setState({ error: true });
		});
	}

	renderSelectCounty() {
  		if(!this.state.working) {
     		return (
      			<SelectCounty handleChange={(e) => this.handleCountyChanged(e)} value={ this.state.county } />
     		);
 	  	}
 		return;
  	}

	renderStatus() {
  		if(this.state.status) {
     		return (
      			<h3>{this.state.status}</h3>
     		);
 	  	}
 		return;
  	}

  	renderSelectTable() {
  		return (
  			<select value={this.state.value} onChange={this.handleTableChanged} className="form-control">
  				<option value="facility">Facilities with Activities</option>
  			</select>
  		);
  	}

	renderPage(){
		if(!this.state.working && this.props.appstate.online) {
			return (
			 <div className="mt-3">
				<Row>
					<Col>{ this.renderSelectCounty() }</Col><Col>{ this.renderSelectTable() }</Col>
				</Row>
				<Row className="mt-2">
					<Col>
						<Button onClick={() => this.getCountyFacilities()} disabled={this.state.county.length !== 3}>
							Download Facilities
						</Button>
					</Col>
				</Row>
			 </div>
			);
		}
		return;
	}

	render() {
		return (
			<div className='d-print-none'>
				<Helmet>
					<title>Download</title>
				</Helmet>
				<BlueDiv fluid="true" />
				<Container>
					{this.renderStatus()}
					{this.renderPage()}
				</Container>
			</div>
		);
	}

}

export default DownloaderPage;