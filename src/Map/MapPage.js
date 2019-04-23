import React, { Component } from 'react';
import { Card, CardHeader, CardBody } from 'reactstrap';
import axios from 'axios';
import Config from '../Config.js';
import { Progress } from 'reactstrap';

class MapPage extends Component {

	constructor(props) {
		super(props)
		this.state({
			progress : 0,
			facilities : [],
			markers : []
		})
	}

	componentWillMount(){
		this.getFacilities(1);
	}

	fetchFacilities(page) {
		const base_url = Config.map_endpoint();
		let url = base_url + page;
		axios.get(url).then((response) => {
	  		this.parseFacilities(response.data.facilities);
	  		if(response.data.pages < page){
	  			this.fetchFacilities(++page)
	  		}
		}).then(()=>{
	  		//
		}).catch((error) => { console.log(error)});
	}

	parseFacilities(data) {
		for (let i = data.length - 1; i >= 0; i--) {
			let f = data[i];

		}
	}

	renderProgressBar(){
		let progress = this.state.progress ? parseInt(this.state.progress) : 0;
		return (
			<Progress animated color="primary" value={progress} />
		)
	}

	render() {

		return (
			<div>
				<Card>
					<CardHeader tag="h4">Facility Map</CardHeader>
					<CardBody>
						<div className="map">
						</div>
					</CardBody>
				</Card>
				{this.renderProgressBar()}
			</div>

			
		);
	}

}

export default MapPage;