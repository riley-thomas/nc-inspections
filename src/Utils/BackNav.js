import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'reactstrap';

class BackNav extends Component {
	render() { 
		return (<nav>
			<NavLink href="#" className='text-white' onClick={() => this.props.route.history.goBack()}>
				<FontAwesomeIcon icon="arrow-alt-circle-left" /> Back
			</NavLink>
		</nav>)
	}
}

export default BackNav