define([
'd3',
'underscore',
'backbone'
], 
function (d3, _) {
var Related = {
	addRelation: function (att_name, qText, target, 
					 reverseQText, reverse_att_name){
		if( this.relations == undefined ) {
			this.relations = d3.map();
		}
		this.relations.set(att_name, {
			'queryText': qText,
			'reverseQueryText': reverseQText,
			'targetModel': target,
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
};
return Related;
});
