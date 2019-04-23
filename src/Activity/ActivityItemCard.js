import React, { Component } from 'react';
import { Card, CardHeader, Table } from 'reactstrap';

class ActivityItemCard extends Component {

   render(){
   	const items = this.props.items;
      const rows = [].concat(items)
      .sort((a, b) => a.form_item_number > b.form_item_number ? 1 : -1)
      .map((v,k) => {
         // using k as key since never changes and form item number actually isnt unique
   		return (
   			<tr key={k}>
               <td>{v.form_item_number}</td>
               <td><b>{v.subheading}</b>: { v.desc }</td>
               <td>{ v.point_value }</td>
               <td>{ v.deduct_type}</td>
               <td>{ v.demerits }</td>
               <td>{ v.cid === "1" ? 'Y' : 'N' }</td>
               <td>{ v.comment }</td>
            </tr>
   		);
   	});

   	return (
         <Card className="border-secondary">
            <CardHeader tag="h4" className="bg-secondary text-white">Activity Items</CardHeader>
      		<Table>
               <thead className="bg-light">
                  <tr>
                     <th>Item</th><th>Rule</th><th>Value</th><th>Deduct Type</th><th>Demerits</th><th>CDI</th><th>Comment</th>
                  </tr>
               </thead>
      			<tbody>
      				{rows}
      			</tbody>
      		</Table>
         </Card>
   	);
   }
}
export default ActivityItemCard;