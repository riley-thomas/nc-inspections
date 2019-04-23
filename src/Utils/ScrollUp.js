import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class ScrollUp extends Component {

	constructor(props) {
		super(props);
		this.state = { showing : 'd-none' }
	}
	componentDidMount() {
		this.handleScroll = this.handleScroll.bind(this);
		window.addEventListener('scroll', this.handleScroll);
	}

	handleScroll() {
		let show = window.pageYOffset > window.innerHeight/2 ? '' : 'd-none';
		if(show !== this.state.showing){
			this.setState({showing: show});
		}
	}

	render() {
		return (
			<span className={this.state.showing}>
				<span className="scrollup d-print-none" onClick={() => { window.scrollTo(0,0)}}>
					<FontAwesomeIcon className="text-primary" icon="chevron-circle-up" size="3x" />
				</span>
			</span>
		)
	}

}
export default ScrollUp