import React, { Component } from 'react';
import StatusCodes from '../data/statuscodes.json';

class SelectStatus extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selected_status : this.props.value,
		};
	}

	handleChanged(event){
		this.setState({selected_status : event.target.value});
		this.props.handleChange(event);
	}

	render() {
		const status_codes = StatusCodes.map((s,id) => {
			return { label : s.status_code + ' - ' + s.status_description, value : s.status_code };
		});
		return (
			<select name="status_code" onChange={ this.handleChanged.bind(this)} value={this.state.selected_status} className="form-control" >
				<option value="">All Status Codes</option>
				{ status_codes.map((s,id) => { return <option key={s.value} value={s.value}>{s.label}</option> }) }
			</select>
		);
	}

}

export default SelectStatus;