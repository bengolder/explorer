define([
  'jquery',
  'backbone',
  'views/query',
  'views/list',
  'event_manager',
  'data_manager',
  'text!templates/main.html'
  ], function($, BB, QueryView, TopicListViz, Events, Data, template) {

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

return AppView;
});
