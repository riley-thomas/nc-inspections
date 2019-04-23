import Dexify from '../Dexify';
import Config from '../Config';
import * as moment from 'moment';
import DataFetcher from '../DataFetcher';
const YelpFetcher = {

  get : (fac_id, appstate) => { 
  	return new Promise((resolve, reject) => {
  		Dexify.get({table: 'yelps', filter : {id : parseInt(fac_id, 10)}}).then((record) => {
        return record === null ? null : record;
      }).then((record) => {
        if(record === null) {
          if(appstate.online){
            DataFetcher({type:'yelp', id: fac_id}).then( (yelp) => {
              if(yelp) {              
                Dexify.put({table: 'yelps', data : {
                    id : fac_id,
                    fac_id : fac_id,
                    expires: moment().add(Config.yelp_cache_max_days,'d').unix(),
                    value: yelp
                  } 
                }).then(() => { resolve({ source : 'server', yelp : yelp }) })
              } else {
                resolve(resolve({ source : 'server', yelp : null }))
              }    
            })          
          } else {
            resolve({ source : 'cache', yelp : null })
          }
        } else {
          resolve({ source : 'cache', yelp : record })
        }
      })
      .catch((e) => {
    			reject(e);
    		})
  	});
  }

}

export default YelpFetcher;