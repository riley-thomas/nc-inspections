import db from './db';

const Dexify = {

  get : (args) => { 
  	return new Promise((resolve, reject) => {
  		db[args.table].get(args.filter).then((record) => {
          if(typeof record !== 'undefined') {
            if(typeof record.value !== 'undefined') {
    			resolve(record.value);
            }
          }
          resolve(null)
    		}).catch((e) => {
    			reject(e);
    		})
  	});
  },

  put : (args) => {
    return new Promise((resolve, reject) => {
      db[args.table].put(args.data).then((record) => {
        resolve(record);
      })
      .catch((e) => {
          reject(e);
      })
    });
  },

  count : (args) => { 
    return new Promise((resolve, reject) => {
      if(Object.keys(args.filters).length > 0) {
        db[args.table].where(args.filters).count((count) => { resolve(count) }).catch((e) => { reject(e) })
      } else {
        db[args.table].count((count) => { resolve(count) }).catch((e) => { reject(e) })
      }
    });
  },

  page : (args) => { 
    return new Promise((resolve, reject) => {
      let limit = typeof(args.limit) === 'number' ? parseInt(args.limit, 10) : 50;
      let offset = args.page > 1 ? ((args.page -1) * limit) : 0;
      if(Object.keys(args.filters).length > 0) {
        db[args.table].where(args.filters).offset(offset).limit(limit).toArray((records) => {
          let facilities = records.map((v, k) => { return v.value });
          resolve(facilities);
        }).catch((e) => { reject(e) })
      } else {
        db[args.table].offset(offset).limit(limit).toArray((records) => {
          let facilities = records.map((v, k) => { return v.value });
          resolve(facilities);
        }).catch((e) => { reject(e) })
      }
    });
  }

}

export default Dexify;