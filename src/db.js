import Dexie from 'dexie';
import Config from './Config';

const db = new Dexie('ol');
db.version(Config.db_version).stores({
	settings : 'name,value',
	facilities: 'id,county_id,fac_type,status_code,expires,value',
	activities: 'id,fac_id,expires,value',
	yelps: 'id,fac_id,expires,value'
});
db.version((Config.db_version + 1)).stores({
	settings : 'name,value',
	facilities: 'id,county_id,fac_type,fac_id_number,establishment_id,status_code,expires,updated_at,value',
	activities: 'id,fac_id,expires,updated_at,value',
	yelps: 'id,fac_id,expires,value'
});

export default db;