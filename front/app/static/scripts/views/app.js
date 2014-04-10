define([
  'jquery',
  'backbone',
  'views/query',
  'text!templates/main.html'
  ], function($, BB, QueryView, template) {

var AppView = BB.View.extend({

	el: '#main',

	initSubViews: function () {
		this.queryView = new QueryView({
			el:'#controls'
		});
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

return AppView;
});
