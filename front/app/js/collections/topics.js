var Related = require('../collections/related');
var Topic = require('../models/topic');

var Topics = Related.extend({
	key: 'topics',
	menuName: 'topics',
	comparator: 'name',

	initialize: function(){
		Related.prototype.initialize.apply(this, arguments);
		this.defineRelations();
	},

	defineRelations: function(){
		// args: ( att_name, targetCollection[, reverse_att_name] )
		//this.defineRelation( 'current_interests', 'topics', 'faculty' );
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
					shared = n.getCommonRelations(o, 'faculty');
				} else {
					shared = [];
				}
				relationMatrix[i].push(shared);
				sizeMatrix[i].push(shared.length);
			});

		});
		return { nodes: me.models, relations: relationMatrix, 
			sizes: sizeMatrix,
			relationKey: 'faculty'
		};
	},

	parse: function( response ){
		return response;
	},
	model: Topic,
});

module.exports = Topics;
