import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Card, CardHeader, Table } from 'reactstrap';
import AddressText from '../Address/AddressText';

class FacilityList extends Component {

   renderFacilityAddress(v) {
      if(v.current_facility_address) {
         return <AddressText address={ v.current_facility_address } />;
      }
      return null;
   }

   scoreCss(score){
      let s = parseInt(score,10);
      switch(true) {
         case (s===0):
            return 'badge badge-light';
         case (s>90):
            return 'badge badge-success';
         case (s>80):
            return 'badge badge-warning';
         default:
            return 'badge badge-danger';
      }
   }

   renderTableHeader(){

      let typecolumn = this.props.factype === '' ? (<th>Fac Type</th>) : null;
      return (
         <thead>
            <tr className="bg-light">
               <th>Facility ID</th>
               <th>Name</th>{typecolumn}
               <th className='d-none d-lg-table-cell'>Address</th>
               <th className='d-none d-lg-table-cell'>Status</th>
               <th className='d-none d-lg-table-cell'>Lastest Score</th>
            </tr>
         </thead>
      );
   }
   renderRows(){
      const facilities = this.props.facilities;
      const rows = facilities.map((v,k) =>{
         let typerow = this.props.factype === '' ? (<td>{v.facility_type_description}</td>) : null;
         return (
            <tr id={'fac_'+v.fac_id} key={v.fac_id}>
               <td>
                  <Link to={'/facility/'+v.fac_id}>{ v.establishment_id }</Link>
               </td>
               <td>{ v.fac_name }</td>
               {typerow}
               <td className='d-none d-lg-table-cell'>{ this.renderFacilityAddress(v) }</td>
               <td className='d-none d-lg-table-cell'>{ v.status_code}</td>
               <td className='d-none d-lg-table-cell'><span className={ this.scoreCss(v.latest_score) }>{ v.latest_score }</span></td>
            </tr>
         );
      });
      return rows;
   }
   render(){


   	return (
         <Card className="border-secondary">
            <CardHeader tag="h4" className="bg-secondary text-white">Facilities</CardHeader>
      		<Table className='table-bordered'>
               {this.renderTableHeader()}
      			<tbody>
      				{this.renderRows()}
      			</tbody>
      		</Table>
         </Card>
   	);
   }
}
export default FacilityList;