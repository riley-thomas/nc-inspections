import React, { Component } from 'react';
import {Helmet} from 'react-helmet';
import Moment from 'react-moment';
import 'moment-timezone';
import { Container, Row, Col } from 'reactstrap';
import ActivityInfoCard from './ActivityInfoCard';
import ActivityItemCard from './ActivityItemCard';
import ActivityFetcher from './ActivityFetcher';
import FacilityFetcher from '../Facility/FacilityFetcher';
import BlueDiv from '../Utils/BlueDiv';
import BackNav from '../Utils/BackNav';
import NotFoundBox from '../Errors/NotFoundBox';

class ActivityPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			id: this.props.route.match.params.id,
			working: true,
			facility : null,
			activity : null,
			rows : null,
		};
	}
	componentWillReceiveProps(props) {
		
	}
	componentWillMount(){
		this.getActivity();
	}
	getActivity() {
		ActivityFetcher.get(this.state.id, this.props.appstate).then((data)=>{
			//console.log(data)
			if(typeof data.activity !== 'undefined'){
				this.setState({activity: data.activity}, () => {
					if(data.activity) {
         				//let color = data.source === 'server' ? 'green' : 'orange';
						//console.info('Activity retrieved from %c'+data.source,'font-weight:bolder;color:'+color);
					}
      			}); 
			}
			return data;
		}).then((data)=>{
			let fac_id = (data.activity && data.activity.fac_id) || null;
			if(fac_id) {
				FacilityFetcher.get(fac_id, this.props.appstate).then((data)=>{
					this.setState({facility: data.facility}, () => {
						//if(data.facility) {
							//let color = data.source === 'server' ? 'green' : 'orange';
							//console.info('Facility retrieved from %c'+data.source,'font-weight:bolder;color:'+color);
						//}
					});          				
				}).catch((e)=>{ this.setState({working:false});console.error(e)})	
			}
		}).then(()=>{
			this.setState({working: false})
		}).catch((e)=>{ this.setState({working:false});console.error(e)})
	}
	renderActivityInfoCard(){
		if(this.state.activity) {
			return  <ActivityInfoCard activity={this.state.activity} />
		}
		return;
	}
	renderActivityItems() {
		if(this.state.activity.rows && this.state.activity.rows.length > 0) {
			return <ActivityItemCard items={this.state.activity.rows} />
		}
		return;
	}
	renderActivityPage() {
		return (
			<div>
				<Helmet>
					<title>{'Activity #'+this.state.activity.activity_id}</title>
				</Helmet>
				<h2 className="text-center">{this.state.activity.activity_type_description} on <Moment format="M/D/YY">{this.state.activity.activity_date}</Moment> for {this.state.facility.fac_name}</h2>
				<Row><Col>{ this.renderActivityInfoCard() }</Col></Row>
				<Row className="mt-2"><Col>{ this.renderActivityItems() }</Col></Row>
			</div>
		)
	}
	renderActivity(){
		if(!this.state.working) {
			if(this.state.activity && this.state.facility) {
				return this.renderActivityPage()
			}
			let text = this.props.appstate.online ? 'Error Getting Activity' : 'Activity Not Available Offline';
			return <NotFoundBox message={text} />
		}
		return;
	}
	render() {
		return (
			<div>
			    <BlueDiv fluid="true"><BackNav route={this.props.route} /></BlueDiv>
				<Container>{this.renderActivity()}</Container>
			</div>
		);
	}

}

export default ActivityPage;