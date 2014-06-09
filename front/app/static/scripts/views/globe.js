define([
'event_manager',
'data_manager',
'backbone',
'd3',
'appconfig',
'topojson'
], function( Events, Data, BB, d3, config, topojson){
var GlobeView = BB.View.extend({

className: 'chart globe',

initialize: function(data){
	this.ready = false;
	this.data = data;
	var me = this;
	Events.on('worldGeometryLoaded', function(){
		me.ready = true;
		Events.trigger('globeViewReady');
	});
},

drawGlobe: function(){
	var me = this;
	
	var c = this.context;
	// this is meant to be called initially, and by tweens
	// clear the canvas context
	c.clearRect(0, 0, this.w, this.h);
	// fill for all the unselected countries
	this.drawFill("#aaa", this.land);
	// fill for the selected country
	this.data.forEach(function (d){
		// get corresponding color
		var fill;
		if( me.selectedCountry == d ){
			var fill = '#ff4010';
		} else {
			var fill = me.colorScale(d.get('works').length);
		}
		// get corresponding shape
		console.log("feature", d.feature);
		me.drawFill( fill, d.feature );
	});
	// This next line will break
	this.drawStroke("fff", 0.5, this.borders);
	// outline for the globe itself
	this.drawStroke("#000", 2, this.globe);

},

initCanvas: function(){

	var w = this.$el.width();
	var h = this.$el.height();
	this.w = w;
	this.h = h;
	var innerRadius = Math.min(w, h) * 0.35;
	var outerRadius = innerRadius * 1.05;

    this.projection = d3.geo.orthographic()
        .scale(248)
        .clipAngle(90);

    var yawScale = d3.scale.linear()
        .domain([-(w/2), w/2])
        .range([-210, 210]);

    var pitchScale = d3.scale.linear()
        .domain([-(h/2), h/2])
        .range([60, -60]);

	var div = d3.select(this.el);
	this.canvas = div.append('canvas')
		.attr('width', w)
		.attr('height', h)
		.attr('id', 'globe')
		.classed('draggable', true);

	this.context = this.canvas.node().getContext('2d');

	var me = this;

	this.drag = d3.behavior.drag()
		.on('drag', function(d){
			if ( me.mouseStart ) {
				var mouse = d3.mouse(me.canvas.node());
				var dx = mouse[0] - me.mouseStart[0];
				var dy = mouse[1] - me.mouseStart[1];

				var yaw = me.currentRotation[0] + yawScale(dx);
				var pitch = me.currentRotation[1] + pitchScale(dy);
				me.projection.rotate([yaw, pitch, 0]);
				me.drawGlobe();
			}
		}).on('dragstart', function(d){
			me.currentRotation = me.projection.rotate();
			me.mouseStart = d3.mouse(me.canvas.node());
			me.canvas.classed({'dragging': true, 'draggable': false});
		}).on('dragend', function(){
			me.canvas.classed({'draggable': true, 'dragging': false});
		});

	this.canvas.on('click', function(d){
		var mouse = d3.mouse(me.canvas.node());
		var lonlat = me.projection.invert(mouse);
	});

	this.canvas.call(this.drag);
},

renderCountryList: function(){
	var me = this;
	var chart = d3.select(this.el);
	var menu = chart.append('div').classed('countryMenu', true);
	
	// copy the data before sorting.
	var data = this.data.slice(0);
	data.sort(function(a, b){
		return b.get('works').length - a.get('works').length;
	});


	var countries = menu.selectAll('div').data(data)
		.enter().append('div')
		.classed('country', true)
		.text(function(d){
			return d.get('name') + ' ('+ d.get('works').length + ')';
		})
		.on('click', function(d){
			me.selectCountry(d);
			console.log("country clicked", d.attributes);
		});

},

render: function(data){
	var me = this;

	if( !this.ready ){
		console.log("waiting for globe data");
		Events.on('globeViewReady', function(){
			me.render(data);
		});
		return;
	}
	
	this.selectedCountry = null;

	var maxProjects = d3.max(data, function(d){ return d.get('works').length; });
	this.colorScale = d3.scale.linear()
		.domain([1, maxProjects])
		.range(['#c6dbef','#3182bd']);

	this.$el.find('canvas').remove();

	this.initCanvas();

	console.log("starting globe", Data.globe);

	var world = Data.globe;

    this.path = d3.geo.path()
        .projection(this.projection)
        .context(this.context);

    this.globe = {type: "Sphere"};

    this.land = topojson.feature(world, world.objects.land);
	this.countries = topojson.feature( world, world.objects.countries );
    this.borders = topojson.mesh(world, world.objects.countries, 
			function(a, b) { return a.id !== b.id; });
	this.data = data;

	this.linkCountries();

	this.drawGlobe();

	this.renderCountryList();
},

drawFill: function( color, pathItems){
	var c = this.context;
	c.fillStyle = color;
	c.beginPath();
	this.path(pathItems);
	c.fill();
},

drawStroke: function drawStroke( color, strokeWidth, pathItems ){
	var c = this.context;
	c.strokeStyle = color;
	c.lineWidth = strokeWidth;
	c.beginPath();
	this.path(pathItems);
	c.stroke();
},

selectCountry: function (d){
	this.selectedCountry = d;
	this.transitionToCountry(d);
},

linkCountries: function(){
	var me = this;
	this.data.forEach(function(d){
		var found = false,
			i = 0;
		while(!found && i < me.countries.features.length){
			var c = me.countries.features[i];
			if( d.get('official_id') === c.id ){
				d.feature = c;
				found = true;
			}
			i++;
		}
	});
},

tweenToPoint: function(point){
	var me = this;
	return function(){
		// This function returns a tweening function for rotating the globe
		var rotator = d3.interpolate(me.projection.rotate(), 
				[-point[0], -point[1]]
				);

		return function(t) {
			me.projection.rotate(rotator(t));
			me.drawGlobe();
		};
	};
},

getCountryPoint: function(d){
	return d3.geo.centroid(d.feature);
},

transitionToCountry: function(d){
	var p = this.getCountryPoint(d);
	d3.transition()
		.duration(800)
		.tween('rotate', this.tweenToPoint(p));
},

});
return GlobeView;
});
