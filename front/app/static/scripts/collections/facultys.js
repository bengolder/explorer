
define([
'appconfig',
'jquery',
'underscore',
'backbone',
'collections/related',
'models/faculty'
], function (config, $, _, BB, Related, Faculty) {
var Facultys = Related.extend({
	key: 'facultys',
	menuName: 'faculty',
	comparator: 'title',
	url: config.api('faculty/'),

	initialize: function(){
		Related.prototype.initialize.apply(this, arguments);
		this.defineRelations();
	},

	defineRelations: function(){
		// args: ( att_name, targetCollection[, reverse_att_name] )
		this.defineRelation( 'current_interests', 'topics', 'faculty' );
	},

	parse:function( response ){
		return response;
	}, 

	model: Faculty,

	spans: {
	'collaborators': {
		'bridge_attribute': 'works',
		'other_attribute': 'authors',
		},

	'same_interests':{
		'bridge_attribute': 'current_interests',
		'other_attribute': 'faculty',
	},

	'related_locations':{
		'bridge_attribute': 'works',
		'other_attribute': 'locations',
	},

	'work_interests':{
		'bridge_attribute': 'works',
		'other_attribute': 'topics',
	}

},

graphData: function(){
	var data = {};
	// we need to assemble nodes and links
	data.nodes = this.models;
	data.links = [];
	this.models.forEach(function(m){
		var spans = m.getSpan('current_interests', 'faculty');
		spans.forEach(function(s){
			if( s.bridges.length > 0 ){
				var link = {};
				link.target = s.related_item;
				link.source = m;
				link.bridges = s.bridges;
				data.links.push(link);
			}
		});
	});
	return data;
},

});
return Facultys;
});
