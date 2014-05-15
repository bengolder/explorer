define([
'underscore',
'd3',
'backbone',
], function ( _, d3, BB ) {
var BaseModel = BB.Model.extend({

getSpan: function(bridge_att, other_att){
	var me = this;
	var hist = d3.map();
	me.get(bridge_att).forEach(function(bridge){
		bridge.get(other_att).forEach(function(other){
			if( other !== me ) {
				var otherKey = "o" + other.id;
				if (!hist.has(otherKey)){
					hist.set(otherKey, {
						'related_item': other, 
						'bridges':[bridge]
					});
				} else {
					hist.get(otherKey).bridges.push(bridge);
				}
			}
		});

	});
	var spans = hist.values();
	spans.sort(function(a, b){
		return b.bridges.length - a.bridges.length;
	});
	return spans;
},


getCommonRelations: function(other, related_att){
	// similar to exploring spans, this finds the related objects that are
	// shared in common between two model instances of the same type.
	var theseRelations = this.get(related_att);
	var otherRelations = other.get(related_att);
	var shared = [];
	theseRelations.forEach(function(r, i){
		if( _.contains(otherRelations, r) ){
			shared.push(r);
		}
	});
	return shared;
},

getSpanningRelations: function(){
	var me = this;
	_.each(this.spans, function(span, att_name){
		if( _.has( me.attributes, span.bridge_attribute ) ){
			me.set(att_name, me.getSpan(
				span.bridge_attribute,
				span.other_attribute
			));
		}
	});

},

getParentRelations: function(){


},

display: function(){
	return this.get(this.displayKey);
},

serialize: function(){
	this.getSpanningRelations();
	var data = _.clone(this.attributes);
	data.display = this.display();
	data.relations = [];
	this.collection.relations.forEach(function(key, rel){
		var related = data[key]
		var count = related.length;
		if( count > 0 ){
			data.relations.push({
				count:count,
				display: rel.queryText,
				type: rel.targetCollection.menuName
			});
		}
	});
	return data;
}

});
return BaseModel;
});
