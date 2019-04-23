import Dexify from '../Dexify';
import Config from '../Config';
import * as moment from 'moment';
import DataFetcher from '../DataFetcher';
const ActivityFetcher = {

  get : (id, state) => { 
  	return new Promise((resolve, reject) => {
      //console.log(state)
  		Dexify.get({table: 'activities', filter : {id : parseInt(id, 10)}}).then((record) => {
        return record === null ? null : record;
      }).then((record) => {
        if(record === null) {
          if(state.online) {
            DataFetcher({type:'activity', id: id}).then( (activity) => {
              if(activity) {              
                Dexify.put({table: 'activities', data : {
                    id : activity.activity_id,
                    fac_id: activity.fac_id,
                    expires: moment().add(Config.db_cache_max_days,'d').unix(),
                    value: activity
                  } 
                }).then(() => { resolve({ source : 'server', activity : activity }) })
              } else {
                resolve(resolve({ source : 'server', activity : null }))    
              }
            }).catch((e) => {reject(e)});          
          } else {
            resolve(resolve({ source : 'cache', activity : null }))
          }
        }  else {
          resolve({ source : 'cache', activity : record })
        }
      })
      .catch((e) => {
    			reject(e);
    		})
  	});
  }

}

export default ActivityFetcher;