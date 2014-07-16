define([
'appconfig',
'jquery',
'underscore',
'backbone',
'collections/related',
'models/location'
], function (config, $, _, BB, Related, Location) {
var Locations = Related.extend({

    key: 'locations',
	menuName: 'countries',
	comparator: 'name',

	initialize: function(){
		Related.prototype.initialize.apply(this, arguments);
	},

	parse: function( response ){
		return response;
	},

	model: Location,
	spans: {
		'related_topics': {
			'bridge_attribute': 'works',
			'other_attribute': 'topics',
		},
		'related_faculty': {
			'bridge_attribute': 'works',
			'other_attribute': 'authors',
		},
		'related_locations': {
			'bridge_attribute': 'works',
			'other_attribute': 'locations',
		},
	},

	globeData: function(){
		var data =  this.filter(function (m){
			return m.get('works').length > 0;
		});
		console.log("thing", data);
		return data;
	},
});
return Locations;
});
