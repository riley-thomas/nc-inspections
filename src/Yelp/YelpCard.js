import React, { Component } from 'react';
import { Row, Col, Table, Card, CardHeader, CardBody } from 'reactstrap';
import YelpStars from './YelpStars';
import YelpLogo from './images/Yelp_trademark_RGB_outline.png';
import Callout from '../Utils/Callout';
import YelpFetcher from './YelpFetcher';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class YelpCard extends Component {

	constructor(props) {
		super(props);
		this.state = { yelp : null }
	}
	componentWillReceiveProps(props) {
	}
	componentDidMount() { 
		this.getYelp();
		this._mounted = true;
	}

	componentWillUnmount() {
		this._mounted = false;
	}
	getYelp() {
		YelpFetcher.get(this.props.facility.fac_id, this.props.appstate).then((data) =>{
			if(data.yelp && this._mounted) {
				this.setState({yelp : data.yelp }, () => {
					//let color = data.source === 'server' ? 'green' : 'orange';
					//console.info('Yelp retrieved from %c'+data.source,'font-weight:bolder;color:'+color);
				})
			}
		}).catch((e) => { console.error(e)})
	}
	
	getUrl() {
		return (this.state.yelp.url ? this.state.yelp.url : 'https://www.yelp.com');
	}
	renderLogo() {
		return (
			<a href={ this.getUrl() } target="new_window">
				<img src={ YelpLogo } alt="Yelp Logo" title="Yelp" className="yelp-logo" />
			</a>
		);
	}
	renderImage() {
		if(this.state.yelp.image_url) {
			return (
				<span>
					<a href={ this.getUrl() } target="new_window">
						<img src={this.state.yelp.image_url} alt="Yelp Business" title="" className="yelp-image" />
					</a>
				</span>

			);
		}
		return;
	}
	renderStars() {
		if(this.state.yelp.rating) {
			return (
				<tr>
					<th>Rating</th>
					<td>
						<a href={ this.getUrl() } target="new_window">
							<YelpStars rating={this.state.yelp.rating} />
						</a>
					</td>
				</tr>
			);
		}
		return;
	}

	renderPrice() {
		if(this.state.yelp.price) {
			return (
				<tr>
					<th>Price</th>
					<td>{ this.state.yelp.price }</td>
				</tr>
			);
		}
		return;
	}
	renderDetail(detail) {
		if(this.state.yelp.details) {
			switch(detail) {
				case 'phone':
					return (this.state.yelp.details.display_phone ? (<tr><th>Phone</th><td><a href={'tel:'+this.state.yelp.phone}>{this.state.yelp.details.display_phone}</a></td></tr>) : null);
				default :
				 return;
			}
		}
		return;
	}

	renderWarning(){
		if(this.state.yelp.matches > 1) {
			return (
				<Callout type='warning' tagname="div" className="m-1">
					<span className="text-muted small">
						<FontAwesomeIcon icon="exclamation-triangle" /> Multiple facilities found. Using best guess "{this.state.yelp.name}".
					</span>
				</Callout>
			);
		}
		return;
	}

	renderCard() {
		if(this.state.yelp) {
			return (
				<Card className="border-secondary mt-3">
					<CardHeader tag="h4" className="bg-secondary text-white p-0">
						{ this.renderLogo() }
					</CardHeader>
					<CardBody>
						<Row>
							<Col className="m-0 p-0 text-center">
								{ this.renderImage() }
							</Col>
							<Col className="p-0">
								<Table className="table-sm no-border m-0 p-1">
									<tbody>
										{ this.renderStars() }
										{ this.renderPrice() }
										{ this.renderDetail('phone') }
									</tbody>
								</Table>
								
							</Col>
						</Row>
						<Row>{ this.renderWarning() }</Row>
					</CardBody>
				</Card>
			);
		}
		return;

	}

	render() {
		return (<div>{this.renderCard()}</div>);
	}

}

export default YelpCard;