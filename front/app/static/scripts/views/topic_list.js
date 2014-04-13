define([
'd3',
'underscore',
'jquery',
'backbone',
'event_manager',
], 
function (d3, _, $, BB, Events) {
	// All Viz types should start with the #chart element
	// and they should use d3 to do most of their rendering.
	// Ideally, their parent view will initialize them with the proper data.
var TopicList = BB.View.extend({
	el: '#chart',
	initialize: function(data){
		console.log("data received:", data);
		this.data = data;
		this.render();
	},
	render: function(){
		d3.select(this.el)
			.append('div')
			.attr('class', 'topic-list column')
			.selectAll('div')
			.data(this.data.models).enter()
			.append('div')
			.attr("class", "topic-list-item")
			.text(function(d){
				return d.attributes.name;
			}).on('click', function(d){
				Events.trigger('specificItemSelected', d);
			});
	;
	},
});
return TopicList;
});
