import React, { Component } from 'react';
import stars0 from './images/regular_0.png';
import stars1 from './images/regular_1.png';
import stars1half from './images/regular_1_half.png';
import stars2 from './images/regular_2.png';
import stars2half from './images/regular_2_half.png';
import stars3 from './images/regular_3.png';
import stars3half from './images/regular_3_half.png';
import stars4 from './images/regular_4.png';
import stars4half from './images/regular_4_half.png';
import stars5 from './images/regular_5.png';

class YelpStars extends Component {

	getImage() {
		switch(this.props.rating) {
			case 0: 
				return stars0;
			case 1: 
				return stars1;
			case 1.5: 
				return stars1half;
			case 2: 
				return stars2;
			case 2.5: 
				return stars2half;
			case 3: 
				return stars3;
			case 3.5: 
				return stars3half;
			case 4: 
				return stars4;
			case 4.5: 
				return stars4half;
			case 5:
				return stars5;
			default:
				return stars0;
		}

	}
	renderStars() {
		let rating = this.props.rating ? this.props.rating : false;
		if(rating) {
			return (
				<img src={ this.getImage() } alt="" title="Yelp Rating" />
			);
		}
		return ('');
	}
	render() {
		return (
			<span>{ this.renderStars() }</span>
		);
	}

}

export default YelpStars;