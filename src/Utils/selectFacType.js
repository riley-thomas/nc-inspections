import React, { Component } from 'react';
import FacType from '../data/factype.json';

class SelectFacType extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selected_type : this.props.value,
		};
	}

	handleChanged(event){
		this.setState({selected_type : event.target.value});
		this.props.handleChange(event);
	}

	render() {
		const fac_types = FacType.map((f,id) => {
			return { label : f.fac_type + ' - ' + f.fac_type_description, value : f.fac_type };
		});
		return (
			<select name="fac_type" onChange={ this.handleChanged.bind(this)} value={this.state.selected_type} className="form-control" >
				<option value="">All Types</option>
				{ fac_types.map((f,id) => { return <option key={f.value} value={f.value}>{f.label}</option> }) }
			</select>
		);
	}

}

export default SelectFacType;