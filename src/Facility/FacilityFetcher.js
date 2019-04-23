import Dexify from '../Dexify';
import Config from '../Config';
import * as moment from 'moment';
import DataFetcher from '../DataFetcher';
const FacilityFetcher = {

  get : (id, state) => { 
  	return new Promise((resolve, reject) => {
      let filter = /^[0-9]{2,3}-[0-9]{2}-[0-9]{4,5}$/.test(id) ? {establishment_id : id } : {id : parseInt(id, 10)};
  		Dexify.get({table: 'facilities', filter : filter }).then((record) => {
        return record === null ? null : record;
      }).then((record) => {
        if(record === null) {
          if(state.online) {
            let t = /^[0-9]{2,3}-[0-9]{2}-[0-9]{4,5}$/.test(id) ? 'establishment' : 'facility';
            DataFetcher({type: t, id: id}).then( (facility) => {
              if(facility) {              
                Dexify.put({table: 'facilities', data : {
                    id : facility.fac_id,
                    county_id: facility.county_id,
                    fac_type: facility.fac_type,
                    fac_id_number: facility.fac_id_number,
                    status_code: facility.status_code,
                    establishment_id : facility.establishment_id,
                    expires: moment().add(Config.db_cache_max_days,'d').unix(),
                    value: facility
                  } 
                }).then(() => { resolve({ source : 'server', facility : facility }) }) // online found
              } else {
                resolve({ source : 'server', facility : null }) // online not found with no cached
              }    
            }).catch((e)=>{
                reject(e) // online not found with no cached
            });
          } else {
            resolve(resolve({ source : 'cache', facility : null })) // offline with no cached
          }
        } else {
          resolve({ source : 'cache', facility : record }) // cache found
        }
      })
      .catch((e) => {
    			reject(e);
    		})
  	});
  },

  list : (a, appstate) => { 
    return new Promise((resolve, reject) => {
      let online = appstate.online || false;
      if(online){
        let url = Config.facility_list_endpoint+'?county='+(a.county||'')+'&type='+(a.factype||'')+'&status='+(a.statuscode||'')+'&page='+(a.page||'1')+'&search='+(a.searchstring||'');
        DataFetcher({type:'custom', url: url}).then( (response) => {
          resolve({facilities : response.data.data, count : response.data.total, pages: response.data.last_page})
        }).catch((e) => { reject(e) })
      } else {
        let limit = 50;
        let filters = {}
        if(a.county)  filters['county_id'] = a.county;
        if(a.factype !== "") filters['fac_type'] = parseInt(a.factype, 10);
        if(a.statuscode !== "") filters['status_code'] = a.statuscode;
        Dexify.count({table: 'facilities', filters: filters}).then((count) => {
          Dexify.page({table: 'facilities', filters: filters, page: a.page}).then((facilities) => {
              let pages = (count > limit) ? (Math.ceil(count/limit)) : 1;
              resolve({ facilities : facilities, count : count, pages: pages  })
          }).catch((e)=> {reject(e)})  
        })
      }
    });//promise
  }

}

export default FacilityFetcher;