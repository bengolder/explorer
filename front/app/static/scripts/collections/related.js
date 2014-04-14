define([
'd3',
'underscore',
'backbone'
], 
function (d3, _) {
// maybe relations should be objects, so I can test if they already exist
var Related = {
	addRelation: function (att_name, qText, target, 
					 reverseQText, reverse_att_name){
		if( this.relations == undefined ) {
			this.relations = d3.map();
		}
		this.relations.set(att_name, {
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
				if( rel.reverseAttribute !== undefined ) {
					otherColl.addRelation( rel.reverseAttribute, 
						rel.reverseQueryText,
						me.collectionName,
						rel.queryText,
						rel.att_name 
					);
					var mirror = otherColl.relations.get(rel.reverseAttribute);
					mirror.targetCollection = me;
					rel.mirror = mirror;
					mirror.mirror = rel;
				}
			});
		}
	},
	replaceForeignKeys: function(colls){
		if( this.relations !== undefined ) {
			var me = this;
			this.forEach(function(m){
				me.relations.forEach(function(att_name, rel){
					if( rel.mirror !== undefined && rel.mirror.foreignKeyReplaced !== true ){
						var mirrorTagged = false;
					}
					if( rel.foreignKeysReplaced !== true && !mirrorTagged ) {
						var otherColl = colls.get(rel.targetCollectionName);
						var fKeys = m.get(att_name);
						if( fKeys !== undefined && fKeys.length > 0 ) {
							m.set(att_name, _.map(fKeys, function(k){
								var other = otherColl.get(k);
								if( rel.reverseAttribute !== undefined ){
									if( !other.has(rel.reverseAttribute) ){
										other.set(rel.reverseAttribute, [m]);
									} else {
										other.get(rel.reverseAttribute).push(m);
									}
								}
								return other;
							}));
						}
						rel.foreignKeysReplaced = true;
					}
				});
			});
		}
	},
};
return Related;
});
