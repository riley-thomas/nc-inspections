const Config = {
	db_version : 1,
	db_cache_max_days : 5,
	yelp_cache_max_days : 1,
	eh_api : 'https://10.0.0.1',
    connectivity_test : 'https://10.0.0.1/api/ping',
    download_facilities_endpoint : (a) => { return 'https://10.0.0.1/api/facility/download/county/'+a},
    download_activities_endpoint : (a) => { return 'https://10.0.0.1/api/activity/download/facility/'+a},
	facility_list_endpoint : 'https://10.0.0.1/api/facility',
	facility_endpoint : (a) => { return 'https://10.0.0.1/api/facility/'+a},
	facility_download_endpoint : (a) => { return 'https://10.0.0.1/api/facility/'+a+'?download=true'},
	establishment_endpoint : (a) => { return 'https://10.0.0.1/api/facility/establishment/'+a},
	activity_endpoint : (a) => { return 'https://10.0.0.1/api/activity/'+a},
	yelp_endpoint : (a) => { return 'https://10.0.0.1/api/yelp/'+a},
	corporation_endpoint : (a) => { return 'https://10.0.0.1/api/corporation/'+a},
	corporations_endpoint : 'https://10.0.0.1/api/corporation',
	county_list_endpoint : 'https:/10.0.0.1/api/county',
	report_endpoint : 'https://10.0.0.1/api/report',
	map_endpoint : () => { return 'https://10.0.0.1/map?page='},
	cdp_fac_page : (a) => { return 'https://public.cdpehs.com/NCENVPBL/ESTABLISHMENT/ShowESTABLISHMENTTablePage.aspx?'+a},
	digital_fac_page : (a) => { return 'http://'+a+'-nc.healthinspections.us'},
	pitt_fac_page : 'https://apps.pittcountync.gov/apps/health/restrate/',
	google_map_key : 'ABCD1234EFGH5678',
	default_app_state : { working : true, showScrollTop: false},
	default_settings : { first : { county : '001', factype : '', statuscode : '', searchstring : '' }}
}

export default Config;