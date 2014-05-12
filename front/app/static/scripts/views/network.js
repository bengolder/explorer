define([
'jquery',
'backbone',
'd3'
], function( $, BB, d3){

var NetworkView = BB.View.extend({

className: 'chart',
initialize: function(data){
	this.data = data;
	this.render();
},

network: function(){
	console.log("drawing network with", this.data);
	var data = this.data;
	var w = this.$el.width();
	var h = this.$el.height();
	var div = d3.select(this.el);
	// this needs to be able to resize
	var force = d3.layout.force()
		.nodes(data.nodes)
		.links(data.links)
		.linkDistance(function(d){
			return 600 / d.bridges.length;
		})
		.charge(-500)
		.size([w,h])
		.start();

	var svg = div.append('svg')
		.attr('width', w)
		.attr('height', h);

	var link = svg.selectAll('.link')
		.data(data.links)
		.enter().append('line')
		.attr('class', 'link')
		.style('stroke-width', function(d){
			return d.bridges.length * 1.5;})
		.on('click', function(d){
			console.log("link", d);
		});

	var node = svg.selectAll('node')
		.data(data.nodes)
		.enter().append('circle')
		.attr('class', 'node')
		.attr('r', 15)
		.call(force.drag)
		.on('click', function(d){
			console.log("node", d.attributes);
		});

	force.on("tick", function() {
		link.attr("x1", function(d) { return d.source.x; })
			.attr("y1", function(d) { return d.source.y; })
			.attr("x2", function(d) { return d.target.x; })
			.attr("y2", function(d) { return d.target.y; });

		node.attr("cx", function(d) { return d.x; })
			.attr("cy", function(d) { return d.y; });
  });

	
},

});

return NetworkView;
});
