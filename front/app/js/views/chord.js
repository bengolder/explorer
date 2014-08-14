var BB = require('backbone');
var d3 = require('d3');

var ChordView = BB.View.extend({

className: 'chart',
initialize: function(data){
	this.data = data;
	this.render();
},

chord: function(){

	console.log("drawing chord with", this.data);
	var data = this.data;
	var w = this.$el.width();
	var h = this.$el.height();
	var innerRadius = Math.min(w, h) * 0.35;
	var outerRadius = innerRadius * 1.05;
	var div = d3.select(this.el);
	// this needs to be able to resize
	this.color = '#ff6600';
	var me = this;
	var drag = d3.behavior.drag()
		.on('drag', function(d){
			var angle = mouseAngle();
			var dif = angle - d.refAngle;
			d.rotation = dif;
			adjustTransform();
			d3.event.sourceEvent.stopPropagation();
		}).on('dragstart', function(d){
			var angle = mouseAngle();
			d.refAngle = angle - d.rotation;
			svg.classed('dragging', true);
			d3.event.sourceEvent.stopPropagation();
		}).on('dragend', function(){
			svg.classed('dragging', false);
			d3.event.sourceEvent.stopPropagation();
		});

	var svg = div.selectAll('svg')
		.data([{rotation:0, x: w / 2, y: h / 2}]).enter()
		.append('svg')
		.attr('width', w)
		.attr('height', h)
		.append('g')
		.attr('class', 'svg-chart')
		.attr('transform', function(d){
			return 'translate('+d.x+','+d.y+')';}
			);


	var chordDiagram = svg.append('g')
		.call(drag);

	this.hoverBox = svg.append('g')
		.attr('class', 'hoverTextBox');

	this.hoverText = this.hoverBox.append('text')
		.attr('class', 'hoverText')
		.attr('text-anchor', 'middle');

	adjustTransform();

	// make the basic chord layout
	var layout = d3.layout.chord()
		.padding(0.02)
		.matrix(data.sizes);

	// add a 'group' for each faculty or topic
	// Should I add links here?
	this.groups = chordDiagram.selectAll('.group')
		.data(layout.groups)
		.enter().append('a')
		.attr("xlink:href", function(d, i){
			var node = data.nodes[i];
			return node.get("home_page");
		}).attr("target", "_blank")
		.attr('class', 'group')
		.append('g')
		.on('mouseenter', function(d, i){ me.groupHover(d, i); })
		.on('mouseleave',   function(d, i){ me.unhover(d, i); });

	// make the arcs representing each faculty or topic around the outside of
	// the diagram
	this.arcs = this.groups.append('path')
		.attr('d', d3.svg.arc()
			.innerRadius(innerRadius)
			.outerRadius(outerRadius));

	var textArcs = this.groups.append('path')
		.attr('id', function(d, i){ return 'group'+i; })
		.attr('class', 'textArc')
		.attr('d', function(d,i){

			var aS = d.startAngle,
				aE = d.endAngle,
				aMid = aS + ( (aE - aS) * 0.25 ),
				a0 = aMid - (Math.PI / 2),
			    a1 = a0 + (Math.PI / 2),
				r0 = outerRadius,
				r1 = outerRadius * 18;

			return 'M' + 
				Math.cos(a0) * r0 + ',' + 
				Math.sin(a0) * r0 + 
				'A' + r1 + ',' + r1 + 
				' 0 0,1 ' + 
				Math.cos(a1) * r1 + ',' + 
				Math.sin(a1) * r1;
		});


	// make the chords representing the shared connections between each pair or
	// faculty or topics
	this.chords = chordDiagram.append('g')
		.attr('class', 'chord')
		.selectAll('path')
		.data(layout.chords)
		.enter().append('path')
		.attr('d', d3.svg.chord().radius(innerRadius))
		.on('mouseenter',   function(d, i){ me.chordHover(d, i); })
		.on('mouseleave',   function(d, i){ me.unhover(d, i); });


	// make labels for each of the faculty or topics
	var groupLabels = this.groups.append('text')
		.attr('class', 'arcLabel')
		.attr('dy', -3);
	
	var groupTextPaths = groupLabels.append('textPath')
		.attr('xlink:href', function (d, i){
			return '#group' + i; })
		.text(function (d, i){
			return data.nodes[i].displayText();
		});



	function degrees(rad){
			return rad * (180/Math.PI);
	}
	function mouseAngle(){
		// this should return an angle
		var coords = d3.mouse(svg[0][0]);
		return Math.atan2(coords[1], coords[0]);
	}

	function adjustTransform(){
		chordDiagram.attr('transform', function(d){
			var deg = degrees(d.rotation);
			return 'rotate(' + deg + ')';
				});
	}
},

drawColor: function(){

	this.groups.attr('style', '');
	this.chords.attr('style', '');

	d3.selectAll('.chord').style('fill', '#000')
			.style('fill-opacity', 0.5);

	d3.selectAll('.arc').style('fill', '#000')
			.style('fill-opacity', 0.9);

	d3.selectAll('.selected')
			.style('fill', this.color)
			.style('fill-opacity', 1);

	d3.selectAll('.related')
			.style('fill', this.color)
			.style('fill-opacity', 0.6);

	d3.selectAll('.lessened')
			.style('opacity', 0.2);
},

chordHover: function(d, i){

	// lessened out unrelated groups.
	this.groups.classed({'lessened': function(g, j){
		return d.source.index != j && d.target.index != j;
	}, 'selected': function(g, j){
		return d.source.index == j || d.target.index == j;
	}});

	// fade out the other chords
	// and bring this one to the front.
	this.chords.classed({'lessened': function(c, j){
		return c !== d;
	}, 'selected': function(c, j){
		return c === d;
	}}).sort(function(a, b){
		if( a == d ){
			return 1;
		} else if( b == d ){
			return -1;
		} else {
			return 0;
		}
	});

	// show connectors in the hover text box.
	var shared = this.data.nodes[d.source.index].getCommonRelations(
			this.data.nodes[d.target.index], this.data.relationKey);
	this.addHoverText(shared);
	this.drawColor();

},

groupHover: function(d, i) {
	var me = this;
	var node = this.data.nodes[i];
	this.chords.classed({"lessened": function(p) {
		return p.source.index != i && 
		       p.target.index != i;
	}, 'related':function(p){
		return p.source.index == i || 
		       p.target.index == i;
	}});

	this.groups.classed({"lessened": function(o, j) {
		var other = me.data.nodes[j];
		return node.getCommonRelations(other, me.data.relationKey).length === 0;
	}, 'selected': function(o, j){
		var other = me.data.nodes[j];
		return node === other;
	}, 'related': function(o, j){
		var other = me.data.nodes[j];
		return node !== other && node.getCommonRelations(other, 
			me.data.relationKey).length > 0;
	}});

	this.addHoverText( node.get(this.data.relationKey) );
	this.drawColor();
},

unhover: function(d, i){
	this.chords.classed({'lessened':false, 'selected':false, 'related':false});
	this.groups.classed({'lessened':false, 'selected':false, 'related':false});
	this.hoverText.text('');
	this.drawColor();
},

addHoverText: function (items){
	// add a new span for each item
	this.hoverText.selectAll('tspan')
		.data(items).enter()
		.append('tspan')
		.attr('y', function(d, i){
			return i * 20;
		}).text(function(d){return d.displayText();})
		.attr('x', 0 );

	// center the hover text vertically
	this.hoverBox.attr('transform', 'translate(0,' + 
				(items.length * -18 / 2) + ')');
},

});

module.exports = ChordView;
