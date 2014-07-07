define([
'd3',
'jquery',
'backbone',
'data_manager',
'event_manager',
'hbs!templates/list/work_short'
], 
function (d3, $, BB, Data, Events, workTemplate) {
	// All Viz types should start with the #chart element
	// and they should use d3 to do most of their rendering.
	// Ideally, their parent view will initialize them with the proper data.
var Columns = BB.View.extend({
className: 'list-column',

initialize: function(data){
	this.data = data;
	console.log("starting columns view with", data);
	this.render();
},

render: function(){
	var me = this;

	this.div = d3.select(this.el);

	this.leftColumn = this.div.append('div')
		.attr('class', 'column left works');

	this.workDivs = this.leftColumn.selectAll('.work')
		.data(this.data.models).enter()
		.append('div').attr('class', 'work')
		.html(function(d){
			return workTemplate(d.attributes);
		});
	this.workDivs.on('click', function(d){
		console.log("clicked on", d);
	});
},

});

return Columns;
});
