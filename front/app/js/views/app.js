// imports
var BB = require('backbone');
BB.$ = window.$;
var QueryView = require('../views/query');
var template = require('../templates/main.html');

var AppView = BB.View.extend({

	el: '#main',

	initSubViews: function () {
		this.queryView = new QueryView();
		this.$el.find('#controls').append(this.queryView.$el);
	},


    initialize: function () {
	    // bind events, 
		// render self, 
		// then initialize children
		this.render();
		this.initSubViews();
	},

	render: function () {
		// renders will often be split into subfunctions
		var that = this;
		this.$el.html(template);
		// Later we will implement history
		// Backbone.history.start();
	},
});

module.exports = AppView;
