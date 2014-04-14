define([
'jquery',
'underscore',
'backbone',
'appconfig',
'collections/related',
'models/work'
], function ($, _, BB, config, Related, Work) {
var Works = BB.Collection.extend(_.extend( Related, {
	//comparator:,
	//parse:, // parse the reponse
	url: config.api_root + 'work/',
	model: Work,
	menuName: function(){
		return 'works';
	},
}));
return Works;
});
