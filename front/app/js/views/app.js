// imports
var BB = require('backbone');
var d3 = require('d3');
BB.$ = window.$;
var QueryView = require('../views/query');

var AppView = BB.View.extend({

	el: '#main',

	initSubViews: function () {
		this.queryView = new QueryView();
		this.$el.find('#controls').append(this.queryView.$el);
		this.$el.on('click', '.info-button', this.makeInfoToggler());
		// add click callback to info button
	},


    initialize: function () {
	    // bind events, 
		// render self, 
		// then initialize children
		this.initSubViews();
	},

	makeInfoToggler: function(){
		var panel = $("#info");
		var states = { isOpen: false };
		var p = d3.selectAll("#info p");
		p.style("color", "#fff");
		return function(e){
			panel.slideToggle(300);
			if( states.isOpen ){
				console.log("goodbye", states);
				p.transition()
					.duration(500)
					.style("color", "white");
				states.isOpen = false;
			} else {
				console.log("hello", states);
				p.transition()
					.duration(1400)
					.style("color", "black");
				states.isOpen = true;
			}
		};
	},

});

module.exports = AppView;
