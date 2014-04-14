define([
'jquery',
'underscore',
'backbone',
'appconfig',
'collections/related',
'models/location'
], function ($, _, BB, config, Related, Location) { 
var Locations = BB.Collection.extend(_.extend(Related, {
	//comparator:,
	//parse:, // parse the reponse
	url: config.api_root + 'location/',
	model: Location,
	menuName: function(){
		return 'locations';
	},
}));
return Locations;
});
