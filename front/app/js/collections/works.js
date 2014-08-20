var Related = require('../collections/related');
var Work = require('../models/work');

var Works = Related.extend({

	menuName: 'research projects',
	key: 'works',
	comparator: 'title',
	model: Work,

	parse:function( response ){
		return response;
	}, 

	initialize: function(){
		Related.prototype.initialize.apply(this, arguments);
		this.defineRelations();
	},

	defineRelations: function(){
		// args: (           att_name,     targetCollection[, reverse_att_name] )
		this.defineRelation( 'work_types', 'worktypes',       'works' );
		this.defineRelation( 'subworks',   'works',           'parentworks' );
		this.defineRelation( 'faculty',    'facultys',        'works' );
		this.defineRelation( 'topics',     'topics',          'works' );
		this.defineRelation( 'locations',  'locations',       'works' );
	},

	graphData: function(){
		var data = {};
		// we need to assemble nodes and links
		data.nodes = this.models;
		data.links = [];
		this.models.forEach(function(m){
			var spans = m.getSpan('faculty', 'works');
			spans.forEach(function(s){
				if( s.bridges.length > 1 ){
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
module.exports = Works;
