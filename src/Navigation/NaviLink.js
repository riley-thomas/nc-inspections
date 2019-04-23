import React, { Component } from 'react';
import {Link } from 'react-router-dom';
import { NavItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
class NaviLink extends Component {

	render() {
		let regex = new RegExp(this.props.url+'*');
		let active = regex.test(this.props.route.match.url) ? 'active' : '';
		let icon = this.props.icon ? <span className='d-none d-lg-inline'><FontAwesomeIcon icon={this.props.icon} /></span> : null;
		return (
          <NavItem className={(navigator.onLine && this.props.appstate.online ? '' : (this.props.always ? '' : 'd-none'))+ ' ' + active}>
            <Link to={this.props.url} className="nav-link">{icon} {this.props.title}</Link>
          </NavItem>
		);
	}

}

export default NaviLink;