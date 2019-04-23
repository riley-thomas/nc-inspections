import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class PageFooter extends Component {

	componentWillReceiveProps(props) {
	}
	renderCopyright() {
		return (
	  		(new Date()).getFullYear() + ' NC DPH'
		);
	}
	renderOnline() {
		return (
			<div className={(this.props.appstate.online && navigator.onLine ? 'text-right text-success' : 'text-right text-danger')}>
				<FontAwesomeIcon icon="circle" />&nbsp;
				<span className="text-light">{this.props.appstate.online && navigator.onLine ? 'Online' : 'Offline' }</span>
			</div>
		)
	}
	render() {
		return (
	        <div className="fixed-bottom text-light d-print-none">
	          <Container fluid={true}>
	            <Row className="bg-primary pt-1 pb-1">
	              <Col>
	                <span>&copy;</span> { this.renderCopyright() }
	              </Col>
	              <Col>
	                { this.renderOnline() }
	              </Col>
	            </Row>
	          </Container>
	        </div>
		);
	}

}

export default PageFooter;