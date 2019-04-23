import React, { Component } from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import { Card, CardHeader, Table } from 'reactstrap';
import ScoreTypes from './scoreTypes';

class ActivityInfoCard extends Component {

   renderCard(){
      return (
         <Card className="border-secondary">
            <CardHeader tag="h4" className="bg-secondary text-white">Activity Info</CardHeader>
            <Table>
               <tbody>
                  <tr>
                     <th>Activity Type</th>
                     <td>{ this.props.activity.activity_type_description }</td>
                     <th>Form</th><td>{ this.props.activity.form.form_title }</td>
                  </tr>
                  <tr>
                     <th>Activity Date</th><td><Moment format="M/D/YY">{this.props.activity.activity_date}</Moment></td>
                     <th>{ ScoreTypes[this.props.activity.form.scoring_type].label }</th>
                     <td>{ this.props.activity[ ScoreTypes[this.props.activity.form.scoring_type].field ] }</td>
                  </tr>
                  <tr>
                     <th>Activity Status</th><td>{this.props.activity.status_code}</td>
                     <th>Score Type</th><td>{ ScoreTypes[this.props.activity.form.scoring_type].type }</td>
                  </tr>
               </tbody>
            </Table>
         </Card>
      );
   }

   render(){

   	return (
         <div>
            {this.renderCard()}
         </div>
   	);
   }
}
export default ActivityInfoCard;