import axios from 'axios';
import Config from '../Config.js';

const CheckNetwork = () => { 
	return new Promise((resolve, reject) => {
		if(!navigator.onLine){
			reject(false);
		} else {
			axios.get(Config.connectivity_test).then((response) => { resolve(true) }).catch((error) => { console.log(error); reject(false)});	
		}
	});
}
export default CheckNetwork;