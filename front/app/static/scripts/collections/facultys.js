
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

	initialize: function(){
		Related.prototype.initialize.apply(this, arguments);
		this.defineRelations();
	},

	defineRelations: function(){
		// args: ( att_name, targetCollection[, reverse_att_name] )
		// can these be created using models on the backend?
		// What would be needed?
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
	// the matrix should have a row for each faculty.
	var relationMatrix = [];
	var sizeMatrix = [];
	var me = this;
	me.each(function(n, i){
		// add a row
		relationMatrix.push([]);
		sizeMatrix.push([]);

		me.each(function(o, j){
			var shared;
			// if this is an identity cell, just return an empty list
			if( o !== n ){
				shared = n.getCommonRelations(o, 'current_interests');
			} else {
				shared = [];
			}
			relationMatrix[i].push(shared);
			sizeMatrix[i].push(shared.length);
		});

	});
	return { nodes: me.models, relations: relationMatrix, 
		sizes: sizeMatrix,
		relationKey: 'current_interests'
	};
},

});
return Facultys;
});
