define([], 
function () {
var config = {
	'static_root':'/static/',
};
// a hack to deal with passing local vs. production settings & CORS
if( API_ROOT.indexOf('http:') != -1 ) {
	config['api_root'] = API_ROOT;
} else {
	config['api_root'] = 'http://127.0.0.1:8000/api/';
}

config.api = function api(s){ return config.api_root + s;}

return config;
});
