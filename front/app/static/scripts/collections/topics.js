define([
'appconfig',
'jquery',
'underscore',
'backbone',
'collections/related',
'models/topic'
], function (config, $, _, BB, Related, Topic) {
var Topics = Related.extend({
	key: 'topics',
	menuName: 'topics',
	url: config.api('topic/'),
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
		// we need to assemble nodes and links
		data.nodes = this.models;
		data.links = [];
		this.models.forEach(function(m){
			var spans = m.getSpan('faculty', 'current_interests');
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

	parse: function( response ){
		return response;
	},
	model: Topic,
});
return Topics;
});
