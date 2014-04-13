define([
'jquery',
'underscore',
'backbone',
'appconfig',
'models/faculty',
], function ($, _, BB, config, Faculty) {
var Facultys = BB.Collection.extend({
	//comparator:,
	//parse:, // parse the reponse
	url: config.api_root + 'faculty/',
	model: Faculty,
	menuName: function(){
		return 'faculty';
	},
});
return Facultys;
});
