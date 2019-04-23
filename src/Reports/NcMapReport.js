import React, { Component } from 'react';
import {geoPath ,geoAlbers} from 'd3-geo';
import {scaleQuantile, scaleOrdinal } from 'd3-scale';
import {schemeReds , schemeGreens} from 'd3-scale-chromatic'
import { Tooltip } from 'reactstrap';

class NcMapReport extends Component {

   constructor(props) {
      super(props);
      this.state = { tips : {}, lastid : null }
   }

   toggleTip(id) {
      let tips = this.state.tips;
      if(this.state.last_id !== id) {
         tips[id] = tips[id] === true ? false : true;
         this.setState({tips: tips, lastid: id})
      }
      
   }

   getColorScale(report) {
      switch(report){
         case 'vendor':
            return scaleOrdinal().domain(['CDP','DIGITAL','PITT','STATE']).range(['#4c8ec0','#b8d9ef','#dab8ef','#fff']);//#627d99
         case 'average_type1_score_1517':
            return scaleQuantile().domain([90,100]).range(schemeGreens[9]);
         case 'notice_count':
            return scaleQuantile().domain([0,150]).range(schemeReds[9]);
         default:
            return false;
      }
   }

   renderMap(){
      let colorscale = this.getColorScale(this.props.report);
      const proj = geoAlbers().scale(9000).rotate([79.639,0]).center([0, 35.323]).translate([this.props.svgWidth/2, this.props.svgHeight/2]);
      let path = geoPath().projection(proj)
      const counties = this.props.features.map((d,i) => {
            let fill = colorscale(d.properties[this.props.report]);
            let p = path(d);
            let a = (
               <path 
                  d={ p }
                  fill={ fill }
                  stroke='#212529'
                  className='county' title={d.properties.name}
                  data-county={ d.properties.name }
               />
            );
            return (
               <g key={'span' + i}>
                  {a}
               </g>
            )
      });
      const labels = this.props.features.map((d,i) => {
            let xy = { x : path.centroid(d)[0], y : path.centroid(d)[1]}
            let a = (
               <text x={ xy.x } y={ xy.y } textAnchor='middle' fontSize='7pt'>
                  {  d.properties.name }
               </text>
            )
            let b = (
               <text x={ xy.x } y={ xy.y + 10 } textAnchor='middle' fontSize='6pt'>
                  { d.properties[this.props.report] }
               </text>
            )
            return (
               <g key={'span' + i} id={'g_'+this.props.report+'_'+i}>
                  {a}{b}
               </g>
            )
      });
      const tips = this.props.features.map((d,i) => {
         let gid = 'g_'+this.props.report+'_'+i;
         return (
            <Tooltip key={'gtip' + i} placement="top" isOpen={(this.state.tips[gid] === true ? true : false)} 
               target={gid} 
               toggle={ () => this.toggleTip(gid) } delay={{show : 3, hide : 1}}
            >{ d.properties.name } : {d.properties[this.props.report]}</Tooltip>
         )
      });
      return (
         <div>
            <svg width={this.props.svgWidth} height={this.props.svgHeight}>
               {counties}
               {labels}
            </svg>
            {tips}
         </div>
      );
   }

   render(){

   	return (
         <div>
            {this.renderMap()}
         </div>
   	);
   }
}
export default NcMapReport;