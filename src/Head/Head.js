import React, { Component } from 'react';
import a1 from './icons/apple-touch-icon-57x57.png';
import a2 from './icons/apple-touch-icon-60x60.png';
import a3 from './icons/apple-touch-icon-60x60.png';
import a4 from './icons/apple-touch-icon-76x76.png';
import a5 from './icons/apple-touch-icon-114x114.png';
import a6 from './icons/apple-touch-icon-120x120.png';
import a7 from './icons/apple-touch-icon-144x144.png';
import a8 from './icons/apple-touch-icon-152x152.png';
import a9 from './icons/apple-touch-icon-180x180.png'
import g1 from './icons/android-chrome-192x192.png';
import i0 from './icons/favicon.ico';
import i1 from './icons/favicon-32x32.png';
import i2 from './icons/favicon-96x96.png';
import i3 from './icons/favicon-16x16.png';
import {Helmet} from 'react-helmet';

class Head extends Component {

	render() {
		return (
			<Helmet>
				<link rel="apple-touch-icon" sizes="57x57" href={a1} />
				<link rel="apple-touch-icon" sizes="60x60" href={a2} />
				<link rel="apple-touch-icon" sizes="72x72" href={a3} />
				<link rel="apple-touch-icon" sizes="76x76" href={a4} />
				<link rel="apple-touch-icon" sizes="114x114" href={a5} />
				<link rel="apple-touch-icon" sizes="120x120" href={a6} />
				<link rel="apple-touch-icon" sizes="144x144" href={a7} />
				<link rel="apple-touch-icon" sizes="152x152" href={a8} />
				<link rel="apple-touch-icon" sizes="180x180" href={a9} />
				<link rel="icon" type="image/png" href={i1} sizes="32x32" />
				<link rel="icon" type="image/png" href={g1} sizes="192x192" />
				<link rel="icon" type="image/png" href={i2} sizes="96x96" />
				<link rel="icon" type="image/png" href={i3} sizes="16x16" />
    			<link rel="shortcut icon" href={i0} />
			</Helmet>
		);
	}

}

export default Head;