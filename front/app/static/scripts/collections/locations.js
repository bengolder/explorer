define([
'jquery',
'underscore',
'backbone',
'appconfig',
'models/location'
], function ($, _, BB, config, Location) {
var Locations = BB.Collection.extend({
	//comparator:,
	//parse:, // parse the reponse
	url: config.api_root + 'location/',
	model: Location,
});
return Locations;
});
