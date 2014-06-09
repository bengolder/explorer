define([
'event_manager',
'data_manager',
'backbone',
'd3',
'appconfig',
'topojson'
], function( Events, Data, BB, d3, config, topojson){


var GlobeView = BB.View.extend({

className: 'chart',

initialize: function(data){
	this.ready = false;
	this.data = data;
	var me = this;
	Events.on('worldGeometryLoaded', function(){
		me.ready = true;
		Events.trigger('globeViewReady');
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
	console.log("starting globe", Data.globe);

	var w = this.$el.width();
	var h = this.$el.height();
	var innerRadius = Math.min(w, h) * 0.35;
	var outerRadius = innerRadius * 1.05;
	var div = d3.select(this.el);

	var world = Data.globe;

    var projection = d3.geo.orthographic()
        .scale(248)
        .clipAngle(90);

	var canvas = div.append('canvas')
		.attr('width', w)
		.attr('height', h);

	var c = canvas.node().getContext('2d');

    canvas.on("mousemove", function() {
        var p = d3.mouse(this);
        projection.rotate([circumScale(p[0]), pitchScale(p[1])]);
        drawGlobe();
    });

    var circumScale = d3.scale.linear()
        .domain([0, w])
        .range([-210, 210]);

     var pitchScale = d3.scale.linear()
         .domain([0, h])
         .range([60, -60]);

    var path = d3.geo.path()
        .projection(projection)
        .context(c);

    var globe = {type: "Sphere"},
      land = topojson.feature(world, world.objects.land),
      countries = topojson.feature(world, world.objects.countries).geometries,
      borders = topojson.mesh(world, world.objects.countries, function(a, b) { return a.id !== b.id; });

	function drawGlobe(){
        // this is meant to be called initially, and by tweens
        // clear the canvas context
        c.clearRect(0, 0, w, h);
        // fill for all the unselected countries
        drawFill("#aaa", land);
        // fill for the selected country
        // This next line will break
        drawStroke("fff", 0.5, borders);
        // outline for the globe itself
        drawStroke("#000", 2, globe);
	}

    function drawFill( color, pathItems){
        c.fillStyle = color;
        c.beginPath();
        path(pathItems);
        c.fill();
    }

    function drawStroke( color, strokeWidth, pathItems ){
        c.strokeStyle = color;
        c.lineWidth = strokeWidth;
        c.beginPath();
        path(pathItems);
        c.stroke();
    }

	drawGlobe();
},

});


return GlobeView;
});
