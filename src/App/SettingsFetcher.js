import Dexify from '../Dexify';
const SettingsFetcher = {
  get : (name) => { 
  	return new Promise((resolve, reject) => {
      Dexify.get({table: 'settings', filter : { name : name} }).then((record) => {
        //console.log('fetcher dexie for '+name+' is '+record)
        resolve(record);
      }).catch((e) => {	reject(e) })
  	});
  },
  put : (setting) => {
    return new Promise((resolve, reject) => {
      Dexify.put({table: 'settings', data : { name : setting.name, value : setting.value }})
      .then((r)=> { resolve(r)}).catch((e) => { reject(e) })
    });
  }

}

export default SettingsFetcher;