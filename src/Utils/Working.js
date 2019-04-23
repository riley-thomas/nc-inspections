import React, { Component } from 'react';
//import FontAwesomeIcon from '@fortawesome/react-fontawesome';

class Working extends Component {
	constructor(props) {
		super(props);
		this.state = { dots: ''};
	}
	tick() {
		this.setState(prevState => ({dots: prevState.dots + '.'}));
	}

	componentDidMount() {
		this.interval = setInterval(() => this.tick(), 500);
	}
	componentWillUnmount() {
		clearInterval(this.interval);
	}
	componentWillReceiveProps(nextProps){
		if(this.props.unique !== nextProps.unique) {
			this.setState({dots: ''});
		}
	}

	//<FontAwesomeIcon className="text-primary mt-5" icon="spinner" size="10x" pulse />
	render() { 
		const div = this.props.working && this.state.dots.length > 2 ? (
			<div className="">
				<h2 className='mt-5'>Working{this.state.dots}</h2>
		    </div>
		) : null ;
		return div;
	}
}
export default Working