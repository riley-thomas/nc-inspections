import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class JumpButton extends Component {

	render() {
		return (
			<Link className="btn btn-light border-primary btn-sm text-success" to={this.props.url}>Go</Link>
		)
	}
}
export default JumpButton