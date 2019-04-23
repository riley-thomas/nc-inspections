import db from './db';

const DexieFetcher = (args) => { 
	return new Promise((resolve, reject) => {
		db[args.table].get(args.filter).then((record) => {
        	if(record && typeof(record) === 'object' && null !== record) {
        		if(record.value) {
					resolve(record.value);
        		} else {
        			resolve(null);
        		}
        	} else {
        		resolve(null);
        	}
  		}).catch((e) => {
  			reject(e);
  		})
	});
}
export default DexieFetcher;