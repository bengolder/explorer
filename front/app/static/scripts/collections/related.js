define([
'd3',
'underscore',
'backbone'
], 
function (d3, _) {
// maybe relations should be objects, so I can test if they already exist
var Related = {
	initialize: function(options){
		_.extend(this, options);
		this.relations = d3.map();
		var me = this;
		if( _.has(options, 'relations') ){
			options.relations.forEach(function(relation){
				me.addRelation.apply(me, relation);
			});
		}
	},

	addRelation: function ( source, att_name, qText, target, 
					 reverseQText, reverse_att_name){
		this.relations.set(att_name, {
			'sourceCollectionName': source,
			'att_name': att_name,
			'queryText': qText,
			'reverseQueryText': reverseQText,
			'targetCollectionName': target,
			'reverseAttribute': reverse_att_name,
		});
	},

	addParentRelation: function(att_name, upKey, downKey){
		this.parentRelation = {
			'attribute': att_name,
			'upKey': upKey,
			'downKey': downKey,
		};
	},

	buildRelations: function(colls){
		if( this.relations !== undefined ){
			var me = this;
			this.relations.forEach(function (att_name, rel){
				// get related collection
				var otherColl = colls.get( rel.targetCollectionName );
				// add target collection to relationship object
				rel.targetCollection = otherColl;
				// add reverse relation to other collection
				if( _.has(rel, 'reverseAttribute') ) {
					otherColl.addRelation( 
						rel.targetCollectionName,
						rel.reverseAttribute, 
						rel.reverseQueryText,
						rel.sourceCollectionName,
						rel.queryText,
						rel.att_name 
					);
					var mirror = otherColl.relations.get(rel.reverseAttribute);
					mirror.targetCollection = colls.get(rel.sourceCollectionName);
					rel.mirror = mirror;
					mirror.mirror = rel;
				}
			});
		}
	},

	checkKeysOnForeignModel: function(other, att, model){
		if( !other.has(att) ){
			other.set(att, [model]);
		} else {
			other.get(att).push(model);
		}
	},

	replaceForeignKeys: function(colls){
			var me = this;
			me.relations.forEach(function(att_name, rel){
				me.forEach(function(m){
					var otherColl = colls.get(rel.targetCollectionName);
					if(!m.has(att_name)){
						m.set(att_name, []);
					}
					var fKeys = m.get(att_name);
					if( fKeys.length > 0 ) {
						m.set(att_name, _.map(fKeys, 
						function(k){
							var other = otherColl.get(k);
							if( _.has(rel, 'reverseAttribute') ){
								me.checkKeysOnForeignModel(other, rel.reverseAttribute, m);
							}
							return other;
						}));
					}
				});
			});
	},
};
return Related;
});
