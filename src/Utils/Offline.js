import React, { Component } from 'react';
import CheckNetwork from './CheckNetwork';
import Callout from './Callout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Offline extends Component {
	
	constructor(props){
		super(props);
		this.state = {
			online : true
		}
	}

	componentWillMount(){
    	this.checkOffline();
	}

	checkOffline(){
		CheckNetwork().then((status) => {
			this.setState({online : status})
		}).catch((e) => {
			this.setState({online : false})
		})
	}

	renderOffline() {
		if(!this.state.online){
			return (
				<Callout tagname='h4' type='danger'>
					<FontAwesomeIcon icon="exclamation-circle" /> Working Offline
				</Callout>
			)
		}
		return;
	}
	render() {
		return (
	        <div className="container">
	        	{this.renderOffline()}
	        </div>
		);
	}

}

export default Offline;