define([
'd3',
'underscore',
'backbone'
], 
function (d3, _, BB) {
// maybe relations should be objects, so I can test if they already exist
var Related = BB.Collection.extend({
	initialize: function(options){
		this.relations = d3.map();
		var me = this;
	},

	defineRelation: function ( att_name, targetCollection, reverse_att_name ){
		this.relations.set(att_name, {
			'sourceCollectionName': this.key,
			'att_name': att_name,
			'targetCollectionName': targetCollection,
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
		// relations are registered on each collection. They are used to
		// replace foreign keys
		if( this.relations !== undefined ){
			var me = this;
			this.relations.forEach(function (att_name, rel){
				// get related collection
				var otherColl = colls.get( rel.targetCollectionName );
				// add target collection to relationship object
				rel.targetCollection = otherColl;
				// if requested,
				// add reverse relation to other collection
				if( rel.reverseAttribute !== undefined ) {

					// define the relationship, but in reverse
					otherColl.defineRelation( 
						rel.reverseAttribute, 
						rel.sourceCollectionName,
						rel.att_name 
					);

					// register the reverse relationship as a mirror, and vice
					// versa
					var mirror = otherColl.relations.get(rel.reverseAttribute);
					mirror.targetCollection = colls.get(rel.sourceCollectionName);
					rel.mirror = mirror;
					mirror.mirror = rel;
				}
			});
		}
	},

	checkKeysOnForeignModel: function(other, att, model){
		// this is only called when a single model is replacing its own foreign
		// keys. This function is called when and if there is a reverse
		// relationship, and it ensures a symetrical reference using the
		// correct attribute on the other object.
		if( !other.has(att) ){
			// if the other object doesn't have the attribute,
			// then set it
			other.set(att, [model]);
		} else {
			// otherwise, just add this model to the other's array.
			var othersFriends = other.get(att);
			if( !_.contains(othersFriends, model) ){
				othersFriends.push(model);
			}
		}
	},

	replaceForeignKeys: function(colls){
		// go through each of the relations, and use it to replace foreign key
		// ids with actual object references.
		var me = this;
		// go through each relation
		me.relations.forEach(function(att_name, rel){
			// for each relation, get the related collection
			var otherColl = colls.get(rel.targetCollectionName);
			// for each relation, go through all the models in this collection
			me.forEach(function(m){
				// for each model, if it doesn't have the attribute, then set
				// it as an empty list
				if(!m.has(att_name)){
					m.set(att_name, []);
				}
				// get all the foreign keys
				var fKeys = m.get(att_name);
				// if there are any foreign keys, replace them with actual
				// objects
				if( fKeys.length > 0 ) {
					m.set(att_name, _.map(fKeys, 
					function(k){
						// inside this map function, for each key
						// get the object being pointed to
						var other = otherColl.get(k);
						// if there is a reverse relationship
						if( _.has(rel, 'reverseAttribute') ){
							// make sure this model is in the other's list of
							// related objects
							me.checkKeysOnForeignModel(other, rel.reverseAttribute, m);
						}
						return other;
					}));
				}
			});
		});
	},
});
return Related;
});
