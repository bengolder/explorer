define([
'jquery',
'backbone',
'd3'
], function( $, BB, d3){

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
	var drag = d3.behavior.drag()
		.on('drag', function(d){
			var angle = mouseAngle()
			console.log("angle of", d3.mouse(svg[0][0]),':', degrees(angle));
			var dif = angle - d.refAngle;
			console.log("dif", degrees(dif));
			d.rotation = dif;
			adjustTransform();
			d3.event.sourceEvent.stopPropagation();
		}).on('dragstart', function(d){
			var angle = mouseAngle();
			console.log("refAngle", degrees(angle));
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

	var hoverBox = svg.append('g')
		.attr('class', 'hoverTextBox');

	var hoverText = hoverBox.append('text')
		.attr('class', 'hoverText')
		.attr('text-anchor', 'middle');

	adjustTransform();

	// make the basic chord layout
	var layout = d3.layout.chord()
		.padding(0.02)
		.matrix(data.sizes);

	// add a 'group' for each faculty or topic
	var groups = chordDiagram.selectAll('.group')
		.data(layout.groups)
		.enter().append('g')
		.attr('class', 'group')
		.on('click', function(d, i){
			console.log("clicked on", data.nodes[i].attributes.full_name);
		}).on('mouseenter', groupHover)
		.on('mouseleave', unhover);

	// make the arcs representing each faculty or topic around the outside of
	// the diagram
	var arcs = groups.append('path')
		.attr('d', d3.svg.arc()
			.innerRadius(innerRadius)
			.outerRadius(outerRadius));

	var textArcs = groups.append('path')
		.attr('id', function(d, i){ return 'group'+i; })
		.attr('class', 'textArc')
		.attr('d', function(d,i){
			var aS = d.startAngle,
				aE = d.endAngle,
				aMid = aS + ( (aE - aS) * 0.25 ),
				a0 = aMid - (Math.PI / 2),
			    a1 = a0 + (Math.PI / 2)
				r0 = outerRadius,
				r1 = outerRadius * 18;
			return 'M'
				+ Math.cos(a0) * r0 + ','
				+ Math.sin(a0) * r0
				+ 'A' + r1 + ',' + r1
				+ ' 0 0,1 '
				+ Math.cos(a1) * r1 + ','
				+ Math.sin(a1) * r1;
		});


	// make the chords representing the shared connections between each pair or
	// faculty or topics
	var chords = chordDiagram.append('g')
		.attr('class', 'chord')
		.selectAll('path')
		.data(layout.chords)
		.enter().append('path')
		.attr('d', d3.svg.chord().radius(innerRadius))
		.on('mouseenter', chordHover)
		.on('mouseleave', unhover);

	console.log("layout", layout.chords);

	// make labels for each of the faculty or topics
	var groupLabels = groups.append('text')
		.attr('class', 'arcLabel')
		.attr('dy', -3);
	
	var groupTextPaths = groupLabels.append('textPath')
		.attr('xlink:href', function (d, i){
			return '#group' + i; })
		.text(function (d, i){
			return data.nodes[i].displayText();
		});


	function groupHover(d, i) {
		var node = data.nodes[i];
		chords.classed({"lessened": function(p) {
			return p.source.index != i
				&& p.target.index != i;
		}, 'related':function(p){
			return p.source.index == i
				|| p.target.index == i;
		}});

		groups.classed({"lessened": function(o, j) {
			var other = data.nodes[j];
			return node.getCommonRelations(other, data.relationKey).length == 0;
		}, 'selected': function(o, j){
			var other = data.nodes[j];
			return node === other;
		}, 'related': function(o, j){
			var other = data.nodes[j];
			return node !== other && node.getCommonRelations(other, data.relationKey).length > 0;
		}});

		addHoverText( node.get(data.relationKey) );
	}

	function unhover(d, i){
		chords.classed({'lessened':false, 'selected':false, 'related':false});
		groups.classed({'lessened':false, 'selected':false, 'related':false});
		hoverText.text('');
	}

	function chordHover(d, i){

		// lessened out unrelated groups.
		groups.classed({'lessened': function(g, j){
			return d.source.index != j && d.target.index != j;
		}, 'selected': function(g, j){
			return d.source.index == j || d.target.index == j;
		}});

		// fade out the other chords
		// and bring this one to the front.
		chords.classed({'lessened': function(c, j){
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
		var shared = data.nodes[d.source.index].getCommonRelations(
				data.nodes[d.target.index], data.relationKey);
		addHoverText(shared);

	}

	function addHoverText(items){
		// add a new span for each item
		hoverText.selectAll('tspan')
			.data(items).enter()
			.append('tspan')
			.attr('y', function(d, i){
				return i * 20;
			}).text(function(d){return d.displayText();})
			.attr('x', 0 );

		// center the hover text vertically
		hoverBox.attr('transform', 'translate(0,'
					+ (items.length * -18 / 2) 
					+ ')');
	}

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
			console.log("rotation", deg);
			return 'rotate(' + deg + ')';
				});
	}
},

});

return ChordView;
});
