var Related = require('../collections/related');
var Location = require('../models/location');

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
module.exports = Locations;
