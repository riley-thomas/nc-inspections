import React, { Component } from 'react';
import {Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from 'reactstrap';
import JumpToEstablishmentID from '../Utils/JumpToEstablishmentID';
import NaviLink from './NaviLink'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
class Navibar extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.handleOnlineChanged = this.handleOnlineChanged.bind(this);
    this.state = {
      working: this.props.appstate.working,
      isOpen: false
    };
  }

  componentWillMount(){

  }
  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  handleOnlineChanged(v){
    this.props.onlineChanged(v)
  }
  getPageTitle() {
    return this.props.title ? this.props.title : 'EHIDS';
  }

  renderToggleButton() {
    if(typeof this.props.appstate.online === 'boolean' && navigator.onLine){
      return (
        <Link to="/" className="btn btn-link nav-link text-light"
         onClick={() => { this.handleOnlineChanged(this.props.appstate.online === true ? false : true)} }>
          <span className={(this.props.appstate.online === true ? '': 'd-none')}><FontAwesomeIcon icon="toggle-on" /> Online</span>
          <span className={(this.props.appstate.online === true ? 'd-none': '')}><FontAwesomeIcon icon="toggle-off" /> Offline</span>
        </Link>
      )      
    }
  }

  renderNavibar(){

    return (
      <div className='d-print-none'>
        <Navbar className="fixed-top navbar navbar-dark bg-primary" expand="md">
          <div className="nc-logo"></div>
          <NavbarBrand href="/" className="mr-auto d-none d-lg-inline">{ this.getPageTitle() }</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav>
              <NavItem>
                {this.renderToggleButton()}
              </NavItem>
            </Nav>
            <Nav className="ml-auto" navbar>
              <NaviLink url="/facilities" title="Facilities" always="true" appstate={this.props.appstate} route={this.props.route} />;
              <NaviLink url="/corporations" title="Corporations" appstate={this.props.appstate} route={this.props.route} />;
              <NaviLink url="/counties" title="Counties" appstate={this.props.appstate} route={this.props.route} />;
              <NaviLink url="/reports" title="Reports" appstate={this.props.appstate} icon="chart-line" route={this.props.route} />;
              <NaviLink url="/download" title="Download" appstate={this.props.appstate} icon="download" route={this.props.route} />;
            </Nav>
            <div className='d-none d-lg-inline'>
              <JumpToEstablishmentID />
            </div>
          </Collapse>
        </Navbar>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderNavibar()}
      </div>
    );
  }

}

export default Navibar;