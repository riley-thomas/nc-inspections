import React, { Component } from 'react';
import JumpButton from './JumpButton';

class JumpToEstablishmentID extends Component {
	constructor(props) {
		super(props);
		this.state = { id : (this.props.id || ''), url: '#' };
	}

	handleJump(event) {
		if(event.key === 'Enter'){
			if(this.validId()) {
				//this.props.jump(this.state.url)
			}
		}
	}
	handleChanged(event) {
		let val = event.target.value
		if(val.length === 3 || val.length === 6) {
			if(! /-$/.test(this.state.id)){
				val += '-';
			}
		}
		this.setState({ id : val }, ()=>{
			let url = this.validId() ? '/facility/'+this.state.id : '#';
			this.setState({url: url});
		});
	}
	validId() {
		if(this.state.id) {
			return /^\d{3}-\d{2}-\d{4,5}$/.test(this.state.id);
		}
		return false;
	}
	renderButton() {
		if(this.state.url && this.validId()) {
			return (
				<JumpButton url={this.state.url} />
			);
		}
		return (
			<button className="btn btn-light border-primary btn-sm" disabled={true}>Go</button>
		);
	}
	render() {
		let success = this.validId() ? 'is-valid text-success' : '';
		return (
			<div className="input-group">
				<input name="establishment_id" 
					onChange={ this.handleChanged.bind(this) } 
					value={this.state.id} 
					className={"form-control form-control-sm border-primary "+ success} placeholder="###-##-####" pattern="\d{3}-\d{2}-\d{4,5}" maxLength="12" size="12"
					onKeyPress={this.handleJump.bind(this)} 
				/>
				<div className="input-group-append">
					{this.renderButton()}
				</div>
			</div>
		);
	}

}

export default JumpToEstablishmentID;