import axios from 'axios';
import Config from './Config.js';


const DataFetcher = (args) => { 
	return new Promise((resolve, reject) => {
		let url = null;
		let data_object = args.type;
		switch (args.type) {
			case 'facility':
				url = Config.facility_endpoint(args.id);	
				break;
			case 'facility_download':
				data_object = 'facility';
				url = Config.facility_download_endpoint(args.id);	
				break;
			case 'establishment':
				url = Config.establishment_endpoint(args.id);
				data_object = 'facility';
				break;
			case 'activity':
				url = Config.activity_endpoint(args.id);	
				break;
			case 'counties':
				url = Config.county_list_endpoint;	
				break;
			case 'yelp':
				url = Config.yelp_endpoint(args.id);	
				break;
			case 'custom':
				url = args.url;
				break;
			default:
				url = (typeof args.id !== 'undefined' ? Config[args.type+'_endpoint'](args.id) : Config[args.type+'_endpoint']) || false;
  		}
  		if(url) {	
  			axios.get(url).then((response) => {
  				//console.log(response);
  				let data = args.type === 'custom' ? response : response.data[data_object];
  				resolve(data);
			}).catch((error) => { reject(error)});	
  		} else {
  			reject('No endpoint for this request');
  		}
	});
}
export default DataFetcher;