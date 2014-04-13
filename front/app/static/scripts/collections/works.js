define([
'jquery',
'underscore',
'backbone',
'appconfig',
'models/work'
], function ($, _, BB, config, Work) {
var Works = BB.Collection.extend({
	//comparator:,
	//parse:, // parse the reponse
	url: config.api_root + 'work/',
	model: Work,
	menuName: function(){
		return 'works';
	},
});
return Works;
});
