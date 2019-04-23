import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import axios from 'axios';
import { Container, Card, CardHeader, Table } from 'reactstrap';
import Config from '../Config.js';
import BlueDiv from '../Utils/BlueDiv';

class CountyListPage extends Component {

	constructor(props) {
		super(props);
		this.state = { working: true, counties : null };
	}

	componentWillMount(){
		this.fetchCounties();
	}
	componentWillReceiveProps(props) {

	}
	fetchCounties() {
		if(this.props.appstate.online) {
			this.setState({working : true});
			let url = Config.county_list_endpoint;
			axios.get(url).then((response) => {
				this.setState({counties : response.data.counties},() =>{ this.setState({working: false}) })
			}).catch((error) => { console.log(error)});
		} else {
			this.setState({working: false})
		}
	}

   renderRows(){
      const counties = this.state.counties;
      const rows = counties.map((v,k) =>{
      	let link = v.vendor_url !== null ? <Link to={v.vendor_url} target="new_window">{ v.batch_control.vendor.vendor_abbrev }</Link> : null;
         return (
            <tr key={v.fips_county_code}>
               <td>{v.glbl_county.fips_county_desc}</td>
               <td>{ v.facility_count }</td>
               <td>{ link }</td>
            </tr>
         );
      });
      return rows;
   }

	renderPage(){
		if(!this.state.working && this.props.appstate.online) {
			return (
				<Card className="border-secondary">
					<CardHeader tag="h4" className="bg-secondary text-white">Counties</CardHeader>
						<Table>
				   		<thead><tr><th>County</th><th>Facilities</th><th>Vendor</th></tr></thead>
						<tbody>
							{this.renderRows()}
						</tbody>
					</Table>
				</Card>
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
					<title>Counties</title>
				</Helmet>
				<BlueDiv fluid={true} />
				<Container>{this.renderPage()}</Container>
			</div>
		);
	}

}

export default CountyListPage;